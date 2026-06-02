import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function VoiceBot() {
  const [corner, setCorner] = useState(3); // 0=TL 1=TR 2=BL 3=BR
  const [active, setActive] = useState(false);      // wake word detected
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [bubble, setBubble] = useState('');
  const [glow, setGlow] = useState(false);
  const [messages, setMessages] = useState([]);
  const [blink, setBlink] = useState(false);
  const [transcript, setTranscript] = useState('');

  const wakeListenerRef = useRef(null);
  const commandListenerRef = useRef(null);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const isActiveRef = useRef(false);
  const isSpeakingRef = useRef(false);
  const cornerTimerRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  isActiveRef.current = active;
  isSpeakingRef.current = isSpeaking;

  const corners = [
    { top: '20px', left: '20px' },
    { top: '20px', right: '20px' },
    { bottom: '20px', left: '20px' },
    { bottom: '20px', right: '20px' },
  ];

  const pageNames = {
    '/': 'Home page', '/prep-hub': 'Prep Hub', '/resume': 'Resume Analyzer',
    '/mentors': 'Mentor Connect', '/doubt-solver': 'Doubt Solver',
    '/roadmap': 'Roadmap', '/login': 'Login', '/register': 'Register'
  };

  // Move corner every 3 minutes
  useEffect(() => {
    cornerTimerRef.current = setInterval(() => {
      if (!isActiveRef.current) {
        setCorner(c => (c + 1) % 4);
      }
    }, 3 * 60 * 1000);
    return () => clearInterval(cornerTimerRef.current);
  }, []);

  // Eye blink
  useEffect(() => {
    const t = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 120);
    }, 3500);
    return () => clearInterval(t);
  }, []);

  // Get best voice
  const getVoice = useCallback(() => {
    const voices = window.speechSynthesis.getVoices();
    const preferred = [
      'Google UK English Female',
      'Microsoft Zira - English (United States)',
      'Samantha', 'Karen', 'Moira', 'Tessa',
      'Google US English'
    ];
    return preferred.reduce((f, n) => f || voices.find(v => v.name.includes(n)), null);
  }, []);

  // SPEAK - clear, slow, sentence by sentence
  const speak = useCallback((text, onDone) => {
    if (!text) { if (onDone) onDone(); return; }
    window.speechSynthesis.cancel();
    setIsSpeaking(true);
    setBubble(text);

    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    let i = 0;

    const next = () => {
      if (i >= sentences.length) {
        setIsSpeaking(false);
        if (onDone) onDone();
        return;
      }
      const s = sentences[i].trim();
      if (!s) { i++; next(); return; }
      const utt = new SpeechSynthesisUtterance(s);
      utt.rate = 0.85;
      utt.pitch = 1.2;
      utt.volume = 1;
      const v = getVoice();
      if (v) utt.voice = v;
      utt.onend = () => { i++; setTimeout(next, 80); };
      utt.onerror = () => { i++; next(); };
      window.speechSynthesis.speak(utt);
    };

    if (!window.speechSynthesis.getVoices().length) {
      window.speechSynthesis.onvoiceschanged = next;
    } else next();

    setMessages(prev => [...prev, { from: 'bot', text }]);
  }, [getVoice]);

  // COMMAND listener - one shot
  const listenForCommand = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) return;
    if (commandListenerRef.current) {
      try { commandListenerRef.current.abort(); } catch(e) {}
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const r = new SR();
    commandListenerRef.current = r;
    r.continuous = false;
    r.interimResults = true;
    r.lang = 'en-IN';
    r.maxAlternatives = 1;

    r.onstart = () => { setIsListening(true); setTranscript(''); };
    r.onresult = (e) => {
      let final = '', interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) final += e.results[i][0].transcript;
        else interim += e.results[i][0].transcript;
      }
      if (interim) setTranscript(interim);
      if (final.trim()) {
        setTranscript(final.trim());
        setIsListening(false);
        try { r.stop(); } catch(e) {}
        setMessages(prev => [...prev, { from: 'user', text: final.trim() }]);
        processCommand(final.trim());
      }
    };
    r.onerror = () => { setIsListening(false); };
    r.onend = () => setIsListening(false);
    try { r.start(); } catch(e) { setIsListening(false); }
  }, []);

  // WAKE WORD listener - always running in background
  const startWakeListener = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) return;
    if (wakeListenerRef.current) {
      try { wakeListenerRef.current.abort(); } catch(e) {}
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const r = new SR();
    wakeListenerRef.current = r;
    r.continuous = true;
    r.interimResults = true;
    r.lang = 'en-IN';

    r.onresult = (e) => {
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript.toLowerCase();
        if (
          t.includes('hey campbot') || t.includes('hi campbot') ||
          t.includes('hey camp') || t.includes('campbot') ||
          t.includes('are you there') || t.includes('hello bot') ||
          t.includes('hey bot')
        ) {
          // Wake word detected!
          triggerWake();
          try { r.stop(); } catch(e) {}
          return;
        }
      }
    };
    r.onend = () => {
      // Restart wake listener if not active
      if (!isActiveRef.current) {
        setTimeout(() => startWakeListener(), 500);
      }
    };
    r.onerror = () => {
      setTimeout(() => {
        if (!isActiveRef.current) startWakeListener();
      }, 2000);
    };
    try { r.start(); } catch(e) {}
  }, []);

  const triggerWake = useCallback(() => {
    setActive(true);
    setGlow(true);
    window.speechSynthesis.cancel();
    speak("Hey! I am CampBot! I am here for you! What can I help you with?", () => {
      listenForCommand();
    });
  }, [speak, listenForCommand]);

  // processCommand ref to avoid stale closures
  const processCommandRef = useRef(null);

  const processCommand = useCallback(async (command) => {
    const cmd = command.toLowerCase().trim();

    const nav = (path, msg) => {
      navigate(path);
      speak(msg, () => {
        setTimeout(() => listenForCommand(), 500);
      });
    };

    if (cmd.includes('home')) { nav('/', "Taking you home!"); return; }
    if (cmd.includes('prep hub') || cmd.includes('prep')) { nav('/prep-hub', "Opening Prep Hub!"); return; }
    if (cmd.includes('roadmap')) { nav('/roadmap', "Opening Roadmap!"); return; }
    if (cmd.includes('resume') && !cmd.includes('upload')) { nav('/resume', "Opening Resume Analyzer!"); return; }
    if (cmd.includes('mentor')) { nav('/mentors', "Opening Mentor Connect!"); return; }
    if (cmd.includes('doubt') || cmd.includes('solver')) { nav('/doubt-solver', "Opening Doubt Solver!"); return; }
    if (cmd.includes('login')) { nav('/login', "Taking you to login!"); return; }
    if (cmd.includes('stop') || cmd.includes('bye') || cmd.includes('goodbye') || cmd.includes('close')) {
      setGlow(false);
      speak("Goodbye! Say hey CampBot when you need me!", () => {
        setActive(false);
        setBubble('');
        setTimeout(() => startWakeListener(), 1000);
      });
      return;
    }
    if (cmd.includes('upload') || cmd.includes('my resume')) {
      if (location.pathname !== '/resume') {
        navigate('/resume');
        speak("Going to Resume Analyzer!", () => setTimeout(() => fileInputRef.current?.click(), 2000));
      } else {
        speak("Opening file picker!");
        setTimeout(() => fileInputRef.current?.click(), 500);
      }
      return;
    }

    // AI answer
    speak("Let me check that for you!");
    try {
      const res = await fetch('https://campusconnect-b7wn.onrender.com/api/resume/doubt-solver', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMessage: command })
      });
      const data = await res.json();
      const reply = (data.reply || "Sorry, I could not get an answer.").substring(0, 400);
      speak(reply, () => setTimeout(() => listenForCommand(), 600));
    } catch {
      speak("Could not connect. Try again!", () => setTimeout(() => listenForCommand(), 600));
    }
  }, [navigate, location.pathname, speak, listenForCommand, startWakeListener]);

  processCommandRef.current = processCommand;

  // Start wake listener on mount
  useEffect(() => {
    const timer = setTimeout(() => startWakeListener(), 2000);
    return () => {
      clearTimeout(timer);
      if (wakeListenerRef.current) { try { wakeListenerRef.current.abort(); } catch(e) {} }
      if (commandListenerRef.current) { try { commandListenerRef.current.abort(); } catch(e) {} }
      window.speechSynthesis.cancel();
    };
  }, []);

  // Screen glow colors cycle when active
  const glowColors = ['rgba(74,222,128,0.15)', 'rgba(255,105,180,0.15)', 'rgba(96,165,250,0.15)', 'rgba(251,191,36,0.12)'];
  const [glowIdx, setGlowIdx] = useState(0);
  useEffect(() => {
    if (!glow) return;
    const t = setInterval(() => setGlowIdx(i => (i + 1) % glowColors.length), 600);
    return () => clearInterval(t);
  }, [glow]);

  // Robot HEAD only SVG
  const RobotHead = ({ size = 70 }) => (
    <svg width={size} height={size * 0.85} viewBox="0 0 82 70" fill="none"
      style={{ filter: `drop-shadow(0 6px 16px rgba(255,105,180,${glow ? '0.8' : '0.4'})) drop-shadow(0 2px 6px rgba(0,0,0,0.3))`, transition: 'filter 0.3s' }}>
      <defs>
        <radialGradient id="wHead" cx="38%" cy="28%" r="62%">
          <stop offset="0%" stopColor="#ffffff"/>
          <stop offset="60%" stopColor="#f0f0f5"/>
          <stop offset="100%" stopColor="#d0d0e0"/>
        </radialGradient>
        <radialGradient id="pEar" cx="40%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#ffadd6"/>
          <stop offset="100%" stopColor="#ff69b4"/>
        </radialGradient>
        <radialGradient id="bEye" cx="38%" cy="32%" r="58%">
          <stop offset="0%" stopColor="#2a2a3a"/>
          <stop offset="100%" stopColor="#0a0a14"/>
        </radialGradient>
        {glow && (
          <filter id="headGlow">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        )}
      </defs>

      {/* Ears */}
      <circle cx="8" cy="35" r="9" fill="url(#pEar)" stroke="#ff69b4" strokeWidth="0.8"/>
      <circle cx="8" cy="35" r="5" fill="#ffcce8"/>
      <circle cx="74" cy="35" r="9" fill="url(#pEar)" stroke="#ff69b4" strokeWidth="0.8"/>
      <circle cx="74" cy="35" r="5" fill="#ffcce8"/>

      {/* Head */}
      <ellipse cx="41" cy="33" rx="28" ry="27" fill="url(#wHead)" stroke="#e0e0ee" strokeWidth="0.8"
        filter={glow ? "url(#headGlow)" : "none"}/>
      {/* Shine */}
      <ellipse cx="30" cy="15" rx="12" ry="6" fill="white" opacity="0.45" transform="rotate(-20 30 15)"/>

      {/* Eyes */}
      <ellipse cx="29" cy="33" rx="9" ry={blink ? 0.6 : 10} fill="url(#bEye)"/>
      <ellipse cx="53" cy="33" rx="9" ry={blink ? 0.6 : 10} fill="url(#bEye)"/>
      {!blink && <>
        {/* Eye color when active */}
        {active && <>
          <ellipse cx="29" cy="34" rx="6" ry="7" fill={isSpeaking ? "#ff69b4" : isListening ? "#4ade80" : "#60a5fa"} opacity="0.7"/>
          <ellipse cx="53" cy="34" rx="6" ry="7" fill={isSpeaking ? "#ff69b4" : isListening ? "#4ade80" : "#60a5fa"} opacity="0.7"/>
        </>}
        <circle cx="25" cy="27" r="3.5" fill="white" opacity="0.95"/>
        <circle cx="49" cy="27" r="3.5" fill="white" opacity="0.95"/>
        <circle cx="34" cy="38" r="1.5" fill="white" opacity="0.5"/>
        <circle cx="58" cy="38" r="1.5" fill="white" opacity="0.5"/>
      </>}

      {/* Mouth */}
      {isSpeaking
        ? <ellipse cx="41" cy="52" rx="7" ry="4" fill="#1a1a2e" stroke="#ff69b4" strokeWidth="0.5"/>
        : isListening
        ? <path d="M33 51 Q41 56 49 51" stroke="#4ade80" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        : active
        ? <path d="M32 50 Q41 57 50 50" stroke="#ff69b4" strokeWidth="2" fill="none" strokeLinecap="round"/>
        : <path d="M33 51 Q41 56 49 51" stroke="#aaaacc" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      }

      {/* Listening pulse dots */}
      {isListening && <>
        <circle cx="29" cy="62" r="3" fill="#4ade80" opacity="0.9"/>
        <circle cx="41" cy="65" r="3" fill="#4ade80" opacity="0.7"/>
        <circle cx="53" cy="62" r="3" fill="#4ade80" opacity="0.9"/>
      </>}
    </svg>
  );

  const cornerStyle = corners[corner];

  return (
    <>
      <input type="file" ref={fileInputRef} accept=".pdf" style={{ display: 'none' }}
        onChange={(e) => { if (e.target.files[0]) speak(`Got resume ${e.target.files[0].name}!`); }}
      />

      {/* Full screen glow - like Siri */}
      {glow && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9990, pointerEvents: 'none',
          backgroundColor: glowColors[glowIdx],
          transition: 'background-color 0.6s ease',
          animation: 'glowPulse 1.2s ease-in-out infinite'
        }}/>
      )}

      {/* Screen border glow */}
      {glow && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9991, pointerEvents: 'none',
          border: `3px solid ${isSpeaking ? '#ff69b4' : isListening ? '#4ade80' : '#60a5fa'}`,
          borderRadius: '0px',
          boxShadow: `inset 0 0 40px ${isSpeaking ? 'rgba(255,105,180,0.4)' : isListening ? 'rgba(74,222,128,0.4)' : 'rgba(96,165,250,0.3)'}`,
          transition: 'all 0.4s ease',
          animation: 'borderPulse 1s ease-in-out infinite'
        }}/>
      )}

      {/* CampBot head in corner */}
      <div style={{
        position: 'fixed', ...cornerStyle, zIndex: 9999,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
        transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}>

        {/* Speech bubble above head */}
        {active && bubble && (
          <div style={{
            backgroundColor: 'white', borderRadius: '16px',
            padding: '10px 14px', maxWidth: '220px', minWidth: '110px',
            boxShadow: '0 4px 20px rgba(255,105,180,0.35)',
            border: `2px solid ${isListening ? '#4ade80' : isSpeaking ? '#ff69b4' : '#ffb3d9'}`,
            textAlign: 'center', pointerEvents: 'none',
            animation: 'bubbleIn 0.3s cubic-bezier(0.34,1.56,0.64,1)'
          }}>
            <p style={{ color: '#880044', fontSize: '0.75rem', lineHeight: '1.5', margin: 0, fontWeight: '600' }}>
              {isListening
                ? (transcript ? `🎙️ "${transcript.substring(0, 50)}"` : '👂 Listening...')
                : bubble.substring(0, 100)
              }
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '6px', gap: '4px' }}>
              {isListening && [1,2,3,4,5].map(i => (
                <div key={i} style={{ width: '4px', height: `${8 + Math.random() * 12}px`, backgroundColor: '#4ade80', borderRadius: '2px', animation: `soundBar 0.5s ease-in-out ${i * 0.1}s infinite alternate` }}/>
              ))}
            </div>
          </div>
        )}

        {/* Wake word hint when idle */}
        {!active && (
          <div style={{
            backgroundColor: 'rgba(15,23,42,0.85)', borderRadius: '10px',
            padding: '4px 10px', border: '1px solid #ff69b444',
            pointerEvents: 'none', whiteSpace: 'nowrap'
          }}>
            <p style={{ color: '#ff69b4', fontSize: '0.65rem', margin: 0, fontWeight: '600' }}>
              Say "Hey CampBot"
            </p>
          </div>
        )}

        {/* Robot head */}
        <div
          onClick={() => {
            if (!active) triggerWake();
            else {
              setGlow(false);
              setActive(false);
              setBubble('');
              window.speechSynthesis.cancel();
              if (commandListenerRef.current) { try { commandListenerRef.current.abort(); } catch(e) {} }
              setIsListening(false);
              setTimeout(() => startWakeListener(), 1000);
            }
          }}
          style={{
            cursor: 'pointer',
            animation: active ? (isSpeaking ? 'botTalk 0.4s ease-in-out infinite' : 'botActive 2s ease-in-out infinite') : 'botIdle 4s ease-in-out infinite',
            filter: active ? `drop-shadow(0 0 20px ${isSpeaking ? '#ff69b4' : isListening ? '#4ade80' : '#60a5fa'})` : 'none',
            transition: 'filter 0.3s'
          }}>
          <RobotHead size={active ? 80 : 65} />
        </div>

        {/* Mic button when active */}
        {active && (
          <button
            onClick={() => {
              if (isListening) {
                if (commandListenerRef.current) { try { commandListenerRef.current.abort(); } catch(e) {} }
                setIsListening(false);
              } else {
                window.speechSynthesis.cancel();
                setIsSpeaking(false);
                listenForCommand();
              }
            }}
            style={{
              width: '44px', height: '44px', borderRadius: '50%',
              backgroundColor: isListening ? '#dc2626' : '#ff69b4',
              color: 'white', border: 'none', cursor: 'pointer', fontSize: '1.1rem',
              boxShadow: isListening ? '0 0 20px rgba(220,38,38,0.8)' : '0 0 16px rgba(255,105,180,0.7)',
              animation: isListening ? 'micPulse 1s ease-in-out infinite' : 'none'
            }}>
            {isListening ? '⏹' : '🎙️'}
          </button>
        )}

        {/* Quick commands when active */}
        {active && (
          <div style={{
            backgroundColor: 'rgba(15,23,42,0.95)', borderRadius: '14px',
            padding: '8px 10px', border: '1px solid #ff69b444',
            display: 'flex', flexWrap: 'wrap', gap: '4px', maxWidth: '200px',
            justifyContent: 'center'
          }}>
            {['Resume', 'Mentors', 'Prep Hub', 'Roadmap', 'Doubt Solver'].map(cmd => (
              <button key={cmd}
                onClick={() => { window.speechSynthesis.cancel(); setIsSpeaking(false); processCommandRef.current(cmd); }}
                style={{ backgroundColor: '#1e293b', color: '#ff69b4', border: '1px solid #ff69b433', borderRadius: '8px', padding: '3px 8px', fontSize: '0.65rem', cursor: 'pointer' }}>
                {cmd}
              </button>
            ))}
          </div>
        )}

        {/* Chat history */}
        {active && messages.length > 0 && (
          <div style={{
            backgroundColor: 'rgba(15,23,42,0.95)', borderRadius: '14px',
            padding: '8px', maxWidth: '210px', maxHeight: '100px',
            overflowY: 'auto', border: '1px solid #ff69b433',
            display: 'flex', flexDirection: 'column', gap: '3px'
          }}>
            {messages.slice(-4).map((msg, i) => (
              <div key={i} style={{ fontSize: '0.65rem', textAlign: msg.from === 'user' ? 'right' : 'left' }}>
                <span style={{
                  backgroundColor: msg.from === 'user' ? '#1e3a5f' : '#1e293b',
                  color: msg.from === 'user' ? '#93c5fd' : '#ffb3d9',
                  padding: '2px 8px', borderRadius: '8px', display: 'inline-block', maxWidth: '180px'
                }}>
                  {msg.text.substring(0, 60)}{msg.text.length > 60 ? '…' : ''}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef}/>
          </div>
        )}
      </div>

      <style>{`
        @keyframes botIdle { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-5px) rotate(2deg)} }
        @keyframes botActive { 0%,100%{transform:scale(1) rotate(-2deg)} 50%{transform:scale(1.05) rotate(2deg)} }
        @keyframes botTalk { 0%,100%{transform:scale(1)} 50%{transform:scale(1.08)} }
        @keyframes micPulse { 0%,100%{box-shadow:0 0 20px rgba(220,38,38,0.8)} 50%{box-shadow:0 0 35px rgba(220,38,38,1)} }
        @keyframes glowPulse { 0%,100%{opacity:0.7} 50%{opacity:1} }
        @keyframes borderPulse { 0%,100%{opacity:0.6} 50%{opacity:1} }
        @keyframes bubbleIn { from{transform:scale(0.8) translateY(8px);opacity:0} to{transform:scale(1) translateY(0);opacity:1} }
        @keyframes soundBar { from{transform:scaleY(0.5)} to{transform:scaleY(1.5)} }
      `}</style>
    </>
  );
}

export default VoiceBot;