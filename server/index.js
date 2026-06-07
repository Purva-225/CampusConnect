const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const resumeRoutes = require('./routes/resume');

const app = express();

app.use(cors());
app.use(express.json());

const rateLimit = require('express-rate-limit');
app.use('/api/', rateLimit({ windowMs: 15 * 60 * 1000, max: 100, message: { error: 'Too many requests!' } }));

app.get('/', (req, res) => {
  res.json({ message: 'CampusConnect API is running!' });
});

// Health check route
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected!');
    app.listen(process.env.PORT || 5000, () => {
      console.log('Server running on port 5000');
    });
    // Keep Render awake - ping every 14 minutes
    setInterval(() => {
      fetch('https://campusconnect-b7wn.onrender.com/api/health')
        .catch(() => {});
    }, 14 * 60 * 1000);
  })
  .catch(err => console.log(err));