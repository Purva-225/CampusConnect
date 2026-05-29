import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import PrepHub from './pages/PrepHub';
import Resume from './pages/Resume';
import Mentors from './pages/Mentors';

function App() {
  return (
    <BrowserRouter>
      <div>

        {/* Navbar */}
        <nav style={{backgroundColor: '#111827', color: 'white', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Link to="/" style={{color: '#4ade80', fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none'}}>CampusConnect</Link>
          <ul style={{display: 'flex', gap: '24px', listStyle: 'none', margin: 0}}>
            <li><Link to="/" style={{color: 'white', textDecoration: 'none'}}>Home</Link></li>
            <li><Link to="/prep-hub" style={{color: 'white', textDecoration: 'none'}}>Prep Hub</Link></li>
            <li><Link to="/resume" style={{color: 'white', textDecoration: 'none'}}>Resume</Link></li>
            <li><Link to="/mentors" style={{color: 'white', textDecoration: 'none'}}>Mentors</Link></li>
          </ul>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prep-hub" element={<PrepHub />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/mentors" element={<Mentors />} />
        </Routes>

        {/* Footer */}
        <footer style={{backgroundColor: '#0f172a', color: '#94a3b8', textAlign: 'center', padding: '32px'}}>
          <h3 style={{color: '#4ade80', fontSize: '1.3rem', fontWeight: 'bold'}}>CampusConnect</h3>
          <p style={{marginTop: '8px', fontSize: '0.9rem'}}>Built for Indian students by Indian students</p>
          <p style={{marginTop: '16px', fontSize: '0.8rem'}}>© 2026 CampusConnect. Open Source under MIT License.</p>
        </footer>

      </div>
    </BrowserRouter>
  );
}

export default App;