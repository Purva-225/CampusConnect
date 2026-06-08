function Home() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden', width: '100%' }}>

      {/* Hero Section */}
      <section style={{
        position: 'relative', zIndex: 1, color: 'white', textAlign: 'center',
        padding: 'clamp(48px, 10vw, 80px) clamp(16px, 5vw, 40px)'
      }}>
        <div style={{ display: 'inline-block', backgroundColor: 'rgba(74,222,128,0.1)', border: '1px solid #4ade80', borderRadius: '20px', padding: '6px 16px', marginBottom: '24px' }}>
          <span style={{ color: '#4ade80', fontSize: '0.85rem' }}>🚀 Now live for Indian students</span>
        </div>

        <h1 style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)', fontWeight: 'bold', color: '#4ade80', lineHeight: 1.15, margin: 0 }}>Your AI-Powered</h1>
        <h1 style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)', fontWeight: 'bold', lineHeight: 1.15, margin: 0 }}>Placement Companion</h1>

        <p style={{ marginTop: '20px', fontSize: 'clamp(0.95rem, 3.5vw, 1.2rem)', color: '#94a3b8', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
          Built for tier-2 and tier-3 college students across India
        </p>

        <div style={{ marginTop: '32px', display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/register" style={{ textDecoration: 'none' }}>
            <button style={{ backgroundColor: '#4ade80', color: '#111827', padding: '14px 30px', borderRadius: '8px', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>Get Started Free</button>
          </a>
          <a href="/prep-hub" style={{ textDecoration: 'none' }}>
            <button style={{ backgroundColor: 'transparent', color: 'white', padding: '14px 30px', borderRadius: '8px', fontWeight: 'bold', border: '2px solid white', cursor: 'pointer', fontSize: '1rem' }}>Explore Features</button>
          </a>
        </div>

        {/* Stats — wrap on mobile */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(24px, 6vw, 48px)', marginTop: '56px', flexWrap: 'wrap' }}>
          {[['50K+', 'Students'], ['500+', 'Colleges'], ['100+', 'Companies'], ['95%', 'Success Rate']].map(([num, label]) => (
            <div key={label} style={{ minWidth: '70px' }}>
              <h3 style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', fontWeight: 'bold', color: '#4ade80', margin: 0 }}>{num}</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '4px 0 0' }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section — auto-fit grid: 1 column mobile, 3 desktop */}
      <section style={{ position: 'relative', zIndex: 1, backgroundColor: 'rgba(17,24,39,0.8)', padding: 'clamp(40px, 8vw, 60px) clamp(16px, 5vw, 40px)' }}>
        <h2 style={{ textAlign: 'center', fontSize: 'clamp(1.5rem, 6vw, 2rem)', fontWeight: 'bold', marginBottom: '40px', color: 'white' }}>
          Everything You Need to <span style={{ color: '#4ade80' }}>Get Placed</span>
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '20px', maxWidth: '1100px', margin: '0 auto'
        }}>
          {[
            { icon: '🤖', title: 'AI Resume Analyzer', desc: 'Upload your resume and get instant score with company-specific suggestions' },
            { icon: '📚', title: 'Placement Prep Hub', desc: 'DSA, aptitude and HR questions filtered by company like TCS, Google, Amazon' },
            { icon: '💼', title: 'Interview Experiences', desc: 'Real interview experiences from students filtered by company and college' },
            { icon: '🧠', title: 'AI Doubt Solver', desc: 'Get answers to DSA, DBMS, OS and CN questions in simple language' },
            { icon: '👨‍🏫', title: 'Senior Mentor Connect', desc: 'Connect with placed seniors for resume reviews and guidance sessions' },
            { icon: '🗺️', title: 'Roadmap Generator', desc: 'Get a personalized day-by-day 3 month preparation plan for your dream company' },
          ].map((f, i) => (
            <div key={i} style={{ backgroundColor: 'rgba(30,41,59,0.85)', padding: '24px', borderRadius: '12px', borderLeft: '4px solid #4ade80', minWidth: 0 }}>
              <div style={{ fontSize: '2rem' }}>{f.icon}</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 'bold', marginTop: '12px', color: 'white' }}>{f.title}</h3>
              <p style={{ color: '#94a3b8', marginTop: '8px', fontSize: '0.9rem', lineHeight: 1.5 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;