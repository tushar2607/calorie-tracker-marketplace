const mongoose = require('mongoose');

const FoodEntrySchema = new mongoose.Schema({
  foodItem: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodItem', required: true },
  date: { type: Date, default: Date.now, required: true },
  mealType: { type: String, enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack'], required: true },
  quantity: { type: Number, required: true },
});

module.exports = mongoose.model('FoodEntry', FoodEntrySchema);
