const express = require('express');
const router = express.Router();
const CalorieLog = require('../models/CalorieLog');
const { protect } = require('../middleware/auth');

// Get today's log
router.get('/today', protect, async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    
    let log = await CalorieLog.findOne({
      user: req.user._id,
      logDate: { $gte: startOfDay, $lte: endOfDay }
    });
    
    if (!log) {
      log = { meals: [], totalCalories: 0, waterIntake: 0 };
    }
    
    res.json(log);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add meal
router.post('/meal', protect, async (req, res) => {
  try {
    const { mealType, foodName, quantity, unit, calories, protein, carbs, fat } = req.body;
    
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    
    let log = await CalorieLog.findOne({
      user: req.user._id,
      logDate: { $gte: startOfDay, $lte: endOfDay }
    });
    
    if (!log) {
      log = new CalorieLog({
        user: req.user._id,
        logDate: startOfDay,
        meals: [],
        waterIntake: 0
      });
    }
    
    log.meals.push({
      mealType,
      foodName,
      quantity,
      unit: unit || 'serving',
      calories: calories || 0,
      protein: protein || 0,
      carbs: carbs || 0,
      fat: fat || 0
    });
    
    await log.save();
    
    res.status(201).json(log);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update water intake
router.put('/water', protect, async (req, res) => {
  try {
    const { waterIntake } = req.body;
    
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    
    let log = await CalorieLog.findOne({
      user: req.user._id,
      logDate: { $gte: startOfDay, $lte: endOfDay }
    });
    
    if (!log) {
      log = new CalorieLog({
        user: req.user._id,
        logDate: startOfDay,
        meals: [],
        waterIntake
      });
    } else {
      log.waterIntake = waterIntake;
    }
    
    await log.save();
    
    res.json(log);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
