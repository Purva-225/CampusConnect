import { useState } from 'react';

function Resume() {
  const [step, setStep] = useState(1);
  const [fileName, setFileName] = useState('');
  const [company, setCompany] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        setStep(2);
      }, 2500);
    }
  };

  const handleAnalyze = () => {
    setAnalyzing(true);
    setResult(false);
    setTimeout(() => {
      setAnalyzing(false);
      setResult(true);
      setStep(3);
    }, 3000);
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
      <p style={{color: '#94a3b8', marginTop: '8px', marginBottom: '40px'}}>Upload your resume and get instant AI-powered feedback</p>

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

      {/* Step 2 - Company Selection - shows after message disappears */}
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
              <option>Intel</option>
              <option>Nvidia</option>
              <option>Qualcomm</option>
              <option>Cisco</option>
            </optgroup>
            <optgroup label="🚀 Startups and Unicorns">
              <option>Flipkart</option>
              <option>Swiggy</option>
              <option>Zomato</option>
              <option>Paytm</option>
              <option>Razorpay</option>
              <option>CRED</option>
              <option>Meesho</option>
              <option>PhonePe</option>
              <option>Ola</option>
              <option>Uber</option>
              <option>Atlassian</option>
              <option>Stripe</option>
              <option>Airbnb</option>
            </optgroup>
            <optgroup label="💼 Consulting and Finance">
              <option>Accenture</option>
              <option>Deloitte</option>
              <option>Goldman Sachs</option>
              <option>JP Morgan</option>
              <option>Morgan Stanley</option>
              <option>Deutsche Bank</option>
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

      {/* Analyzing Loader */}
      {analyzing && (
        <div style={{textAlign: 'center', marginTop: '40px'}}>
          <div style={{width: '50px', height: '50px', border: '4px solid rgba(74,222,128,0.3)', borderTop: '4px solid #4ade80', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto'}}></div>
          <p style={{color: '#4ade80', marginTop: '16px', fontSize: '1.1rem', animation: 'pulse 1.5s infinite'}}>🤖 AI is analyzing your resume for {company}...</p>
        </div>
      )}

      {/* Results */}
      {result && (
        <div style={{maxWidth: '600px', margin: '32px auto', backgroundColor: 'rgba(30, 41, 59, 0.85)', borderRadius: '16px', padding: '32px', backdropFilter: 'blur(10px)', animation: 'slideDown 0.5s ease-out'}}>
          <h3 style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#4ade80'}}>✅ Analysis Complete for {company}!</h3>

          <div style={{marginTop: '24px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
              <span>Resume Score</span>
              <span style={{color: '#4ade80', fontWeight: 'bold'}}>72/100</span>
            </div>
            <div style={{backgroundColor: 'rgba(15,23,42,0.8)', borderRadius: '8px', height: '12px'}}>
              <div style={{backgroundColor: '#4ade80', width: '72%', height: '12px', borderRadius: '8px'}}></div>
            </div>
          </div>

          <div style={{marginTop: '24px'}}>
            <h4 style={{color: '#4ade80', marginBottom: '12px'}}>⭐ Your Strengths</h4>
            <ul style={{color: '#94a3b8', lineHeight: '2', paddingLeft: '20px'}}>
              <li>Good use of action verbs</li>
              <li>Projects section is strong</li>
              <li>Clear education details</li>
            </ul>
          </div>

          <div style={{marginTop: '16px'}}>
            <h4 style={{color: '#f87171', marginBottom: '12px'}}>🔧 Areas to Improve for {company}</h4>
            <ul style={{color: '#94a3b8', lineHeight: '2', paddingLeft: '20px'}}>
              <li>Add more quantifiable achievements</li>
              <li>Missing keywords specific to {company}</li>
              <li>Summary section needs improvement</li>
              <li>Add relevant certifications</li>
            </ul>
          </div>

          <button onClick={() => { setStep(1); setFileName(''); setResult(false); setCompany(''); }}
            style={{marginTop: '24px', width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: 'transparent', color: '#4ade80', fontWeight: 'bold', border: '2px solid #4ade80', cursor: 'pointer', fontSize: '1rem'}}>
            🔄 Analyze Another Resume
          </button>
        </div>
      )}

    </div>
  );
}

export default Resume;