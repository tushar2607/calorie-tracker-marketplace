// Default Workout Schedules for each day of the week
export const DEFAULT_WORKOUT_SCHEDULES = {
  0: {
    dayName: 'Sunday',
    bodyPart: 'Rest, Recovery & Mobility',
    workoutName: 'Active Joint Mobility & Decompression',
    estimatedDuration: '30 mins',
    exercises: [
      {
        id: 'sun_1',
        name: 'Incline Treadmill Walk / Light Cardio',
        muscle: 'Cardio',
        targetSets: 1,
        targetReps: '20-30 mins',
        targetWeight: 'LISS',
        sets: [
          { setNumber: 1, reps: '30 min', weight: 'LISS', completed: false, completedAt: null }
        ]
      },
      {
        id: 'sun_2',
        name: 'Full Body Foam Rolling',
        muscle: 'Mobility',
        targetSets: 3,
        targetReps: '60s per muscle',
        targetWeight: 'Bodyweight',
        sets: [
          { setNumber: 1, reps: '60s', weight: 'BW', completed: false, completedAt: null },
          { setNumber: 2, reps: '60s', weight: 'BW', completed: false, completedAt: null },
          { setNumber: 3, reps: '60s', weight: 'BW', completed: false, completedAt: null }
        ]
      },
      {
        id: 'sun_3',
        name: 'Thoracic & Hamstring Static Stretching',
        muscle: 'Flexibility',
        targetSets: 3,
        targetReps: '45s holds',
        targetWeight: 'Bodyweight',
        sets: [
          { setNumber: 1, reps: '45s', weight: 'BW', completed: false, completedAt: null },
          { setNumber: 2, reps: '45s', weight: 'BW', completed: false, completedAt: null },
          { setNumber: 3, reps: '45s', weight: 'BW', completed: false, completedAt: null }
        ]
      }
    ]
  },
  1: {
    dayName: 'Monday',
    bodyPart: 'Chest & Triceps',
    workoutName: 'Chest Hypertrophy & Tricep Pressing',
    estimatedDuration: '60 mins',
    exercises: [
      {
        id: 'mon_1',
        name: 'Incline Barbell Bench Press',
        muscle: 'Upper Chest',
        targetSets: 4,
        targetReps: '8-10 reps',
        targetWeight: '50 kg',
        sets: [
          { setNumber: 1, reps: 10, weight: 45, completed: false, completedAt: null },
          { setNumber: 2, reps: 10, weight: 50, completed: false, completedAt: null },
          { setNumber: 3, reps: 8, weight: 55, completed: false, completedAt: null },
          { setNumber: 4, reps: 8, weight: 55, completed: false, completedAt: null }
        ]
      },
      {
        id: 'mon_2',
        name: 'Flat Dumbbell Press',
        muscle: 'Middle Chest',
        targetSets: 3,
        targetReps: '10-12 reps',
        targetWeight: '22.5 kg',
        sets: [
          { setNumber: 1, reps: 12, weight: 20, completed: false, completedAt: null },
          { setNumber: 2, reps: 10, weight: 22.5, completed: false, completedAt: null },
          { setNumber: 3, reps: 10, weight: 22.5, completed: false, completedAt: null }
        ]
      },
      {
        id: 'mon_3',
        name: 'Cable Chest Flyes',
        muscle: 'Chest Peak',
        targetSets: 3,
        targetReps: '12-15 reps',
        targetWeight: '12 kg',
        sets: [
          { setNumber: 1, reps: 15, weight: 10, completed: false, completedAt: null },
          { setNumber: 2, reps: 12, weight: 12.5, completed: false, completedAt: null },
          { setNumber: 3, reps: 12, weight: 12.5, completed: false, completedAt: null }
        ]
      },
      {
        id: 'mon_4',
        name: 'Tricep Rope Pushdowns',
        muscle: 'Triceps',
        targetSets: 4,
        targetReps: '12 reps',
        targetWeight: '20 kg',
        sets: [
          { setNumber: 1, reps: 12, weight: 17.5, completed: false, completedAt: null },
          { setNumber: 2, reps: 12, weight: 20, completed: false, completedAt: null },
          { setNumber: 3, reps: 12, weight: 20, completed: false, completedAt: null },
          { setNumber: 4, reps: 10, weight: 22.5, completed: false, completedAt: null }
        ]
      }
    ]
  },
  2: {
    dayName: 'Tuesday',
    bodyPart: 'Back & Biceps',
    workoutName: 'Back Thickness & Bicep Peak Volume',
    estimatedDuration: '65 mins',
    exercises: [
      {
        id: 'tue_1',
        name: 'Lat Pulldowns (Wide Grip)',
        muscle: 'Lats & Upper Back',
        targetSets: 4,
        targetReps: '8-10 reps',
        targetWeight: '45 kg',
        sets: [
          { setNumber: 1, reps: 10, weight: 40, completed: false, completedAt: null },
          { setNumber: 2, reps: 10, weight: 45, completed: false, completedAt: null },
          { setNumber: 3, reps: 8, weight: 50, completed: false, completedAt: null },
          { setNumber: 4, reps: 8, weight: 50, completed: false, completedAt: null }
        ]
      },
      {
        id: 'tue_2',
        name: 'Seated Cable Rows (Close Grip)',
        muscle: 'Mid Back',
        targetSets: 3,
        targetReps: '10-12 reps',
        targetWeight: '40 kg',
        sets: [
          { setNumber: 1, reps: 12, weight: 35, completed: false, completedAt: null },
          { setNumber: 2, reps: 10, weight: 40, completed: false, completedAt: null },
          { setNumber: 3, reps: 10, weight: 40, completed: false, completedAt: null }
        ]
      },
      {
        id: 'tue_3',
        name: 'Barbell Bicep Curls',
        muscle: 'Biceps Long & Short Head',
        targetSets: 3,
        targetReps: '10-12 reps',
        targetWeight: '20 kg',
        sets: [
          { setNumber: 1, reps: 12, weight: 15, completed: false, completedAt: null },
          { setNumber: 2, reps: 10, weight: 20, completed: false, completedAt: null },
          { setNumber: 3, reps: 10, weight: 20, completed: false, completedAt: null }
        ]
      },
      {
        id: 'tue_4',
        name: 'Dumbbell Hammer Curls',
        muscle: 'Brachialis & Forearms',
        targetSets: 3,
        targetReps: '12 reps',
        targetWeight: '12.5 kg',
        sets: [
          { setNumber: 1, reps: 12, weight: 10, completed: false, completedAt: null },
          { setNumber: 2, reps: 12, weight: 12.5, completed: false, completedAt: null },
          { setNumber: 3, reps: 12, weight: 12.5, completed: false, completedAt: null }
        ]
      }
    ]
  },
  3: {
    dayName: 'Wednesday',
    bodyPart: 'Legs & Lower Body',
    workoutName: 'Quads, Hamstrings & Calves Power',
    estimatedDuration: '70 mins',
    exercises: [
      {
        id: 'wed_1',
        name: 'Barbell Back Squats',
        muscle: 'Quads & Glutes',
        targetSets: 4,
        targetReps: '6-8 reps',
        targetWeight: '70 kg',
        sets: [
          { setNumber: 1, reps: 8, weight: 60, completed: false, completedAt: null },
          { setNumber: 2, reps: 8, weight: 65, completed: false, completedAt: null },
          { setNumber: 3, reps: 6, weight: 70, completed: false, completedAt: null },
          { setNumber: 4, reps: 6, weight: 70, completed: false, completedAt: null }
        ]
      },
      {
        id: 'wed_2',
        name: 'Romanian Deadlifts (RDL)',
        muscle: 'Hamstrings & Posterior Chain',
        targetSets: 3,
        targetReps: '10 reps',
        targetWeight: '60 kg',
        sets: [
          { setNumber: 1, reps: 10, weight: 50, completed: false, completedAt: null },
          { setNumber: 2, reps: 10, weight: 60, completed: false, completedAt: null },
          { setNumber: 3, reps: 10, weight: 60, completed: false, completedAt: null }
        ]
      },
      {
        id: 'wed_3',
        name: 'Leg Press & Extension',
        muscle: 'Quad Hypertrophy',
        targetSets: 3,
        targetReps: '12 reps',
        targetWeight: '100 kg',
        sets: [
          { setNumber: 1, reps: 12, weight: 80, completed: false, completedAt: null },
          { setNumber: 2, reps: 12, weight: 100, completed: false, completedAt: null },
          { setNumber: 3, reps: 10, weight: 110, completed: false, completedAt: null }
        ]
      },
      {
        id: 'wed_4',
        name: 'Standing Calf Raises',
        muscle: 'Calves',
        targetSets: 4,
        targetReps: '15 reps',
        targetWeight: '40 kg',
        sets: [
          { setNumber: 1, reps: 15, weight: 35, completed: false, completedAt: null },
          { setNumber: 2, reps: 15, weight: 40, completed: false, completedAt: null },
          { setNumber: 3, reps: 15, weight: 40, completed: false, completedAt: null },
          { setNumber: 4, reps: 15, weight: 40, completed: false, completedAt: null }
        ]
      }
    ]
  },
  4: {
    dayName: 'Thursday',
    bodyPart: 'Active Recovery & Core',
    workoutName: 'LISS Cardio, Core Stability & Joint Flow',
    estimatedDuration: '45 mins',
    exercises: [
      {
        id: 'thu_1',
        name: 'Incline Treadmill Walk',
        muscle: 'Aerobic System',
        targetSets: 1,
        targetReps: '30 mins',
        targetWeight: '12% Incline',
        sets: [
          { setNumber: 1, reps: '30 min', weight: '12%', completed: false, completedAt: null }
        ]
      },
      {
        id: 'thu_2',
        name: 'Hanging Leg Raises',
        muscle: 'Lower Abs',
        targetSets: 3,
        targetReps: '15 reps',
        targetWeight: 'Bodyweight',
        sets: [
          { setNumber: 1, reps: 15, weight: 'BW', completed: false, completedAt: null },
          { setNumber: 2, reps: 15, weight: 'BW', completed: false, completedAt: null },
          { setNumber: 3, reps: 12, weight: 'BW', completed: false, completedAt: null }
        ]
      },
      {
        id: 'thu_3',
        name: 'Plank Hold',
        muscle: 'Core Stability',
        targetSets: 3,
        targetReps: '60s hold',
        targetWeight: 'Bodyweight',
        sets: [
          { setNumber: 1, reps: '60s', weight: 'BW', completed: false, completedAt: null },
          { setNumber: 2, reps: '60s', weight: 'BW', completed: false, completedAt: null },
          { setNumber: 3, reps: '60s', weight: 'BW', completed: false, completedAt: null }
        ]
      }
    ]
  },
  5: {
    dayName: 'Friday',
    bodyPart: 'Shoulders & Arms Blast',
    workoutName: 'Deltoid 3D Sculpt & Bicep/Tricep Superset',
    estimatedDuration: '60 mins',
    exercises: [
      {
        id: 'fri_1',
        name: 'Seated Dumbbell Shoulder Press',
        muscle: 'Anterior & Lateral Delts',
        targetSets: 4,
        targetReps: '8-10 reps',
        targetWeight: '20 kg',
        sets: [
          { setNumber: 1, reps: 10, weight: 17.5, completed: false, completedAt: null },
          { setNumber: 2, reps: 10, weight: 20, completed: false, completedAt: null },
          { setNumber: 3, reps: 8, weight: 22.5, completed: false, completedAt: null },
          { setNumber: 4, reps: 8, weight: 22.5, completed: false, completedAt: null }
        ]
      },
      {
        id: 'fri_2',
        name: 'Dumbbell Lateral Raises',
        muscle: 'Side Delts',
        targetSets: 4,
        targetReps: '15 reps',
        targetWeight: '10 kg',
        sets: [
          { setNumber: 1, reps: 15, weight: 8, completed: false, completedAt: null },
          { setNumber: 2, reps: 15, weight: 10, completed: false, completedAt: null },
          { setNumber: 3, reps: 15, weight: 10, completed: false, completedAt: null },
          { setNumber: 4, reps: 12, weight: 10, completed: false, completedAt: null }
        ]
      },
      {
        id: 'fri_3',
        name: 'Preacher Bicep Curls (EZ Bar)',
        muscle: 'Biceps Isolation',
        targetSets: 3,
        targetReps: '10-12 reps',
        targetWeight: '22.5 kg',
        sets: [
          { setNumber: 1, reps: 12, weight: 17.5, completed: false, completedAt: null },
          { setNumber: 2, reps: 10, weight: 22.5, completed: false, completedAt: null },
          { setNumber: 3, reps: 10, weight: 22.5, completed: false, completedAt: null }
        ]
      },
      {
        id: 'fri_4',
        name: 'Overhead Skullcrushers',
        muscle: 'Triceps Long Head',
        targetSets: 3,
        targetReps: '12 reps',
        targetWeight: '20 kg',
        sets: [
          { setNumber: 1, reps: 12, weight: 17.5, completed: false, completedAt: null },
          { setNumber: 2, reps: 12, weight: 20, completed: false, completedAt: null },
          { setNumber: 3, reps: 10, weight: 20, completed: false, completedAt: null }
        ]
      }
    ]
  },
  6: {
    dayName: 'Saturday',
    bodyPart: 'Full Body Power & Conditioning',
    workoutName: 'Compound Power & Athletic Conditioning',
    estimatedDuration: '65 mins',
    exercises: [
      {
        id: 'sat_1',
        name: 'Barbell Deadlifts / Power Cleans',
        muscle: 'Posterior & Full Body',
        targetSets: 4,
        targetReps: '6 reps',
        targetWeight: '80 kg',
        sets: [
          { setNumber: 1, reps: 6, weight: 70, completed: false, completedAt: null },
          { setNumber: 2, reps: 6, weight: 80, completed: false, completedAt: null },
          { setNumber: 3, reps: 6, weight: 85, completed: false, completedAt: null },
          { setNumber: 4, reps: 5, weight: 90, completed: false, completedAt: null }
        ]
      },
      {
        id: 'sat_2',
        name: 'Bodyweight Pull-ups',
        muscle: 'Back & Biceps',
        targetSets: 4,
        targetReps: '8-10 reps',
        targetWeight: 'Bodyweight',
        sets: [
          { setNumber: 1, reps: 10, weight: 'BW', completed: false, completedAt: null },
          { setNumber: 2, reps: 8, weight: 'BW', completed: false, completedAt: null },
          { setNumber: 3, reps: 8, weight: 'BW', completed: false, completedAt: null },
          { setNumber: 4, reps: 7, weight: 'BW', completed: false, completedAt: null }
        ]
      },
      {
        id: 'sat_3',
        name: 'Dumbbell Bicep 21s & Hammer Combo',
        muscle: 'Biceps Peak',
        targetSets: 3,
        targetReps: '21 reps',
        targetWeight: '10 kg',
        sets: [
          { setNumber: 1, reps: 21, weight: 8, completed: false, completedAt: null },
          { setNumber: 2, reps: 21, weight: 10, completed: false, completedAt: null },
          { setNumber: 3, reps: 21, weight: 10, completed: false, completedAt: null }
        ]
      },
      {
        id: 'sat_4',
        name: 'Parallel Bar Dips',
        muscle: 'Chest & Triceps',
        targetSets: 4,
        targetReps: '12 reps',
        targetWeight: 'Bodyweight',
        sets: [
          { setNumber: 1, reps: 12, weight: 'BW', completed: false, completedAt: null },
          { setNumber: 2, reps: 12, weight: 'BW', completed: false, completedAt: null },
          { setNumber: 3, reps: 10, weight: 'BW', completed: false, completedAt: null },
          { setNumber: 4, reps: 10, weight: 'BW', completed: false, completedAt: null }
        ]
      }
    ]
  }
};

// Key format helper: YYYY-MM-DD
export const getTodayDateKey = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

// LocalStorage helpers
export const loadWorkoutSchedule = (dayIndex = new Date().getDay()) => {
  const dateKey = getTodayDateKey();
  const storageKey = `nutrigen_workout_${dayIndex}_${dateKey}`;
  const saved = localStorage.getItem(storageKey);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse saved workout schedule', e);
    }
  }
  // Return fresh copy of default
  const defaultSplit = DEFAULT_WORKOUT_SCHEDULES[dayIndex] || DEFAULT_WORKOUT_SCHEDULES[1];
  return JSON.parse(JSON.stringify(defaultSplit));
};

export const saveWorkoutSchedule = (workoutData, dayIndex = new Date().getDay()) => {
  const dateKey = getTodayDateKey();
  const storageKey = `nutrigen_workout_${dayIndex}_${dateKey}`;
  localStorage.setItem(storageKey, JSON.stringify(workoutData));
  // Dispatch custom storage event for in-window sync
  window.dispatchEvent(new Event('nutrigen_workout_updated'));
};

// Calculate summary stats
export const calculateWorkoutStats = (workoutData) => {
  if (!workoutData || !workoutData.exercises) {
    return { totalSets: 0, completedSets: 0, percentage: 0, exercisesCompleted: 0, totalExercises: 0 };
  }

  let totalSets = 0;
  let completedSets = 0;
  let exercisesCompleted = 0;

  workoutData.exercises.forEach(ex => {
    const exTotal = ex.sets.length;
    const exDone = ex.sets.filter(s => s.completed).length;
    totalSets += exTotal;
    completedSets += exDone;
    if (exTotal > 0 && exDone === exTotal) {
      exercisesCompleted += 1;
    }
  });

  const percentage = totalSets > 0 ? Math.round((completedSets / totalSets) * 100) : 0;
  const estimatedCaloriesBurned = Math.round(completedSets * 18); // ~18 kcal burned per completed work set

  return {
    totalSets,
    completedSets,
    percentage,
    exercisesCompleted,
    totalExercises: workoutData.exercises.length,
    estimatedCaloriesBurned
  };
};

// Sound chime helper via Web Audio API (zero external files required)
export const playWorkoutChime = (type = 'set') => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    if (type === 'set') {
      // Pleasant high double chime for completed set
      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(587.33, now); // D5
      osc1.frequency.exponentialRampToValueAtTime(880, now + 0.15); // A5
      gain1.gain.setValueAtTime(0.2, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.35);
    } else if (type === 'rest') {
      // Triple fanfare chime when rest timer finishes
      const now = ctx.currentTime;
      [0, 0.12, 0.24].forEach((offset, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        const freq = idx === 2 ? 1046.50 : (idx === 1 ? 783.99 : 659.25);
        osc.frequency.setValueAtTime(freq, now + offset);
        gain.gain.setValueAtTime(0.25, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + offset);
        osc.stop(now + offset + 0.3);
      });
    }
  } catch (err) {
    console.debug('Web audio not allowed or failed:', err);
  }
};
