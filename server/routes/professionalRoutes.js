const express = require('express');
const router = express.Router();
const ProfessionalProfile = require('../models/ProfessionalProfile');
const ServicePackage = require('../models/ServicePackage');
const { protect, authorize } = require('../middleware/auth');

// Create/Update professional profile
router.post('/profile', protect, authorize('trainer', 'dietitian', 'nutritionist'), async (req, res) => {
  try {
    let profile = await ProfessionalProfile.findOne({ user: req.user._id });
    
    if (profile) {
      profile = await ProfessionalProfile.findOneAndUpdate(
        { user: req.user._id },
        req.body,
        { new: true, runValidators: true }
      );
    } else {
      profile = await ProfessionalProfile.create({
        user: req.user._id,
        ...req.body
      });
    }
    
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get professional profile
router.get('/profile', protect, async (req, res) => {
  try {
    const profile = await ProfessionalProfile.findOne({ user: req.user._id }).populate('user', 'fullName email');
    res.json(profile || { message: 'No professional profile found' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
