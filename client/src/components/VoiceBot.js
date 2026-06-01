import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function VoiceBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [status, setStatus] = useState('Click to activate');
  const [pulse, setPulse] = useState(false);
  const recognitionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Greeting when bot opens
    if (isOpen) {
      setTimeout(() => {
        speak("Hi! I'm CampBot. I can navigate pages, answer your questions, or help with your resume. How can I help?");
        setStatus('Listening for your command...');
      }, 500);
    }
  }, [isOpen]);

  useEffect(() => {
    // Pulse animation loop
    const interval = setInterval(() => setPulse(p => !p), 1500);
    return () => clearInterval(interval);
  }, []);

  const speak = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.1;
    utterance.volume = 1;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      setResponse(text);
    };
    window.speechSynthesis.speak(utterance);
  };

  const handleCommand = async (command) => {
    const cmd = command.toLowerCase();

    // Navigation commands
    if (cmd.includes('home') || cmd.includes('main page')) {
      speak("Taking you to the home page!"); navigate('/'); return;
    }
    if (cmd.includes('prep hub') || cmd.includes('prep') || cmd.includes('questions')) {
      speak("Opening Prep Hub!"); navigate('/prep-hub'); return;
    }
    if (cmd.includes('resume') || cmd.includes('cv')) {
      speak("Opening Resume Analyzer!"); navigate('/resume'); return;
    }
    if (cmd.includes('mentor') || cmd.includes('mentors')) {
      speak("Opening Mentor Connect!"); navigate('/mentors'); return;
    }
    if (cmd.includes('doubt') || cmd.includes('chatbot') || cmd.includes('ask')) {
      speak("Opening Doubt Solver!"); navigate('/doubt-solver'); return;
    }
    if (cmd.includes('login') || cmd.includes('sign in')) {
      speak("Taking you to login!"); navigate('/login'); return;
    }
    if (cmd.includes('register') || cmd.includes('sign up')) {
      speak("Taking you to register!"); navigate('/register'); return;
    }

    // Page reading
    if (cmd.includes('read') || cmd.includes('what is on') || cmd.includes('what\'s on')) {
      const pageText = document.body.innerText.substring(0, 300);
      speak("Here is what's on this page: " + pageText);
      return;
    }

    // Close bot
    if (cmd.includes('close') || cmd.includes('bye') || cmd.includes('goodbye')) {
      speak("Goodbye! Good luck with your placement prep!"); 
      setTimeout(() => setIsOpen(false), 2000);
      return;
    }

    // AI answer via backend
    setStatus('Thinking...');
    try {
      const res = await fetch('https://campusconnect-b7wn.onrender.com/api/resume/doubt-solver', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMessage: command })
      });
      const data = await res.json();
      const reply = data.reply || "Sorry, I couldn't get an answer right now.";
      speak(reply.substring(0, 400));
    } catch {
      speak("I couldn't connect to the server. Please check your internet connection.");
    }
    setStatus('Listening for your command...');
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      speak("Sorry, your browser doesn't support voice recognition. Please use Chrome.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-IN';

    recognition.onstart = () => {
      setIsListening(true);
      setStatus('Listening... speak now!');
      setTranscript('');
    };

    recognition.onresult = (event) => {
      const current = event.results[event.results.length - 1];
      const text = current[0].transcript;
      setTranscript(text);
      if (current.isFinal) {
        setStatus('Processing...');
        handleCommand(text);
      }
    };

    recognition.onerror = () => {
      setIsListening(false);
      setStatus('Could not hear. Try again!');
    };

    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) recognitionRef.current.stop();
    setIsListening(false);
    setStatus('Listening for your command...');
  };

  // Robot SVG design
  const RobotIcon = ({ size = 52 }) => (
    <svg width={size} height={size} viewBox="0 0 52 52" fill="none">
      {/* Glow effect */}
      <circle cx="26" cy="26" r="25" fill="#4ade8022" />
      <circle cx="26" cy="26" r="20" fill="#0f172a" stroke="#4ade80" strokeWidth="1.5"/>
      {/* Antenna */}
      <line x1="26" y1="6" x2="26" y2="12" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="26" cy="5" r="2" fill="#4ade80"/>
      {/* Head */}
      <rect x="16" y="13" width="20" height="14" rx="3" fill="#1e293b" stroke="#4ade80" strokeWidth="1"/>
      {/* Eyes */}
      <circle cx="21" cy="20" r="3" fill={isSpeaking ? "#4ade80" : "#0f172a"} stroke="#4ade80" strokeWidth="1"/>
      <circle cx="31" cy="20" r="3" fill={isSpeaking ? "#4ade80" : "#0f172a"} stroke="#4ade80" strokeWidth="1"/>
      <circle cx="21" cy="20" r="1.2" fill="#4ade80"/>
      <circle cx="31" cy="20" r="1.2" fill="#4ade80"/>
      {/* Mouth */}
      <rect x="20" y="24" width="12" height="2" rx="1" fill={isSpeaking ? "#4ade80" : "#334155"}/>
      {/* Body */}
      <rect x="18" y="28" width="16" height="14" rx="3" fill="#1e293b" stroke="#4ade80" strokeWidth="1"/>
      {/* Chest light */}
      <circle cx="26" cy="35" r="3" fill={isListening ? "#4ade80" : "#0f172a"} stroke="#4ade80" strokeWidth="1"/>
      {/* Arms */}
      <rect x="10" y="29" width="7" height="3" rx="1.5" fill="#1e293b" stroke="#4ade80" strokeWidth="1"/>
      <rect x="35" y="29" width="7" height="3" rx="1.5" fill="#1e293b" stroke="#4ade80" strokeWidth="1"/>
    </svg>
  );

  return (
    <>
      {/* Floating Robot Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed', bottom: '28px', right: '28px', zIndex: 9999,
          cursor: 'pointer',
          filter: pulse ? 'drop-shadow(0 0 10px #4ade80)' : 'drop-shadow(0 0 4px #4ade8088)',
          transition: 'filter 1.5s ease-in-out',
          animation: 'float 3s ease-in-out infinite'
        }}>
        <RobotIcon size={58} />
        {/* Notification dot */}
        {!isOpen && (
          <div style={{
            position: 'absolute', top: 2, right: 2,
            width: 12, height: 12, borderRadius: '50%',
            backgroundColor: '#4ade80', border: '2px solid #0f172a'
          }}/>
        )}
      </div>

      {/* Chat Panel */}
      {isOpen && (
        <div style={{
          position: 'fixed', bottom: '100px', right: '28px', zIndex: 9998,
          width: '320px', backgroundColor: '#0f172a',
          border: '1.5px solid #4ade80', borderRadius: '20px',
          boxShadow: '0 0 30px rgba(74,222,128,0.2)',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{ backgroundColor: '#1e293b', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid #4ade8033' }}>
            <RobotIcon size={36} />
            <div>
              <div style={{ color: '#4ade80', fontWeight: 'bold', fontSize: '0.95rem' }}>CampBot 🤖</div>
              <div style={{ color: '#64748b', fontSize: '0.75rem' }}>AI Voice Assistant</div>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#64748b', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
          </div>

          {/* Body */}
          <div style={{ padding: '16px 18px' }}>
            {/* Status */}
            <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '10px', textAlign: 'center' }}>{status}</div>

            {/* Transcript */}
            {transcript && (
              <div style={{ backgroundColor: '#1e293b', borderRadius: '10px', padding: '10px 14px', marginBottom: '10px', border: '1px solid #334155' }}>
                <div style={{ color: '#64748b', fontSize: '0.7rem', marginBottom: '4px' }}>You said:</div>
                <div style={{ color: 'white', fontSize: '0.85rem' }}>{transcript}</div>
              </div>
            )}

            {/* Response */}
            {response && (
              <div style={{ backgroundColor: '#0c1a2e', borderRadius: '10px', padding: '10px 14px', marginBottom: '10px', border: '1px solid #4ade8033' }}>
                <div style={{ color: '#4ade80', fontSize: '0.7rem', marginBottom: '4px' }}>CampBot:</div>
                <div style={{ color: '#cbd5e1', fontSize: '0.82rem', lineHeight: '1.5', maxHeight: '100px', overflowY: 'auto' }}>{response}</div>
              </div>
            )}

            {/* Quick commands */}
            <div style={{ marginBottom: '12px' }}>
              <div style={{ color: '#64748b', fontSize: '0.72rem', marginBottom: '6px' }}>Quick commands:</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {['Go to Resume', 'Open Mentors', 'Go to Prep Hub', 'Doubt Solver'].map(cmd => (
                  <button key={cmd} onClick={() => { setTranscript(cmd); handleCommand(cmd); }}
                    style={{ backgroundColor: '#1e293b', color: '#4ade80', border: '1px solid #4ade8044', borderRadius: '20px', padding: '4px 10px', fontSize: '0.72rem', cursor: 'pointer' }}>
                    {cmd}
                  </button>
                ))}
              </div>
            </div>

            {/* Mic Button */}
            <button
              onClick={isListening ? stopListening : startListening}
              style={{
                width: '100%', padding: '12px',
                backgroundColor: isListening ? '#dc2626' : '#4ade80',
                color: isListening ? 'white' : '#111827',
                border: 'none', borderRadius: '12px',
                fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: isListening ? '0 0 20px rgba(220,38,38,0.4)' : '0 0 10px rgba(74,222,128,0.3)'
              }}>
              {isListening ? '🔴 Stop Listening' : '🎙️ Start Listening'}
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </>
  );
}

export default VoiceBot;