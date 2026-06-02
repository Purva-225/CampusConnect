const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const conversations = new Map();

const SYSTEM_PROMPTS = {
  dsa: `You are a friendly DSA tutor for college students. Explain data structures and algorithms concepts in simple terms with examples. Use analogies and step-by-step explanations.`,

  dbms: `You are a friendly DBMS tutor for college students. Explain database concepts in simple terms with real-world examples. Cover normalization, SQL, transactions, etc.`,

  os: `You are a friendly Operating Systems tutor for college students. Explain OS concepts in simple terms with relatable analogies. Cover processes, memory management, file systems, etc.`,

  'computer-networks': `You are a friendly Computer Networks tutor for college students. Explain networking concepts in simple terms with everyday examples. Cover protocols, OSI model, TCP/IP, etc.`,
};

const VALID_SUBJECTS = ['dsa', 'dbms', 'os', 'computer-networks'];

function buildConversationContext(sessionId, subject, question) {
  const history = conversations.get(sessionId) || [];
  const systemPrompt = SYSTEM_PROMPTS[subject] || SYSTEM_PROMPTS.dsa;
  let context = systemPrompt + '\n\n';
  if (history.length > 0) {
    context += 'Previous conversation:\n';
    for (const msg of history.slice(-10)) {
      context += `${msg.role}: ${msg.content}\n`;
    }
    context += '\n';
  }
  context += `Student: ${question}\nTutor:`;
  return context;
}

router.post('/ask', async (req, res) => {
  try {
    const { subject, question, sessionId } = req.body;

    if (!subject || !question) {
      return res.status(400).json({ error: 'subject and question are required' });
    }

    if (!VALID_SUBJECTS.includes(subject)) {
      return res.status(400).json({
        error: `Invalid subject. Must be one of: ${VALID_SUBJECTS.join(', ')}`
      });
    }

    const sid = sessionId || `session_${Date.now()}`;

    if (!conversations.has(sid)) {
      conversations.set(sid, []);
    }
    conversations.get(sid).push({ role: 'Student', content: question });

    const prompt = buildConversationContext(sid, subject, question);
    const result = await model.generateContent(prompt);
    const answer = result.response.text();

    conversations.get(sid).push({ role: 'Tutor', content: answer });

    res.json({ sessionId: sid, subject, question, answer });
  } catch (error) {
    console.error('AI Error:', error);
    res.status(500).json({ error: 'Failed to get AI response' });
  }
});

router.get('/history/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  const history = conversations.get(sessionId);
  if (!history) {
    return res.status(404).json({ error: 'Session not found' });
  }
  res.json({ sessionId, messages: history });
});

router.delete('/history/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  conversations.delete(sessionId);
  res.json({ message: 'Session cleared' });
});

module.exports = router;
