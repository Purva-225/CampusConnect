import Hero from "../components/Hero";

function Home() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden', width: '100%' }}>
      <Hero />

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