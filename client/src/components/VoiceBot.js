import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function VoiceBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [messages, setMessages] = useState([]);
  const [pulse, setPulse] = useState(false);
  const recognitionRef = useRef(null);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const pageNames = {
    '/': 'Home page', '/prep-hub': 'Prep Hub', '/resume': 'Resume Analyzer',
    '/mentors': 'Mentor Connect', '/doubt-solver': 'Doubt Solver',
    '/login': 'Login page', '/register': 'Register page'
  };

  const addMessage = (from, text) => {
    setMessages(prev => [...prev, { from, text, time: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) }]);
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const speak = (text, callback) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
   utterance.rate = 0.85;
utterance.pitch = 1.4;
    utterance.volume = 1;
    const voices = window.speechSynthesis.getVoices();
   const preferred = [
  'Google UK English Female',
  'Samantha',
  'Karen',
  'Moira',
  'Tessa',
  'Veena',
  'Google US English',
  'Microsoft Zira',
];
const femaleVoice = preferred.reduce((found, name) =>
  found || voices.find(v => v.name.includes(name)), null);
if (femaleVoice) utterance.voice = femaleVoice;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      if (callback) callback();
    };
    window.speechSynthesis.speak(utterance);
    addMessage('bot', text);
  };

  // Greet on open and announce current page
  useEffect(() => {
    if (isOpen) {
      const page = pageNames[location.pathname] || 'this page';
      const greeting = `Hi there! I am CampBot, your personal guide on CampusConnect! You are currently on the ${page}. I can help you navigate anywhere, answer your placement questions, or even upload your resume. Just click the mic and tell me what you need! I am here for you!`;
      setTimeout(() => speak(greeting), 400);
    } else {
      window.speechSynthesis.cancel();
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsListening(false);
    }
  }, [isOpen]);

  // Announce page changes while bot is open
  useEffect(() => {
    if (isOpen) {
      const page = pageNames[location.pathname] || 'this page';
      speak(`You are now on ${page}. What would you like to do here?`);
    }
  }, [location.pathname]);

  useEffect(() => {
    const interval = setInterval(() => setPulse(p => !p), 1500);
    return () => clearInterval(interval);
  }, []);

  const handleCommand = async (command) => {
    const cmd = command.toLowerCase();
    addMessage('user', command);

    // Navigation
    if (cmd.includes('home') || cmd.includes('main page')) {
      navigate('/');
      speak("Taking you home! The home page shows everything CampusConnect offers.");
      return;
    }
    if (cmd.includes('prep hub') || cmd.includes('prep') || cmd.includes('questions') || cmd.includes('practice')) {
      navigate('/prep-hub');
      speak("Opening Prep Hub! Here you will find DSA, aptitude, and HR questions filtered by company. You can also open DSA sheets from Striver, Love Babbar, or Apna College!");
      return;
    }
    if (cmd.includes('resume') && !cmd.includes('upload') && !cmd.includes('my resume')) {
      navigate('/resume');
      speak("Opening Resume Analyzer! Upload your resume here and I will analyze it with AI for your target company.");
      return;
    }
    if (cmd.includes('mentor')) {
      navigate('/mentors');
      speak("Opening Mentor Connect! You can connect with placed seniors from Google, Microsoft, Amazon and more. Click Connect Now on any mentor to chat with them!");
      return;
    }
    if (cmd.includes('doubt') || cmd.includes('chatbot') || cmd.includes('question') || cmd.includes('solver')) {
      navigate('/doubt-solver');
      speak("Opening Doubt Solver! Ask me anything about DSA, career guidance, or the latest tech news. I am powered by AI!");
      return;
    }
    if (cmd.includes('login') || cmd.includes('sign in')) {
      navigate('/login'); speak("Taking you to the login page!"); return;
    }
    if (cmd.includes('register') || cmd.includes('sign up')) {
      navigate('/register'); speak("Taking you to the register page!"); return;
    }

    // Resume upload
    if (cmd.includes('upload') || cmd.includes('my resume') || cmd.includes('add resume') || cmd.includes('submit resume')) {
      if (location.pathname !== '/resume') {
        navigate('/resume');
        speak("Taking you to Resume Analyzer first! Once the page loads, I will open the file picker for you.", () => {
          setTimeout(() => fileInputRef.current?.click(), 2000);
        });
      } else {
        speak("Opening your file picker now! Please select your resume PDF.");
        setTimeout(() => fileInputRef.current?.click(), 500);
      }
      return;
    }

    // Read page
    if (cmd.includes('read') || cmd.includes('what is on') || cmd.includes('describe')) {
      const page = pageNames[location.pathname] || 'this page';
      speak(`You are on ${page}. ${document.title}. This page helps you with your placement preparation. Would you like me to take you somewhere specific?`);
      return;
    }

    // What can you do
    if (cmd.includes('what can you do') || cmd.includes('help') || cmd.includes('commands')) {
      speak("I can do many things! Say Go to Resume, Go to Mentors, Open Prep Hub, or Open Doubt Solver to navigate. Say Upload my resume to open the file picker. Or ask me any question about DSA, placement prep, or career guidance and I will answer using AI!");
      return;
    }

    // Close
    if (cmd.includes('close') || cmd.includes('bye') || cmd.includes('goodbye') || cmd.includes('stop')) {
      speak("Goodbye! Best of luck with your placement prep! You are going to do amazing!");
      setTimeout(() => setIsOpen(false), 3000);
      return;
    }

    // AI answer
    speak("Great question! Let me think about that for you...");
    try {
      const res = await fetch('https://campusconnect-b7wn.onrender.com/api/resume/doubt-solver', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMessage: command })
      });
      const data = await res.json();
      const reply = data.reply ? data.reply.substring(0, 500) : "Sorry, I could not get an answer right now. Try asking again!";
      speak(reply, () => {
        setTimeout(() => speak("Do you have any other questions? I am still here for you!"), 1000);
      });
    } catch {
      speak("I could not connect to the server right now. But I am still here! Try asking me to navigate somewhere or ask a simpler question.");
    }
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      speak("Sorry! Your browser does not support voice recognition. Please use Google Chrome for the best experience.");
      return;
    }
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-IN';

    recognition.onstart = () => { setIsListening(true); setTranscript(''); };
    recognition.onresult = (event) => {
      const current = event.results[event.results.length - 1];
      setTranscript(current[0].transcript);
      if (current.isFinal) handleCommand(current[0].transcript);
    };
    recognition.onerror = () => {
      setIsListening(false);
      speak("I could not hear that clearly. Could you please try again?");
    };
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) recognitionRef.current.stop();
    setIsListening(false);
  };

  // Cute pink robot SVG
  const RobotFace = ({ size = 54 }) => (
    <svg width={size} height={size} viewBox="0 0 54 54" fill="none">
      <circle cx="27" cy="27" r="26" fill="#ff4d9422" stroke="#ff4d94" strokeWidth="1.5"/>
      <circle cx="27" cy="27" r="20" fill="#1a0a12" stroke="#ff4d94" strokeWidth="1.2"/>
      {/* Antenna */}
      <line x1="27" y1="7" x2="27" y2="13" stroke="#ff4d94" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="27" cy="6" r="2.2" fill="#ff4d94"/>
      <circle cx="27" cy="6" r="1" fill="#ffb3d9"/>
      {/* Ears */}
      <rect x="7" y="19" width="4" height="8" rx="2" fill="#1a0a12" stroke="#ff4d94" strokeWidth="1"/>
      <rect x="43" y="19" width="4" height="8" rx="2" fill="#1a0a12" stroke="#ff4d94" strokeWidth="1"/>
      {/* Head */}
      <rect x="13" y="14" width="28" height="18" rx="5" fill="#2a0a1a" stroke="#ff4d94" strokeWidth="1"/>
      {/* Eyes */}
      <ellipse cx="21" cy="23" rx="4" ry={isSpeaking ? 3 : 4} fill={isSpeaking ? "#ff4d94" : "#0d0008"} stroke="#ff4d94" strokeWidth="1"/>
      <ellipse cx="33" cy="23" rx="4" ry={isSpeaking ? 3 : 4} fill={isSpeaking ? "#ff4d94" : "#0d0008"} stroke="#ff4d94" strokeWidth="1"/>
      <circle cx="22" cy="22" r="1.5" fill="#ffb3d9"/>
      <circle cx="34" cy="22" r="1.5" fill="#ffb3d9"/>
      {/* Blush */}
      <ellipse cx="16" cy="28" rx="3" ry="2" fill="#ff4d9433"/>
      <ellipse cx="38" cy="28" rx="3" ry="2" fill="#ff4d9433"/>
      {/* Mouth */}
      {isSpeaking
        ? <ellipse cx="27" cy="30" rx="5" ry="3" fill="#ff4d94" stroke="#ff4d94" strokeWidth="0.5"/>
        : <path d="M22 30 Q27 34 32 30" stroke="#ff4d94" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      }
      {/* Body */}
      <rect x="17" y="33" width="20" height="13" rx="4" fill="#2a0a1a" stroke="#ff4d94" strokeWidth="1"/>
      {/* Heart on chest */}
      <path d="M24 38 C24 36.5 22 36 22 38 C22 40 24 41.5 27 43 C30 41.5 32 40 32 38 C32 36 30 36.5 30 38 C30 36.5 27 35 24 38Z" fill={isListening ? "#ff4d94" : "#ff4d9455"}/>
      {/* Bow */}
      <path d="M23 14 L27 11 L31 14" stroke="#ff4d94" strokeWidth="1.2" fill="#ff4d9444" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <>
      <input type="file" ref={fileInputRef} accept=".pdf" style={{ display: 'none' }}
        onChange={(e) => {
          if (e.target.files[0]) {
            speak(`Got it! I found your resume named ${e.target.files[0].name}. Please select a company and click Analyze to get your AI feedback!`);
            const dropZone = document.querySelector('input[type="file"][accept=".pdf"]:not([style*="none"])');
            if (dropZone) {
              const dt = new DataTransfer();
              dt.items.add(e.target.files[0]);
              dropZone.files = dt.files;
            }
          }
        }}
      />

      {/* Floating Robot */}
      <div onClick={() => setIsOpen(!isOpen)} style={{
        position: 'fixed', bottom: '28px', right: '28px', zIndex: 9999, cursor: 'pointer',
        filter: pulse ? 'drop-shadow(0 0 12px #ff4d94)' : 'drop-shadow(0 0 5px #ff4d9488)',
        transition: 'filter 1.5s ease-in-out',
        animation: 'botfloat 3s ease-in-out infinite'
      }}>
        <RobotFace size={60} />
        {!isOpen && (
          <div style={{ position: 'absolute', top: 2, right: 2, width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ff4d94', border: '2px solid #0f172a' }}/>
        )}
      </div>

      {/* Chat Panel */}
      {isOpen && (
        <div style={{
          position: 'fixed', bottom: '105px', right: '28px', zIndex: 9998,
          width: '330px', backgroundColor: '#0d0008',
          border: '1.5px solid #ff4d94', borderRadius: '24px',
          boxShadow: '0 0 40px rgba(255,77,148,0.25)', overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{ background: 'linear-gradient(135deg, #2a0a1a, #1a0012)', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid #ff4d9433' }}>
            <RobotFace size={38} />
            <div>
              <div style={{ color: '#ff4d94', fontWeight: 'bold', fontSize: '0.95rem' }}>CampBot 🩷</div>
              <div style={{ color: '#ff4d9488', fontSize: '0.72rem' }}>
                {isListening ? '🎙️ Listening...' : isSpeaking ? '💬 Speaking...' : '✨ Your AI Guide'}
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#ff4d9466', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
          </div>

          {/* Messages */}
          <div style={{ padding: '12px', maxHeight: '220px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {messages.length === 0 && (
              <div style={{ color: '#ff4d9855', fontSize: '0.8rem', textAlign: 'center', padding: '20px 0' }}>
                Click the mic and start talking! 🩷
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '85%', padding: '8px 12px', borderRadius: msg.from === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  backgroundColor: msg.from === 'user' ? '#ff4d9433' : '#2a0a1a',
                  border: `1px solid ${msg.from === 'user' ? '#ff4d9466' : '#ff4d9422'}`,
                  color: msg.from === 'user' ? '#ffb3d9' : '#fce4f0',
                  fontSize: '0.82rem', lineHeight: '1.5'
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Transcript live */}
          {isListening && transcript && (
            <div style={{ margin: '0 12px', padding: '8px 12px', backgroundColor: '#1a0a12', borderRadius: '10px', border: '1px solid #ff4d9444', color: '#ff4d94', fontSize: '0.8rem' }}>
              🎙️ {transcript}
            </div>
          )}

          {/* Quick commands */}
          <div style={{ padding: '8px 12px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
              {['Go to Resume', 'Open Mentors', 'Go to Prep Hub', 'Upload my resume', 'What can you do?'].map(cmd => (
                <button key={cmd} onClick={() => { setTranscript(cmd); handleCommand(cmd); }}
                  style={{ backgroundColor: '#2a0a1a', color: '#ff4d94', border: '1px solid #ff4d9444', borderRadius: '20px', padding: '4px 10px', fontSize: '0.72rem', cursor: 'pointer' }}>
                  {cmd}
                </button>
              ))}
            </div>

            {/* Mic button */}
            <button onClick={isListening ? stopListening : startListening}
              style={{
                width: '100%', padding: '13px',
                backgroundColor: isListening ? '#dc2626' : '#ff4d94',
                color: 'white', border: 'none', borderRadius: '14px',
                fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: isListening ? '0 0 20px rgba(220,38,38,0.5)' : '0 0 15px rgba(255,77,148,0.4)'
              }}>
              {isListening ? '🔴 Stop Listening' : '🎙️ Start Listening'}
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes botfloat {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
      `}</style>
    </>
  );
}

export default VoiceBot;