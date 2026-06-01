import React, { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import PrepHub from './pages/PrepHub';
import Resume from './pages/Resume';
import Mentors from './pages/Mentors';
import Login from './pages/Login';
import Register from './pages/Register';
import DoubtSolver from './pages/DoubtSolver';

function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
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
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(74, 222, 128, ${0.15 - dist / 1000})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      requestAnimationFrame(animate);
    }
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} style={{position: 'fixed', top: 0, left: 0, zIndex: 0, pointerEvents: 'none'}} />;
}

function App() {
  return (
    <BrowserRouter>
      <div style={{backgroundColor: '#0f172a', minHeight: '100vh'}}>

        <AnimatedBackground />

        <nav style={{position: 'relative', zIndex: 10, backgroundColor: 'rgba(17, 24, 39, 0.95)', color: 'white', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backdropFilter: 'blur(10px)'}}>
          <Link to="/" style={{color: '#4ade80', fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none'}}>CampusConnect</Link>
          <ul style={{display: 'flex', gap: '24px', listStyle: 'none', margin: 0}}>
            <li><Link to="/" style={{color: 'white', textDecoration: 'none'}}>Home</Link></li>
            <li><Link to="/prep-hub" style={{color: 'white', textDecoration: 'none'}}>Prep Hub</Link></li>
            <li><Link to="/resume" style={{color: 'white', textDecoration: 'none'}}>Resume</Link></li>
            <li><Link to="/mentors" style={{color: 'white', textDecoration: 'none'}}>Mentors</Link></li>
            <li><Link to="/doubt-solver" style={{color: 'white', textDecoration: 'none'}}>Doubt Solver</Link></li>
            <li><Link to="/login" style={{color: '#4ade80', textDecoration: 'none', fontWeight: 'bold'}}>Login</Link></li>
          </ul>
        </nav>

        <div style={{position: 'relative', zIndex: 1}}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/prep-hub" element={<PrepHub />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/mentors" element={<Mentors />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/doubt-solver" element={<DoubtSolver />} />
          </Routes>
        </div>

        <footer style={{position: 'relative', zIndex: 1, backgroundColor: 'rgba(15, 23, 42, 0.9)', color: '#94a3b8', textAlign: 'center', padding: '32px'}}>
          <h3 style={{color: '#4ade80', fontSize: '1.3rem', fontWeight: 'bold'}}>CampusConnect</h3>
          <p style={{marginTop: '8px', fontSize: '0.9rem'}}>Built for Indian students by Indian students</p>
          <p style={{marginTop: '16px', fontSize: '0.8rem'}}>© 2026 CampusConnect. Open Source under MIT License.</p>
        </footer>

      </div>
    </BrowserRouter>
  );
}

export default App;
