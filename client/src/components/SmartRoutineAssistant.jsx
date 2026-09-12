import React, { useState, useEffect } from 'react';
import { Droplets, Dumbbell, Utensils, Bell, Plus, CheckCircle2, Zap, Calendar, Clock, AlertCircle } from 'lucide-react';

const WEEKLY_SPLITS = {
  0: { // Sunday
    dayName: 'Sunday',
    bodyPart: 'Rest & Recovery Day',
    workoutName: 'Complete Body Recovery & Mobility',
    exercises: ['Light Walking (20-30 mins)', 'Full Body Foam Rolling', 'Static Stretching'],
    preWorkoutFuel: {
      timing: 'Throughout the Morning',
      title: 'Nutrient-Dense Whole Food Recovery',
      foods: 'Oatmeal with chia seeds, berries & 1 scoop whey, plus 500ml water.',
      tip: 'Prioritize gut health and muscle repair today with whole foods and hydration.'
    }
  },
  1: { // Monday
    dayName: 'Monday',
    bodyPart: 'Chest & Triceps',
    workoutName: 'Chest Hypertrophy & Tricep Pressing',
    exercises: ['Incline Barbell Press (4x8-10)', 'Flat Dumbbell Press (3x10)', 'Cable Chest Flyes (3x12)', 'Tricep Pushdowns (4x12)'],
    preWorkoutFuel: {
      timing: '45-60 min before workout',
      title: 'Fast-Acting Carbs + Clean Protein',
      foods: '1 Medium Banana + 1 Scoop Whey Protein OR 2 Rice Cakes with Honey & Espresso Shot.',
      tip: 'Quick carbs will maximize your chest pump and energy during heavy pressing.'
    }
  },
  2: { // Tuesday
    dayName: 'Tuesday',
    bodyPart: 'Back & Biceps',
    workoutName: 'Back Thickness & Bicep Peak',
    exercises: ['Conventional Deadlifts or Lat Pulldowns (4x6-8)', 'Seated Cable Rows (3x10)', 'Barbell Bicep Curls (4x10)', 'Hammer Curls (3x12)'],
    preWorkoutFuel: {
      timing: '60 min before workout',
      title: 'Complex Carbs + Sustained Sustenance',
      foods: '50g Rolled Oats cooked with milk/water, sliced banana & almond butter.',
      tip: 'Back day requires heavy nervous system energy. Ensure full glycogen stores!'
    }
  },
  3: { // Wednesday
    dayName: 'Wednesday',
    bodyPart: 'Legs & Lower Body',
    workoutName: 'Quads, Hamstrings & Calves Blast',
    exercises: ['Barbell Back Squats (4x6-8)', 'Romanian Deadlifts (3x10)', 'Leg Extension & Curl Superset (3x12)', 'Calf Raises (4x15)'],
    preWorkoutFuel: {
      timing: '60-75 min before workout',
      title: 'High Glycogen Fuel & Sodium Support',
      foods: '1 Bowl Boiled Sweet Potato or White Rice with Grilled Chicken/Paneer + Pinch of Sea Salt.',
      tip: 'Leg day demands maximum calories. Sea salt prevents cramping and boosts pumps.'
    }
  },
  4: { // Thursday
    dayName: 'Thursday',
    bodyPart: 'Active Recovery & Core',
    workoutName: 'LISS Cardio, Core & Joint Mobility',
    exercises: ['Incline Treadmill Walk (30 mins)', 'Hanging Leg Raises (3x15)', 'Planks (3x60s)', 'Hip & Shoulder Mobility'],
    preWorkoutFuel: {
      timing: '30 min before cardio',
      title: 'Hydration & Light Antioxidant Snack',
      foods: '1 Green Apple with Green Tea or BCAA drink.',
      tip: 'Keep digestion light for active recovery and mobility work.'
    }
  },
  5: { // Friday
    dayName: 'Friday',
    dayNameShort: 'Fri',
    bodyPart: 'Shoulders & Arms',
    workoutName: 'Deltoid Sculpting & Arm Peak',
    exercises: ['Overhead Dumbbell Press (4x8-10)', 'Dumbbell Lateral Raises (4x15)', 'Face Pulls (3x15)', 'Preacher Curls & Skullcrushers (3x12)'],
    preWorkoutFuel: {
      timing: '45 min before workout',
      title: 'Nitric Oxide & Pump Matrix',
      foods: '1 Cup Mixed Berries + 1 Scoop Protein Shake or Black Coffee with Whole Wheat Toast.',
      tip: 'Focus on high-volume pump work. Stay well hydrated!'
    }
  },
  6: { // Saturday
    dayName: 'Saturday',
    bodyPart: 'Full Body Conditioning / Power',
    workoutName: 'Compound Power & Athletic Conditioning',
    exercises: ['Clean & Press (4x6)', 'Kettlebell Swings (4x15)', 'Pull-ups (4xMax)', 'Dips (4x12)'],
    preWorkoutFuel: {
      timing: '60 min before workout',
      title: 'Balanced Power Energy Ratio',
      foods: 'Whole Wheat Toast with 2 Boiled Eggs & Black Coffee/Pre-workout.',
      tip: 'Prepare for high total calorie expenditure during full body athletic training.'
    }
  }
};

const SmartRoutineAssistant = () => {
  const dayOfWeek = new Date().getDay(); // 0-6
  const todayRoutine = WEEKLY_SPLITS[dayOfWeek] || WEEKLY_SPLITS[1];

  // Hydration state
  const [waterIntake, setWaterIntake] = useState(() => {
    const saved = localStorage.getItem('todayWaterIntake');
    return saved ? parseFloat(saved) : 0;
  });
  const waterGoal = 3.0; // 3 Liters target

  // Reminder alert state
  const [reminderToast, setReminderToast] = useState('');

  const addWater = (amount) => {
    setWaterIntake(prev => {
      const updated = Math.min(waterGoal, parseFloat((prev + amount).toFixed(2)));
      localStorage.setItem('todayWaterIntake', updated.toString());
      if (updated >= waterGoal) {
        setReminderToast('🎉 Daily Hydration Goal Accomplished! (3.0 L reached)');
      } else {
        setReminderToast(`💧 Added ${amount * 1000}ml water! (${updated}L / ${waterGoal}L)`);
      }
      setTimeout(() => setReminderToast(''), 3500);
      return updated;
    });
  };

  const triggerManualWaterReminder = () => {
    setReminderToast('🔔 Hydration Reminder: Time to drink a 250ml glass of water now!');
    setTimeout(() => setReminderToast(''), 4500);

    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("💧 NutriGen Hydration Alert", {
        body: "Stay on top of your performance! Drink 250ml of water now.",
        icon: "/favicon.svg"
      });
    } else if ("Notification" in window && Notification.permission !== "denied") {
      Notification.requestPermission();
    }
  };

  const waterPercentage = Math.min(100, Math.round((waterIntake / waterGoal) * 100));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>

      {/* Reminder Notification Toast Banner */}
      {reminderToast && (
        <div style={{
          background: 'linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%)',
          color: '#fff',
          padding: '0.85rem 1.25rem',
          borderRadius: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontWeight: 600,
          boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Bell size={20} className="pulse-text" /> {reminderToast}
          </div>
          <button onClick={() => setReminderToast('')} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 700 }}>✕</button>
        </div>
      )}

      {/* 2-Column Section: Left Hydration, Right Workout & Pre-Workout Fuel */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat( auto-fit, minmax(320px, 1fr) )', gap: '1.5rem' }}>
        
        {/* Left Card: Hydration Tracker & Automated Water Reminders */}
        <div className="glass-card" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(15, 23, 42, 0.8) 100%)', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
          <div className="flex-between" style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Droplets size={24} color="#3b82f6" />
              <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Smart Hydration Tracker</h3>
            </div>
            <button 
              onClick={triggerManualWaterReminder}
              className="btn" 
              style={{ fontSize: '0.8rem', padding: '0.35rem 0.65rem', display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'var(--surface)' }}
            >
              <Bell size={14} color="#3b82f6" /> Water Alert
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '2.2rem', fontWeight: 800, color: '#3b82f6' }}>{waterIntake}</span>
            <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>/ {waterGoal} Liters ({waterPercentage}%)</span>
          </div>

          {/* Progress Bar */}
          <div style={{ width: '100%', height: '10px', background: 'var(--surface)', borderRadius: '50px', overflow: 'hidden', marginBottom: '1.25rem' }}>
            <div style={{ width: `${waterPercentage}%`, height: '100%', background: 'linear-gradient(90deg, #60a5fa 0%, #2563eb 100%)', borderRadius: '50px', transition: 'width 0.4s ease' }} />
          </div>

          {/* Quick Add Buttons */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button 
              onClick={() => addWater(0.25)}
              className="btn"
              style={{ flex: 1, padding: '0.6rem', fontSize: '0.88rem', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', border: '1px solid rgba(59, 130, 246, 0.3)' }}
            >
              <Plus size={16} /> +250ml Glass
            </button>
            <button 
              onClick={() => addWater(0.50)}
              className="btn"
              style={{ flex: 1, padding: '0.6rem', fontSize: '0.88rem', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', background: 'rgba(59, 130, 246, 0.25)', color: '#3b82f6', border: '1px solid #3b82f6' }}
            >
              <Plus size={16} /> +500ml Bottle
            </button>
          </div>
        </div>

        {/* Right Card: Today's Body Part Workout & Pre-Workout Fuel */}
        <div className="glass-card" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(15, 23, 42, 0.8) 100%)', border: '1px solid rgba(249, 115, 22, 0.3)' }}>
          
          <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Dumbbell size={24} color="#f97316" />
              <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Today's Target: <span style={{ color: '#f97316' }}>{todayRoutine.bodyPart}</span></h3>
            </div>
            <span style={{ fontSize: '0.8rem', background: 'rgba(249, 115, 22, 0.2)', color: '#f97316', padding: '0.25rem 0.65rem', borderRadius: '50px', fontWeight: 700 }}>
              {todayRoutine.dayName} Split
            </span>
          </div>

          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', fontWeight: 600 }}>
            {todayRoutine.workoutName}
          </div>

          {/* Exercises Chips */}
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {todayRoutine.exercises.map((ex, i) => (
              <span key={i} style={{ background: 'var(--surface)', fontSize: '0.78rem', padding: '0.25rem 0.6rem', borderRadius: '4px', border: '1px solid var(--glass-border)' }}>
                {ex}
              </span>
            ))}
          </div>

          {/* Pre-Workout Nutrition & Fuel Box */}
          <div style={{ background: 'rgba(15, 23, 42, 0.7)', borderLeft: '4px solid #f97316', padding: '0.85rem 1rem', borderRadius: '0 0.5rem 0.5rem 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 700, color: '#f97316', marginBottom: '0.35rem' }}>
              <Utensils size={16} /> Pre-Workout Fuel Protocol ({todayRoutine.preWorkoutFuel.timing}):
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
              🥑 {todayRoutine.preWorkoutFuel.title}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
              {todayRoutine.preWorkoutFuel.foods}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#f97316', marginTop: '0.35rem', fontStyle: 'italic' }}>
              💡 Pro Tip: {todayRoutine.preWorkoutFuel.tip}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default SmartRoutineAssistant;
