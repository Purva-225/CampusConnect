const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, college } = req.body;
    
    // Check if user exists
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered!' });

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({ name, email, password: hashed, college });
    await user.save();

    res.status(201).json({ message: 'Registration successful!' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found!' });

    // Check password
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Wrong password!' });

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, user: { name: user.name, email: user.email, college: user.college } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;