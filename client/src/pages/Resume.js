function Resume() {
  return (
    <div style={{backgroundColor: '#0f172a', color: 'white', minHeight: '100vh', padding: '40px'}}>
      
      <h1 style={{fontSize: '2.5rem', fontWeight: 'bold', color: '#4ade80'}}>AI Resume Analyzer</h1>
      <p style={{color: '#94a3b8', marginTop: '8px', marginBottom: '40px'}}>Upload your resume and get instant AI-powered feedback</p>

      {/* Upload Box */}
      <div style={{backgroundColor: '#1e293b', border: '2px dashed #4ade80', borderRadius: '16px', padding: '60px', textAlign: 'center', maxWidth: '600px', margin: '0 auto'}}>
        <div style={{fontSize: '4rem'}}>📄</div>
        <h3 style={{fontSize: '1.5rem', fontWeight: 'bold', marginTop: '16px'}}>Drop your resume here</h3>
        <p style={{color: '#94a3b8', marginTop: '8px'}}>Supports PDF format only</p>
        <button style={{backgroundColor: '#4ade80', color: '#111827', padding: '12px 32px', borderRadius: '8px', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '1rem', marginTop: '24px'}}>
          Choose File
        </button>
      </div>

      {/* Target Company */}
      <div style={{maxWidth: '600px', margin: '32px auto'}}>
        <label style={{display: 'block', marginBottom: '8px', fontWeight: 'bold'}}>Target Company</label>
        <select style={{width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: '#1e293b', color: 'white', border: '1px solid #4ade80', fontSize: '1rem'}}>
          <option>Select a company</option>
          <option>TCS</option>
          <option>Infosys</option>
          <option>Wipro</option>
          <option>Google</option>
          <option>Amazon</option>
          <option>Microsoft</option>
        </select>
      </div>

      {/* Analyze Button */}
      <div style={{textAlign: 'center', maxWidth: '600px', margin: '0 auto'}}>
        <button style={{backgroundColor: '#4ade80', color: '#111827', padding: '14px 48px', borderRadius: '8px', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '1.1rem', width: '100%'}}>
          Analyze My Resume 🤖
        </button>
      </div>

      {/* Sample Result */}
      <div style={{maxWidth: '600px', margin: '32px auto', backgroundColor: '#1e293b', borderRadius: '16px', padding: '32px'}}>
        <h3 style={{fontSize: '1.3rem', fontWeight: 'bold', color: '#4ade80'}}>Sample Analysis Result</h3>
        <div style={{marginTop: '20px'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
            <span>Resume Score</span>
            <span style={{color: '#4ade80', fontWeight: 'bold'}}>72/100</span>
          </div>
          <div style={{backgroundColor: '#0f172a', borderRadius: '8px', height: '10px'}}>
            <div style={{backgroundColor: '#4ade80', width: '72%', height: '10px', borderRadius: '8px'}}></div>
          </div>
        </div>
        <ul style={{marginTop: '24px', color: '#94a3b8', lineHeight: '2'}}>
          <li>✅ Good use of action verbs</li>
          <li>✅ Projects section is strong</li>
          <li>❌ Add more quantifiable achievements</li>
          <li>❌ Missing relevant keywords for Google</li>
          <li>❌ Summary section needs improvement</li>
        </ul>
      </div>

    </div>
  );
}

export default Resume;