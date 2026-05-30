const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fileName: { type: String },
  score: { type: Number },
  strengths: [String],
  improvements: [String],
  targetCompany: { type: String },
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resume', ResumeSchema);