const mongoose = require('mongoose');

const servicePackageSchema = new mongoose.Schema({
  professional: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProfessionalProfile',
    required: true
  },
  packageName: {
    type: String,
    required: true
  },
  packageType: {
    type: String,
    enum: ['one_day', 'weekly', 'monthly', 'quarterly', 'custom'],
    required: true
  },
  description: String,
  price: {
    type: Number,
    required: true,
    min: 0
  },
  durationDays: {
    type: Number,
    required: true,
    min: 1
  },
  features: [String],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ServicePackage', servicePackageSchema);
