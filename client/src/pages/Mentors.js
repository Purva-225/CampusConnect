function Mentors() {
  const mentors = [
    { name: 'Rahul Sharma', company: 'Google', role: 'SDE-2', college: 'VJTI Mumbai', skills: ['DSA', 'System Design'], available: true },
    { name: 'Priya Patel', company: 'Microsoft', role: 'SDE-1', college: 'COEP Pune', skills: ['React', 'Node.js'], available: true },
    { name: 'Amit Singh', company: 'Amazon', role: 'SDE-1', college: 'RAIT Mumbai', skills: ['Java', 'DSA'], available: false },
    { name: 'Sneha Joshi', company: 'TCS', role: 'Developer', college: 'VIT Pune', skills: ['Python', 'ML'], available: true },
    { name: 'Rohan Desai', company: 'Infosys', role: 'Analyst', college: 'PICT Pune', skills: ['SQL', 'Java'], available: false },
    { name: 'Neha Kulkarni', company: 'Wipro', role: 'Developer', college: 'MIT Pune', skills: ['Testing', 'Agile'], available: true },
    { name: 'Arjun Patil', company: 'Google', role: 'SDE-2', college: 'WCE Sangli', skills: ['DSA', 'System Design', 'Cloud'], available: true },
  ];

  return (
    <div style={{backgroundColor: '#0f172a', color: 'white', minHeight: '100vh', padding: '40px'}}>
      
      <h1 style={{fontSize: '2.5rem', fontWeight: 'bold', color: '#4ade80'}}>Senior Mentor Connect</h1>
      <p style={{color: '#94a3b8', marginTop: '8px', marginBottom: '40px'}}>Connect with placed seniors for guidance and resume reviews</p>

      {/* Mentor Cards Grid */}
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', maxWidth: '1100px'}}>
        {mentors.map((mentor, index) => (
          <div key={index} style={{backgroundColor: '#1e293b', borderRadius: '16px', padding: '24px', border: mentor.available ? '1px solid #4ade80' : '1px solid #374151'}}>
            
            {/* Avatar */}
            <div style={{width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#4ade80', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', color: '#111827'}}>
              {mentor.name.charAt(0)}
            </div>

            <h3 style={{fontWeight: 'bold', fontSize: '1.1rem', marginTop: '12px'}}>{mentor.name}</h3>
            <p style={{color: '#4ade80', fontSize: '0.9rem'}}>{mentor.role} at {mentor.company}</p>
            <p style={{color: '#94a3b8', fontSize: '0.85rem', marginTop: '4px'}}>{mentor.college}</p>

            {/* Skills */}
            <div style={{display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap'}}>
              {mentor.skills.map(skill => (
                <span key={skill} style={{backgroundColor: '#0f172a', color: '#4ade80', padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem'}}>
                  {skill}
                </span>
              ))}
            </div>

            {/* Connect Button */}
            <button style={{marginTop: '16px', width: '100%', padding: '10px', borderRadius: '8px', fontWeight: 'bold', border: 'none', cursor: mentor.available ? 'pointer' : 'not-allowed', backgroundColor: mentor.available ? '#4ade80' : '#374151', color: mentor.available ? '#111827' : '#94a3b8', fontSize: '0.9rem'}}>
              {mentor.available ? 'Connect Now' : 'Not Available'}
            </button>

          </div>
        ))}
      </div>

    </div>
  );
}

export default Mentors;