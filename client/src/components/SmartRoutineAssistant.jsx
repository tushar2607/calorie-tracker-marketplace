import React, { useState, useEffect } from 'react';
import { Droplets, Dumbbell, Utensils, Bell, Plus, CheckCircle2, Zap, Calendar, Clock, ArrowRight, Circle, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  DEFAULT_WORKOUT_SCHEDULES, 
  loadWorkoutSchedule, 
  saveWorkoutSchedule, 
  calculateWorkoutStats,
  playWorkoutChime 
} from '../utils/workoutData';

const WEEKLY_SPLITS = {
  0: { // Sunday
    dayName: 'Sunday',
    bodyPart: 'Rest & Recovery Day',
    workoutName: 'Complete Body Recovery & Mobility',
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
    workoutName: 'Back Thickness & Bicep Peak Volume',
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
    preWorkoutFuel: {
      timing: '30 min before cardio',
      title: 'Hydration & Light Antioxidant Snack',
      foods: '1 Green Apple with Green Tea or BCAA drink.',
      tip: 'Keep digestion light for active recovery and mobility work.'
    }
  },
  5: { // Friday
    dayName: 'Friday',
    bodyPart: 'Shoulders & Arms',
    workoutName: 'Deltoid Sculpting & Arm Peak',
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

  // Live Workout Schedule State
  const [activeWorkout, setActiveWorkout] = useState(() => loadWorkoutSchedule(dayOfWeek));
  const [workoutStats, setWorkoutStats] = useState(() => calculateWorkoutStats(activeWorkout));

  // Sync with storage events
  useEffect(() => {
    const syncData = () => {
      const refreshed = loadWorkoutSchedule(dayOfWeek);
      setActiveWorkout(refreshed);
      setWorkoutStats(calculateWorkoutStats(refreshed));
    };
    window.addEventListener('nutrigen_workout_updated', syncData);
    return () => window.removeEventListener('nutrigen_workout_updated', syncData);
  }, [dayOfWeek]);

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

  // Toggle set completion directly on Dashboard
  const handleToggleSet = (exerciseId, setNumber) => {
    const updatedExercises = activeWorkout.exercises.map(ex => {
      if (ex.id !== exerciseId) return ex;

      const updatedSets = ex.sets.map(s => {
        if (s.setNumber !== setNumber) return s;
        const nextState = !s.completed;
        return {
          ...s,
          completed: nextState,
          completedAt: nextState ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null
        };
      });

      return { ...ex, sets: updatedSets };
    });

    const updatedWorkout = { ...activeWorkout, exercises: updatedExercises };
    setActiveWorkout(updatedWorkout);
    saveWorkoutSchedule(updatedWorkout, dayOfWeek);
    setWorkoutStats(calculateWorkoutStats(updatedWorkout));

    const exObj = activeWorkout.exercises.find(e => e.id === exerciseId);
    const setObj = exObj?.sets.find(s => s.setNumber === setNumber);
    const wasCompleted = !setObj?.completed;

    if (wasCompleted) {
      playWorkoutChime('set');
      setReminderToast(`💪 Set ${setNumber} completed for ${exObj.name}! Rest 60s.`);
      setTimeout(() => setReminderToast(''), 3500);
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

      {/* 2-Column Section: Left Hydration, Right Live Workout Schedule Tracker */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat( auto-fit, minmax(340px, 1fr) )', gap: '1.5rem' }}>
        
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

        {/* Right Card: Live Training Updates & Gym Workout Tracker */}
        <div className="glass-card" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.12) 0%, rgba(15, 23, 42, 0.85) 100%)', border: '1px solid rgba(249, 115, 22, 0.35)' }}>
          
          <div className="flex-between" style={{ marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Dumbbell size={24} color="#f97316" />
              <h3 style={{ margin: 0, fontSize: '1.2rem' }}>
                Live Workout: <span style={{ color: '#f97316' }}>{todayRoutine.bodyPart}</span>
              </h3>
            </div>
            <Link 
              to="/workout"
              style={{
                fontSize: '0.8rem',
                background: 'linear-gradient(90deg, #f97316 0%, #ea580c 100%)',
                color: '#fff',
                padding: '0.35rem 0.75rem',
                borderRadius: '50px',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                boxShadow: '0 2px 8px rgba(249, 115, 22, 0.4)'
              }}
            >
              ⚡ Gym Mode <ArrowRight size={13} />
            </Link>
          </div>

          {/* Live Progress Bar on Dashboard */}
          <div style={{ marginBottom: '1rem' }}>
            <div className="flex-between" style={{ fontSize: '0.85rem', marginBottom: '0.35rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>
                Sets Progress: <strong style={{ color: '#fff' }}>{workoutStats.completedSets} / {workoutStats.totalSets} Done</strong>
              </span>
              <span style={{ fontWeight: 800, color: workoutStats.percentage === 100 ? '#22c55e' : '#f97316' }}>
                {workoutStats.percentage}%
              </span>
            </div>
            <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '50px', overflow: 'hidden' }}>
              <div 
                style={{ 
                  width: `${workoutStats.percentage}%`, 
                  height: '100%', 
                  background: workoutStats.percentage === 100 ? '#22c55e' : 'linear-gradient(90deg, #f97316 0%, #ea580c 100%)', 
                  borderRadius: '50px', 
                  transition: 'width 0.3s ease' 
                }} 
              />
            </div>
          </div>

          {/* Interactive Exercise List with Set Checkboxes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.25rem' }}>
            {activeWorkout.exercises.slice(0, 4).map((ex) => {
              const exDone = ex.sets.filter(s => s.completed).length;
              const isAllDone = ex.sets.length > 0 && exDone === ex.sets.length;

              return (
                <div 
                  key={ex.id}
                  style={{
                    background: isAllDone ? 'rgba(34, 197, 94, 0.12)' : 'rgba(15, 23, 42, 0.65)',
                    padding: '0.75rem 0.95rem',
                    borderRadius: '0.65rem',
                    border: isAllDone ? '1px solid rgba(34, 197, 94, 0.4)' : '1px solid var(--glass-border)'
                  }}
                >
                  <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <strong style={{ fontSize: '0.92rem', color: isAllDone ? '#4ade80' : '#fff' }}>
                        {ex.name}
                      </strong>
                      {isAllDone && <CheckCircle2 size={15} color="#22c55e" />}
                    </div>
                    <span style={{ fontSize: '0.78rem', color: isAllDone ? '#22c55e' : 'var(--text-secondary)', fontWeight: 600 }}>
                      {exDone}/{ex.sets.length} Sets
                    </span>
                  </div>

                  {/* Interactive Set Pills */}
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {ex.sets.map((s) => (
                      <button
                        key={s.setNumber}
                        onClick={() => handleToggleSet(ex.id, s.setNumber)}
                        style={{
                          padding: '0.3rem 0.65rem',
                          borderRadius: '6px',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          border: s.completed ? '1px solid #22c55e' : '1px solid var(--glass-border)',
                          background: s.completed ? 'linear-gradient(90deg, #22c55e 0%, #16a34a 100%)' : 'rgba(255, 255, 255, 0.05)',
                          color: s.completed ? '#fff' : 'var(--text-secondary)',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {s.completed ? <Check size={12} strokeWidth={3} /> : <Circle size={10} />}
                        Set {s.setNumber} ({s.reps}r @ {s.weight}k)
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pre-Workout Nutrition & Fuel Box */}
          <div style={{ background: 'rgba(15, 23, 42, 0.75)', borderLeft: '4px solid #f97316', padding: '0.75rem 1rem', borderRadius: '0 0.5rem 0.5rem 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', fontWeight: 700, color: '#f97316', marginBottom: '0.25rem' }}>
              <Utensils size={15} /> Fuel Protocol ({todayRoutine.preWorkoutFuel.timing}):
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              🥑 {todayRoutine.preWorkoutFuel.title}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.35', marginTop: '0.2rem' }}>
              {todayRoutine.preWorkoutFuel.foods}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default SmartRoutineAssistant;
