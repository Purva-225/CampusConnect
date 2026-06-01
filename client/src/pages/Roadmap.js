import React, { useState } from 'react';

function Roadmap() {
  const [activeTab, setActiveTab] = useState('contests');
  const [activeFilter, setActiveFilter] = useState('All');

  const contests = [
    { name: 'LeetCode Weekly Contest', platform: 'LeetCode', frequency: 'Every Sunday 8:00 AM IST', difficulty: 'Medium', prize: 'Rating + Badge', link: 'https://leetcode.com/contest/', color: '#f97316', tag: 'Weekly', status: 'ongoing' },
    { name: 'LeetCode Biweekly Contest', platform: 'LeetCode', frequency: 'Every 2nd Saturday 8:00 PM IST', difficulty: 'Medium', prize: 'Rating + Badge', link: 'https://leetcode.com/contest/', color: '#f97316', tag: 'Bi-Weekly', status: 'ongoing' },
    { name: 'Codeforces Round (Div. 1+2)', platform: 'Codeforces', frequency: '2-3 times/month', difficulty: 'Hard', prize: 'Rating Points', link: 'https://codeforces.com/contests', color: '#3b82f6', tag: 'Monthly', status: 'ongoing' },
    { name: 'Codeforces Div. 2 Round', platform: 'Codeforces', frequency: 'Weekly', difficulty: 'Medium-Hard', prize: 'Rating Points', link: 'https://codeforces.com/contests', color: '#3b82f6', tag: 'Weekly', status: 'ongoing' },
    { name: 'CodeChef Starters', platform: 'CodeChef', frequency: 'Every Wednesday 8:00 PM IST', difficulty: 'Easy-Medium', prize: 'Rating + Goodies', link: 'https://www.codechef.com/contests', color: '#8b5cf6', tag: 'Weekly', status: 'ongoing' },
    { name: 'CodeChef Cook-Off', platform: 'CodeChef', frequency: 'Monthly (Sunday)', difficulty: 'Medium', prize: 'Cash + Rating', link: 'https://www.codechef.com/contests', color: '#8b5cf6', tag: 'Monthly', status: 'ongoing' },
    { name: 'HackerEarth Monthly Challenge', platform: 'HackerEarth', frequency: 'Monthly', difficulty: 'Medium', prize: 'Cash + Certificates', link: 'https://www.hackerearth.com/challenges/', color: '#06b6d4', tag: 'Monthly', status: 'ongoing' },
    { name: 'AtCoder Beginner Contest', platform: 'AtCoder', frequency: 'Every Saturday 9:00 PM IST', difficulty: 'Beginner', prize: 'Rating Points', link: 'https://atcoder.jp/contests/', color: '#10b981', tag: 'Weekly', status: 'ongoing' },
    { name: 'Google Hash Code', platform: 'Google', frequency: 'Annual (Feb-Mar)', difficulty: 'Hard', prize: 'Google Swag + Recognition', link: 'https://codingcompetitions.withgoogle.com/', color: '#4ade80', tag: 'Annual', status: 'upcoming' },
    { name: 'Meta Hacker Cup', platform: 'Meta', frequency: 'Annual (Aug-Nov)', difficulty: 'Hard', prize: 'Cash + T-Shirt', link: 'https://www.facebook.com/codingcompetitions/hacker-cup/', color: '#1d4ed8', tag: 'Annual', status: 'upcoming' },
    { name: 'ICPC Regional', platform: 'ICPC', frequency: 'Annual (Oct-Nov)', difficulty: 'Expert', prize: 'Certificate + Recognition', link: 'https://icpc.global/', color: '#dc2626', tag: 'Annual', status: 'upcoming' },
    { name: 'TCS CodeVita', platform: 'TCS', frequency: 'Annual (Jun-Sep)', difficulty: 'Medium-Hard', prize: 'PPO + Cash Prize', link: 'https://www.tcscodevita.com/', color: '#0284c7', tag: 'Annual', status: 'upcoming' },
  ];

  const openSource = [
    { name: 'GSSoC (GirlScript Summer of Code)', org: 'GirlScript Foundation', period: 'May – August 2026', applicationPeriod: 'March – April 2026', stipend: 'Cash prizes up to ₹50K + Swag + LOR', level: 'Beginner Friendly', link: 'https://gssoc.girlscript.tech/', color: '#ec4899', tag: 'India', participants: '50,000+', status: 'active' },
    { name: 'Google Summer of Code (GSoC)', org: 'Google', period: 'May – September 2026', applicationPeriod: 'March 16 – 31, 2026', stipend: '$1,500 – $3,300 USD', level: 'Intermediate', link: 'https://summerofcode.withgoogle.com/', color: '#4ade80', tag: 'Global', participants: '~1,000', status: 'active' },
    { name: 'Hacktoberfest', org: 'DigitalOcean', period: 'October 2026', applicationPeriod: 'No application needed', stipend: 'Digital Badge + Swag', level: 'All Levels', link: 'https://hacktoberfest.com/', color: '#f97316', tag: 'Global', participants: 'Hundreds of thousands', status: 'upcoming' },
    { name: 'MLH Fellowship', org: 'Major League Hacking', period: 'Spring / Summer / Fall batches', applicationPeriod: 'Rolling applications', stipend: '$5,000 USD stipend', level: 'Intermediate', link: 'https://fellowship.mlh.io/', color: '#8b5cf6', tag: 'Global', participants: 'Limited seats', status: 'ongoing' },
    { name: 'LFX Mentorship', org: 'Linux Foundation', period: 'Spring / Summer / Fall terms', applicationPeriod: 'Term-wise applications', stipend: '$3,000 – $6,600 USD', level: 'Intermediate', link: 'https://lfx.linuxfoundation.org/tools/mentorship/', color: '#3b82f6', tag: 'Global', participants: 'Limited', status: 'ongoing' },
    { name: 'Outreachy', org: 'Software Freedom Conservancy', period: 'May–Aug & Dec–Mar', applicationPeriod: 'Jan (summer) / Aug (winter)', stipend: '$7,000 USD', level: 'Beginner Friendly', link: 'https://www.outreachy.org/', color: '#10b981', tag: 'Global', participants: 'Underrepresented groups', status: 'ongoing' },
    { name: 'KWoC (Kharagpur Winter of Code)', org: 'IIT Kharagpur', period: 'December – January', applicationPeriod: 'November 2026', stipend: 'Certificate + Swag', level: 'Beginner', link: 'https://kwoc.kossiitkgp.org/', color: '#06b6d4', tag: 'India', participants: 'Open', status: 'upcoming' },
    { name: 'SWOC (Social Winter of Code)', org: 'Social India', period: 'January – February', applicationPeriod: 'November – December', stipend: 'Certificate + Prizes', level: 'Beginner', link: 'https://swoc.scriptindia.org/', color: '#f59e0b', tag: 'India', participants: 'Open', status: 'upcoming' },
  ];

  const companies = [
    {
      name: 'Google', logo: '🔵', color: '#4ade80',
      internship: { period: 'Summer (May–Aug)', apply: 'Aug – Oct 2026', programs: ['STEP Intern (1st/2nd year)', 'SWE Intern', 'Associate SWE Intern'], link: 'https://careers.google.com/students/' },
      fulltime: { period: 'Sep – Nov (for next year batch)', apply: 'Aug – Dec 2026', roles: ['SWE', 'SWE II', 'Associate SWE'], link: 'https://careers.google.com/' },
      tips: 'Focus on DSA + System Design. LeetCode Hard. 4-5 rounds.',
      linkedin: 'https://www.linkedin.com/company/google/'
    },
    {
      name: 'Microsoft', logo: '🟦', color: '#3b82f6',
      internship: { period: 'Summer (May–Aug)', apply: 'Aug – Oct 2026', programs: ['SWE Intern', 'Explore Intern (1st/2nd year)', 'MLSA Program'], link: 'https://careers.microsoft.com/students/' },
      fulltime: { period: 'Sep – Dec (for next year batch)', apply: 'Sep – Nov 2026', roles: ['SWE', 'SDE', 'PM'], link: 'https://careers.microsoft.com/' },
      tips: 'MSFT loves problem-solving + behavioral. Moderate DSA difficulty.',
      linkedin: 'https://www.linkedin.com/company/microsoft/'
    },
    {
      name: 'Amazon', logo: '🟠', color: '#f97316',
      internship: { period: 'Summer (May–Aug)', apply: 'Aug – Oct 2026', programs: ['SWE Intern', 'Amazon Future Engineer'], link: 'https://www.amazon.jobs/en/teams/internships-for-students' },
      fulltime: { period: 'Year-round hiring', apply: 'Sep – Nov peak', roles: ['SDE I', 'SDE II'], link: 'https://www.amazon.jobs/' },
      tips: '14 Leadership Principles are key! OA on HackerRank. 2 DSA rounds.',
      linkedin: 'https://www.linkedin.com/company/amazon/'
    },
    {
      name: 'Flipkart', logo: '🟡', color: '#eab308',
      internship: { period: 'Summer (May–Aug)', apply: 'Aug – Oct 2026', programs: ['SDE Intern', 'Flipkart GRiD 7.0 (2026–2030 batch)'], link: 'https://www.flipkartcareers.com/' },
      fulltime: { period: 'Aug – Nov campus season', apply: 'Aug – Oct 2026', roles: ['SDE I', 'SDE II'], link: 'https://www.flipkartcareers.com/' },
      tips: 'GRiD is their flagship campus contest. Solve it to fast-track hiring.',
      linkedin: 'https://www.linkedin.com/company/flipkart/'
    },
    {
      name: 'Uber', logo: '⬛', color: '#94a3b8',
      internship: { period: 'Summer (May–Aug)', apply: 'Sep – Nov 2026', programs: ['SWE Intern', 'UberSTAR (women in tech)'], link: 'https://www.uber.com/us/en/careers/teams/university/' },
      fulltime: { period: 'Year-round', apply: 'Oct – Jan peak', roles: ['SWE I', 'SWE II'], link: 'https://www.uber.com/us/en/careers/' },
      tips: 'Strong system design knowledge needed. Medium-Hard DSA rounds.',
      linkedin: 'https://www.linkedin.com/company/uber-com/'
    },
    {
      name: 'Adobe', logo: '🔴', color: '#dc2626',
      internship: { period: 'Summer (May–Aug)', apply: 'Aug – Oct 2026', programs: ['Research Intern', 'SWE Intern', 'Women-in-Tech Scholarship'], link: 'https://www.adobe.com/careers/university.html' },
      fulltime: { period: 'Sep – Dec campus', apply: 'Sep – Nov 2026', roles: ['MTS I', 'SWE'], link: 'https://www.adobe.com/careers/' },
      tips: 'Adobe focuses on project quality. Build a strong portfolio.',
      linkedin: 'https://www.linkedin.com/company/adobe/'
    },
    {
      name: 'Goldman Sachs', logo: '🔵', color: '#0284c7',
      internship: { period: 'Summer (Jun–Aug)', apply: 'Aug – Oct 2026', programs: ['Engineering Intern', 'Women Engineers Hackathon'], link: 'https://goldmansachs.com/careers/students/' },
      fulltime: { period: 'Aug – Nov campus', apply: 'Aug – Oct 2026', roles: ['Analyst', 'Associate'], link: 'https://goldmansachs.com/careers/' },
      tips: 'Quant skills + DSA + Finance basics. Coding test on HackerRank.',
      linkedin: 'https://www.linkedin.com/company/goldman-sachs/'
    },
    {
      name: 'Zomato/Blinkit', logo: '🟥', color: '#ef4444',
      internship: { period: 'Year-round', apply: 'Any time', programs: ['Product Intern', 'SWE Intern'], link: 'https://www.zomato.com/careers' },
      fulltime: { period: 'Year-round (peaks Jan–Mar, Jul–Sep)', apply: 'Rolling', roles: ['SDE I', 'Product Manager'], link: 'https://www.zomato.com/careers' },
      tips: 'Strong on product thinking + system design. Startup culture.',
      linkedin: 'https://www.linkedin.com/company/zomato/'
    },
  ];

  const hiringMonths = [
    { month: 'Jan–Feb', activity: 'Peak hiring', companies: 'TCS, Infosys, Wipro, Cognizant mass hiring', type: 'peak' },
    { month: 'Mar–Apr', activity: 'New FY budgets', companies: 'Startups, Product companies open roles', type: 'moderate' },
    { month: 'May–Jun', activity: 'Internship starts', companies: 'FAANG interns begin, some full-time offers', type: 'moderate' },
    { month: 'Jul–Aug', activity: 'Campus season starts', companies: 'IIT/NIT placements, off-campus drives open', type: 'peak' },
    { month: 'Sep–Oct', activity: 'Peak campus hiring', companies: 'Google, Microsoft, Amazon, Flipkart applications open', type: 'peak' },
    { month: 'Nov–Dec', activity: 'Year-end push', companies: 'Companies close open roles, fewer new openings', type: 'slow' },
  ];

  const tabs = [
    { id: 'contests', label: '🏆 Coding Contests', count: contests.length },
    { id: 'opensource', label: '🌐 Open Source', count: openSource.length },
    { id: 'companies', label: '🏢 Companies', count: companies.length },
  ];

  const platformFilters = ['All', 'LeetCode', 'Codeforces', 'CodeChef', 'HackerEarth', 'AtCoder', 'Google', 'Annual'];
  const osFilters = ['All', 'India', 'Global', 'Beginner Friendly'];

  const getStatusBadge = (status) => {
    const styles = {
      ongoing: { bg: '#166534', color: '#4ade80', text: '🟢 Ongoing' },
      active: { bg: '#166534', color: '#4ade80', text: '🟢 Active' },
      upcoming: { bg: '#1e3a5f', color: '#60a5fa', text: '🔵 Upcoming' },
    };
    const s = styles[status] || styles.upcoming;
    return <span style={{ backgroundColor: s.bg, color: s.color, padding: '2px 10px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 'bold' }}>{s.text}</span>;
  };

  return (
    <div style={{ backgroundColor: 'transparent', color: 'white', minHeight: '100vh', padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#4ade80', margin: 0 }}>🗺️ Opportunities Roadmap</h1>
        <p style={{ color: '#94a3b8', marginTop: '8px', fontSize: '1rem' }}>
          Coding contests, open source programs & company hiring calendar — all in one place for Indian students
        </p>
      </div>

      {/* Hiring Timeline */}
      <div style={{ backgroundColor: '#1e293b', borderRadius: '16px', padding: '24px', marginBottom: '32px', border: '1px solid #334155' }}>
        <h3 style={{ color: '#4ade80', marginBottom: '16px', fontSize: '1.1rem' }}>📅 India Hiring Calendar 2026</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
          {hiringMonths.map((m, i) => (
            <div key={i} style={{ backgroundColor: '#0f172a', borderRadius: '10px', padding: '12px', border: `1px solid ${m.type === 'peak' ? '#4ade8044' : m.type === 'slow' ? '#ef444444' : '#33415544'}` }}>
              <div style={{ color: m.type === 'peak' ? '#4ade80' : m.type === 'slow' ? '#ef4444' : '#94a3b8', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '4px' }}>{m.month}</div>
              <div style={{ color: 'white', fontSize: '0.78rem', fontWeight: 'bold', marginBottom: '4px' }}>{m.activity}</div>
              <div style={{ color: '#64748b', fontSize: '0.72rem', lineHeight: '1.4' }}>{m.companies}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => { setActiveTab(tab.id); setActiveFilter('All'); }}
            style={{ padding: '10px 20px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem', transition: 'all 0.2s',
              backgroundColor: activeTab === tab.id ? '#4ade80' : '#1e293b',
              color: activeTab === tab.id ? '#111827' : 'white' }}>
            {tab.label} <span style={{ opacity: 0.7, fontSize: '0.8rem' }}>({tab.count})</span>
          </button>
        ))}
      </div>

      {/* CONTESTS TAB */}
      {activeTab === 'contests' && (
        <div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
            {platformFilters.map(f => (
              <button key={f} onClick={() => setActiveFilter(f)}
                style={{ padding: '6px 14px', borderRadius: '20px', border: '1px solid #334155', cursor: 'pointer', fontSize: '0.8rem', backgroundColor: activeFilter === f ? '#4ade80' : '#1e293b', color: activeFilter === f ? '#111827' : 'white' }}>
                {f}
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '16px' }}>
            {contests
              .filter(c => activeFilter === 'All' || c.platform === activeFilter || c.tag === activeFilter)
              .map((c, i) => (
                <div key={i} style={{ backgroundColor: '#1e293b', borderRadius: '14px', padding: '20px', border: `1px solid ${c.color}33` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <div>
                      <div style={{ fontWeight: 'bold', fontSize: '1rem', color: 'white', marginBottom: '4px' }}>{c.name}</div>
                      <span style={{ backgroundColor: `${c.color}22`, color: c.color, padding: '2px 10px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 'bold' }}>{c.platform}</span>
                    </div>
                    {getStatusBadge(c.status)}
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: '0.82rem', marginBottom: '6px' }}>⏰ {c.frequency}</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.82rem', marginBottom: '6px' }}>🎯 Difficulty: <span style={{ color: 'white' }}>{c.difficulty}</span></div>
                  <div style={{ color: '#94a3b8', fontSize: '0.82rem', marginBottom: '14px' }}>🏅 Prize: <span style={{ color: '#4ade80' }}>{c.prize}</span></div>
                  <a href={c.link} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'inline-block', backgroundColor: c.color, color: '#111827', padding: '8px 18px', borderRadius: '8px', fontWeight: 'bold', fontSize: '0.82rem', textDecoration: 'none' }}>
                    Register →
                  </a>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* OPEN SOURCE TAB */}
      {activeTab === 'opensource' && (
        <div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
            {osFilters.map(f => (
              <button key={f} onClick={() => setActiveFilter(f)}
                style={{ padding: '6px 14px', borderRadius: '20px', border: '1px solid #334155', cursor: 'pointer', fontSize: '0.8rem', backgroundColor: activeFilter === f ? '#4ade80' : '#1e293b', color: activeFilter === f ? '#111827' : 'white' }}>
                {f}
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '16px' }}>
            {openSource
              .filter(o => activeFilter === 'All' || o.tag === activeFilter || (activeFilter === 'Beginner Friendly' && o.level.includes('Beginner')))
              .map((o, i) => (
                <div key={i} style={{ backgroundColor: '#1e293b', borderRadius: '14px', padding: '20px', border: `1px solid ${o.color}33` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <div>
                      <div style={{ fontWeight: 'bold', fontSize: '1rem', color: 'white', marginBottom: '4px' }}>{o.name}</div>
                      <span style={{ backgroundColor: `${o.color}22`, color: o.color, padding: '2px 10px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 'bold' }}>{o.org}</span>
                    </div>
                    {getStatusBadge(o.status)}
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: '0.82rem', marginBottom: '4px' }}>📅 Program: <span style={{ color: 'white' }}>{o.period}</span></div>
                  <div style={{ color: '#94a3b8', fontSize: '0.82rem', marginBottom: '4px' }}>📝 Apply by: <span style={{ color: '#fbbf24' }}>{o.applicationPeriod}</span></div>
                  <div style={{ color: '#94a3b8', fontSize: '0.82rem', marginBottom: '4px' }}>💰 Reward: <span style={{ color: '#4ade80' }}>{o.stipend}</span></div>
                  <div style={{ color: '#94a3b8', fontSize: '0.82rem', marginBottom: '14px' }}>👥 {o.participants} participants</div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <a href={o.link} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'inline-block', backgroundColor: o.color, color: '#111827', padding: '8px 18px', borderRadius: '8px', fontWeight: 'bold', fontSize: '0.82rem', textDecoration: 'none' }}>
                      Apply Now →
                    </a>
                    <span style={{ backgroundColor: '#0f172a', color: '#94a3b8', padding: '8px 14px', borderRadius: '8px', fontSize: '0.78rem', border: '1px solid #334155' }}>
                      {o.level}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* COMPANIES TAB */}
      {activeTab === 'companies' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {companies.map((c, i) => (
            <div key={i} style={{ backgroundColor: '#1e293b', borderRadius: '16px', padding: '24px', border: `1px solid ${c.color}33` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '2rem' }}>{c.logo}</span>
                  <h3 style={{ color: c.color, fontSize: '1.3rem', fontWeight: 'bold', margin: 0 }}>{c.name}</h3>
                </div>
                <a href={c.linkedin} target="_blank" rel="noopener noreferrer"
                  style={{ backgroundColor: '#1d4ed8', color: 'white', padding: '6px 16px', borderRadius: '8px', fontWeight: 'bold', fontSize: '0.8rem', textDecoration: 'none' }}>
                  🔗 LinkedIn
                </a>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', marginBottom: '14px' }}>
                {/* Internship */}
                <div style={{ backgroundColor: '#0f172a', borderRadius: '10px', padding: '14px', border: '1px solid #166534' }}>
                  <div style={{ color: '#4ade80', fontWeight: 'bold', fontSize: '0.85rem', marginBottom: '8px' }}>🎓 Internship</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '4px' }}>📅 Period: <span style={{ color: 'white' }}>{c.internship.period}</span></div>
                  <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '8px' }}>📝 Apply: <span style={{ color: '#fbbf24' }}>{c.internship.apply}</span></div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '10px' }}>
                    {c.internship.programs.map((p, j) => (
                      <span key={j} style={{ backgroundColor: '#166534', color: '#4ade80', padding: '2px 8px', borderRadius: '20px', fontSize: '0.7rem' }}>{p}</span>
                    ))}
                  </div>
                  <a href={c.internship.link} target="_blank" rel="noopener noreferrer"
                    style={{ color: '#4ade80', fontSize: '0.8rem', textDecoration: 'none', fontWeight: 'bold' }}>Apply Here →</a>
                </div>

                {/* Full Time */}
                <div style={{ backgroundColor: '#0f172a', borderRadius: '10px', padding: '14px', border: '1px solid #1e3a5f' }}>
                  <div style={{ color: '#60a5fa', fontWeight: 'bold', fontSize: '0.85rem', marginBottom: '8px' }}>💼 Full Time</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '4px' }}>📅 Period: <span style={{ color: 'white' }}>{c.fulltime.period}</span></div>
                  <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '8px' }}>📝 Apply: <span style={{ color: '#fbbf24' }}>{c.fulltime.apply}</span></div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '10px' }}>
                    {c.fulltime.roles.map((r, j) => (
                      <span key={j} style={{ backgroundColor: '#1e3a5f', color: '#60a5fa', padding: '2px 8px', borderRadius: '20px', fontSize: '0.7rem' }}>{r}</span>
                    ))}
                  </div>
                  <a href={c.fulltime.link} target="_blank" rel="noopener noreferrer"
                    style={{ color: '#60a5fa', fontSize: '0.8rem', textDecoration: 'none', fontWeight: 'bold' }}>Apply Here →</a>
                </div>
              </div>

              {/* Tips */}
              <div style={{ backgroundColor: `${c.color}11`, borderRadius: '8px', padding: '10px 14px', border: `1px solid ${c.color}33` }}>
                <span style={{ color: c.color, fontWeight: 'bold', fontSize: '0.8rem' }}>💡 Pro Tip: </span>
                <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{c.tips}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Roadmap;