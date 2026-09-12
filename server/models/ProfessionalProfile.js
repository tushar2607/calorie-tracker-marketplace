const mongoose = require('mongoose');

const professionalProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  qualifications: [{
    degree: String,
    institution: String,
    year: Number
  }],
  experienceYears: {
    type: Number,
    default: 0,
    min: 0
  },
  specialization: {
    type: [String],
    default: []
  },
  certifications: {
    type: [String],
    default: []
  },
  bio: {
    type: String,
    maxlength: 1000,
    default: ''
  },
  consultationFee: {
    type: Number,
    required: true,
    min: 0,
    default: 500
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  availability: {
    type: String,
    enum: ['available', 'busy', 'offline'],
    default: 'available'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ProfessionalProfile', professionalProfileSchema);
