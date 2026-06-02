import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [resumeHistory, setResumeHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (!token) { navigate('/login'); return; }
    if (savedUser) setUser(JSON.parse(savedUser));
    fetchHistory(token);
  }, [navigate]);

  const fetchHistory = async (token) => {
    try {
      const res = await fetch('https://campusconnect-b7wn.onrender.com/api/resume/history', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setResumeHistory(data.history || []);
    } catch { setResumeHistory([]); }
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#4ade80';
    if (score >= 60) return '#fbbf24';
    return '#ef4444';
  };

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', color: 'white' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>⏳</div>
        <p style={{ color: '#94a3b8' }}>Loading your dashboard...</p>
      </div>
    </div>
  );

  return (
    <div style={{ backgroundColor: 'transparent', color: 'white', minHeight: '100vh', padding: '40px', maxWidth: '1100px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4ade80', margin: 0 }}>
            👋 Welcome back, {user?.name || 'Student'}!
          </h1>
          <p style={{ color: '#94a3b8', marginTop: '6px' }}>{user?.email}</p>
        </div>
        <button onClick={logout} style={{ backgroundColor: '#1e293b', color: '#ef4444', padding: '10px 20px', borderRadius: '10px', border: '1px solid #ef444444', cursor: 'pointer', fontWeight: 'bold' }}>
          🚪 Logout
        </button>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        {[
          { icon: '📄', label: 'Resumes Analyzed', value: resumeHistory.length, color: '#4ade80' },
          { icon: '📈', label: 'Best Score', value: resumeHistory.length ? Math.max(...resumeHistory.map(r => r.score)) + '/100' : 'N/A', color: '#fbbf24' },
          { icon: '🏢', label: 'Companies Targeted', value: [...new Set(resumeHistory.map(r => r.company))].length || 0, color: '#60a5fa' },
          { icon: '🎯', label: 'Latest Score', value: resumeHistory.length ? resumeHistory[resumeHistory.length - 1]?.score + '/100' : 'N/A', color: '#f472b6' },
        ].map((stat, i) => (
          <div key={i} style={{ backgroundColor: '#1e293b', borderRadius: '14px', padding: '20px', border: `1px solid ${stat.color}33`, textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{stat.icon}</div>
            <div style={{ color: stat.color, fontSize: '1.8rem', fontWeight: 'bold' }}>{stat.value}</div>
            <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '4px' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ color: '#4ade80', fontSize: '1.2rem', marginBottom: '16px' }}>⚡ Quick Actions</h2>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {[
            { to: '/resume', icon: '📄', label: 'Analyze Resume', bg: '#166534' },
            { to: '/prep-hub', icon: '📚', label: 'Prep Hub', bg: '#1e3a5f' },
            { to: '/mentors', icon: '👥', label: 'Find Mentor', bg: '#4a1d96' },
            { to: '/doubt-solver', icon: '🤖', label: 'Ask AI', bg: '#7c2d12' },
            { to: '/roadmap', icon: '🗺️', label: 'Roadmap', bg: '#134e4a' },
          ].map((action, i) => (
            <Link key={i} to={action.to} style={{ backgroundColor: action.bg, color: 'white', padding: '12px 20px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              {action.icon} {action.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Resume History */}
      <div>
        <h2 style={{ color: '#4ade80', fontSize: '1.2rem', marginBottom: '16px' }}>📊 Resume Analysis History</h2>
        {resumeHistory.length === 0 ? (
          <div style={{ backgroundColor: '#1e293b', borderRadius: '14px', padding: '40px', textAlign: 'center', border: '1px solid #334155' }}>
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>📄</div>
            <p style={{ color: '#94a3b8', marginBottom: '16px' }}>No resume analyses yet!</p>
            <Link to="/resume" style={{ backgroundColor: '#4ade80', color: '#111827', padding: '10px 24px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold' }}>
              Analyze Your First Resume →
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {resumeHistory.slice().reverse().map((r, i) => (
              <div key={i} style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '20px', border: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>{r.fileName || 'Resume ' + (i + 1)}</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '4px' }}>
                    🏢 {r.targetCompany} • 📅 {new Date(r.uploadedAt).toLocaleDateString('en-IN')}
                  </div>
                  {r.improvements && r.improvements.length > 0 && (
                    <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '6px' }}>
                      💡 Top tip: {r.improvements[0]}
                    </div>
                  )}
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: getScoreColor(r.score) }}>{r.score}</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>/ 100</div>
                  <div style={{ width: '60px', height: '6px', backgroundColor: '#334155', borderRadius: '3px', marginTop: '6px' }}>
                    <div style={{ width: `${r.score}%`, height: '100%', backgroundColor: getScoreColor(r.score), borderRadius: '3px' }}/>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;