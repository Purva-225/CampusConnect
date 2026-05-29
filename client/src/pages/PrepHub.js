function PrepHub() {
  const companies = ['All', 'TCS', 'Infosys', 'Wipro', 'Google', 'Amazon', 'Microsoft'];
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
  ];

  return (
    <div style={{backgroundColor: '#0f172a', color: 'white', minHeight: '100vh', padding: '40px'}}>
      
      <h1 style={{fontSize: '2.5rem', fontWeight: 'bold', color: '#4ade80'}}>Placement Prep Hub</h1>
      <p style={{color: '#94a3b8', marginTop: '8px', marginBottom: '32px'}}>DSA, Aptitude and HR questions filtered by company</p>

      {/* Company Filter */}
      <div style={{display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px'}}>
        {companies.map(company => (
          <button key={company} style={{backgroundColor: '#1e293b', color: 'white', padding: '8px 20px', borderRadius: '20px', border: '1px solid #4ade80', cursor: 'pointer', fontSize: '0.9rem'}}>
            {company}
          </button>
        ))}
      </div>

      {/* Questions List */}
      <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
        {questions.map((q, index) => (
          <div key={index} style={{backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div>
              <p style={{fontWeight: 'bold', fontSize: '1rem'}}>{q.question}</p>
              <p style={{color: '#94a3b8', marginTop: '4px', fontSize: '0.85rem'}}>{q.company} • {q.type}</p>
            </div>
            <span style={{backgroundColor: q.type === 'DSA' ? '#166534' : q.type === 'Aptitude' ? '#1e3a5f' : '#4a1d96', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem'}}>
              {q.type}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}

export default PrepHub;