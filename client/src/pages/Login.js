function Login() {
  return (
    <div style={{backgroundColor: '#0f172a', color: 'white', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{backgroundColor: '#1e293b', padding: '40px', borderRadius: '16px', width: '100%', maxWidth: '400px'}}>
        
        <h2 style={{fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', color: '#4ade80'}}>Welcome Back!</h2>
        <p style={{color: '#94a3b8', textAlign: 'center', marginTop: '8px'}}>Login to CampusConnect</p>

        <div style={{marginTop: '32px'}}>
          <label style={{display: 'block', marginBottom: '8px'}}>Email</label>
          <input type="email" placeholder="Enter your email" style={{width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: '#0f172a', color: 'white', border: '1px solid #4ade80', fontSize: '1rem', boxSizing: 'border-box'}}/>
        </div>

        <div style={{marginTop: '20px'}}>
          <label style={{display: 'block', marginBottom: '8px'}}>Password</label>
          <input type="password" placeholder="Enter your password" style={{width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: '#0f172a', color: 'white', border: '1px solid #4ade80', fontSize: '1rem', boxSizing: 'border-box'}}/>
        </div>

        <button style={{marginTop: '24px', width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: '#4ade80', color: '#111827', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '1rem'}}>
          Login
        </button>

        <p style={{textAlign: 'center', marginTop: '20px', color: '#94a3b8'}}>
          Don't have an account? <span style={{color: '#4ade80', cursor: 'pointer'}}>Register</span>
        </p>

      </div>
    </div>
  );
}

export default Login;