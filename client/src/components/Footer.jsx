const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6 mt-auto">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        <div>
          <h2 className="text-white text-2xl font-bold mb-2">CampusConnect</h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Your campus placement prep companion. Practice, connect, and get hired.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white transition-colors duration-200 hover:underline">Home</a></li>
            <li><a href="/prep" className="hover:text-white transition-colors duration-200 hover:underline">Prep Hub</a></li>
            <li><a href="/experiences" className="hover:text-white transition-colors duration-200 hover:underline">Experiences</a></li>
            <li><a href="/about" className="hover:text-white transition-colors duration-200 hover:underline">About</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">Connect With Us</h3>
          <div className="flex space-x-6 text-sm">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors duration-200">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors duration-200">LinkedIn</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors duration-200">Twitter</a>
          </div>
        </div>

      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} CampusConnect. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;