import React, { useState } from 'react';

function Mentors() {
  const mentors = [
    {
      name: 'Rahul Sharma',
      company: 'Micromax / Revolt Motors',
      role: 'Co-Founder & Entrepreneur',
      college: 'RTNMU Nagpur + Harvard Business School',
      skills: ['Business Strategy', 'Product Innovation', 'EV Technology', 'Semiconductors'],
      available: true,
      email: 'rahul@revoltrv.in',
      linkedin: 'https://www.linkedin.com/in/rahulsharma',
      instagram: 'https://www.instagram.com/rahulsharma777?igsh=MWZ2bWR2czV2NGNtMg==',
      facebook: 'https://facebook.com',
      wikipedia: 'https://en.wikipedia.org/wiki/Rahul_Sharma_(actor)',
      journey: `Rahul Sharma is a prominent Indian entrepreneur and co-founder of Micromax Informatics, one of India's largest consumer electronics brands. Born into a modest family (his father was a school principal), he earned a degree in Mechanical Engineering from RTNMU Nagpur and a Bachelor's in Commerce from the University of Saskatchewan, Canada. He also completed the Owner/President Management program at Harvard Business School. He began his career as a consultant for JETRO (Japan External Trade Organisation). In 2000, he co-founded Micromax which disrupted the Indian mobile market by offering affordable long-battery-life phones, briefly challenging Samsung. In 2017, he founded Revolt Intellicorp launching India's first AI-powered electric motorcycle. He co-founded MiPhi Semiconductors to boost India's homegrown chip industry and heads Bhagwati Products Limited (BPL) with revenues scaling to ₹6,200 crore. Awards: GQ Man of the Year (2013) and Forbes Person of the Year (2010). He is married to Bollywood actress Asin Thottumkal.`,
    },
    {
      name: 'Priya Patel',
      company: 'Microsoft',
      role: 'SDE-1',
      college: 'COEP Pune',
      skills: ['React', 'Node.js', 'TypeScript', 'Azure'],
      available: true,
      email: 'priya.patel@outlook.com',
      linkedin: 'https://linkedin.com/in/priyapatel',
      instagram: 'https://instagram.com/priyapatel_dev',
      facebook: 'https://facebook.com',
      wikipedia: '',
      journey: `Priya Patel graduated from the College of Engineering Pune (COEP), one of India's most prestigious engineering institutions. She specialized in Computer Engineering and developed strong full-stack development skills. She contributed to open-source React libraries with 500+ GitHub stars and secured a pre-placement offer from Microsoft after a successful internship where she built an internal dashboard used by 200+ employees. At Microsoft, she works on the Azure DevOps team. Her tips: focus on DSA fundamentals, build real projects, and never miss mock interviews.`,
    },
    {
      name: 'Amit Singh',
      company: 'Amazon',
      role: 'SDE-1',
      college: 'RAIT Mumbai',
      skills: ['Java', 'DSA', 'Spring Boot', 'AWS'],
      available: false,
      email: 'amit.singh@amazon.com',
      linkedin: 'https://linkedin.com/in/amitsingh',
      instagram: 'https://instagram.com/amitsingh_codes',
      facebook: 'https://facebook.com',
      wikipedia: '',
      journey: `Amit Singh from RAIT Mumbai cracked Amazon after 8 months of dedicated preparation, solving 500+ LeetCode problems focused on trees, graphs, and DP. He interned at a Pune-based startup building microservices with Spring Boot on AWS. His Amazon interview included a system design round where he designed a URL shortener. He recommends solving problems topic-wise and practicing behavioral questions using the STAR method. He currently works on Amazon's supply chain optimization team in Hyderabad.`,
    },
    {
      name: 'Sneha Joshi',
      company: 'TCS Research',
      role: 'ML Engineer',
      college: 'VIT Pune',
      skills: ['Python', 'Machine Learning', 'TensorFlow', 'Data Science'],
      available: true,
      email: 'sneha.joshi@tcs.com',
      linkedin: 'https://linkedin.com/in/snehajoshi',
      instagram: 'https://instagram.com/sneha_ml',
      facebook: 'https://facebook.com',
      wikipedia: '',
      journey: `Sneha Joshi from VIT Pune completed Andrew Ng's Deep Learning specialization in 2nd year and built a crop disease detection model that won the best project award. She published a research paper on NLP-based sentiment analysis co-authored with her professor. TCS Research shortlisted her directly from campus for their AI & ML division. She advises students to go deep into one ML domain and participate in Kaggle competitions.`,
    },
    {
      name: 'Rohan Desai',
      company: 'Infosys',
      role: 'Technology Analyst',
      college: 'PICT Pune',
      skills: ['SQL', 'Java', 'Spring MVC', 'Oracle DB'],
      available: false,
      email: 'rohan.desai@infosys.com',
      linkedin: 'https://linkedin.com/in/rohandesai',
      instagram: 'https://instagram.com/rohan_tech',
      facebook: 'https://facebook.com',
      wikipedia: '',
      journey: `Rohan Desai from PICT Pune joined Infosys through InfyTQ platform. He was promoted to Technology Analyst in just 18 months due to his exceptional performance on a banking domain project. He built a loan management system that reduced processing time by 40%. His advice: master Java and SQL fundamentals and always write clean, maintainable code.`,
    },
    {
      name: 'Neha Kulkarni',
      company: 'Wipro',
      role: 'Senior Test Engineer',
      college: 'MIT Pune',
      skills: ['Selenium', 'Agile', 'JIRA', 'API Testing'],
      available: true,
      email: 'neha.kulkarni@wipro.com',
      linkedin: 'https://linkedin.com/in/nehakulkarni',
      instagram: 'https://instagram.com/neha_qa',
      facebook: 'https://facebook.com',
      wikipedia: '',
      journey: `Neha Kulkarni from MIT Pune built a career in software quality assurance. She is ISTQB certified and leads a team of 5 testers on a US healthcare application at Wipro. She specializes in Selenium test automation and REST API testing. She conducts free QA workshops for students on LinkedIn Live every month and says: "every feature you use daily works because a tester ensured it."`,
    },
    {
      name: 'Arjun Patil',
      company: 'Google',
      role: 'SDE-2',
      college: 'WCE Sangli',
      skills: ['DSA', 'System Design', 'Kubernetes', 'Go Lang'],
      available: true,
      email: 'arjun.patil@google.com',
      linkedin: 'https://linkedin.com/in/arjunpatil',
      instagram: 'https://instagram.com/arjun_at_google',
      facebook: 'https://facebook.com',
      wikipedia: '',
      journey: `Arjun Patil from WCE Sangli (Tier-2 college) cracked Google SDE-2, proving college tier doesn't define your career. He spent 2 years at a Pune startup building distributed backend systems in Go, then dedicated 6 months to Google prep — solving 600+ LeetCode problems and reading Designing Data-Intensive Applications. He cleared 5 rounds including a system design round where he designed Google Maps routing. He now works on Google Cloud infrastructure in Bangalore and mentors students from smaller colleges.`,
    },
  ];

  const [selectedMentor, setSelectedMentor] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConnect = (mentor) => {
    if (!mentor.available) return;
    setSelectedMentor(mentor);
    setShowChat(false);
    setMessages([]);
  };

  const handleClose = () => {
    setSelectedMentor(null);
    setShowChat(false);
    setMessages([]);
    setUserInput('');
  };

  const handleKnowAbout = () => {
    setShowChat(true);
    setMessages([{ role: 'assistant', text: `Hi! 👋 I can tell you all about ${selectedMentor.name}'s journey to ${selectedMentor.company}. Ask me anything about their background, tips, or how they achieved their success! 🎯` }]);
  };

  const sendMessage = async () => {
    if (!userInput.trim() || loading) return;
    const newMessages = [...messages, { role: 'user', text: userInput }];
    setMessages(newMessages);
    setUserInput('');
    setLoading(true);
    try {
      const response = await fetch('https://campusconnect-b7wn.onrender.com/api/resume/mentor-chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    mentorName: selectedMentor.name,
    mentorInfo: selectedMentor.journey,
    userMessage: userInput
  })
});
const data = await response.json();
setMessages([...newMessages, { role: 'assistant', text: data.reply }]);
    } catch {
      setMessages([...newMessages, { role: 'assistant', text: 'Sorry, something went wrong. Please try again!' }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ backgroundColor: 'transparent', color: 'white', minHeight: '100vh', padding: '40px' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#4ade80' }}>Senior Mentor Connect</h1>
      <p style={{ color: '#94a3b8', marginTop: '8px', marginBottom: '40px' }}>Connect with placed seniors for guidance and resume reviews</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', maxWidth: '1100px' }}>
        {mentors.map((mentor, index) => (
          <div key={index} style={{ backgroundColor: '#1e293b', borderRadius: '16px', padding: '24px', border: mentor.available ? '1px solid #4ade80' : '1px solid #374151' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#4ade80', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>
              {mentor.name.charAt(0)}
            </div>
            <h3 style={{ fontWeight: 'bold', fontSize: '1.1rem', marginTop: '12px' }}>{mentor.name}</h3>
            <p style={{ color: '#4ade80', fontSize: '0.9rem' }}>{mentor.role} at {mentor.company}</p>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '4px' }}>{mentor.college}</p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
              {mentor.skills.map(skill => (
                <span key={skill} style={{ backgroundColor: '#0f172a', color: '#4ade80', padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem' }}>{skill}</span>
              ))}
            </div>
            <button onClick={() => handleConnect(mentor)} style={{ marginTop: '16px', width: '100%', padding: '10px', borderRadius: '8px', fontWeight: 'bold', border: 'none', cursor: mentor.available ? 'pointer' : 'not-allowed', backgroundColor: mentor.available ? '#4ade80' : '#374151', color: mentor.available ? '#111827' : '#94a3b8', fontSize: '0.9rem' }}>
              {mentor.available ? 'Connect Now' : 'Not Available'}
            </button>
          </div>
        ))}
      </div>

      {selectedMentor && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#1e293b', borderRadius: '20px', padding: '32px', width: '500px', maxWidth: '92%', border: '1px solid #4ade80', maxHeight: '90vh', overflowY: 'auto' }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#4ade80', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', fontWeight: 'bold', color: '#111827' }}>
                  {selectedMentor.name.charAt(0)}
                </div>
                <div>
                  <h3 style={{ fontWeight: 'bold', fontSize: '1.1rem', margin: 0 }}>{selectedMentor.name}</h3>
                  <p style={{ color: '#4ade80', fontSize: '0.85rem', margin: '4px 0 0' }}>{selectedMentor.role} at {selectedMentor.company}</p>
                </div>
              </div>
              <button onClick={handleClose} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '1.5rem', cursor: 'pointer' }}>✕</button>
            </div>

            {!showChat ? (
              <>
                <p style={{ color: '#94a3b8', marginBottom: '20px', fontSize: '0.9rem' }}>How would you like to connect with {selectedMentor.name}?</p>

                <a href={`mailto:${selectedMentor.email}`} style={{ textDecoration: 'none' }}>
                  <div style={{ backgroundColor: '#0f172a', borderRadius: '12px', padding: '16px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid #334155', cursor: 'pointer' }}>
                    <span style={{ fontSize: '1.8rem' }}>📧</span>
                    <div>
                      <p style={{ fontWeight: 'bold', color: 'white', margin: 0 }}>Send an Email</p>
                      <p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: '4px 0 0' }}>Send a direct email to {selectedMentor.name}</p>
                    </div>
                  </div>
                </a>

                <div style={{ backgroundColor: '#0f172a', borderRadius: '12px', padding: '16px', marginBottom: '12px', border: '1px solid #334155' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                    <span style={{ fontSize: '1.8rem' }}>🔗</span>
                    <div>
                      <p style={{ fontWeight: 'bold', color: 'white', margin: 0 }}>Connect on Social Media</p>
                      <p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: '4px 0 0' }}>Reach out on their social platforms</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', paddingLeft: '52px' }}>
                    <a href={selectedMentor.linkedin} target="_blank" rel="noreferrer" style={{ backgroundColor: '#0077b5', color: 'white', padding: '6px 14px', borderRadius: '8px', fontSize: '0.8rem', textDecoration: 'none', fontWeight: 'bold' }}>LinkedIn</a>
                    <a href={selectedMentor.instagram} target="_blank" rel="noreferrer" style={{ backgroundColor: '#e1306c', color: 'white', padding: '6px 14px', borderRadius: '8px', fontSize: '0.8rem', textDecoration: 'none', fontWeight: 'bold' }}>Instagram</a>
                    <a href={selectedMentor.facebook} target="_blank" rel="noreferrer" style={{ backgroundColor: '#1877f2', color: 'white', padding: '6px 14px', borderRadius: '8px', fontSize: '0.8rem', textDecoration: 'none', fontWeight: 'bold' }}>Facebook</a>
                    {selectedMentor.wikipedia && (
                      <a href={selectedMentor.wikipedia} target="_blank" rel="noreferrer" style={{ backgroundColor: '#6b7280', color: 'white', padding: '6px 14px', borderRadius: '8px', fontSize: '0.8rem', textDecoration: 'none', fontWeight: 'bold' }}>Wikipedia</a>
                    )}
                  </div>
                </div>

                <div onClick={handleKnowAbout} style={{ backgroundColor: '#0f172a', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid #4ade80', cursor: 'pointer' }}>
                  <span style={{ fontSize: '1.8rem' }}>🤖</span>
                  <div>
                    <p style={{ fontWeight: 'bold', color: '#4ade80', margin: 0 }}>Know About This Mentor</p>
                    <p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: '4px 0 0' }}>Ask AI about their journey, tips & success story</p>
                  </div>
                </div>
              </>
            ) : (
              <div>
                <button onClick={() => setShowChat(false)} style={{ background: 'none', border: 'none', color: '#4ade80', cursor: 'pointer', marginBottom: '16px', fontSize: '0.9rem' }}>← Back to options</button>
                <div style={{ backgroundColor: '#0f172a', borderRadius: '12px', height: '300px', overflowY: 'auto', padding: '16px', marginBottom: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {messages.map((msg, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                      <div style={{ maxWidth: '82%', padding: '10px 14px', borderRadius: '12px', backgroundColor: msg.role === 'user' ? '#4ade80' : '#1e293b', color: msg.role === 'user' ? '#111827' : 'white', fontSize: '0.85rem', border: msg.role === 'assistant' ? '1px solid #334155' : 'none', lineHeight: '1.5' }}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                      <div style={{ padding: '10px 14px', borderRadius: '12px', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#4ade80', fontSize: '0.85rem' }}>Thinking... ✨</div>
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input value={userInput} onChange={(e) => setUserInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMessage()} placeholder={`Ask about ${selectedMentor.name}...`} style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: 'white', fontSize: '0.85rem', outline: 'none' }} />
                  <button onClick={sendMessage} disabled={loading} style={{ padding: '10px 18px', borderRadius: '8px', backgroundColor: '#4ade80', color: '#111827', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '0.9rem' }}>Send</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Mentors;