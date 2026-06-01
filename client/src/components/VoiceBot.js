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
  const [mood, setMood] = useState('happy');
  const [pos, setPos] = useState({ x: window.innerWidth - 130, y: window.innerHeight - 180 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [targetPos, setTargetPos] = useState({ x: window.innerWidth - 130, y: window.innerHeight - 180 });
  const [moving, setMoving] = useState(false);
  const dragMovedRef = useRef(false);

  const recognitionRef = useRef(null);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const posRef = useRef(pos);
  const isDraggingRef = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();

  posRef.current = pos;
  isDraggingRef.current = isDragging;

  const pageNames = {
    '/': 'Home page', '/prep-hub': 'Prep Hub', '/resume': 'Resume Analyzer',
    '/mentors': 'Mentor Connect', '/doubt-solver': 'Doubt Solver',
    '/login': 'Login page', '/register': 'Register page'
  };

  // Wander every 3 minutes
  useEffect(() => {
    if (isOpen) return;
    const pickTarget = () => {
      if (isDraggingRef.current) return;
      const margin = 120;
      const tx = margin + Math.random() * (window.innerWidth - margin * 2);
      const ty = margin + Math.random() * (window.innerHeight - margin * 2);
      setTargetPos({ x: tx, y: ty });
      setMoving(true);
      setTimeout(() => setMoving(false), 8000);
    };
    pickTarget();
    const interval = setInterval(pickTarget, 3 * 60 * 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  // Smooth move toward target
  useEffect(() => {
    if (isDragging || isOpen) return;
    const frame = setInterval(() => {
      setPos(prev => {
        const dx = targetPos.x - prev.x;
        const dy = targetPos.y - prev.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 1) return prev;
        const speed = Math.min(1.2, dist * 0.02);
        return { x: prev.x + (dx / dist) * speed, y: prev.y + (dy / dist) * speed };
      });
    }, 16);
    return () => clearInterval(frame);
  }, [targetPos, isDragging, isOpen]);

  // Eye blink
  useEffect(() => {
    const t = setInterval(() => { setBlink(true); setTimeout(() => setBlink(false), 130); }, 3200);
    return () => clearInterval(t);
  }, []);

  // Drag
  const onMouseDown = (e) => {
    if (e.target.closest('button') || e.target.closest('.panel')) return;
    dragMovedRef.current = false;
    setIsDragging(true);
    setDragOffset({ x: e.clientX - posRef.current.x, y: e.clientY - posRef.current.y });
    e.preventDefault();
  };

  useEffect(() => {
    const onMove = (e) => {
      if (!isDraggingRef.current) return;
      dragMovedRef.current = true;
      const nx = e.clientX - dragOffset.x;
      const ny = e.clientY - dragOffset.y;
      const cx = Math.max(0, Math.min(window.innerWidth - 80, nx));
      const cy = Math.max(0, Math.min(window.innerHeight - 100, ny));
      setPos({ x: cx, y: cy });
    };
    const onUp = () => {
      if (isDraggingRef.current) {
        setIsDragging(false);
        setTargetPos(posRef.current);
        // If barely moved, treat as click
        if (!dragMovedRef.current) {
          setIsOpen(o => !o);
        }
      }
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
  }, [dragOffset]);

  const addMessage = (from, text) => {
    setMessages(prev => [...prev, { from, text }]);
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const speak = (text, callback) => {
    window.speechSynthesis.cancel();
    setSpeechBubble(text);
    setMood('talking');
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85; utterance.pitch = 1.4; utterance.volume = 1;
    const tryVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      const preferred = ['Google UK English Female','Samantha','Karen','Moira','Tessa','Microsoft Zira'];
      const v = preferred.reduce((f, n) => f || voices.find(v => v.name.includes(n)), null);
      if (v) utterance.voice = v;
    };
    tryVoice();
    if (!window.speechSynthesis.getVoices().length) window.speechSynthesis.onvoiceschanged = tryVoice;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => { setIsSpeaking(false); setMood('happy'); if (callback) callback(); };
    window.speechSynthesis.speak(utterance);
    addMessage('bot', text);
  };

  useEffect(() => {
    if (isOpen) {
      const page = pageNames[location.pathname] || 'this page';
      setTimeout(() => speak(`Hi! I am CampBot! You are on ${page}. How can I help you today?`), 300);
    } else {
      window.speechSynthesis.cancel();
      setSpeechBubble('Click me! 👋');
      setMood('happy');
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsListening(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) speak(`You are now on ${pageNames[location.pathname] || 'this page'}!`);
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
    setMood('thinking');
    speak("Hmm, let me think...");
    try {
      const res = await fetch('https://campusconnect-b7wn.onrender.com/api/resume/doubt-solver', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMessage: command })
      });
      const data = await res.json();
      speak((data.reply || "Sorry, try again!").substring(0, 400));
    } catch { speak("Could not connect right now!"); }
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) { speak("Please use Chrome!"); return; }
    window.speechSynthesis.cancel(); setIsSpeaking(false);
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const r = new SR(); recognitionRef.current = r;
    r.continuous = false; r.interimResults = true; r.lang = 'en-IN';
    r.onstart = () => { setIsListening(true); setTranscript(''); setMood('thinking'); };
    r.onresult = (e) => { const c = e.results[e.results.length-1]; setTranscript(c[0].transcript); if (c.isFinal) handleCommand(c[0].transcript); };
    r.onerror = () => { setIsListening(false); setMood('happy'); speak("Could not hear! Try again."); };
    r.onend = () => { setIsListening(false); };
    r.start();
  };
  const stopListening = () => { if (recognitionRef.current) recognitionRef.current.stop(); setIsListening(false); setMood('happy'); };

  const Robot = () => {
    const armSwing = moving ? 'rotate(-20 14 58)' : 'rotate(0 14 58)';
    return (
      <svg width="76" height="96" viewBox="0 0 76 96" fill="none"
        style={{ filter: 'drop-shadow(0 8px 20px rgba(255,20,147,0.4)) drop-shadow(0 2px 6px rgba(0,0,0,0.3))' }}>
        <defs>
          <radialGradient id="pinkHead" cx="38%" cy="28%" r="62%">
            <stop offset="0%" stopColor="#ff8ec8"/>
            <stop offset="50%" stopColor="#ff4da6"/>
            <stop offset="100%" stopColor="#cc0066"/>
          </radialGradient>
          <radialGradient id="pinkBody" cx="35%" cy="25%" r="65%">
            <stop offset="0%" stopColor="#ff6ab4"/>
            <stop offset="55%" stopColor="#e8357a"/>
            <stop offset="100%" stopColor="#b5004d"/>
          </radialGradient>
          <radialGradient id="pinkDark" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#cc1166"/>
            <stop offset="100%" stopColor="#880033"/>
          </radialGradient>
          <radialGradient id="eyeBlue" cx="35%" cy="30%" r="55%">
            <stop offset="0%" stopColor={isListening ? "#f9a8d4" : "#7dd3fc"}/>
            <stop offset="100%" stopColor={isListening ? "#ec4899" : "#0284c7"}/>
          </radialGradient>
          <radialGradient id="cheek" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff80b5" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#ff4da6" stopOpacity="0.2"/>
          </radialGradient>
        </defs>
        <ellipse cx="38" cy="95" rx="20" ry="4" fill="rgba(200,0,80,0.18)"/>
        <circle cx="10" cy="36" r="7" fill="url(#pinkDark)" stroke="#880033" strokeWidth="0.8"/>
        <circle cx="10" cy="36" r="4" fill="url(#pinkHead)"/>
        <circle cx="66" cy="36" r="7" fill="url(#pinkDark)" stroke="#880033" strokeWidth="0.8"/>
        <circle cx="66" cy="36" r="4" fill="url(#pinkHead)"/>
        <ellipse cx="38" cy="32" rx="24" ry="22" fill="url(#pinkHead)" stroke="#cc0066" strokeWidth="0.8"/>
        <ellipse cx="30" cy="18" rx="9" ry="5" fill="white" opacity="0.35" transform="rotate(-20 30 18)"/>
        <ellipse cx="28" cy="33" rx="7" ry={blink ? 0.5 : 9} fill="#0a0020"/>
        <ellipse cx="48" cy="33" rx="7" ry={blink ? 0.5 : 9} fill="#0a0020"/>
        {!blink && <>
          <ellipse cx="28" cy="34" rx="5.5" ry="7" fill="url(#eyeBlue)"/>
          <ellipse cx="48" cy="34" rx="5.5" ry="7" fill="url(#eyeBlue)"/>
          <circle cx="25" cy="29" r="2.5" fill="white" opacity="0.95"/>
          <circle cx="45" cy="29" r="2.5" fill="white" opacity="0.95"/>
          <circle cx="31" cy="37" r="1.2" fill="white" opacity="0.6"/>
          <circle cx="51" cy="37" r="1.2" fill="white" opacity="0.6"/>
        </>}
        {mood === 'thinking'
          ? <><path d="M21 22 Q28 19 34 22" stroke="#880044" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
             <path d="M42 22 Q48 19 55 22" stroke="#880044" strokeWidth="1.8" fill="none" strokeLinecap="round"/></>
          : <><path d="M21 23 Q28 21 34 23" stroke="#880044" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
             <path d="M42 23 Q48 21 55 23" stroke="#880044" strokeWidth="1.5" fill="none" strokeLinecap="round"/></>
        }
        <ellipse cx="17" cy="40" rx="6" ry="4" fill="url(#cheek)"/>
        <ellipse cx="59" cy="40" rx="6" ry="4" fill="url(#cheek)"/>
        {isSpeaking
          ? <ellipse cx="38" cy="47" rx="6" ry="3.5" fill="#880033" stroke="#cc0055" strokeWidth="0.5"/>
          : mood === 'thinking'
          ? <path d="M32 47 Q38 45 44 47" stroke="#880033" strokeWidth="2" fill="none" strokeLinecap="round"/>
          : <path d="M31 46 Q38 52 45 46" stroke="#880033" strokeWidth="2" fill="none" strokeLinecap="round"/>
        }
        <rect x="32" y="53" width="12" height="6" rx="3" fill="url(#pinkDark)" stroke="#880033" strokeWidth="0.5"/>
        <ellipse cx="38" cy="74" rx="20" ry="22" fill="url(#pinkBody)" stroke="#cc0066" strokeWidth="0.8"/>
        <ellipse cx="29" cy="63" rx="7" ry="5" fill="white" opacity="0.3" transform="rotate(-15 29 63)"/>
        <path d="M33 70 C33 67.5 30 67 30 70 C30 72.5 33 74.5 38 77 C43 74.5 46 72.5 46 70 C46 67 43 67.5 43 70 C43 67.5 38 65 33 70Z"
          fill={isListening ? "#ffccdd" : isSpeaking ? "#ff80b5" : "#ff4d8888"} stroke="#cc005555" strokeWidth="0.5"/>
        <ellipse cx="14" cy="70" rx="6" ry="13" fill="url(#pinkBody)" stroke="#cc0066" strokeWidth="0.7" transform={armSwing}/>
        <circle cx="12" cy="82" r="6" fill="url(#pinkDark)" stroke="#880033" strokeWidth="0.7"/>
        <circle cx="12" cy="82" r="3" fill="url(#pinkBody)"/>
        <ellipse cx="62" cy="68" rx="6" ry="13" fill="url(#pinkBody)" stroke="#cc0066" strokeWidth="0.7"
          transform={isSpeaking ? "rotate(30 62 68)" : "rotate(15 62 68)"}/>
        <circle cx="66" cy="80" r="6" fill="url(#pinkDark)" stroke="#880033" strokeWidth="0.7"/>
        <circle cx="66" cy="80" r="3" fill="url(#pinkBody)"/>
        <rect x="25" y="92" width="11" height="6" rx="5.5" fill="url(#pinkDark)" stroke="#880033" strokeWidth="0.7"/>
        <rect x="40" y="92" width="11" height="6" rx="5.5" fill="url(#pinkDark)" stroke="#880033" strokeWidth="0.7"/>
        <ellipse cx="30.5" cy="97" rx="9" ry="4" fill="url(#pinkDark)" stroke="#880033" strokeWidth="0.7"/>
        <ellipse cx="45.5" cy="97" rx="9" ry="4" fill="url(#pinkDark)" stroke="#880033" strokeWidth="0.7"/>
      </svg>
    );
  };

  const bubbleLeft = pos.x > window.innerWidth / 2;

  return (
    <>
      <input type="file" ref={fileInputRef} accept=".pdf" style={{ display: 'none' }}
        onChange={(e) => { if (e.target.files[0]) speak(`Got your resume ${e.target.files[0].name}! Go to Resume Analyzer and click Analyze!`); }}
      />

      <div style={{ position: 'fixed', left: pos.x, top: pos.y, zIndex: 9999, userSelect: 'none', touchAction: 'none' }}>

        {speechBubble && (
          <div style={{
            position: 'absolute', bottom: '105px',
            [bubbleLeft ? 'right' : 'left']: '-5px',
            backgroundColor: 'white', borderRadius: '20px',
            padding: '10px 14px', maxWidth: '210px', minWidth: '90px',
            boxShadow: '0 4px 20px rgba(255,77,148,0.25)',
            border: '1.5px solid #ffb3d9',
            pointerEvents: 'none', zIndex: 2
          }}>
            <p style={{ color: '#880033', fontSize: '0.78rem', lineHeight: '1.5', margin: 0, fontWeight: '500' }}>
              {speechBubble.substring(0, 120)}{speechBubble.length > 120 ? '...' : ''}
            </p>
            <div style={{
              position: 'absolute', bottom: '-9px',
              [bubbleLeft ? 'right' : 'left']: '28px',
              width: 0, height: 0,
              borderLeft: '9px solid transparent', borderRight: '9px solid transparent',
              borderTop: '9px solid #ffb3d9'
            }}/>
            <div style={{
              position: 'absolute', bottom: '-7px',
              [bubbleLeft ? 'right' : 'left']: '29px',
              width: 0, height: 0,
              borderLeft: '8px solid transparent', borderRight: '8px solid transparent',
              borderTop: '8px solid white'
            }}/>
          </div>
        )}

        {isListening && transcript && (
          <div style={{
            position: 'absolute', bottom: '170px',
            [bubbleLeft ? 'right' : 'left']: '0px',
            backgroundColor: '#fff0f8', borderRadius: '12px',
            padding: '6px 12px', maxWidth: '180px',
            border: '1px solid #ffb3d9', fontSize: '0.72rem', color: '#880033',
            pointerEvents: 'none'
          }}>🎙️ {transcript}</div>
        )}

        {/* Robot */}
        <div
          onMouseDown={onMouseDown}
          style={{
            cursor: isDragging ? 'grabbing' : 'pointer',
            animation: isSpeaking ? 'robotTalk 0.3s ease-in-out infinite' : moving ? 'robotWalk 0.5s ease-in-out infinite' : 'robotBob 2.5s ease-in-out infinite',
            display: 'inline-block'
          }}>
          <Robot />
        </div>

        {isOpen && (
          <div className="panel" style={{ marginTop: '6px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
            <button onClick={isListening ? stopListening : startListening}
              style={{
                width: '46px', height: '46px', borderRadius: '50%',
                backgroundColor: isListening ? '#dc2626' : '#ff4da6',
                color: 'white', border: 'none', cursor: 'pointer', fontSize: '1.1rem',
                boxShadow: isListening ? '0 0 20px rgba(220,38,38,0.6)' : '0 0 16px rgba(255,77,148,0.6)',
              }}>
              {isListening ? '⏹' : '🎙️'}
            </button>
            <div style={{
              backgroundColor: 'white', borderRadius: '16px', padding: '10px 12px',
              boxShadow: '0 4px 20px rgba(255,77,148,0.2)', border: '1.5px solid #ffb3d9',
              width: '200px'
            }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
                {['Resume', 'Mentors', 'Prep Hub', 'Upload CV', 'Help'].map(cmd => (
                  <button key={cmd} onClick={() => handleCommand(cmd)}
                    style={{ backgroundColor: '#fff0f8', color: '#cc0066', border: '1px solid #ffb3d9', borderRadius: '10px', padding: '3px 9px', fontSize: '0.68rem', cursor: 'pointer' }}>
                    {cmd}
                  </button>
                ))}
              </div>
              {messages.length > 0 && (
                <div style={{ maxHeight: '80px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  {messages.slice(-3).map((msg, i) => (
                    <div key={i} style={{ fontSize: '0.68rem', textAlign: msg.from === 'user' ? 'right' : 'left' }}>
                      <span style={{ backgroundColor: msg.from === 'user' ? '#ffe0ef' : '#fff8fb', color: msg.from === 'user' ? '#880033' : '#cc0066', padding: '2px 7px', borderRadius: '8px', display: 'inline-block' }}>
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
        @keyframes robotBob { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-7px) rotate(1deg)} }
        @keyframes robotWalk { 0%,100%{transform:translateY(0) rotate(-2deg)} 50%{transform:translateY(-5px) rotate(2deg)} }
        @keyframes robotTalk { 0%,100%{transform:scale(1)} 50%{transform:scale(1.04)} }
        @keyframes bubblePop { from{transform:scale(0.7) translateY(8px);opacity:0} to{transform:scale(1) translateY(0);opacity:1} }
      `}</style>
    </>
  );
}

export default VoiceBot;