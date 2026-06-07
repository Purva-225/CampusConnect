import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import VoiceBot from './components/VoiceBot';
import PWAInstall from './components/PWAInstall';

// Lazy load all pages for performance
const Home = lazy(() => import('./pages/Home'));
const PrepHub = lazy(() => import('./pages/PrepHub'));
const Resume = lazy(() => import('./pages/Resume'));
const Mentors = lazy(() => import('./pages/Mentors'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const DoubtSolver = lazy(() => import('./pages/DoubtSolver'));
const Roadmap = lazy(() => import('./pages/Roadmap'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading skeleton
const PageLoader = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', color: '#4ade80' }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{ width: '40px', height: '40px', border: '3px solid #334155', borderTop: '3px solid #4ade80', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }}/>
      <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Loading...</p>
    </div>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

function AnimatedBackground() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Size the bitmap to the canvas's actual CSS box (= viewport),
    // NEVER to window.innerWidth. This stops the canvas from ever
    // being wider than the screen (the real overflow cause).
    const setSize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    setSize();

    const particles = [];
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5, speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2
      });
    }

    let raf;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.speedX; p.y += p.speedY;
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(74, 222, 128, ${p.opacity})`;
        ctx.fill();
      });
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 120) {
            ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(74, 222, 128, ${0.15 - dist / 1000})`;
            ctx.lineWidth = 0.5; ctx.stroke();
          }
        });
      });
      raf = requestAnimationFrame(animate);
    }
    animate();

    const handleResize = () => setSize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,            // top/right/bottom/left: 0
        width: '100%',       // locked to viewport — can't overflow
        height: '100%',
        maxWidth: '100vw',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  );
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/');
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/prep-hub', label: 'Prep Hub' },
    { to: '/resume', label: 'Resume' },
    { to: '/mentors', label: 'Mentors' },
    { to: '/roadmap', label: 'Roadmap' },
    { to: '/doubt-solver', label: 'Doubt Solver' },
  ];

  return (
    <nav style={{ position: 'relative', zIndex: 10, backgroundColor: 'rgba(17, 24, 39, 0.95)', color: 'white', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backdropFilter: 'blur(10px)', boxSizing: 'border-box', maxWidth: '100vw' }}>
      <Link to="/" style={{ color: '#4ade80', fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none' }}>CampusConnect</Link>

      {/* Desktop navbar */}
      <ul style={{ display: 'flex', gap: '20px', listStyle: 'none', margin: 0, alignItems: 'center' }} className="desktop-nav">
        {navLinks.map(link => (
          <li key={link.to}><Link to={link.to} style={{ color: 'white', textDecoration: 'none', fontSize: '0.9rem' }}>{link.label}</Link></li>
        ))}
        {isLoggedIn ? (
          <>
            <li><Link to="/dashboard" style={{ color: '#4ade80', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.9rem' }}>Dashboard</Link></li>
            <li><button onClick={logout} style={{ backgroundColor: '#1e293b', color: '#ef4444', padding: '6px 14px', borderRadius: '8px', border: '1px solid #ef444433', cursor: 'pointer', fontSize: '0.85rem' }}>Logout</button></li>
          </>
        ) : (
          <li><Link to="/login" style={{ color: '#4ade80', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.9rem' }}>Login</Link></li>
        )}
      </ul>

      {/* Mobile hamburger */}
      <button onClick={() => setMenuOpen(!menuOpen)} className="hamburger"
        style={{ display: 'none', background: 'none', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer' }}>
        {menuOpen ? '✕' : '☰'}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: 'rgba(17,24,39,0.98)', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px', zIndex: 100, borderBottom: '1px solid #334155', boxSizing: 'border-box' }}>
          {navLinks.map(link => (
            <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)} style={{ color: 'white', textDecoration: 'none', fontSize: '1rem', padding: '8px 0', borderBottom: '1px solid #1e293b' }}>{link.label}</Link>
          ))}
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)} style={{ color: '#4ade80', textDecoration: 'none', fontWeight: 'bold' }}>Dashboard</Link>
              <button onClick={logout} style={{ backgroundColor: '#1e293b', color: '#ef4444', padding: '8px', borderRadius: '8px', border: '1px solid #ef444433', cursor: 'pointer', textAlign: 'left' }}>Logout</button>
            </>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)} style={{ color: '#4ade80', textDecoration: 'none', fontWeight: 'bold' }}>Login</Link>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', overflowX: 'hidden', maxWidth: '100vw' }}>
        <AnimatedBackground />
        <Navbar />
        <div style={{ position: 'relative', zIndex: 1, overflowX: 'hidden' }}>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/prep-hub" element={<PrepHub />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/mentors" element={<Mentors />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/doubt-solver" element={<DoubtSolver />} />
              <Route path="/roadmap" element={<Roadmap />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
        <footer style={{ position: 'relative', zIndex: 1, backgroundColor: 'rgba(15, 23, 42, 0.9)', color: '#94a3b8', textAlign: 'center', padding: '32px' }}>
          <h3 style={{ color: '#4ade80', fontSize: '1.3rem', fontWeight: 'bold' }}>CampusConnect</h3>
          <p style={{ marginTop: '8px', fontSize: '0.9rem' }}>Built for Indian students by Indian students</p>
          <p style={{ marginTop: '16px', fontSize: '0.8rem' }}>© 2026 CampusConnect. Open Source under MIT License.</p>
        </footer>
        <VoiceBot />
        <PWAInstall />
      </div>
    </BrowserRouter>
  );
}

export default App;