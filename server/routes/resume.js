const express = require('express');
const router = express.Router();
const multer = require('multer');
const pdfParse = require('pdf-parse/lib/pdf-parse.js');
const Resume = require('../models/Resume');
const jwt = require('jsonwebtoken');
const Groq = require('groq-sdk');

const upload = multer({ storage: multer.memoryStorage() });
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token!' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token!' });
  }
};

router.post('/analyze', verifyToken, upload.single('resume'), async (req, res) => {
  try {
    const { company } = req.body;
    const pdfData = await pdfParse(req.file.buffer);
    const resumeText = pdfData.text;

    const previousResume = await Resume.findOne({ userId: req.userId }).sort({ uploadedAt: -1 });

    let prompt = `You are an expert resume analyzer for Indian students. Analyze this resume for a ${company} job application.

Resume:
${resumeText.substring(0, 3000)}

${previousResume ? `Previous analysis score was ${previousResume.score}/100. Previous improvements needed: ${previousResume.improvements.join(', ')}` : ''}

Respond ONLY with this exact JSON format, no other text:
{
  "score": 75,
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "improvements": ["improvement 1", "improvement 2", "improvement 3"],
  "companyTips": ["tip 1 for ${company}", "tip 2 for ${company}"],
  "comparison": "${previousResume ? 'comparison with previous resume' : 'first upload'}"
}`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.3,
    });

    const text = chatCompletion.choices[0].message.content;
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const analysis = JSON.parse(jsonMatch[0]);

    const resumeRecord = new Resume({
      userId: req.userId,
      fileName: req.file.originalname,
      score: analysis.score,
      strengths: analysis.strengths,
      improvements: analysis.improvements,
      targetCompany: company
    });
    await resumeRecord.save();

    const allRecords = await Resume.find({ userId: req.userId }).sort({ uploadedAt: 1 });

    res.json({
      analysis,
      previousResume: previousResume || null,
      totalUploads: allRecords.length,
      growthHistory: allRecords.map(r => ({
        score: r.score,
        company: r.targetCompany,
        date: r.uploadedAt
      }))
    });

  } catch (err) {
    console.error('FULL ERROR MESSAGE:', err.message);
    console.error('FULL ERROR:', err);
    res.status(500).json({ message: err.message, error: err.message });
  }
});

router.post('/mentor-chat', async (req, res) => {
  const { mentorName, mentorInfo, userMessage } = req.body;
  try {
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are an AI assistant for mentor ${mentorName}. Background: ${mentorInfo}. Answer briefly and motivatingly for Indian college students.`
        },
        { role: 'user', content: userMessage }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.5,
    });
    res.json({ reply: response.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ message: 'AI error' });
  }
});

router.post('/doubt-solver', async (req, res) => {
  const { userMessage, resumeContext } = req.body;
  try {
    const systemPrompt = `You are CampBot, a friendly and intelligent AI assistant like ChatGPT. You can answer ANYTHING — general knowledge, science, history, jokes, fun facts, coding, math, movies, sports, nonsense questions, creative writing, placement prep, DSA problems, career guidance, or anything else. Be conversational, warm and engaging. Never say you cannot answer — always try your best.${resumeContext ? `\nStudent Resume:\n${resumeContext}\nAlso give personalized suggestions based on this resume when relevant.` : ''} Keep answers concise and helpful.`;

    const response = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
    });
    res.json({ reply: response.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ message: 'AI error' });
  }
});

module.exports = router;