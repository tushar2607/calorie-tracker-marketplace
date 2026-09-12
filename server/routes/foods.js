const express = require('express');
const router = express.Router();
const FoodItem = require('../models/FoodItem');

// Get all food items
router.get('/', async (req, res) => {
  try {
    const foods = await FoodItem.find({});
    res.json(foods);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a new food item
router.post('/', async (req, res) => {
  try {
    const { name, calories, protein, carbs, fat, servingSize } = req.body;
    const newFood = new FoodItem({ name, calories, protein, carbs, fat, servingSize });
    await newFood.save();
    res.json(newFood);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
