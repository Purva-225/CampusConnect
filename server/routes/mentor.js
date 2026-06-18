const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const Mentor = require('../models/Mentor');
const MentorshipRequest = require('../models/MentorshipRequest');
const User = require('../models/User');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token!' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token!' });
  }
};

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

function scoreMentor(mentor, student) {
  let score = 0;

  if (student.targetCompany && mentor.company &&
      mentor.company.toLowerCase().includes(student.targetCompany.toLowerCase())) {
    score += 50;
  }

  if (student.branch && mentor.branch &&
      mentor.branch.toLowerCase() === student.branch.toLowerCase()) {
    score += 30;
  }

  if (student.collegeTier && mentor.collegeTier) {
    const diff = Math.abs(student.collegeTier - mentor.collegeTier);
    if (diff === 0) score += 20;
    else if (diff === 1) score += 10;
  }

  return score;
}

router.get('/match', verifyToken, async (req, res) => {
  try {
    const student = await User.findById(req.userId);
    if (!student) return res.status(404).json({ message: 'Student not found!' });

    const branch = req.query.branch || '';
    const collegeTier = parseInt(req.query.collegeTier) || 0;

    const mentors = await Mentor.find({ availability: true });
    const scored = mentors.map(m => ({
      mentor: m,
      score: scoreMentor(m, { ...student.toObject(), branch, collegeTier })
    }));

    scored.sort((a, b) => b.score - a.score);
    const top = scored.filter(s => s.score > 0);
    const matches = top.length ? top : scored.slice(0, 5);

    res.json({ matches });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/request', verifyToken, async (req, res) => {
  try {
    const { mentorId } = req.body;
    const mentor = await Mentor.findById(mentorId);
    if (!mentor) return res.status(404).json({ message: 'Mentor not found!' });

    const existing = await MentorshipRequest.findOne({
      studentId: req.userId,
      mentorId
    });
    if (existing) return res.status(400).json({ message: 'Request already sent!' });

    const request = new MentorshipRequest({
      studentId: req.userId,
      mentorId
    });
    await request.save();

    const student = await User.findById(req.userId);
    const mentorUser = await User.findById(mentor.userId);

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS && mentorUser?.email) {
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: mentorUser.email,
          subject: `New Mentorship Request from ${student.name}`,
          html: `<p>Hi ${mentor.name},</p>
                 <p><strong>${student.name}</strong> from ${student.college || 'their college'} has requested you as a mentor.</p>
                 <p>Target company: ${student.targetCompany || 'Not specified'}</p>
                 <p>Log in to accept or reject this request.</p>`
        });
      } catch {
        console.warn('Email notification failed (check EMAIL_USER/EMAIL_PASS)');
      }
    }

    res.status(201).json({ message: 'Mentorship request sent!', request });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.patch('/request/:id/respond', verifyToken, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Status must be accepted or rejected' });
    }

    const request = await MentorshipRequest.findById(req.params.id).populate('studentId');
    if (!request) return res.status(404).json({ message: 'Request not found!' });

    const mentor = await Mentor.findById(request.mentorId);
    if (!mentor || mentor.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized!' });
    }

    request.status = status;
    await request.save();

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS && request.studentId?.email) {
      try {
        const subject = status === 'accepted'
          ? `Your mentorship request was accepted!`
          : `Your mentorship request was declined`;

        const html = status === 'accepted'
          ? `<p>Hi ${request.studentId.name},</p>
             <p><strong>${mentor.name}</strong> from ${mentor.company} has accepted your mentorship request!</p>
             <p>Connect on LinkedIn: <a href="${mentor.linkedIn}">${mentor.linkedIn}</a></p>`
          : `<p>Hi ${request.studentId.name},</p>
             <p>Unfortunately, ${mentor.name} has declined your mentorship request.</p>
             <p>Keep exploring other mentors who match your profile.</p>`;

        await transporter.sendMail({ from: process.env.EMAIL_USER, to: request.studentId.email, subject, html });
      } catch {
        console.warn('Email notification failed');
      }
    }

    res.json({ message: `Request ${status}!`, request });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
