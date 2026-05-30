const express = require('express');
const router = express.Router();
const multer = require('multer');
const pdfParse = require('pdf-parse');
const Resume = require('../models/Resume');
const jwt = require('jsonwebtoken');

const upload = multer({ storage: multer.memoryStorage() });

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

function analyzeResume(text, company) {
  const lowerText = text.toLowerCase();
  let score = 50;
  const strengths = [];
  const improvements = [];
  const companyTips = [];

  if (lowerText.includes('project')) { score += 10; strengths.push('Has projects section'); }
  if (lowerText.includes('experience')) { score += 10; strengths.push('Work experience included'); }
  if (lowerText.includes('education')) { score += 5; strengths.push('Education details present'); }
  if (lowerText.includes('skill')) { score += 5; strengths.push('Skills section found'); }
  if (lowerText.includes('achievement') || lowerText.includes('award')) { score += 5; strengths.push('Achievements mentioned'); }
  if (lowerText.includes('github') || lowerText.includes('linkedin')) { score += 5; strengths.push('Online presence included'); }

  if (!lowerText.includes('quantif') && !lowerText.includes('%') && !lowerText.includes('increased')) {
    improvements.push('Add quantifiable achievements (e.g. improved performance by 30%)');
    score -= 5;
  }
  if (text.length < 500) { improvements.push('Resume is too short — add more details'); score -= 5; }
  if (!lowerText.includes('summary') && !lowerText.includes('objective')) {
    improvements.push('Add a professional summary section');
  }
  if (!lowerText.includes('certificate') && !lowerText.includes('certification')) {
    improvements.push('Add relevant certifications');
  }

  const companyKeywords = {
    'Google': ['algorithm', 'data structure', 'system design', 'scalable', 'open source'],
    'Amazon': ['leadership', 'customer', 'ownership', 'deliver', 'metrics'],
    'Microsoft': ['azure', 'cloud', 'collaboration', 'agile', 'product'],
    'TCS': ['java', 'python', 'communication', 'team', 'client'],
    'Infosys': ['agile', 'java', 'communication', 'analytical', 'problem solving'],
  };

  const keywords = companyKeywords[company] || ['communication', 'teamwork', 'problem solving'];
  const missing = keywords.filter(k => !lowerText.includes(k));
  if (missing.length > 0) {
    improvements.push(`Add ${company}-specific keywords: ${missing.slice(0,3).join(', ')}`);
    companyTips.push(`${company} values: ${keywords.slice(0,3).join(', ')}`);
  }
  companyTips.push(`Tailor your resume specifically for ${company}'s job description`);
  companyTips.push(`Research ${company}'s culture and reflect it in your resume`);

  if (strengths.length === 0) strengths.push('Resume has basic structure');
  if (improvements.length === 0) improvements.push('Keep updating with new achievements');

  return {
    score: Math.min(100, Math.max(30, score)),
    strengths: strengths.slice(0, 4),
    improvements: improvements.slice(0, 4),
    companyTips
  };
}

router.post('/analyze', verifyToken, upload.single('resume'), async (req, res) => {
  try {
    const { company } = req.body;
    const pdfData = await pdfParse(req.file.buffer);
    const resumeText = pdfData.text;

    const previousResume = await Resume.findOne({ userId: req.userId }).sort({ uploadedAt: -1 });
    const analysis = analyzeResume(resumeText, company);

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
    console.error('ERROR:', err);
    res.status(500).json({ message: 'Analysis failed!', error: err.message });
  }
});

module.exports = router;