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
  const [wave, setWave] = useState(false);
  const [pos, setPos] = useState({ x: window.innerWidth - 140, y: window.innerHeight - 200 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [targetPos, setTargetPos] = useState({ x: window.innerWidth - 140, y: window.innerHeight - 200 });
  const [moving, setMoving] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const dragMovedRef = useRef(false);
  const recognitionRef = useRef(null);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const posRef = useRef(pos);
  const isDraggingRef = useRef(false);
  const isOpenRef = useRef(false);
  const isSpeakingRef = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();

  posRef.current = pos;
  isDraggingRef.current = isDragging;
  isOpenRef.current = isOpen;
  isSpeakingRef.current = isSpeaking;

  const pageNames = {
    '/': 'Home page', '/prep-hub': 'Prep Hub', '/resume': 'Resume Analyzer',
    '/mentors': 'Mentor Connect', '/doubt-solver': 'Doubt Solver',
    '/login': 'Login page', '/register': 'Register page'
  };

  useEffect(() => {
    const t = setInterval(() => { setWave(true); setTimeout(() => setWave(false), 800); }, 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (isOpen) return;
    const pickTarget = () => {
      if (isDraggingRef.current) return;
      const margin = 120;
      setTargetPos({
        x: margin + Math.random() * (window.innerWidth - margin * 2),
        y: margin + Math.random() * (window.innerHeight - margin * 2)
      });
      setMoving(true);
      setTimeout(() => setMoving(false), 8000);
    };
    const interval = setInterval(pickTarget, 3 * 60 * 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

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

  useEffect(() => {
    const t = setInterval(() => { setBlink(true); setTimeout(() => setBlink(false), 120); }, 3500);
    return () => clearInterval(t);
  }, []);

  const onMouseDown = (e) => {
    if (e.target.closest('button') || e.target.closest('.campbot-panel')) return;
    dragMovedRef.current = false;
    setIsDragging(true);
    setDragOffset({ x: e.clientX - posRef.current.x, y: e.clientY - posRef.current.y });
    e.preventDefault();
  };

  useEffect(() => {
    const onMove = (e) => {
      if (!isDraggingRef.current) return;
      dragMovedRef.current = true;
      setPos({
        x: Math.max(0, Math.min(window.innerWidth - 90, e.clientX - dragOffset.x)),
        y: Math.max(0, Math.min(window.innerHeight - 110, e.clientY - dragOffset.y))
      });
    };
    const onUp = () => {
      if (isDraggingRef.current) {
        setIsDragging(false);
        setTargetPos(posRef.current);
        if (!dragMovedRef.current) setIsOpen(o => !o);
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

  const speak = (text, onDone) => {
    if (!text) return;
    window.speechSynthesis.cancel();
    setSpeechBubble(text);
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    let idx = 0;

    const speakNext = () => {
      if (idx >= sentences.length) {
        setIsSpeaking(false);
        if (onDone) onDone();
        return;
      }
      const utt = new SpeechSynthesisUtterance(sentences[idx].trim());
      utt.rate = 0.88; utt.pitch = 1.35; utt.volume = 1;
      const voices = window.speechSynthesis.getVoices();
      const pick = ['Google UK English Female','Samantha','Karen','Moira','Veena','Tessa','Microsoft Zira','Google US English'];
      const v = pick.reduce((f, n) => f || voices.find(x => x.name.includes(n)), null);
      if (v) utt.voice = v;
      utt.onstart = () => setIsSpeaking(true);
      utt.onend = () => { idx++; setTimeout(speakNext, 80); };
      utt.onerror = () => { idx++; speakNext(); };
      window.speechSynthesis.speak(utt);
    };

    if (!window.speechSynthesis.getVoices().length) {
      window.speechSynthesis.onvoiceschanged = () => speakNext();
    } else { speakNext(); }
    addMessage('bot', text);
  };

  // KEY FIX: Stop bot speaking immediately when user wants to talk
  const startContinuousListening = () => {
    // IMMEDIATELY stop any speaking
    window.speechSynthesis.cancel();
    setIsSpeaking(false);

    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      speak("Please use Google Chrome for voice support!"); return;
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const r = new SR();
    recognitionRef.current = r;
    r.continuous = false; r.interimResults = true; r.lang = 'en-IN';

    r.onstart = () => { setIsListening(true); setTranscript(''); setSpeechBubble('Listening keenly... 👂'); };
    r.onresult = (e) => {
      const c = e.results[e.results.length - 1];
      setTranscript(c[0].transcript);
      if (c.isFinal) { setIsListening(false); handleCommand(c[0].transcript); }
    };
    r.onerror = () => {
      setIsListening(false);
      setSpeechBubble('Could not hear. Try again! 🎙️');
      if (isOpenRef.current) setTimeout(() => startContinuousListening(), 2000);
    };
    r.onend = () => setIsListening(false);
    r.start();
  };

  const stopListening = () => {
    // Stop listening and also stop speaking
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    if (recognitionRef.current) { try { recognitionRef.current.stop(); } catch(e) {} }
    setIsListening(false);
    setSpeechBubble('Click mic to talk! 🎙️');
  };

  useEffect(() => {
    if (isOpen) {
      const page = pageNames[location.pathname] || 'this page';
      setConversationHistory([]);
      setTimeout(() => {
        speak(
          `Hi there! I am CampBot! You are on the ${page}. Click the mic button and talk to me! I will listen carefully and help you navigate, answer questions, or anything you need!`,
          () => setTimeout(() => startContinuousListening(), 600)
        );
      }, 400);
    } else {
      window.speechSynthesis.cancel();
      setSpeechBubble('Click me! 👋');
      if (recognitionRef.current) { try { recognitionRef.current.stop(); } catch(e) {} }
      setIsListening(false);
      setIsSpeaking(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      speak(`You are now on ${pageNames[location.pathname] || 'this page'}!`,
        () => setTimeout(() => startContinuousListening(), 600));
    }
  }, [location.pathname]);

  const handleCommand = async (command) => {
    const cmd = command.toLowerCase();
    addMessage('user', command);
    setSpeechBubble(`You said: "${command.substring(0, 40)}..."`);
    const newHistory = [...conversationHistory, { role: 'user', content: command }];
    setConversationHistory(newHistory);

    const nav = (path, msg) => {
      navigate(path);
      speak(msg, () => setTimeout(() => startContinuousListening(), 600));
    };

    if (cmd.includes('home')) { nav('/', "Taking you home!"); return; }
    if (cmd.includes('prep hub') || cmd.includes('prep') || cmd.includes('practice')) { nav('/prep-hub', "Opening Prep Hub! DSA, aptitude and HR questions await!"); return; }
    if (cmd.includes('resume') && !cmd.includes('upload') && !cmd.includes('my resume')) { nav('/resume', "Opening Resume Analyzer! Upload your PDF for AI feedback!"); return; }
    if (cmd.includes('mentor')) { nav('/mentors', "Opening Mentor Connect! Talk to placed seniors!"); return; }
    if (cmd.includes('doubt') || cmd.includes('solver')) { nav('/doubt-solver', "Opening Doubt Solver!"); return; }
    if (cmd.includes('login')) { nav('/login', "Taking you to login!"); return; }
    if (cmd.includes('register')) { nav('/register', "Taking you to register!"); return; }
    if (cmd.includes('upload') || cmd.includes('my resume') || cmd.includes('add resume')) {
      if (location.pathname !== '/resume') {
        navigate('/resume');
        speak("Going to Resume page! Opening file picker shortly!", () => setTimeout(() => fileInputRef.current?.click(), 2000));
      } else { speak("Opening file picker!", () => setTimeout(() => fileInputRef.current?.click(), 500)); }
      return;
    }
    if (cmd.includes('stop') || cmd.includes('bye') || cmd.includes('close') || cmd.includes('goodbye')) {
      speak("Goodbye! Best of luck! You are going to do amazing!", () => setTimeout(() => setIsOpen(false), 500));
      return;
    }
    if (cmd.includes('what can you do') || cmd.includes('help')) {
      speak("I can navigate pages, answer any question, help upload your resume, and chat about anything! I am like ChatGPT plus your campus guide!", () => setTimeout(() => startContinuousListening(), 600));
      return;
    }

    speak("Got it! Let me find the answer for you!");
    try {
      const res = await fetch('https://campusconnect-b7wn.onrender.com/api/resume/doubt-solver', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMessage: command })
      });
      const data = await res.json();
      const reply = (data.reply || "Sorry, could not get an answer!").substring(0, 500);
      setConversationHistory([...newHistory, { role: 'assistant', content: reply }]);
      speak(reply, () => {
        setTimeout(() => {
          speak("Any more questions? I am listening!", () => setTimeout(() => startContinuousListening(), 500));
        }, 300);
      });
    } catch {
      speak("Could not connect right now! Try asking me to navigate somewhere!", () => setTimeout(() => startContinuousListening(), 600));
    }
  };

  const Robot = () => (
    <svg width="82" height="108" viewBox="0 0 82 108" fill="none"
      style={{ filter: 'drop-shadow(0 10px 24px rgba(255,105,180,0.45)) drop-shadow(0 3px 8px rgba(0,0,0,0.25))' }}>
      <defs>
        <radialGradient id="whiteHead" cx="38%" cy="28%" r="62%">
          <stop offset="0%" stopColor="#ffffff"/>
          <stop offset="60%" stopColor="#f0f0f5"/>
          <stop offset="100%" stopColor="#d8d8e8"/>
        </radialGradient>
        <radialGradient id="pinkPart" cx="35%" cy="25%" r="65%">
          <stop offset="0%" stopColor="#ffadd6"/>
          <stop offset="50%" stopColor="#ff69b4"/>
          <stop offset="100%" stopColor="#e0409a"/>
        </radialGradient>
        <radialGradient id="darkPink" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e0409a"/>
          <stop offset="100%" stopColor="#b5006e"/>
        </radialGradient>
        <radialGradient id="blackEye" cx="38%" cy="32%" r="58%">
          <stop offset="0%" stopColor="#2a2a3a"/>
          <stop offset="100%" stopColor="#0a0a14"/>
        </radialGradient>
        <radialGradient id="glowFoot" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#a0f0ff"/>
          <stop offset="100%" stopColor="#0090cc"/>
        </radialGradient>
        <radialGradient id="pinkEar" cx="40%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#ffcce8"/>
          <stop offset="100%" stopColor="#ff69b4"/>
        </radialGradient>
      </defs>
      <ellipse cx="41" cy="107" rx="24" ry="5" fill="rgba(200,0,100,0.12)"/>
      <circle cx="10" cy="38" r="9" fill="url(#pinkPart)" stroke="#e0409a" strokeWidth="0.8"/>
      <circle cx="10" cy="38" r="5" fill="url(#pinkEar)"/>
      <circle cx="72" cy="38" r="9" fill="url(#pinkPart)" stroke="#e0409a" strokeWidth="0.8"/>
      <circle cx="72" cy="38" r="5" fill="url(#pinkEar)"/>
      <ellipse cx="41" cy="34" rx="27" ry="26" fill="url(#whiteHead)" stroke="#e0e0ee" strokeWidth="0.8"/>
      <ellipse cx="32" cy="16" rx="11" ry="6" fill="white" opacity="0.5" transform="rotate(-20 32 16)"/>
      <ellipse cx="22" cy="30" rx="4" ry="8" fill="white" opacity="0.2" transform="rotate(-10 22 30)"/>
      <ellipse cx="30" cy="36" rx="9" ry={blink ? 0.8 : 10} fill="url(#blackEye)"/>
      <ellipse cx="52" cy="36" rx="9" ry={blink ? 0.8 : 10} fill="url(#blackEye)"/>
      {!blink && <>
        <circle cx="26" cy="30" r="3.5" fill="white" opacity="0.95"/>
        <circle cx="48" cy="30" r="3.5" fill="white" opacity="0.95"/>
        <circle cx="35" cy="40" r="1.5" fill="white" opacity="0.5"/>
        <circle cx="57" cy="40" r="1.5" fill="white" opacity="0.5"/>
        <ellipse cx="30" cy="37" rx="5" ry="6" fill="none" stroke="#6699ff" strokeWidth="1" opacity="0.4"/>
        <ellipse cx="52" cy="37" rx="5" ry="6" fill="none" stroke="#6699ff" strokeWidth="1" opacity="0.4"/>
      </>}
      <ellipse cx="41" cy="47" rx="2" ry="1.5" fill="#d0d0e0"/>
      {isSpeaking
        ? <ellipse cx="41" cy="53" rx="7" ry="4" fill="#1a1a2e" stroke="#e0409a" strokeWidth="0.5"/>
        : isListening
        ? <path d="M34 51 Q41 56 48 51" stroke="#ff69b4" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        : <path d="M33 52 Q41 58 49 52" stroke="#aaaacc" strokeWidth="2" fill="none" strokeLinecap="round"/>
      }
      <rect x="34" y="59" width="14" height="7" rx="3.5" fill="#e8e8f5" stroke="#d0d0e8" strokeWidth="0.5"/>
      <ellipse cx="41" cy="82" rx="22" ry="24" fill="url(#pinkPart)" stroke="#e0409a" strokeWidth="0.8"/>
      <ellipse cx="31" cy="70" rx="8" ry="6" fill="white" opacity="0.28" transform="rotate(-15 31 70)"/>
      <ellipse cx="41" cy="84" rx="10" ry="12" fill="url(#darkPink)" opacity="0.6"/>
      <circle cx="41" cy="80" r="4" fill="#1a0a12" stroke="#ff69b4" strokeWidth="0.5"/>
      <circle cx="41" cy="80" r="2" fill={isSpeaking ? "#ffadd6" : isListening ? "#ff4da6" : "#3a1a2a"}/>
      {/* Listening pulse ring */}
      {isListening && <circle cx="41" cy="80" r="7" fill="none" stroke="#ff69b4" strokeWidth="1.5" opacity="0.6"/>}
      <g transform={wave || isSpeaking ? "rotate(-45 16 72)" : "rotate(-10 16 72)"} style={{transition:'transform 0.3s'}}>
        <ellipse cx="16" cy="72" rx="7" ry="14" fill="url(#pinkPart)" stroke="#e0409a" strokeWidth="0.7"/>
        <ellipse cx="13" cy="85" rx="7" ry="6" fill="url(#whiteHead)" stroke="#e0e0ee" strokeWidth="0.7"/>
        <line x1="9" y1="83" x2="7" y2="78" stroke="#d0d0e0" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="11" y1="81" x2="10" y2="76" stroke="#d0d0e0" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="13" y1="80" x2="13" y2="75" stroke="#d0d0e0" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="15" y1="81" x2="16" y2="76" stroke="#d0d0e0" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="17" y1="83" x2="19" y2="78" stroke="#d0d0e0" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
      <g transform="rotate(15 66 72)">
        <ellipse cx="66" cy="72" rx="7" ry="14" fill="url(#pinkPart)" stroke="#e0409a" strokeWidth="0.7"/>
        <ellipse cx="69" cy="85" rx="7" ry="6" fill="url(#whiteHead)" stroke="#e0e0ee" strokeWidth="0.7"/>
      </g>
      <circle cx="19" cy="67" r="3.5" fill="#1a0a12"/>
      <circle cx="63" cy="67" r="3.5" fill="#1a0a12"/>
      <rect x="27" y="103" width="13" height="7" rx="6" fill="url(#pinkPart)" stroke="#e0409a" strokeWidth="0.7"/>
      <rect x="42" y="103" width="13" height="7" rx="6" fill="url(#pinkPart)" stroke="#e0409a" strokeWidth="0.7"/>
      <ellipse cx="33" cy="109" rx="11" ry="5" fill="url(#pinkPart)" stroke="#e0409a" strokeWidth="0.7"/>
      <ellipse cx="48" cy="109" rx="11" ry="5" fill="url(#pinkPart)" stroke="#e0409a" strokeWidth="0.7"/>
      <ellipse cx="33" cy="110" rx="8" ry="2.5" fill="url(#glowFoot)" opacity="0.7"/>
      <ellipse cx="48" cy="110" rx="8" ry="2.5" fill="url(#glowFoot)" opacity="0.7"/>
    </svg>
  );

  const bubbleLeft = pos.x > window.innerWidth / 2;

  return (
    <>
      <input type="file" ref={fileInputRef} accept=".pdf" style={{ display: 'none' }}
        onChange={(e) => { if (e.target.files[0]) speak(`Got your resume ${e.target.files[0].name}! Go to Resume Analyzer and click Analyze!`); }}
      />

      <div style={{ position: 'fixed', left: pos.x, top: pos.y, zIndex: 9999, userSelect: 'none' }}>
        {speechBubble && (
          <div style={{
            position: 'absolute', bottom: '118px',
            [bubbleLeft ? 'right' : 'left']: '-8px',
            backgroundColor: isListening ? '#fff0f8' : 'white',
            borderRadius: '22px', padding: '11px 15px', maxWidth: '220px', minWidth: '100px',
            boxShadow: '0 6px 24px rgba(255,105,180,0.28)',
            border: `1.5px solid ${isListening ? '#ff69b4' : '#ffb3d9'}`,
            zIndex: 2, pointerEvents: 'none', transition: 'all 0.3s'
          }}>
            <p style={{ color: isListening ? '#cc0066' : '#880044', fontSize: '0.79rem', lineHeight: '1.55', margin: 0, fontWeight: '500' }}>
              {isListening ? (transcript || 'Listening keenly... 👂') : speechBubble.substring(0, 130)}
              {!isListening && speechBubble.length > 130 ? '...' : ''}
            </p>
            <div style={{ position: 'absolute', bottom: '-10px', [bubbleLeft ? 'right' : 'left']: '30px', width: 0, height: 0, borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderTop: `10px solid ${isListening ? '#ff69b4' : '#ffb3d9'}` }}/>
            <div style={{ position: 'absolute', bottom: '-8px', [bubbleLeft ? 'right' : 'left']: '31px', width: 0, height: 0, borderLeft: '9px solid transparent', borderRight: '9px solid transparent', borderTop: `9px solid ${isListening ? '#fff0f8' : 'white'}` }}/>
          </div>
        )}

        <div onMouseDown={onMouseDown}
          style={{ cursor: isDragging ? 'grabbing' : 'pointer', display: 'inline-block',
            animation: isSpeaking ? 'botTalk 0.4s ease-in-out infinite' : isListening ? 'botListen 0.8s ease-in-out infinite' : moving ? 'botWalk 0.6s ease-in-out infinite' : 'botBob 3s ease-in-out infinite' }}>
          <Robot />
        </div>

        {isOpen && (
          <div className="campbot-panel" style={{ marginTop: '4px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => {
                // STOP bot immediately when user clicks mic
                window.speechSynthesis.cancel();
                setIsSpeaking(false);
                if (isListening) stopListening();
                else startContinuousListening();
              }}
              style={{
                width: '50px', height: '50px', borderRadius: '50%',
                backgroundColor: isListening ? '#dc2626' : '#ff69b4',
                color: 'white', border: 'none', cursor: 'pointer', fontSize: '1.2rem',
                boxShadow: isListening ? '0 0 20px rgba(220,38,38,0.7)' : '0 0 18px rgba(255,105,180,0.7)',
                transition: 'all 0.2s'
              }}>
              {isListening ? '⏹' : '🎙️'}
            </button>
            <div style={{ backgroundColor: 'white', borderRadius: '18px', padding: '10px 12px', boxShadow: '0 4px 20px rgba(255,105,180,0.2)', border: '1.5px solid #ffb3d9', width: '210px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '8px' }}>
                {['Resume', 'Mentors', 'Prep Hub', 'Upload CV', 'Doubt Solver', 'Help'].map(cmd => (
                  <button key={cmd} onClick={() => { window.speechSynthesis.cancel(); setIsSpeaking(false); handleCommand(cmd); }}
                    style={{ backgroundColor: '#fff0f8', color: '#cc0066', border: '1px solid #ffb3d9', borderRadius: '10px', padding: '3px 9px', fontSize: '0.68rem', cursor: 'pointer' }}>
                    {cmd}
                  </button>
                ))}
              </div>
              {messages.length > 0 && (
                <div style={{ maxHeight: '90px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {messages.slice(-4).map((msg, i) => (
                    <div key={i} style={{ fontSize: '0.68rem', textAlign: msg.from === 'user' ? 'right' : 'left' }}>
                      <span style={{ backgroundColor: msg.from === 'user' ? '#ffe0ef' : '#fff8fb', color: msg.from === 'user' ? '#880033' : '#cc0066', padding: '2px 8px', borderRadius: '8px', display: 'inline-block', maxWidth: '160px' }}>
                        {msg.text.substring(0, 60)}{msg.text.length > 60 ? '…' : ''}
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
        @keyframes botBob { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-8px) rotate(1.5deg)} }
        @keyframes botWalk { 0%,100%{transform:translateY(0) rotate(-2deg)} 50%{transform:translateY(-6px) rotate(2deg)} }
        @keyframes botTalk { 0%,100%{transform:scale(1) rotate(0deg)} 50%{transform:scale(1.05) rotate(1deg)} }
        @keyframes botListen { 0%,100%{transform:scale(1)} 50%{transform:scale(1.03)} }
      `}</style>
    </>
  );
}

export default VoiceBot;