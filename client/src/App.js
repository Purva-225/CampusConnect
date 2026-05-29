function App() {
  return (
    <div>

      {/* Navbar */}
      <nav style={{backgroundColor: '#111827', color: 'white', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h1 style={{color: '#4ade80', fontSize: '1.5rem', fontWeight: 'bold'}}>CampusConnect</h1>
        <ul style={{display: 'flex', gap: '24px', listStyle: 'none', margin: 0}}>
          <li>Home</li>
          <li>Prep Hub</li>
          <li>Resume</li>
          <li>Mentors</li>
          <li>Roadmap</li>
        </ul>
      </nav>

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
          
          {/* Card 1 */}
          <div style={{backgroundColor: '#1e293b', padding: '24px', borderRadius: '12px', borderLeft: '4px solid #4ade80'}}>
            <div style={{fontSize: '2rem'}}>🤖</div>
            <h3 style={{fontSize: '1.2rem', fontWeight: 'bold', marginTop: '12px'}}>AI Resume Analyzer</h3>
            <p style={{color: '#94a3b8', marginTop: '8px', fontSize: '0.9rem'}}>Upload your resume and get instant score with company-specific suggestions</p>
          </div>

          {/* Card 2 */}
          <div style={{backgroundColor: '#1e293b', padding: '24px', borderRadius: '12px', borderLeft: '4px solid #4ade80'}}>
            <div style={{fontSize: '2rem'}}>📚</div>
            <h3 style={{fontSize: '1.2rem', fontWeight: 'bold', marginTop: '12px'}}>Placement Prep Hub</h3>
            <p style={{color: '#94a3b8', marginTop: '8px', fontSize: '0.9rem'}}>DSA, aptitude and HR questions filtered by company like TCS, Google, Amazon</p>
          </div>

          {/* Card 3 */}
          <div style={{backgroundColor: '#1e293b', padding: '24px', borderRadius: '12px', borderLeft: '4px solid #4ade80'}}>
            <div style={{fontSize: '2rem'}}>💼</div>
            <h3 style={{fontSize: '1.2rem', fontWeight: 'bold', marginTop: '12px'}}>Interview Experiences</h3>
            <p style={{color: '#94a3b8', marginTop: '8px', fontSize: '0.9rem'}}>Real interview experiences from students filtered by company and college</p>
          </div>

          {/* Card 4 */}
          <div style={{backgroundColor: '#1e293b', padding: '24px', borderRadius: '12px', borderLeft: '4px solid #4ade80'}}>
            <div style={{fontSize: '2rem'}}>🧠</div>
            <h3 style={{fontSize: '1.2rem', fontWeight: 'bold', marginTop: '12px'}}>AI Doubt Solver</h3>
            <p style={{color: '#94a3b8', marginTop: '8px', fontSize: '0.9rem'}}>Get answers to DSA, DBMS, OS and CN questions in simple language</p>
          </div>

          {/* Card 5 */}
          <div style={{backgroundColor: '#1e293b', padding: '24px', borderRadius: '12px', borderLeft: '4px solid #4ade80'}}>
            <div style={{fontSize: '2rem'}}>👨‍🏫</div>
            <h3 style={{fontSize: '1.2rem', fontWeight: 'bold', marginTop: '12px'}}>Senior Mentor Connect</h3>
            <p style={{color: '#94a3b8', marginTop: '8px', fontSize: '0.9rem'}}>Connect with placed seniors for resume reviews and guidance sessions</p>
          </div>

          {/* Card 6 */}
          <div style={{backgroundColor: '#1e293b', padding: '24px', borderRadius: '12px', borderLeft: '4px solid #4ade80'}}>
            <div style={{fontSize: '2rem'}}>🗺️</div>
            <h3 style={{fontSize: '1.2rem', fontWeight: 'bold', marginTop: '12px'}}>Roadmap Generator</h3>
            <p style={{color: '#94a3b8', marginTop: '8px', fontSize: '0.9rem'}}>Get a personalized day-by-day 3 month preparation plan for your dream company</p>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer style={{backgroundColor: '#0f172a', color: '#94a3b8', textAlign: 'center', padding: '32px'}}>
        <h3 style={{color: '#4ade80', fontSize: '1.3rem', fontWeight: 'bold'}}>CampusConnect</h3>
        <p style={{marginTop: '8px', fontSize: '0.9rem'}}>Built for Indian students by Indian students</p>
        <p style={{marginTop: '16px', fontSize: '0.8rem'}}>© 2026 CampusConnect. Open Source under MIT License.</p>
      </footer>

    </div>
  );
}

export default App;