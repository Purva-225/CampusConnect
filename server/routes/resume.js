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
    const systemPrompt = `You are an expert AI assistant for Indian college students preparing for placements. You help with:
1. DSA problems - explain approach, time/space complexity, code examples
2. Career roadmaps - what to learn, in what order
3. Latest tech news - AI, LLMs, Nvidia, industry updates
4. Company-specific prep - what Google, Amazon, Microsoft etc look for
5. Interview tips - HR, technical, behavioral questions
6. Resume-based suggestions - if resume is provided, give personalized advice
${resumeContext ? `\nStudent's Resume:\n${resumeContext}\nGive personalized suggestions based on this resume.` : ''}
Be concise, practical and motivating for Indian students.`;

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

router.post('/doubt-solver', async (req, res) => {
  const { userMessage, resumeContext } = req.body;
  try {
    const systemPrompt = `You are an expert AI assistant for Indian college students preparing for placements. You help with DSA problems, career roadmaps, latest tech news (AI, LLMs, Nvidia), company-specific prep, interview tips, and resume-based personalized suggestions.${resumeContext ? `\nStudent Resume:\n${resumeContext}\nGive personalized suggestions.` : ''} Be concise, practical and motivating.`;
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