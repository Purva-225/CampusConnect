# 🎓 CampusConnect — AI-Powered Placement Companion

[![Live Demo](https://img.shields.io/badge/Live-Demo-green?style=for-the-badge)](https://campus-connect-xi-self.vercel.app)
[![GSSoC 2026](https://img.shields.io/badge/GSSoC-2026-orange?style=for-the-badge)](https://gssoc.girlscript.tech/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

> Built for tier-2 and tier-3 college students across India 🇮🇳

## ✨ Features

- 🤖 **AI Resume Analyzer** — Upload PDF, get score + tips for target company
- 📚 **Placement Prep Hub** — DSA, Aptitude & HR questions by company
- 👥 **Mentor Connect** — Chat with placed seniors from FAANG companies
- 🤖 **AI Doubt Solver** — Ask anything (like ChatGPT) for placement prep
- 🗺️ **Opportunities Roadmap** — Coding contests, open source programs, company hiring calendar
- 📱 **PWA Support** — Install as mobile app, works offline
- 🎙️ **Hey CampBot** — Voice assistant (say "Hey CampBot" to activate)

## 🛠️ Tech Stack

| Frontend | Backend | Database | AI/APIs |
|----------|---------|----------|---------|
| React.js | Node.js + Express | MongoDB Atlas | Groq (LLaMA 3.3) |
| Tailwind CSS | JWT Auth | Mongoose | Google Gemini |
| React Router | bcryptjs | | Web Speech API |

## 🚀 Quick Start (Local Setup)

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Groq API key (free at console.groq.com)

### 1. Clone the repo
```bash
git clone https://github.com/Purva-225/CampusConnect.git
cd CampusConnect
```

### 2. Setup Backend
```bash
cd server
npm install
```
Create `server/.env`:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GROQ_API_KEY=your_groq_api_key
PORT=5000
```
```bash
npm start
```

### 3. Setup Frontend
```bash
cd client
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## 📁 Project Structure

```
CampusConnect/
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable components
│   │   └── App.js         # Main app with routing
└── server/                # Node.js backend
    ├── routes/            # API routes
    ├── models/            # MongoDB models
    └── index.js           # Server entry point
```

## 🤝 Contributing (GSSoC 2026)

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Good First Issues
Look for issues labeled `good-first-issue` on the [Issues page](https://github.com/Purva-225/CampusConnect/issues).

## 📄 License

MIT License — feel free to use and contribute!

## 👩‍💻 Creator

**Purva Nigade** — First year IT student, Walchand College of Engineering, Sangli
- LinkedIn: [linkedin.com/in/purva-nigade-9b08a235a](https://linkedin.com/in/purva-nigade-9b08a235a)
- GitHub: [github.com/Purva-225](https://github.com/Purva-225)