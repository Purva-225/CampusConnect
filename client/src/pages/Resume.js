import { useState } from 'react';

function Resume() {
  const [step, setStep] = useState(1);
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState(null);
  const [company, setCompany] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFileName(uploadedFile.name);
      setFile(uploadedFile);
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        setStep(2);
      }, 2500);
    }
  };

  const handleAnalyze = async () => {
    setAnalyzing(true);
    setError('');
    setResult(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login first to analyze your resume!');
        setAnalyzing(false);
        return;
      }

      const formData = new FormData();
      formData.append('resume', file);
      formData.append('company', company);

      const response = await fetch('http://localhost:5000/api/resume/analyze', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
        setStep(3);
      } else {
        setError(data.message || 'Analysis failed!');
      }
    } catch (err) {
      setError('Something went wrong! Make sure server is running.');
    }

    setAnalyzing(false);
  };

  return (
    <div style={{minHeight: '100vh', padding: '40px', color: 'white', position: 'relative'}}>

      <style>{`
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translate(-50%, -60%); }
          20% { opacity: 1; transform: translate(-50%, -50%); }
          80% { opacity: 1; transform: translate(-50%, -50%); }
          100% { opacity: 0; transform: translate(-50%, -40%); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        @keyframes slideDown {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Floating Message */}
      {showMessage && (
        <div style={{
          position: 'fixed', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(74,222,128,0.5)',
          borderRadius: '16px', padding: '24px 40px',
          zIndex: 100, textAlign: 'center',
          animation: 'fadeInOut 2.5s ease-in-out forwards',
          color: 'white', fontSize: '1.3rem', fontWeight: 'bold'
        }}>
          ✅ Resume uploaded!<br/>
          <span style={{fontSize: '1rem', color: '#4ade80'}}>Please choose your target company below 👇</span>
        </div>
      )}

      <h1 style={{fontSize: '2.5rem', fontWeight: 'bold', color: '#4ade80'}}>AI Resume Analyzer</h1>
      <p style={{color: '#94a3b8', marginTop: '8px', marginBottom: '40px'}}>Upload your resume — AI will analyze and track your growth over time!</p>

      {/* Upload Box */}
      <div style={{maxWidth: '600px', margin: '0 auto'}}>
        <label htmlFor="resume-upload" style={{cursor: 'pointer'}}>
          <div style={{
            backgroundColor: 'rgba(30, 41, 59, 0.8)',
            border: fileName ? '2px solid #4ade80' : '2px dashed #4ade80',
            borderRadius: '16px', padding: '60px', textAlign: 'center'
          }}>
            <div style={{fontSize: '4rem'}}>{fileName ? '✅' : '📄'}</div>
            <h3 style={{fontSize: '1.5rem', fontWeight: 'bold', marginTop: '16px'}}>
              {fileName ? fileName : 'Drop your resume here'}
            </h3>
            <p style={{color: '#94a3b8', marginTop: '8px'}}>
              {fileName ? 'Resume uploaded successfully!' : 'Click to upload — PDF format only'}
            </p>
            {!fileName && (
              <div style={{backgroundColor: '#4ade80', color: '#111827', padding: '12px 32px', borderRadius: '8px', fontWeight: 'bold', display: 'inline-block', marginTop: '24px'}}>
                Choose File
              </div>
            )}
          </div>
        </label>
        <input id="resume-upload" type="file" accept=".pdf" onChange={handleFileUpload} style={{display: 'none'}}/>
      </div>

      {/* Company Selection */}
      {step >= 2 && (
        <div style={{maxWidth: '600px', margin: '32px auto', animation: 'slideDown 0.5s ease-out'}}>
          <label style={{display: 'block', marginBottom: '12px', fontWeight: 'bold', fontSize: '1.1rem', color: '#4ade80'}}>
            🎯 Select Your Target Company
          </label>
          <select value={company} onChange={(e) => setCompany(e.target.value)}
            style={{width: '100%', padding: '14px', borderRadius: '8px', backgroundColor: 'rgba(30, 41, 59, 0.9)', color: 'white', border: '1px solid #4ade80', fontSize: '1rem'}}>
            <option value="">Choose a company...</option>
            <optgroup label="🇮🇳 Indian IT Companies">
              <option>TCS</option>
              <option>Infosys</option>
              <option>Wipro</option>
              <option>HCL Technologies</option>
              <option>Tech Mahindra</option>
              <option>Mphasis</option>
              <option>LTIMindtree</option>
              <option>Persistent Systems</option>
              <option>Hexaware</option>
              <option>Cognizant</option>
            </optgroup>
            <optgroup label="🌍 Global Tech Giants">
              <option>Google</option>
              <option>Amazon</option>
              <option>Microsoft</option>
              <option>Apple</option>
              <option>Meta</option>
              <option>Netflix</option>
              <option>Adobe</option>
              <option>Salesforce</option>
              <option>Oracle</option>
              <option>IBM</option>
              <option>Nvidia</option>
              <option>Qualcomm</option>
              <option>Cisco</option>
            </optgroup>
            <optgroup label="🚀 Startups and Unicorns">
              <option>Flipkart</option>
              <option>Swiggy</option>
              <option>Zomato</option>
              <option>Razorpay</option>
              <option>CRED</option>
              <option>PhonePe</option>
              <option>Meesho</option>
              <option>Ola</option>
              <option>Uber</option>
              <option>Stripe</option>
              <option>Atlassian</option>
            </optgroup>
            <optgroup label="💼 Consulting and Finance">
              <option>Accenture</option>
              <option>Deloitte</option>
              <option>Goldman Sachs</option>
              <option>JP Morgan</option>
              <option>Morgan Stanley</option>
            </optgroup>
          </select>

          {company && (
            <button onClick={handleAnalyze}
              style={{marginTop: '20px', width: '100%', padding: '14px', borderRadius: '8px', backgroundColor: '#4ade80', color: '#111827', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '1.1rem'}}>
              🤖 Analyze My Resume for {company}
            </button>
          )}
        </div>
      )}

      {/* Error */}
      {error && (
        <div style={{maxWidth: '600px', margin: '16px auto', backgroundColor: 'rgba(127,29,29,0.8)', padding: '16px', borderRadius: '8px', textAlign: 'center'}}>
          ❌ {error}
        </div>
      )}

      {/* Analyzing Loader */}
      {analyzing && (
        <div style={{textAlign: 'center', marginTop: '40px'}}>
          <div style={{width: '50px', height: '50px', border: '4px solid rgba(74,222,128,0.3)', borderTop: '4px solid #4ade80', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto'}}></div>
          <p style={{color: '#4ade80', marginTop: '16px', fontSize: '1.1rem', animation: 'pulse 1.5s infinite'}}>🤖 Gemini AI is analyzing your resume for {company}...</p>
          <p style={{color: '#94a3b8', marginTop: '8px', fontSize: '0.9rem'}}>This may take 15-20 seconds...</p>
        </div>
      )}

      {/* Results */}
      {result && (
        <div style={{maxWidth: '700px', margin: '32px auto', animation: 'slideDown 0.5s ease-out'}}>

          {/* Score Card */}
          <div style={{backgroundColor: 'rgba(30, 41, 59, 0.85)', borderRadius: '16px', padding: '32px', marginBottom: '24px'}}>
            <h3 style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#4ade80'}}>✅ AI Analysis Complete for {company}!</h3>

            <div style={{marginTop: '24px'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
                <span style={{fontWeight: 'bold'}}>Resume Score</span>
                <span style={{color: '#4ade80', fontWeight: 'bold', fontSize: '1.3rem'}}>{result.analysis.score}/100</span>
              </div>
              <div style={{backgroundColor: 'rgba(15,23,42,0.8)', borderRadius: '8px', height: '16px'}}>
                <div style={{backgroundColor: result.analysis.score >= 70 ? '#4ade80' : result.analysis.score >= 50 ? '#fbbf24' : '#f87171', width: `${result.analysis.score}%`, height: '16px', borderRadius: '8px', transition: 'width 1.5s ease'}}></div>
              </div>
            </div>

            {/* Strengths */}
            <div style={{marginTop: '24px'}}>
              <h4 style={{color: '#4ade80', marginBottom: '12px'}}>⭐ Your Strengths</h4>
              {result.analysis.strengths.map((s, i) => (
                <div key={i} style={{backgroundColor: 'rgba(22,101,52,0.3)', padding: '10px 16px', borderRadius: '8px', marginBottom: '8px', borderLeft: '3px solid #4ade80'}}>
                  ✅ {s}
                </div>
              ))}
            </div>

            {/* Improvements */}
            <div style={{marginTop: '20px'}}>
              <h4 style={{color: '#f87171', marginBottom: '12px'}}>🔧 Areas to Improve for {company}</h4>
              {result.analysis.improvements.map((imp, i) => (
                <div key={i} style={{backgroundColor: 'rgba(127,29,29,0.3)', padding: '10px 16px', borderRadius: '8px', marginBottom: '8px', borderLeft: '3px solid #f87171'}}>
                  ❌ {imp}
                </div>
              ))}
            </div>

            {/* Company Tips */}
            {result.analysis.companyTips && (
              <div style={{marginTop: '20px'}}>
                <h4 style={{color: '#fbbf24', marginBottom: '12px'}}>💡 Tips for {company}</h4>
                {result.analysis.companyTips.map((tip, i) => (
                  <div key={i} style={{backgroundColor: 'rgba(120,53,15,0.3)', padding: '10px 16px', borderRadius: '8px', marginBottom: '8px', borderLeft: '3px solid #fbbf24'}}>
                    💡 {tip}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Comparison with previous resume */}
          {result.previousResume && (
            <div style={{backgroundColor: 'rgba(30, 41, 59, 0.85)', borderRadius: '16px', padding: '32px', marginBottom: '24px'}}>
              <h3 style={{fontSize: '1.3rem', fontWeight: 'bold', color: '#fbbf24'}}>📊 Growth Comparison</h3>
              <div style={{display: 'flex', gap: '24px', marginTop: '20px'}}>
                <div style={{flex: 1, textAlign: 'center', backgroundColor: 'rgba(15,23,42,0.5)', padding: '20px', borderRadius: '12px'}}>
                  <p style={{color: '#94a3b8', fontSize: '0.9rem'}}>Previous Score</p>
                  <p style={{fontSize: '2rem', fontWeight: 'bold', color: '#f87171'}}>{result.previousResume.score}/100</p>
                </div>
                <div style={{display: 'flex', alignItems: 'center', fontSize: '2rem'}}>→</div>
                <div style={{flex: 1, textAlign: 'center', backgroundColor: 'rgba(15,23,42,0.5)', padding: '20px', borderRadius: '12px'}}>
                  <p style={{color: '#94a3b8', fontSize: '0.9rem'}}>Current Score</p>
                  <p style={{fontSize: '2rem', fontWeight: 'bold', color: '#4ade80'}}>{result.analysis.score}/100</p>
                </div>
              </div>
              <div style={{textAlign: 'center', marginTop: '16px'}}>
                {result.analysis.score > result.previousResume.score ? (
                  <p style={{color: '#4ade80', fontWeight: 'bold'}}>🎉 You improved by {result.analysis.score - result.previousResume.score} points!</p>
                ) : result.analysis.score === result.previousResume.score ? (
                  <p style={{color: '#fbbf24', fontWeight: 'bold'}}>Same score — keep working on improvements!</p>
                ) : (
                  <p style={{color: '#f87171', fontWeight: 'bold'}}>Score dropped by {result.previousResume.score - result.analysis.score} points — review the improvements!</p>
                )}
              </div>
            </div>
          )}

          {/* Growth History */}
          {result.totalUploads > 1 && (
            <div style={{backgroundColor: 'rgba(30, 41, 59, 0.85)', borderRadius: '16px', padding: '32px', marginBottom: '24px'}}>
              <h3 style={{fontSize: '1.3rem', fontWeight: 'bold', color: '#4ade80'}}>📈 Your Resume Journey ({result.totalUploads} uploads)</h3>
              <div style={{display: 'flex', gap: '12px', marginTop: '16px', flexWrap: 'wrap'}}>
                {result.growthHistory.map((record, i) => (
                  <div key={i} style={{backgroundColor: 'rgba(15,23,42,0.5)', padding: '12px 16px', borderRadius: '8px', textAlign: 'center', minWidth: '100px'}}>
                    <p style={{color: '#94a3b8', fontSize: '0.75rem'}}>Upload {i + 1}</p>
                    <p style={{fontSize: '1.3rem', fontWeight: 'bold', color: record.score >= 70 ? '#4ade80' : '#fbbf24'}}>{record.score}</p>
                    <p style={{color: '#94a3b8', fontSize: '0.75rem'}}>{record.company}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button onClick={() => { setStep(1); setFileName(''); setFile(null); setResult(null); setCompany(''); }}
            style={{width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: 'transparent', color: '#4ade80', fontWeight: 'bold', border: '2px solid #4ade80', cursor: 'pointer', fontSize: '1rem'}}>
            🔄 Analyze Another Resume
          </button>

        </div>
      )}

    </div>
  );
}

export default Resume;