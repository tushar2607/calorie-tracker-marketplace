const mongoose = require('mongoose');

const foodEntrySchema = new mongoose.Schema({
  mealType: {
    type: String,
    enum: ['breakfast', 'lunch', 'dinner', 'snack', 'pre_workout', 'post_workout'],
    required: true
  },
  foodName: {
    type: String,
    required: true,
    trim: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  unit: {
    type: String,
    default: 'serving'
  },
  calories: {
    type: Number,
    default: 0,
    min: 0
  },
  protein: {
    type: Number,
    default: 0,
    min: 0
  },
  carbs: {
    type: Number,
    default: 0,
    min: 0
  },
  fat: {
    type: Number,
    default: 0,
    min: 0
  }
});

const calorieLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  logDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  meals: [foodEntrySchema],
  totalCalories: {
    type: Number,
    default: 0
  },
  totalProtein: {
    type: Number,
    default: 0
  },
  totalCarbs: {
    type: Number,
    default: 0
  },
  totalFat: {
    type: Number,
    default: 0
  },
  waterIntake: {
    type: Number,
    default: 0,
    min: 0,
    max: 15
  },
  notes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Pre-save middleware to calculate totals
calorieLogSchema.pre('save', function(next) {
  if (this.meals && this.meals.length > 0) {
    this.totalCalories = this.meals.reduce((sum, meal) => sum + (meal.calories || 0), 0);
    this.totalProtein = this.meals.reduce((sum, meal) => sum + (meal.protein || 0), 0);
    this.totalCarbs = this.meals.reduce((sum, meal) => sum + (meal.carbs || 0), 0);
    this.totalFat = this.meals.reduce((sum, meal) => sum + (meal.fat || 0), 0);
  }
  next();
});

// Ensure one log per user per day
calorieLogSchema.index({ user: 1, logDate: 1 }, { unique: true });

module.exports = mongoose.model('CalorieLog', calorieLogSchema);
