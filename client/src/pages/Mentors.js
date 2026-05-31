import React, { useState } from 'react';

function Mentors() {
  const mentors = [
    { name: 'Rahul Sharma', company: 'Google', role: 'SDE-2', 
      college: 'VJTI Mumbai', skills: ['DSA', 'System Design'], 
      available: true, Instagram·imrahulsharma3,  X·rahulsharma,
      linkedin: linkedin.com/in/rahul-sharma-4a3135159, instagram: 'https://instagram.com',
       journey: 'Rahul graduated from VJTI Mumbai and cracked Google after 6 months of DSA preparation. He focused on System Design and solved 400+ LeetCode problems. Also he is a Co-FounderSkrapbaeApr 2018 - Apr 2021 · 3 yrs 1 moMumbai Area, India, 
       Rahul Sharma is a prominent Indian entrepreneur best known as the co-founder of consumer electronics giant Micromax Informatics.
        Born into a modest family to a school principal, 
        he transitioned from a technology career into building one of India's largest domestic mobile handset brands before expanding into the electric vehicle and semiconductor industries. 

SEMICON India
Education & Early Career
Academic Background: He holds a degree in Mechanical Engineering from Rashtrasant Tukadoji Maharaj Nagpur University, 
a Bachelor's in Commerce from the University of Saskatchewan (Canada), 
and participated in the Owner/President Management program at Harvard Business School.
Corporate Start: He began building tech-focused businesses and gained early-career experience working as a consultant for JETRO 
(Japan External Trade Organisation). 
Business & Entrepreneurial Ventures
Micromax Informatics: In 2000, Sharma co-founded Micromax alongside Rajesh Aggarwal, Vikas Jain, and Sumeet Arora. 
The company famously disrupted the Indian mobile market by introducing affordable, long-battery-life feature phones and smartphones, briefly challenging global leaders like Samsung.
Revolt Motors: In 2017, he shifted his focus to sustainable mobility and founded Revolt Intellicorp, releasing India's first AI-powered electric motorcycle.
MiPhi Semiconductors: Expanding into hardware design, he co-founded MiPhi Semiconductors to drive homegrown technological innovation in India's semiconductor sector. 
Personal Life
 He is married to former Bollywood actress Asin Thottumkal (known for her roles in Ghajini and Ready). 
 The couple tied the knot in 2016 and share a daughter.
Recognition: His entrepreneurial achievements earned him notable accolades, 
including GQ Man of the Year (2013) and Forbes Person of the Year (2010). 
Rahul Sharma, the co-founder of Micromax, is currently leading a massively successful electronics manufacturing business. 
He is operating out of India and heading Bhagwati Products Limited (BPL) and MiPhi Semiconductors, which have seen a resurgence with revenues scaling into a ₹6,200 crore empire.
 He is married to former Bollywood actress Asin Thottumkal. If you are referring to the other notable figures with the same name:
Rahul Sharma (Television Actor): Best known for his roles in shows like Yeh Rishta Kya Kehlata Hai and Kaisa Hai Yeh Rishta Anjaana,
 he is actively starring in Indian soap operas and creating travel vlogs on YouTube. 
},
    { name: 'Priya Patel', company: 'Microsoft', role: 'SDE-1', college: 'COEP Pune', skills: ['React', 'Node.js'], available: true, email: 'priya@example.com', linkedin: 'https://linkedin.com', instagram: 'https://instagram.com', journey: 'Priya from COEP Pune joined Microsoft as SDE-1. She mastered React and Node.js through projects and internships during college.' },
    { name: 'Amit Singh', company: 'Amazon', role: 'SDE-1', college: 'RAIT Mumbai', skills: ['Java', 'DSA'], available: false, email: 'amit@example.com', linkedin: 'https://linkedin.com', instagram: 'https://instagram.com', journey: 'Amit from RAIT Mumbai cracked Amazon with strong Java and DSA skills. He practiced consistently for 8 months.' },
    { name: 'Sneha Joshi', company: 'TCS', role: 'Developer', college: 'VIT Pune', skills: ['Python', 'ML'], available: true, email: 'sneha@example.com', linkedin: 'https://linkedin.com', instagram: 'https://instagram.com', journey: 'Sneha from VIT Pune joined TCS as a Developer. She specialized in Python and Machine Learning through online courses and projects.' },
    { name: 'Rohan Desai', company: 'Infosys', role: 'Analyst', college: 'PICT Pune', skills: ['SQL', 'Java'], available: false, email: 'rohan@example.com', linkedin: 'https://linkedin.com', instagram: 'https://instagram.com', journey: 'Rohan from PICT Pune joined Infosys as an Analyst. He built strong SQL and Java fundamentals through academic projects.' },
    { name: 'Neha Kulkarni', company: 'Wipro', role: 'Developer', college: 'MIT Pune', skills: ['Testing', 'Agile'], available: true, email: 'neha@example.com', linkedin: 'https://linkedin.com', instagram: 'https://instagram.com', journey: 'Neha from MIT Pune joined Wipro as a Developer. She focused on software testing and Agile methodologies.' },
    { name: 'Arjun Patil', company: 'Google', role: 'SDE-2', college: 'WCE Sangli', skills: ['DSA', 'System Design', 'Cloud'], available: true, email: 'arjun@example.com', linkedin: 'https://linkedin.com', instagram: 'https://instagram.com', journey: 'Arjun from WCE Sangli cracked Google SDE-2 with expertise in DSA, System Design and Cloud technologies. He had 2 years of prior experience.' },
  ];

  const [selectedMentor, setSelectedMentor] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConnect = (mentor) => {
    if (!mentor.available) return;
    setSelectedMentor(mentor);
    setShowOptions(true);
    setShowChat(false);
    setMessages([]);
  };

  const handleClose = () => {
    setSelectedMentor(null);
    setShowOptions(false);
    setShowChat(false);
    setMessages([]);
    setUserInput('');
  };

  const handleKnowAbout = () => {
    setShowChat(true);
    setMessages([{
      role: 'assistant',
      text: `Hi! I'm here to tell you about ${selectedMentor.name}'s journey to ${selectedMentor.company}. Ask me anything! 🎯`
    }]);
  };

  const sendMessage = async () => {
    if (!userInput.trim()) return;
    const newMessages = [...messages, { role: 'user', text: userInput }];
    setMessages(newMessages);
    setUserInput('');
    setLoading(true);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: `You are an AI assistant representing mentor ${selectedMentor.name} who works as ${selectedMentor.role} at ${selectedMentor.company}. They studied at ${selectedMentor.college} and their skills include ${selectedMentor.skills.join(', ')}. Their journey: ${selectedMentor.journey}. Answer questions about their journey, tips, and success story briefly and helpfully for Indian college students.`,
          messages: [{ role: 'user', content: userInput }]
        })
      });
      const data = await response.json();
      const reply = data.content[0].text;
      setMessages([...newMessages, { role: 'assistant', text: reply }]);
    } catch (err) {
      setMessages([...newMessages, { role: 'assistant', text: 'Sorry, something went wrong. Please try again!' }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ backgroundColor: 'transparent', color: 'white', minHeight: '100vh', padding: '40px' }}>

      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#4ade80' }}>Senior Mentor Connect</h1>
      <p style={{ color: '#94a3b8', marginTop: '8px', marginBottom: '40px' }}>Connect with placed seniors for guidance and resume reviews</p>

      {/* Mentor Cards Grid */}
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
                <span key={skill} style={{ backgroundColor: '#0f172a', color: '#4ade80', padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem' }}>
                  {skill}
                </span>
              ))}
            </div>

            <button
              onClick={() => handleConnect(mentor)}
              style={{ marginTop: '16px', width: '100%', padding: '10px', borderRadius: '8px', fontWeight: 'bold', border: 'none', cursor: mentor.available ? 'pointer' : 'not-allowed', backgroundColor: mentor.available ? '#4ade80' : '#374151', color: mentor.available ? '#111827' : '#94a3b8', fontSize: '0.9rem' }}>
              {mentor.available ? 'Connect Now' : 'Not Available'}
            </button>

          </div>
        ))}
      </div>

      {/* Popup Modal */}
      {showOptions && selectedMentor && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#1e293b', borderRadius: '20px', padding: '32px', width: '480px', maxWidth: '90%', border: '1px solid #4ade80', maxHeight: '90vh', overflowY: 'auto' }}>

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#4ade80', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', fontWeight: 'bold', color: '#111827' }}>
                  {selectedMentor.name.charAt(0)}
                </div>
                <div>
                  <h3 style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{selectedMentor.name}</h3>
                  <p style={{ color: '#4ade80', fontSize: '0.85rem' }}>{selectedMentor.role} at {selectedMentor.company}</p>
                </div>
              </div>
              <button onClick={handleClose} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '1.5rem', cursor: 'pointer' }}>✕</button>
            </div>

            {!showChat ? (
              <>
                <p style={{ color: '#94a3b8', marginBottom: '20px', fontSize: '0.9rem' }}>How would you like to connect with {selectedMentor.name}?</p>

                {/* Option 1 - Mail */}
                <a href={`mailto:${selectedMentor.email}`} style={{ textDecoration: 'none' }}>
                  <div style={{ backgroundColor: '#0f172a', borderRadius: '12px', padding: '16px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid #334155', cursor: 'pointer' }}>
                    <span style={{ fontSize: '1.8rem' }}>📧</span>
                    <div>
                      <p style={{ fontWeight: 'bold', color: 'white' }}>Send an Email</p>
                      <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Send a direct email to {selectedMentor.name}</p>
                    </div>
                  </div>
                </a>

                {/* Option 2 - Social Media */}
                <div style={{ backgroundColor: '#0f172a', borderRadius: '12px', padding: '16px', marginBottom: '12px', border: '1px solid #334155' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                    <span style={{ fontSize: '1.8rem' }}>🔗</span>
                    <div>
                      <p style={{ fontWeight: 'bold', color: 'white' }}>Connect on Social Media</p>
                      <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Reach out on their social platforms</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', paddingLeft: '52px' }}>
                    <a href={selectedMentor.linkedin} target="_blank" rel="noreferrer" style={{ backgroundColor: '#0077b5', color: 'white', padding: '6px 14px', borderRadius: '8px', fontSize: '0.8rem', textDecoration: 'none', fontWeight: 'bold' }}>LinkedIn</a>
                    <a href={selectedMentor.instagram} target="_blank" rel="noreferrer" style={{ backgroundColor: '#e1306c', color: 'white', padding: '6px 14px', borderRadius: '8px', fontSize: '0.8rem', textDecoration: 'none', fontWeight: 'bold' }}>Instagram</a>
                    <a href="https://facebook.com" target="_blank" rel="noreferrer" style={{ backgroundColor: '#1877f2', color: 'white', padding: '6px 14px', borderRadius: '8px', fontSize: '0.8rem', textDecoration: 'none', fontWeight: 'bold' }}>Facebook</a>
                  </div>
                </div>

                {/* Option 3 - Know About */}
                <div onClick={handleKnowAbout} style={{ backgroundColor: '#0f172a', borderRadius: '12px', padding: '16px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid #4ade80', cursor: 'pointer' }}>
                  <span style={{ fontSize: '1.8rem' }}>🤖</span>
                  <div>
                    <p style={{ fontWeight: 'bold', color: '#4ade80' }}>Know About This Mentor</p>
                    <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Ask AI about their journey, tips & success story</p>
                  </div>
                </div>
              </>
            ) : (
              /* AI Chat Box */
              <div>
                <button onClick={() => setShowChat(false)} style={{ background: 'none', border: 'none', color: '#4ade80', cursor: 'pointer', marginBottom: '12px', fontSize: '0.9rem' }}>← Back to options</button>

                <div style={{ backgroundColor: '#0f172a', borderRadius: '12px', height: '300px', overflowY: 'auto', padding: '16px', marginBottom: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {messages.map((msg, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                      <div style={{ maxWidth: '80%', padding: '10px 14px', borderRadius: '12px', backgroundColor: msg.role === 'user' ? '#4ade80' : '#1e293b', color: msg.role === 'user' ? '#111827' : 'white', fontSize: '0.85rem', border: msg.role === 'assistant' ? '1px solid #334155' : 'none' }}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                      <div style={{ padding: '10px 14px', borderRadius: '12px', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#4ade80', fontSize: '0.85rem' }}>
                        Thinking...
                      </div>
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder={`Ask about ${selectedMentor.name}'s journey...`}
                    style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: 'white', fontSize: '0.85rem', outline: 'none' }}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={loading}
                    style={{ padding: '10px 18px', borderRadius: '8px', backgroundColor: '#4ade80', color: '#111827', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '0.9rem' }}>
                    Send
                  </button>
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