function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div style={{backgroundColor: '#0f172a', color: 'white', textAlign: 'center', padding: '80px 20px'}}>
        <h2 style={{fontSize: '3rem', fontWeight: 'bold', color: '#4ade80'}}>Your AI-Powered</h2>
        <h2 style={{fontSize: '3rem', fontWeight: 'bold'}}>Placement Companion</h2>
        <p style={{marginTop: '20px', fontSize: '1.2rem', color: '#94a3b8'}}>Built for tier-2 and tier-3 college students across India</p>
        <div style={{marginTop: '32px', display: 'flex', gap: '16px', justifyContent: 'center'}}>
          <button style={{backgroundColor: '#4ade80', color: '#111827', padding: '12px 32px', borderRadius: '8px', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '1rem'}}>Get Started</button>
          <button style={{backgroundColor: 'transparent', color: 'white', padding: '12px 32px', borderRadius: '8px', fontWeight: 'bold', border: '2px solid white', cursor: 'pointer', fontSize: '1rem'}}>Explore Features</button>
        </div>
      </div>

      {/* Features Section */}
      <div style={{backgroundColor: '#111827', color: 'white', padding: '60px 40px'}}>
        <h2 style={{textAlign: 'center', fontSize: '2rem', fontWeight: 'bold', marginBottom: '40px'}}>Everything You Need to <span style={{color: '#4ade80'}}>Get Placed</span></h2>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', maxWidth: '1100px', margin: '0 auto'}}>

          <div style={{backgroundColor: '#1e293b', padding: '24px', borderRadius: '12px', borderLeft: '4px solid #4ade80'}}>
            <div style={{fontSize: '2rem'}}>🤖</div>
            <h3 style={{fontSize: '1.2rem', fontWeight: 'bold', marginTop: '12px'}}>AI Resume Analyzer</h3>
            <p style={{color: '#94a3b8', marginTop: '8px', fontSize: '0.9rem'}}>Upload your resume and get instant score with company-specific suggestions</p>
          </div>

          <div style={{backgroundColor: '#1e293b', padding: '24px', borderRadius: '12px', borderLeft: '4px solid #4ade80'}}>
            <div style={{fontSize: '2rem'}}>📚</div>
            <h3 style={{fontSize: '1.2rem', fontWeight: 'bold', marginTop: '12px'}}>Placement Prep Hub</h3>
            <p style={{color: '#94a3b8', marginTop: '8px', fontSize: '0.9rem'}}>DSA, aptitude and HR questions filtered by company like TCS, Google, Amazon</p>
          </div>

          <div style={{backgroundColor: '#1e293b', padding: '24px', borderRadius: '12px', borderLeft: '4px solid #4ade80'}}>
            <div style={{fontSize: '2rem'}}>💼</div>
            <h3 style={{fontSize: '1.2rem', fontWeight: 'bold', marginTop: '12px'}}>Interview Experiences</h3>
            <p style={{color: '#94a3b8', marginTop: '8px', fontSize: '0.9rem'}}>Real interview experiences from students filtered by company and college</p>
          </div>

          <div style={{backgroundColor: '#1e293b', padding: '24px', borderRadius: '12px', borderLeft: '4px solid #4ade80'}}>
            <div style={{fontSize: '2rem'}}>🧠</div>
            <h3 style={{fontSize: '1.2rem', fontWeight: 'bold', marginTop: '12px'}}>AI Doubt Solver</h3>
            <p style={{color: '#94a3b8', marginTop: '8px', fontSize: '0.9rem'}}>Get answers to DSA, DBMS, OS and CN questions in simple language</p>
          </div>

          <div style={{backgroundColor: '#1e293b', padding: '24px', borderRadius: '12px', borderLeft: '4px solid #4ade80'}}>
            <div style={{fontSize: '2rem'}}>👨‍🏫</div>
            <h3 style={{fontSize: '1.2rem', fontWeight: 'bold', marginTop: '12px'}}>Senior Mentor Connect</h3>
            <p style={{color: '#94a3b8', marginTop: '8px', fontSize: '0.9rem'}}>Connect with placed seniors for resume reviews and guidance sessions</p>
          </div>

          <div style={{backgroundColor: '#1e293b', padding: '24px', borderRadius: '12px', borderLeft: '4px solid #4ade80'}}>
            <div style={{fontSize: '2rem'}}>🗺️</div>
            <h3 style={{fontSize: '1.2rem', fontWeight: 'bold', marginTop: '12px'}}>Roadmap Generator</h3>
            <p style={{color: '#94a3b8', marginTop: '8px', fontSize: '0.9rem'}}>Get a personalized day-by-day 3 month preparation plan for your dream company</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Home;