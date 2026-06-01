import React, { useState, useRef, useEffect } from 'react';

function DoubtSolver() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: `👋 Hi! I'm your AI Doubt Solver powered by real-time knowledge!\n\nI can help you with:\n🧠 DSA problems & approaches\n🗺️ Career roadmaps & guidance\n📰 Latest tech news (Nvidia, AI, LLMs)\n🏢 Company-specific preparation\n📄 Resume-based personalized suggestions\n💼 Interview tips\n\nWhat would you like help with today?`
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [resumeText, setResumeText] = useState('');
  const chatEndRef = useRef(null);

  const quickQuestions = [
    '🧠 How to solve Two Sum problem?',
    '🗺️ DSA roadmap for beginners',
    '🏢 How to prepare for Google?',
    '📰 Latest AI & LLM news',
    '💼 Top HR interview questions',
    '📄 Analyze my resume skills',
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text) => {
    const messageText = text || userInput;
    if (!messageText.trim() || loading) return;
    const newMessages = [...messages, { role: 'user', text: messageText }];
    setMessages(newMessages);
    setUserInput('');
    setLoading(true);

    try {
      const response = await fetch('https://campusconnect-b7wn.onrender.com/api/resume/doubt-solver', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userMessage: messageText,
          resumeContext: resumeText || null
        })
      });
      const data = await response.json();
      setMessages([...newMessages, { role: 'assistant', text: data.reply }]);
    } catch {
      setMessages([...newMessages, { role: 'assistant', text: 'Sorry, something went wrong. Please try again!' }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ backgroundColor: 'transparent', color: 'white', minHeight: '100vh', padding: '40px', maxWidth: '900px', margin: '0 auto' }}>

      {/* Header */}
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#4ade80' }}>🤖 AI Doubt Solver</h1>
      <p style={{ color: '#94a3b8', marginTop: '8px', marginBottom: '32px' }}>
        Ask anything — DSA, career guidance, tech news, interview prep & personalized suggestions
      </p>

      {/* Resume Upload for Personalization */}
      <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '16px', marginBottom: '24px', border: '1px solid #334155' }}>
        <p style={{ color: '#4ade80', fontWeight: 'bold', marginBottom: '8px', fontSize: '0.9rem' }}>
          📄 Paste your resume text for personalized suggestions (optional)
        </p>
        <textarea
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          placeholder="Paste your resume content here for personalized career advice..."
          style={{ width: '100%', height: '80px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: 'white', padding: '10px', fontSize: '0.85rem', resize: 'none', outline: 'none', boxSizing: 'border-box' }}
        />
      </div>

      {/* Quick Questions */}
      <div style={{ marginBottom: '24px' }}>
        <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '10px' }}>Quick questions:</p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {quickQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => sendMessage(q)}
              style={{ backgroundColor: '#1e293b', color: '#4ade80', padding: '6px 14px', borderRadius: '20px', border: '1px solid #4ade80', cursor: 'pointer', fontSize: '0.8rem' }}>
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div style={{ backgroundColor: '#1e293b', borderRadius: '16px', padding: '24px', height: '450px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '16px', border: '1px solid #334155' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
            {msg.role === 'assistant' && (
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#4ade80', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', marginRight: '8px', flexShrink: 0 }}>🤖</div>
            )}
            <div style={{
              maxWidth: '75%', padding: '12px 16px', borderRadius: '16px',
              backgroundColor: msg.role === 'user' ? '#4ade80' : '#0f172a',
              color: msg.role === 'user' ? '#111827' : 'white',
              fontSize: '0.9rem', lineHeight: '1.6',
              border: msg.role === 'assistant' ? '1px solid #334155' : 'none',
              whiteSpace: 'pre-wrap'
            }}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#4ade80', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>🤖</div>
            <div style={{ padding: '12px 16px', borderRadius: '16px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#4ade80', fontSize: '0.9rem' }}>
              Thinking... ✨
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Box */}
      <div style={{ display: 'flex', gap: '12px' }}>
        <input
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask your doubt here... (DSA, career, tech news, interview prep)"
          style={{ flex: 1, padding: '14px 18px', borderRadius: '12px', backgroundColor: '#1e293b', border: '1px solid #334155', color: 'white', fontSize: '0.9rem', outline: 'none' }}
        />
        <button
          onClick={() => sendMessage()}
          disabled={loading}
          style={{ padding: '14px 24px', borderRadius: '12px', backgroundColor: '#4ade80', color: '#111827', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '0.9rem' }}>
          Send 🚀
        </button>
      </div>

    </div>
  );
}

export default DoubtSolver;