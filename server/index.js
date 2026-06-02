const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'CampusConnect API is running!' });
});

app.use('/api/auth', authRoutes);
const resumeRoutes = require('./routes/resume');
app.use('/api/resume', resumeRoutes);
const mentorRoutes = require('./routes/mentor');
app.use('/api', mentorRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected!');
   app.listen(process.env.PORT || 5000, () => {
      console.log('Server running on port 5000');
    });
  })
  .catch(err => console.log(err));