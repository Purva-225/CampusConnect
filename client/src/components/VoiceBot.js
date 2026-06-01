import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function VoiceBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [speechBubble, setSpeechBubble] = useState('Hi! Click me! 👋');
  const [messages, setMessages] = useState([]);
  const [blink, setBlink] = useState(false);
  const [pos, setPos] = useState({ x: window.innerWidth - 120, y: window.innerHeight - 160 });
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [wandering, setWandering] = useState(true);
  const [targetPos, setTargetPos] = useState({ x: window.innerWidth - 120, y: window.innerHeight - 160 });
  const [direction, setDirection] = useState(1);

  const recognitionRef = useRef(null);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const posRef = useRef(pos);
  const wanderRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  posRef.current = pos;

  const pageNames = {
    '/': 'Home page', '/prep-hub': 'Prep Hub', '/resume': 'Resume Analyzer',
    '/mentors': 'Mentor Connect', '/doubt-solver': 'Doubt Solver',
    '/login': 'Login page', '/register': 'Register page'
  };

  // Pet wandering behavior
  useEffect(() => {
    if (!wandering || dragging || isOpen) return;
    const pickNewTarget = () => {
      const margin = 100;
      const tx = margin + Math.random() * (window.innerWidth - margin * 2);
      const ty = margin + Math.random() * (window.innerHeight - margin * 2);
      setTargetPos({ x: tx, y: ty });
      setDirection(tx > posRef.current.x ? 1 : -1);
    };
    pickNewTarget();
    wanderRef.current = setInterval(pickNewTarget, 4000);
    return () => clearInterval(wanderRef.current);
  }, [wandering, dragging, isOpen]);

  // Smooth movement toward target
  useEffect(() => {
    if (dragging || isOpen) return;
    const moveInterval = setInterval(() => {
      setPos(prev => {
        const dx = targetPos.x - prev.x;
        const dy = targetPos.y - prev.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 2) return prev;
        const speed = Math.min(1.5, dist);
        return { x: prev.x + (dx / dist) * speed, y: prev.y + (dy / dist) * speed };
      });
    }, 16);
    return () => clearInterval(moveInterval);
  }, [targetPos, dragging, isOpen]);

  // Eye blink
  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 120);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Drag handlers
  const onMouseDown = (e) => {
    if (e.target.closest('button')) return;
    setDragging(true);
    setWandering(false);
    setDragOffset({ x: e.clientX - pos.x, y: e.clientY - pos.y });
    e.preventDefault();
  };
  useEffect(() => {
    const onMove = (e) => {
      if (!dragging) return;
      setPos({ x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y });
    };
    const onUp = () => {
      if (dragging) { setDragging(false); setTimeout(() => setWandering(true), 2000); }
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
  }, [dragging, dragOffset]);

  const addMessage = (from, text) => {
    setMessages(prev => [...prev, { from, text }]);
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const speak = (text, callback) => {
    window.speechSynthesis.cancel();
    setSpeechBubble(text);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85;
    utterance.pitch = 1.4;
    utterance.volume = 1;
    const setVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      const preferred = ['Google UK English Female','Samantha','Karen','Moira','Tessa','Microsoft Zira'];
      const v = preferred.reduce((f, n) => f || voices.find(v => v.name.includes(n)), null);
      if (v) utterance.voice = v;
    };
    setVoice();
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = setVoice;
    }
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => { setIsSpeaking(false); if (callback) callback(); };
    window.speechSynthesis.speak(utterance);
    addMessage('bot', text);
  };

  useEffect(() => {
    if (isOpen) {
      setWandering(false);
      const page = pageNames[location.pathname] || 'this page';
      setTimeout(() => speak(`Hi! I am CampBot! You are on ${page}. How can I help you?`), 300);
    } else {
      window.speechSynthesis.cancel();
      setSpeechBubble('Click me! 👋');
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsListening(false);
      setTimeout(() => setWandering(true), 1000);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const page = pageNames[location.pathname] || 'this page';
      speak(`You are now on ${page}!`);
    }
  }, [location.pathname]);

  const handleCommand = async (command) => {
    const cmd = command.toLowerCase();
    addMessage('user', command);
    if (cmd.includes('home')) { navigate('/'); speak("Taking you home!"); return; }
    if (cmd.includes('prep hub') || cmd.includes('prep') || cmd.includes('practice')) { navigate('/prep-hub'); speak("Opening Prep Hub!"); return; }
    if (cmd.includes('resume') && !cmd.includes('upload') && !cmd.includes('my resume')) { navigate('/resume'); speak("Opening Resume Analyzer!"); return; }
    if (cmd.includes('mentor')) { navigate('/mentors'); speak("Opening Mentor Connect!"); return; }
    if (cmd.includes('doubt') || cmd.includes('solver')) { navigate('/doubt-solver'); speak("Opening Doubt Solver!"); return; }
    if (cmd.includes('login')) { navigate('/login'); speak("Taking you to login!"); return; }
    if (cmd.includes('register')) { navigate('/register'); speak("Taking you to register!"); return; }
    if (cmd.includes('upload') || cmd.includes('my resume') || cmd.includes('add resume')) {
      if (location.pathname !== '/resume') {
        navigate('/resume');
        speak("Going to Resume page! Opening file picker shortly!", () => setTimeout(() => fileInputRef.current?.click(), 2000));
      } else { speak("Opening file picker!"); setTimeout(() => fileInputRef.current?.click(), 500); }
      return;
    }
    if (cmd.includes('what can you do') || cmd.includes('help')) { speak("I can navigate pages, answer any question, and help upload your resume!"); return; }
    if (cmd.includes('close') || cmd.includes('bye')) { speak("Goodbye! Good luck!"); setTimeout(() => setIsOpen(false), 2000); return; }

    speak("Let me think...");
    try {
      const res = await fetch('https://campusconnect-b7wn.onrender.com/api/resume/doubt-solver', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMessage: command })
      });
      const data = await res.json();
      speak((data.reply || "Sorry, try again!").substring(0, 400));
    } catch { speak("Could not connect. Try navigating somewhere!"); }
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) { speak("Please use Chrome!"); return; }
    window.speechSynthesis.cancel(); setIsSpeaking(false);
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const r = new SR(); recognitionRef.current = r;
    r.continuous = false; r.interimResults = true; r.lang = 'en-IN';
    r.onstart = () => { setIsListening(true); setTranscript(''); };
    r.onresult = (e) => { const c = e.results[e.results.length-1]; setTranscript(c[0].transcript); if (c.isFinal) handleCommand(c[0].transcript); };
    r.onerror = () => { setIsListening(false); speak("Could not hear! Try again."); };
    r.onend = () => setIsListening(false);
    r.start();
  };
  const stopListening = () => { if (recognitionRef.current) recognitionRef.current.stop(); setIsListening(false); };

  // 3D Robot SVG
  const Robot = () => (
    <svg width="72" height="92" viewBox="0 0 72 92" fill="none" style={{ transform: `scaleX(${direction})`, filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.35)) drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>
      <defs>
        <radialGradient id="headGrad" cx="40%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#ffffff"/>
          <stop offset="60%" stopColor="#e8edf5"/>
          <stop offset="100%" stopColor="#c8d0e0"/>
        </radialGradient>
        <radialGradient id="bodyGrad" cx="35%" cy="25%" r="65%">
          <stop offset="0%" stopColor="#f0f4ff"/>
          <stop offset="55%" stopColor="#dde4f5"/>
          <stop offset="100%" stopColor="#bbc5d8"/>
        </radialGradient>
        <radialGradient id="eyeGrad" cx="40%" cy="35%" r="55%">
          <stop offset="0%" stopColor={isSpeaking ? "#93c5fd" : isListening ? "#f9a8d4" : "#60a5fa"}/>
          <stop offset="100%" stopColor={isSpeaking ? "#2563eb" : isListening ? "#ec4899" : "#1d4ed8"}/>
        </radialGradient>
        <linearGradient id="visorGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e293b"/>
          <stop offset="100%" stopColor="#0f172a"/>
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Shadow */}
      <ellipse cx="36" cy="91" rx="18" ry="4" fill="rgba(0,0,0,0.15)"/>

      {/* Antenna */}
      <line x1="36" y1="3" x2="36" y2="13" stroke="#c8d0e0" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="36" cy="3" r="3.5" fill="url(#eyeGrad)" filter="url(#glow)"/>
      <circle cx="36" cy="3" r="1.5" fill="white" opacity="0.8"/>

      {/* Head */}
      <ellipse cx="36" cy="26" rx="20" ry="18" fill="url(#headGrad)" stroke="#c0cad8" strokeWidth="0.8"/>
      {/* Head highlight */}
      <ellipse cx="29" cy="18" rx="7" ry="4" fill="white" opacity="0.4" transform="rotate(-20 29 18)"/>

      {/* Visor */}
      <rect x="19" y="19" width="34" height="15" rx="7.5" fill="url(#visorGrad)" stroke="#0f172a" strokeWidth="0.5"/>
      {/* Visor shine */}
      <rect x="21" y="20" width="14" height="3" rx="1.5" fill="white" opacity="0.12"/>

      {/* Eyes */}
      <ellipse cx="28.5" cy="26.5" rx={blink ? 4 : 4} ry={blink ? 0.4 : 4.5} fill="url(#eyeGrad)" filter="url(#glow)"/>
      <ellipse cx="43.5" cy="26.5" rx={blink ? 4 : 4} ry={blink ? 0.4 : 4.5} fill="url(#eyeGrad)" filter="url(#glow)"/>
      {/* Eye shine */}
      {!blink && <><circle cx="30" cy="24.5" r="1.5" fill="white" opacity="0.9"/>
      <circle cx="45" cy="24.5" r="1.5" fill="white" opacity="0.9"/>
      <circle cx="27" cy="28" r="0.7" fill="white" opacity="0.5"/>
      <circle cx="42" cy="28" r="0.7" fill="white" opacity="0.5"/></>}

      {/* Mouth */}
      {isSpeaking
        ? <><ellipse cx="36" cy="33" rx="5" ry="2.5" fill="#60a5fa" opacity="0.9"/>
           <ellipse cx="36" cy="32.5" rx="3" ry="1" fill="white" opacity="0.3"/></>
        : <path d="M30 33 Q36 37 42 33" stroke="#8898aa" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      }

      {/* Neck */}
      <rect x="30" y="43" width="12" height="6" rx="3" fill="#d0dae8" stroke="#c0cad8" strokeWidth="0.5"/>

      {/* Body */}
      <ellipse cx="36" cy="66" rx="18" ry="20" fill="url(#bodyGrad)" stroke="#c0cad8" strokeWidth="0.8"/>
      {/* Body highlight */}
      <ellipse cx="28" cy="56" rx="6" ry="4" fill="white" opacity="0.35" transform="rotate(-15 28 56)"/>

      {/* Chest panel */}
      <rect x="25" y="57" width="22" height="17" rx="5" fill="#e8edf8" stroke="#c8d4e8" strokeWidth="0.8"/>
      {/* Chest light */}
      <circle cx="36" cy="63" r="4" fill={isListening ? "#f9a8d4" : isSpeaking ? "#93c5fd" : "#dde6f5"} stroke="#c8d4e8" strokeWidth="0.5" filter={isListening || isSpeaking ? "url(#glow)" : "none"}/>
      <circle cx="36" cy="62" r="1.5" fill="white" opacity="0.6"/>
      {/* Chest dots */}
      <circle cx="29" cy="70" r="2" fill="#c8d4e8"/>
      <circle cx="36" cy="70" r="2" fill="#c8d4e8"/>
      <circle cx="43" cy="70" r="2" fill="#c8d4e8"/>

      {/* Left arm */}
      <ellipse cx="13" cy="62" rx="6" ry="12" fill="url(#bodyGrad)" stroke="#c0cad8" strokeWidth="0.7" transform="rotate(-8 13 62)"/>
      <ellipse cx="13" cy="62" rx="3" ry="5" fill="white" opacity="0.25" transform="rotate(-8 13 62)"/>
      <circle cx="10" cy="73" r="5" fill="url(#bodyGrad)" stroke="#c0cad8" strokeWidth="0.7"/>

      {/* Right arm - raised/pointing */}
      <ellipse cx="59" cy="59" rx="6" ry="12" fill="url(#bodyGrad)" stroke="#c0cad8" strokeWidth="0.7" transform="rotate(25 59 59)"/>
      <ellipse cx="59" cy="59" rx="3" ry="5" fill="white" opacity="0.25" transform="rotate(25 59 59)"/>
      <circle cx="63" cy="68" r="5" fill="url(#bodyGrad)" stroke="#c0cad8" strokeWidth="0.7"/>

      {/* Legs */}
      <rect x="24" y="83" width="10" height="7" rx="5" fill="url(#bodyGrad)" stroke="#c0cad8" strokeWidth="0.7"/>
      <rect x="38" y="83" width="10" height="7" rx="5" fill="url(#bodyGrad)" stroke="#c0cad8" strokeWidth="0.7"/>
      {/* Feet */}
      <ellipse cx="29" cy="90" rx="8" ry="3.5" fill="url(#bodyGrad)" stroke="#c0cad8" strokeWidth="0.7"/>
      <ellipse cx="43" cy="90" rx="8" ry="3.5" fill="url(#bodyGrad)" stroke="#c0cad8" strokeWidth="0.7"/>
      {/* Feet highlight */}
      <ellipse cx="27" cy="88.5" rx="3" ry="1" fill="white" opacity="0.4"/>
      <ellipse cx="41" cy="88.5" rx="3" ry="1" fill="white" opacity="0.4"/>
    </svg>
  );

  // Panel position - flip if robot is on left side
  const panelLeft = pos.x > window.innerWidth / 2;

  return (
    <>
      <input type="file" ref={fileInputRef} accept=".pdf" style={{ display: 'none' }}
        onChange={(e) => { if (e.target.files[0]) speak(`Got your resume ${e.target.files[0].name}! Go to Resume Analyzer and click Analyze!`); }}
      />

      <div style={{ position: 'fixed', left: pos.x, top: pos.y, zIndex: 9999, userSelect: 'none' }}>

        {/* Speech bubble */}
        {speechBubble && (
          <div style={{
            position: 'absolute',
            bottom: '95px',
            [panelLeft ? 'right' : 'left']: '-10px',
            backgroundColor: 'white',
            borderRadius: '18px',
            padding: '10px 14px',
            maxWidth: '200px',
            minWidth: '100px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.15), 0 1px 4px rgba(0,0,0,0.1)',
            border: '1px solid #e2e8f0',
            animation: 'bubblePop 0.25s cubic-bezier(0.34,1.56,0.64,1)',
            zIndex: 2
          }}>
            <p style={{ color: '#1e293b', fontSize: '0.78rem', lineHeight: '1.5', margin: 0, fontFamily: 'system-ui, sans-serif' }}>
              {speechBubble.substring(0, 130)}{speechBubble.length > 130 ? '...' : ''}
            </p>
            {/* Tail */}
            <div style={{
              position: 'absolute', bottom: '-8px',
              [panelLeft ? 'right' : 'left']: '24px',
              width: 0, height: 0,
              borderLeft: '8px solid transparent', borderRight: '8px solid transparent',
              borderTop: '8px solid white',
              filter: 'drop-shadow(0 2px 1px rgba(0,0,0,0.08))'
            }}/>
          </div>
        )}

        {/* Listening transcript */}
        {isListening && transcript && (
          <div style={{
            position: 'absolute', bottom: '155px',
            [panelLeft ? 'right' : 'left']: '0px',
            backgroundColor: '#fdf4ff', borderRadius: '12px',
            padding: '6px 12px', maxWidth: '180px',
            border: '1px solid #e879f9', fontSize: '0.72rem', color: '#7e22ce',
            boxShadow: '0 2px 8px rgba(232,121,249,0.2)'
          }}>🎙️ {transcript}</div>
        )}

        {/* Robot */}
        <div
          onMouseDown={onMouseDown}
          onClick={() => { if (!dragging) setIsOpen(o => !o); }}
          style={{ cursor: dragging ? 'grabbing' : 'grab', animation: 'robotBob 2s ease-in-out infinite' }}>
          <Robot />
        </div>

        {/* Controls below robot */}
        {isOpen && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
            {/* Mic button */}
            <button onClick={isListening ? stopListening : startListening}
              style={{
                width: '42px', height: '42px', borderRadius: '50%',
                backgroundColor: isListening ? '#dc2626' : '#3b82f6',
                color: 'white', border: 'none', cursor: 'pointer', fontSize: '1rem',
                boxShadow: isListening ? '0 0 16px rgba(220,38,38,0.6)' : '0 4px 12px rgba(59,130,246,0.5)',
                transition: 'all 0.2s'
              }}>
              {isListening ? '⏹' : '🎙️'}
            </button>

            {/* Quick commands */}
            <div style={{
              backgroundColor: 'white', borderRadius: '14px', padding: '10px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.12)', border: '1px solid #e2e8f0',
              width: '190px'
            }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
                {['Resume', 'Mentors', 'Prep Hub', 'Upload CV', 'Help'].map(cmd => (
                  <button key={cmd} onClick={() => handleCommand(cmd)}
                    style={{ backgroundColor: '#f0f9ff', color: '#0369a1', border: '1px solid #bae6fd', borderRadius: '10px', padding: '3px 8px', fontSize: '0.68rem', cursor: 'pointer' }}>
                    {cmd}
                  </button>
                ))}
              </div>
              {/* Mini chat */}
              {messages.length > 0 && (
                <div style={{ maxHeight: '80px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  {messages.slice(-3).map((msg, i) => (
                    <div key={i} style={{ fontSize: '0.68rem', textAlign: msg.from === 'user' ? 'right' : 'left' }}>
                      <span style={{ backgroundColor: msg.from === 'user' ? '#dbeafe' : '#f8fafc', color: msg.from === 'user' ? '#1e40af' : '#475569', padding: '2px 7px', borderRadius: '8px', display: 'inline-block' }}>
                        {msg.text.substring(0, 55)}{msg.text.length > 55 ? '…' : ''}
                      </span>
                    </div>
                  ))}
                  <div ref={messagesEndRef}/>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes robotBob {
          0%,100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-5px) rotate(-1deg); }
          75% { transform: translateY(-3px) rotate(1deg); }
        }
        @keyframes bubblePop {
          from { transform: scale(0.7) translateY(8px); opacity: 0; }
          to   { transform: scale(1) translateY(0); opacity: 1; }
        }
      `}</style>
    </>
  );
}

export default VoiceBot;