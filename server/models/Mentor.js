const mongoose = require('mongoose');

const MentorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  company: { type: String, required: true },
  role: { type: String, required: true },
  branch: { type: String },
  collegeTier: { type: Number },
  availability: { type: Boolean, default: true },
  linkedIn: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Mentor', MentorSchema);
