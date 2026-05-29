import { useState } from 'react';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', college: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (err) {
      setMessage('Something went wrong!');
    }
  };

  return (
    <div style={{backgroundColor: '#0f172a', color: 'white', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{backgroundColor: '#1e293b', padding: '40px', borderRadius: '16px', width: '100%', maxWidth: '400px'}}>
        
        <h2 style={{fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', color: '#4ade80'}}>Create Account</h2>
        <p style={{color: '#94a3b8', textAlign: 'center', marginTop: '8px'}}>Join CampusConnect today</p>

        {message && (
          <div style={{marginTop: '16px', padding: '12px', borderRadius: '8px', backgroundColor: message.includes('successful') ? '#166534' : '#7f1d1d', textAlign: 'center'}}>
            {message}
          </div>
        )}

        <div style={{marginTop: '24px'}}>
          <label style={{display: 'block', marginBottom: '8px'}}>Full Name</label>
          <input name="name" placeholder="Enter your name" onChange={handleChange}
            style={{width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: '#0f172a', color: 'white', border: '1px solid #4ade80', fontSize: '1rem', boxSizing: 'border-box'}}/>
        </div>

        <div style={{marginTop: '16px'}}>
          <label style={{display: 'block', marginBottom: '8px'}}>Email</label>
          <input name="email" type="email" placeholder="Enter your email" onChange={handleChange}
            style={{width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: '#0f172a', color: 'white', border: '1px solid #4ade80', fontSize: '1rem', boxSizing: 'border-box'}}/>
        </div>

        <div style={{marginTop: '16px'}}>
          <label style={{display: 'block', marginBottom: '8px'}}>Password</label>
          <input name="password" type="password" placeholder="Create password" onChange={handleChange}
            style={{width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: '#0f172a', color: 'white', border: '1px solid #4ade80', fontSize: '1rem', boxSizing: 'border-box'}}/>
        </div>

        <div style={{marginTop: '16px'}}>
          <label style={{display: 'block', marginBottom: '8px'}}>College Name</label>
          <input name="college" placeholder="Enter your college" onChange={handleChange}
            style={{width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: '#0f172a', color: 'white', border: '1px solid #4ade80', fontSize: '1rem', boxSizing: 'border-box'}}/>
        </div>

        <button onClick={handleRegister}
          style={{marginTop: '24px', width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: '#4ade80', color: '#111827', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '1rem'}}>
          Create Account
        </button>

        <p style={{textAlign: 'center', marginTop: '20px', color: '#94a3b8'}}>
          Already have an account? <a href="/login" style={{color: '#4ade80', textDecoration: 'none', fontWeight: 'bold'}}>Login</a>
        </p>

      </div>
    </div>
  );
}

export default Register;