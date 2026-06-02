import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div style={{ backgroundColor: 'transparent', color: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px', textAlign: 'center' }}>
      <div style={{ fontSize: '6rem', marginBottom: '16px' }}>🤖</div>
      <h1 style={{ fontSize: '6rem', fontWeight: 'bold', color: '#4ade80', margin: 0 }}>404</h1>
      <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '12px' }}>Page Not Found</h2>
      <p style={{ color: '#94a3b8', fontSize: '1rem', marginBottom: '32px', maxWidth: '400px' }}>
        Oops! Looks like this page went for placement and never came back. 😄
      </p>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/" style={{ backgroundColor: '#4ade80', color: '#111827', padding: '12px 28px', borderRadius: '10px', fontWeight: 'bold', textDecoration: 'none', fontSize: '1rem' }}>
          🏠 Go Home
        </Link>
        <Link to="/prep-hub" style={{ backgroundColor: '#1e293b', color: '#4ade80', padding: '12px 28px', borderRadius: '10px', fontWeight: 'bold', textDecoration: 'none', fontSize: '1rem', border: '1px solid #4ade80' }}>
          📚 Prep Hub
        </Link>
      </div>
    </div>
  );
}

export default NotFound;