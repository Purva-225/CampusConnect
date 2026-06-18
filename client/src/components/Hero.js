import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative z-10 text-center px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
      <div className="max-w-4xl mx-auto">
        <div className="inline-block bg-green-500/10 border border-green-400 rounded-full px-4 py-1.5 mb-6">
          <span className="text-green-400 text-sm font-medium">Now live for Indian students</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-green-400 leading-tight">
          Your AI-Powered
        </h1>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mt-1">
          Placement Companion
        </h1>

        <p className="mt-5 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Get personalized placement preparation, AI-driven doubt solving, mentor
          guidance, and real-time interview practice — all in one place.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/register"
            className="inline-block bg-green-400 hover:bg-green-300 text-gray-900 font-semibold px-8 py-3.5 rounded-lg transition-colors duration-200 text-base"
          >
            Get Started
          </Link>
          <Link
            to="/prep-hub"
            className="inline-block bg-transparent hover:bg-white/10 text-white font-semibold px-8 py-3.5 rounded-lg border-2 border-white transition-colors duration-200 text-base"
          >
            Explore Features
          </Link>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-6 sm:gap-12">
          {[
            ["50K+", "Students"],
            ["500+", "Colleges"],
            ["100+", "Companies"],
            ["95%", "Success Rate"],
          ].map(([num, label]) => (
            <div key={label} className="min-w-[70px]">
              <h3 className="text-2xl sm:text-3xl font-bold text-green-400">
                {num}
              </h3>
              <p className="text-slate-400 text-sm mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
