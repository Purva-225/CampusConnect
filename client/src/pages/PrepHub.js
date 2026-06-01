import React, { useState, useEffect } from 'react';

function PrepHub() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [showPopup, setShowPopup] = useState(false);
  const [showDSAModal, setShowDSAModal] = useState(false);
  const [popupDismissed, setPopupDismissed] = useState(false);

  const companies = ['All', 'TCS', 'Infosys', 'Wipro', 'Google', 'Amazon', 'Microsoft'];

  const dsaSheets = [
    {
      name: "Striver's A to Z Sheet",
      description: "Most comprehensive DSA sheet - 455 problems covering all topics from basics to advanced",
      icon: "🔥",
      color: "#f97316",
      url: "https://takeuforward.org/dsa/strivers-a2z-sheet-learn-dsa-a-to-z",
      tag: "Most Popular"
    },
    {
      name: "Love Babbar DSA Sheet",
      description: "450 handpicked DSA questions - perfect for placement preparation in 3-6 months",
      icon: "💛",
      color: "#eab308",
      url: "https://drive.google.com/file/d/1FMdN_OCfOI0iAeDlqswCiC2DZzD4nPsb/view",
      tag: "Classic"
    },
    {
      name: "Apna College DSA Sheet",
      description: "Structured topic-wise DSA sheet with video solutions - great for beginners",
      icon: "🎓",
      color: "#4ade80",
      url: "https://dsa.apnacollege.in/",
      tag: "Beginner Friendly"
    }
  ];

  const questions = [
    { company: 'TCS', type: 'DSA', question: 'Reverse a linked list' },
    { company: 'Google', type: 'DSA', question: 'Find longest substring without repeating characters' },
    { company: 'Amazon', type: 'DSA', question: 'Two Sum problem using HashMap' },
    { company: 'Infosys', type: 'Aptitude', question: 'A train travels 60km in 1 hour. Find speed in m/s' },
    { company: 'Wipro', type: 'Aptitude', question: 'Find the next number in series: 2, 4, 8, 16, ?' },
    { company: 'TCS', type: 'HR', question: 'Tell me about yourself' },
    { company: 'Microsoft', type: 'DSA', question: 'Check if a binary tree is balanced' },
    { company: 'Amazon', type: 'HR', question: 'Tell me about a time you showed leadership' },
    { company: 'Google', type: 'DSA', question: 'Implement LRU Cache' },
    { company: 'Infosys', type: 'HR', question: 'Where do you see yourself in 5 years?' },
    { company: 'cognizant', type: 'DSA', question: 'Merge Sorted Array: Merge two sorted arrays nums1 and nums2 into nums1 in non-decreasing order, where nums1 has extra space to hold all elements' },
  ];

  const filtered = activeFilter === 'All' ? questions : questions.filter(q => q.company.toLowerCase() === activeFilter.toLowerCase());

  useEffect(() => {
    if (popupDismissed) return;
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, [popupDismissed]);

  const handleOpenDSA = () => {
    setShowPopup(false);
    setShowDSAModal(true);
  };

  const handleCancel = () => {
    setShowPopup(false);
    setPopupDismissed(true);
  };

  return (
    <div style={{ backgroundColor: 'transparent', color: 'white', minHeight: '100vh', padding: '40px' }}>

      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#4ade80' }}>Placement Prep Hub</h1>
      <p style={{ color: '#94a3b8', marginTop: '8px', marginBottom: '32px' }}>DSA, Aptitude and HR questions filtered by company</p>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
        {companies.map(company => (
          <button
            key={company}
            onClick={() => setActiveFilter(company)}
            style={{
              backgroundColor: activeFilter === company ? '#4ade80' : '#1e293b',
              color: activeFilter === company ? '#111827' : 'white',
              padding: '8px 20px', borderRadius: '20px', border: '1px solid #4ade80',
              cursor: 'pointer', fontSize: '0.9rem',
              fontWeight: activeFilter === company ? 'bold' : 'normal', transition: 'all 0.2s'
            }}>
            {company}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filtered.map((q, index) => (
          <div key={index} style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontWeight: 'bold', fontSize: '1rem' }}>{q.question}</p>
              <p style={{ color: '#94a3b8', marginTop: '4px', fontSize: '0.85rem' }}>{q.company} • {q.type}</p>
            </div>
            <span style={{
              backgroundColor: q.type === 'DSA' ? '#166534' : q.type === 'Aptitude' ? '#1e3a5f' : '#4a1d96',
              color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', whiteSpace: 'nowrap', marginLeft: '12px'
            }}>
              {q.type}
            </span>
          </div>
        ))}
      </div>

      {showPopup && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#0f172a', border: '2px solid #4ade80', borderRadius: '20px', padding: '40px', maxWidth: '440px', width: '90%', textAlign: 'center', boxShadow: '0 0 40px rgba(74,222,128,0.3)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📚</div>
            <h2 style={{ color: '#4ade80', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '12px' }}>Want to Open a DSA Sheet?</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '32px', lineHeight: '1.6' }}>
              You have been on Prep Hub for a while! Level up with a structured DSA sheet - Striver, Love Babbar, or Apna College.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <button onClick={handleOpenDSA} style={{ backgroundColor: '#4ade80', color: '#111827', padding: '12px 28px', borderRadius: '10px', border: 'none', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}>
                Open DSA Sheet 📖
              </button>
              <button onClick={handleCancel} style={{ backgroundColor: '#1e293b', color: '#94a3b8', padding: '12px 28px', borderRadius: '10px', border: '1px solid #374151', fontSize: '1rem', cursor: 'pointer' }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showDSAModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#0f172a', border: '2px solid #4ade80', borderRadius: '20px', padding: '40px', maxWidth: '560px', width: '90%', boxShadow: '0 0 40px rgba(74,222,128,0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
              <h2 style={{ color: '#4ade80', fontSize: '1.5rem', fontWeight: 'bold' }}>📋 Choose Your DSA Sheet</h2>
              <button onClick={() => setShowDSAModal(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '1.5rem', cursor: 'pointer' }}>✕</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {dsaSheets.map((sheet, i) => (
                <div key={i} style={{ backgroundColor: '#1e293b', borderRadius: '14px', padding: '20px', border: `1px solid ${sheet.color}33`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                      <span style={{ fontSize: '1.4rem' }}>{sheet.icon}</span>
                      <span style={{ fontWeight: 'bold', fontSize: '1rem', color: 'white' }}>{sheet.name}</span>
                      <span style={{ backgroundColor: `${sheet.color}22`, color: sheet.color, padding: '2px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold' }}>{sheet.tag}</span>
                    </div>
                    <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: '1.5' }}>{sheet.description}</p>
                  </div>
                  <a href={sheet.url} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: sheet.color, color: '#111827', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', fontSize: '0.85rem', textDecoration: 'none', whiteSpace: 'nowrap' }}>
                    Open →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default PrepHub;