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
    </div>
  );
}

export default App;