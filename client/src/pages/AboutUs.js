function AboutUs() {
  return (
    <div style={{padding: '60px 20px', maxWidth: '1100px', margin: '0 auto'}}>

      {/* Header */}
      <div style={{textAlign: 'center', marginBottom: '60px'}}>
        <div style={{display: 'inline-block', backgroundColor: 'rgba(74, 222, 128, 0.1)', border: '1px solid #4ade80', borderRadius: '20px', padding: '6px 16px', marginBottom: '20px'}}>
          <span style={{color: '#4ade80', fontSize: '0.9rem'}}>About Us</span>
        </div>
        <h2 style={{fontSize: '2.8rem', fontWeight: 'bold', color: 'white', marginBottom: '16px'}}>
          Bridging the <span style={{color: '#4ade80'}}>Campus</span> Opportunity Gap
        </h2>
        <p style={{fontSize: '1.1rem', color: '#94a3b8', maxWidth: '650px', margin: '0 auto', lineHeight: '1.7'}}>
          CampusConnect is an AI-powered placement platform built for tier-2 and tier-3 college students across India who lack access to quality career resources.
        </p>
      </div>

      {/* Mission & Vision */}
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '60px'}}>
        <div style={{backgroundColor: '#1e293b', borderRadius: '12px', padding: '32px', borderLeft: '4px solid #4ade80'}}>
          <div style={{fontSize: '2rem', marginBottom: '12px'}}>🎯</div>
          <h3 style={{fontSize: '1.3rem', fontWeight: 'bold', color: 'white', marginBottom: '12px'}}>Our Mission</h3>
          <p style={{color: '#94a3b8', lineHeight: '1.7', fontSize: '0.95rem'}}>
            To democratize placement preparation for every Indian college student by providing free, AI-powered tools and real peer insights — removing the dependency on expensive coaching or campus placement cells.
          </p>
        </div>
        <div style={{backgroundColor: '#1e293b', borderRadius: '12px', padding: '32px', borderLeft: '4px solid #4ade80'}}>
          <div style={{fontSize: '2rem', marginBottom: '12px'}}>🔭</div>
          <h3 style={{fontSize: '1.3rem', fontWeight: 'bold', color: 'white', marginBottom: '12px'}}>Our Vision</h3>
          <p style={{color: '#94a3b8', lineHeight: '1.7', fontSize: '0.95rem'}}>
            A future where no talented student is left behind due to lack of guidance. We envision a connected campus ecosystem where every student has a personalized roadmap to their dream career.
          </p>
        </div>
      </div>

      {/* Problem We're Solving */}
      <div style={{marginBottom: '60px'}}>
        <h2 style={{textAlign: 'center', fontSize: '2rem', fontWeight: 'bold', color: 'white', marginBottom: '40px'}}>
          The <span style={{color: '#4ade80'}}>Problem</span> We're Solving
        </h2>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px'}}>
          {[
            { icon: '🏫', title: 'Uneven Access', desc: 'Tier-2/3 colleges rarely have dedicated placement cells or career counselors. Students prepare in isolation with outdated resources.' },
            { icon: '💰', title: 'Cost Barrier', desc: 'Premium coaching platforms charge ₹50,000+ for structured prep. Most students cannot afford this financial burden.' },
            { icon: '🧭', title: 'No Roadmap', desc: 'Without clear guidance, students waste months hopping between topics. Only 30% know what to study for their target company.' },
            { icon: '🤝', title: 'Peer Disconnect', desc: 'Real interview experiences and senior advice stay within batches and never reach the students who need them most.' },
          ].map((item, i) => (
            <div key={i} style={{backgroundColor: 'rgba(30, 41, 59, 0.8)', padding: '24px', borderRadius: '12px', border: '1px solid rgba(74, 222, 128, 0.15)'}}>
              <div style={{fontSize: '1.8rem'}}>{item.icon}</div>
              <h3 style={{fontSize: '1.1rem', fontWeight: 'bold', color: 'white', marginTop: '12px'}}>{item.title}</h3>
              <p style={{color: '#94a3b8', marginTop: '8px', fontSize: '0.9rem', lineHeight: '1.6'}}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Our Solution */}
      <div style={{textAlign: 'center', backgroundColor: '#1e293b', borderRadius: '12px', padding: '40px', marginBottom: '60px'}}>
        <h3 style={{fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '16px'}}>
          Our <span style={{color: '#4ade80'}}>Approach</span>
        </h3>
        <p style={{color: '#94a3b8', maxWidth: '700px', margin: '0 auto 24px', lineHeight: '1.7'}}>
          CampusConnect tackles these problems head-on with an AI-driven platform that is completely free for students. We combine smart resume analysis, curated company-wise prep resources, real interview experiences, and direct mentor access — all in one place.
        </p>
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px'}}>
          {['AI Resume Score', 'Company-wise Prep', 'Interview Experiences', 'Mentor Connect', 'Roadmap Generator', 'Doubt Solver'].map((feature, i) => (
            <span key={i} style={{backgroundColor: 'rgba(74, 222, 128, 0.1)', color: '#4ade80', padding: '6px 14px', borderRadius: '20px', fontSize: '0.85rem', border: '1px solid rgba(74, 222, 128, 0.3)'}}>
              {feature}
            </span>
          ))}
        </div>
      </div>

      {/* Team Placeholder */}
      <div style={{textAlign: 'center', marginBottom: '40px'}}>
        <h2 style={{fontSize: '2rem', fontWeight: 'bold', color: 'white', marginBottom: '12px'}}>
          Meet Our <span style={{color: '#4ade80'}}>Team</span>
        </h2>
        <p style={{color: '#94a3b8', marginBottom: '32px'}}>The passionate people building CampusConnect</p>
        <div style={{display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap'}}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{backgroundColor: '#1e293b', borderRadius: '12px', padding: '32px 24px', width: '220px', textAlign: 'center', border: '1px solid rgba(74, 222, 128, 0.1)'}}>
              <div style={{width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#334155', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem'}}>
                👤
              </div>
              <h4 style={{fontWeight: 'bold', color: 'white', marginBottom: '4px'}}>Team Member</h4>
              <p style={{color: '#94a3b8', fontSize: '0.85rem'}}>Role & Contribution</p>
              <div style={{marginTop: '12px', padding: '4px 12px', backgroundColor: 'rgba(74, 222, 128, 0.1)', color: '#4ade80', borderRadius: '12px', fontSize: '0.8rem', display: 'inline-block'}}>
                Coming Soon
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default AboutUs;
