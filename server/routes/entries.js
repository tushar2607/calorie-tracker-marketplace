const express = require('express');
const router = express.Router();
const FoodEntry = require('../models/FoodEntry');

// Get today's entries
router.get('/', async (req, res) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const entries = await FoodEntry.find({
      date: { $gte: start, $lte: end }
    }).populate('foodItem');
    
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add an entry
router.post('/', async (req, res) => {
  try {
    const { foodItemId, mealType, quantity } = req.body;
    const newEntry = new FoodEntry({
      foodItem: foodItemId,
      mealType,
      quantity
    });
    await newEntry.save();
    res.json(await newEntry.populate('foodItem'));
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
