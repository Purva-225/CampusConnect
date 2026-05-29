import { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setMessage('Login successful! Welcome ' + data.user.name);
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage('Something went wrong!');
    }
  };

  return (
    <div style={{backgroundColor: 'transparent', color: 'white', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{backgroundColor: '#1e293b', padding: '40px', borderRadius: '16px', width: '100%', maxWidth: '400px'}}>
        
        <h2 style={{fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', color: '#4ade80'}}>Welcome Back!</h2>
        <p style={{color: '#94a3b8', textAlign: 'center', marginTop: '8px'}}>Login to CampusConnect</p>

        {message && (
          <div style={{marginTop: '16px', padding: '12px', borderRadius: '8px', backgroundColor: message.includes('successful') ? '#166534' : '#7f1d1d', textAlign: 'center'}}>
            {message}
          </div>
        )}

        <div style={{marginTop: '24px'}}>
          <label style={{display: 'block', marginBottom: '8px'}}>Email</label>
          <input 
            type="email" 
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: '#0f172a', color: 'white', border: '1px solid #4ade80', fontSize: '1rem', boxSizing: 'border-box'}}
          />
        </div>

        <div style={{marginTop: '20px'}}>
          <label style={{display: 'block', marginBottom: '8px'}}>Password</label>
          <input 
            type="password" 
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: '#0f172a', color: 'white', border: '1px solid #4ade80', fontSize: '1rem', boxSizing: 'border-box'}}
          />
        </div>

        <button 
          onClick={handleLogin}
          style={{marginTop: '24px', width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: '#4ade80', color: '#111827', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '1rem'}}>
          Login
        </button>

        <p style={{textAlign: 'center', marginTop: '20px', color: '#94a3b8'}}>
        Don't have an account? <a href="/register" style={{color: '#4ade80', textDecoration: 'none', fontWeight: 'bold'}}>Register</a>
        </p>

      </div>
    </div>
  );
}

export default Login;