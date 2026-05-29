import { useEffect, useRef } from 'react';

function Home() {
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

  return (
    <div style={{position: 'relative', backgroundColor: '#0f172a', minHeight: '100vh', overflow: 'hidden'}}>
      
      {/* Animated Canvas Background */}
      <canvas ref={canvasRef} style={{position: 'fixed', top: 0, left: 0, zIndex: 0, pointerEvents: 'none'}}/>

      {/* Hero Section */}
      <div style={{position: 'relative', zIndex: 1, color: 'white', textAlign: 'center', padding: '80px 20px'}}>
        <div style={{display: 'inline-block', backgroundColor: 'rgba(74, 222, 128, 0.1)', border: '1px solid #4ade80', borderRadius: '20px', padding: '6px 16px', marginBottom: '24px'}}>
          <span style={{color: '#4ade80', fontSize: '0.9rem'}}>🚀 Now live for Indian students</span>
        </div>
        <h2 style={{fontSize: '3.5rem', fontWeight: 'bold', color: '#4ade80', lineHeight: 1.2}}>Your AI-Powered</h2>
        <h2 style={{fontSize: '3.5rem', fontWeight: 'bold', lineHeight: 1.2}}>Placement Companion</h2>
        <p style={{marginTop: '20px', fontSize: '1.2rem', color: '#94a3b8', maxWidth: '600px', margin: '20px auto'}}>Built for tier-2 and tier-3 college students across India</p>
        <div style={{marginTop: '32px', display: 'flex', gap: '16px', justifyContent: 'center'}}>
          <a href="/register">
            <button style={{backgroundColor: '#4ade80', color: '#111827', padding: '14px 36px', borderRadius: '8px', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '1rem'}}>Get Started Free</button>
          </a>
          <a href="/prep-hub">
            <button style={{backgroundColor: 'transparent', color: 'white', padding: '14px 36px', borderRadius: '8px', fontWeight: 'bold', border: '2px solid white', cursor: 'pointer', fontSize: '1rem'}}>Explore Features</button>
          </a>
        </div>

        {/* Stats */}
        <div style={{display: 'flex', justifyContent: 'center', gap: '48px', marginTop: '60px'}}>
          <div>
            <h3 style={{fontSize: '2rem', fontWeight: 'bold', color: '#4ade80'}}>50K+</h3>
            <p style={{color: '#94a3b8', fontSize: '0.9rem'}}>Students</p>
          </div>
          <div>
            <h3 style={{fontSize: '2rem', fontWeight: 'bold', color: '#4ade80'}}>500+</h3>
            <p style={{color: '#94a3b8', fontSize: '0.9rem'}}>Colleges</p>
          </div>
          <div>
            <h3 style={{fontSize: '2rem', fontWeight: 'bold', color: '#4ade80'}}>100+</h3>
            <p style={{color: '#94a3b8', fontSize: '0.9rem'}}>Companies</p>
          </div>
          <div>
            <h3 style={{fontSize: '2rem', fontWeight: 'bold', color: '#4ade80'}}>95%</h3>
            <p style={{color: '#94a3b8', fontSize: '0.9rem'}}>Success Rate</p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div style={{position: 'relative', zIndex: 1, backgroundColor: 'rgba(17, 24, 39, 0.8)', padding: '60px 40px'}}>
        <h2 style={{textAlign: 'center', fontSize: '2rem', fontWeight: 'bold', marginBottom: '40px', color: 'white'}}>Everything You Need to <span style={{color: '#4ade80'}}>Get Placed</span></h2>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', maxWidth: '1100px', margin: '0 auto'}}>

          {[
            { icon: '🤖', title: 'AI Resume Analyzer', desc: 'Upload your resume and get instant score with company-specific suggestions' },
            { icon: '📚', title: 'Placement Prep Hub', desc: 'DSA, aptitude and HR questions filtered by company like TCS, Google, Amazon' },
            { icon: '💼', title: 'Interview Experiences', desc: 'Real interview experiences from students filtered by company and college' },
            { icon: '🧠', title: 'AI Doubt Solver', desc: 'Get answers to DSA, DBMS, OS and CN questions in simple language' },
            { icon: '👨‍🏫', title: 'Senior Mentor Connect', desc: 'Connect with placed seniors for resume reviews and guidance sessions' },
            { icon: '🗺️', title: 'Roadmap Generator', desc: 'Get a personalized day-by-day 3 month preparation plan for your dream company' },
          ].map((feature, i) => (
            <div key={i} style={{backgroundColor: 'rgba(30, 41, 59, 0.8)', padding: '24px', borderRadius: '12px', borderLeft: '4px solid #4ade80', backdropFilter: 'blur(10px)', transition: 'transform 0.2s'}}>
              <div style={{fontSize: '2rem'}}>{feature.icon}</div>
              <h3 style={{fontSize: '1.2rem', fontWeight: 'bold', marginTop: '12px', color: 'white'}}>{feature.title}</h3>
              <p style={{color: '#94a3b8', marginTop: '8px', fontSize: '0.9rem'}}>{feature.desc}</p>
            </div>
          ))}

        </div>
      </div>

    </div>
  );
}

export default Home;