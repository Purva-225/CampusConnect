import { Link } from "react-router-dom";
import { Github, Linkedin } from "lucide-react";

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
            <li><Link to="/" className="hover:text-white transition-colors duration-200 hover:underline">Home</Link></li>
            <li><Link to="/prep" className="hover:text-white transition-colors duration-200 hover:underline">Prep Hub</Link></li>
            <li><Link to="/experiences" className="hover:text-white transition-colors duration-200 hover:underline">Experiences</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors duration-200 hover:underline">About</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">Connect With Us</h3>
          <div className="flex space-x-5">
            <a href="https://github.com/Purva-225/CampusConnect" target="_blank" rel="noreferrer" aria-label="GitHub" className="text-gray-400 hover:text-white transition-colors duration-200 hover:scale-110 inline-block"><Github size={22} /></a>
            <a href="https://www.linkedin.com/company/campusconnect-ai-placement/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-white transition-colors duration-200 hover:scale-110 inline-block"><Linkedin size={22} /></a>
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