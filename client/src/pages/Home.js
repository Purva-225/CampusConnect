function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden" style={{backgroundColor: '#0f172a'}}>
      {/* Hero Section */}
      <div className="relative z-10 text-center px-5 py-20 md:py-32">
        <div className="inline-block rounded-full px-4 py-1.5 mb-6 border" style={{backgroundColor: 'rgba(74, 222, 128, 0.1)', borderColor: '#4ade80'}}>
          <span className="text-sm" style={{color: '#4ade80'}}>🚀 Now live for Indian students</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight" style={{color: '#4ade80'}}>
          Your AI-Powered
        </h1>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white">
          Placement Companion
        </h1>
        <p className="mt-5 text-lg md:text-xl max-w-xl mx-auto" style={{color: '#94a3b8'}}>
          Built for tier-2 and tier-3 college students across India
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="/register">
            <button className="font-bold text-base px-9 py-3.5 rounded-lg border-none cursor-pointer transition-opacity hover:opacity-90" style={{backgroundColor: '#4ade80', color: '#111827'}}>
              Get Started Free
            </button>
          </a>
          <a href="/prep-hub">
            <button className="font-bold text-base px-9 py-3.5 rounded-lg cursor-pointer transition-colors hover:bg-white hover:bg-opacity-10" style={{backgroundColor: 'transparent', color: 'white', border: '2px solid white'}}>
              Explore Features
            </button>
          </a>
        </div>
        <div className="mt-16 flex flex-wrap justify-center gap-8 sm:gap-12">
          {[
            { value: '50K+', label: 'Students' },
            { value: '500+', label: 'Colleges' },
            { value: '100+', label: 'Companies' },
            { value: '95%', label: 'Success Rate' },
          ].map((s, i) => (
            <div key={i}>
              <h3 className="text-3xl font-bold" style={{color: '#4ade80'}}>{s.value}</h3>
              <p className="text-sm" style={{color: '#94a3b8'}}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 py-16 px-10" style={{backgroundColor: 'rgba(17, 24, 39, 0.8)'}}>
        <h2 className="text-center text-3xl font-bold mb-10 text-white">
          Everything You Need to <span style={{color: '#4ade80'}}>Get Placed</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { icon: '🤖', title: 'AI Resume Analyzer', desc: 'Upload your resume and get instant score with company-specific suggestions' },
            { icon: '📚', title: 'Placement Prep Hub', desc: 'DSA, aptitude and HR questions filtered by company like TCS, Google, Amazon' },
            { icon: '💼', title: 'Interview Experiences', desc: 'Real interview experiences from students filtered by company and college' },
            { icon: '🧠', title: 'AI Doubt Solver', desc: 'Get answers to DSA, DBMS, OS and CN questions in simple language' },
            { icon: '👨‍🏫', title: 'Senior Mentor Connect', desc: 'Connect with placed seniors for resume reviews and guidance sessions' },
            { icon: '🗺️', title: 'Roadmap Generator', desc: 'Get a personalized day-by-day 3 month preparation plan for your dream company' },
          ].map((feature, i) => (
            <div key={i} className="p-6 rounded-xl backdrop-blur transition-transform hover:scale-105" style={{backgroundColor: 'rgba(30, 41, 59, 0.8)', borderLeft: '4px solid #4ade80'}}>
              <div className="text-3xl">{feature.icon}</div>
              <h3 className="text-lg font-bold mt-3 text-white">{feature.title}</h3>
              <p className="mt-2 text-sm" style={{color: '#94a3b8'}}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;