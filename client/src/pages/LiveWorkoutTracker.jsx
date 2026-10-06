import React, { useState, useEffect, useRef } from 'react';
import { 
  Dumbbell, CheckCircle2, Circle, Clock, Flame, Play, Pause, RotateCcw, 
  Plus, Trash2, Award, Zap, Bell, ChevronRight, Check, Sparkles, Volume2, 
  ArrowLeft, RefreshCw 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  DEFAULT_WORKOUT_SCHEDULES, 
  loadWorkoutSchedule, 
  saveWorkoutSchedule, 
  calculateWorkoutStats,
  playWorkoutChime 
} from '../utils/workoutData';

export default function LiveWorkoutTracker() {
  const currentDayIndex = new Date().getDay();
  const [selectedDay, setSelectedDay] = useState(currentDayIndex);
  const [workout, setWorkout] = useState(() => loadWorkoutSchedule(currentDayIndex));
  const [stats, setStats] = useState(() => calculateWorkoutStats(workout));

  // Active workout session stopwatch
  const [sessionActive, setSessionActive] = useState(true);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Live Rest Timer state
  const [restTimerSeconds, setRestTimerSeconds] = useState(0);
  const [restTimerInitial, setRestTimerInitial] = useState(60);
  const [isRestActive, setIsRestActive] = useState(false);
  const [lastCompletedInfo, setLastCompletedInfo] = useState('');

  // Add Exercise Modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newExName, setNewExName] = useState('');
  const [newExMuscle, setNewExMuscle] = useState('Biceps');
  const [newExSets, setNewExSets] = useState(3);
  const [newExReps, setNewExReps] = useState(10);
  const [newExWeight, setNewExWeight] = useState(15);

  // Celebration state
  const [showCelebration, setShowCelebration] = useState(false);

  // Sync workout when selectedDay changes
  useEffect(() => {
    const loaded = loadWorkoutSchedule(selectedDay);
    setWorkout(loaded);
    setStats(calculateWorkoutStats(loaded));
  }, [selectedDay]);

  // Listen to external updates (e.g. from Dashboard assistant)
  useEffect(() => {
    const handleSync = () => {
      const refreshed = loadWorkoutSchedule(selectedDay);
      setWorkout(refreshed);
      setStats(calculateWorkoutStats(refreshed));
    };
    window.addEventListener('nutrigen_workout_updated', handleSync);
    return () => window.removeEventListener('nutrigen_workout_updated', handleSync);
  }, [selectedDay]);

  // Session timer ticker
  useEffect(() => {
    let interval = null;
    if (sessionActive) {
      interval = setInterval(() => {
        setElapsedSeconds(sec => sec + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sessionActive]);

  // Rest timer countdown
  useEffect(() => {
    let timer = null;
    if (isRestActive && restTimerSeconds > 0) {
      timer = setInterval(() => {
        setRestTimerSeconds(s => {
          if (s <= 1) {
            clearInterval(timer);
            setIsRestActive(false);
            playWorkoutChime('rest');
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRestActive, restTimerSeconds]);

  // Toggle set completion
  const handleToggleSet = (exerciseId, setNumber) => {
    const updatedExercises = workout.exercises.map(ex => {
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

    const updatedWorkout = { ...workout, exercises: updatedExercises };
    setWorkout(updatedWorkout);
    saveWorkoutSchedule(updatedWorkout, selectedDay);
    
    const newStats = calculateWorkoutStats(updatedWorkout);
    setStats(newStats);

    // If marked completed, trigger sound chime and start 60s Rest Timer
    const exObj = workout.exercises.find(e => e.id === exerciseId);
    const setObj = exObj?.sets.find(s => s.setNumber === setNumber);
    const wasCompleted = !setObj?.completed;

    if (wasCompleted) {
      playWorkoutChime('set');
      setLastCompletedInfo(`Completed ${exObj.name} (Set ${setNumber})!`);
      // Start 60s rest timer
      setRestTimerSeconds(60);
      setRestTimerInitial(60);
      setIsRestActive(true);

      // Check if all sets in workout are now completed
      if (newStats.totalSets > 0 && newStats.completedSets === newStats.totalSets) {
        setShowCelebration(true);
      }
    }
  };

  // Update set weight / reps directly
  const handleUpdateSetData = (exerciseId, setNumber, field, value) => {
    const updatedExercises = workout.exercises.map(ex => {
      if (ex.id !== exerciseId) return ex;
      const updatedSets = ex.sets.map(s => {
        if (s.setNumber !== setNumber) return s;
        return { ...s, [field]: value };
      });
      return { ...ex, sets: updatedSets };
    });

    const updatedWorkout = { ...workout, exercises: updatedExercises };
    setWorkout(updatedWorkout);
    saveWorkoutSchedule(updatedWorkout, selectedDay);
  };

  // Add extra set to an exercise
  const handleAddSetToExercise = (exerciseId) => {
    const updatedExercises = workout.exercises.map(ex => {
      if (ex.id !== exerciseId) return ex;
      const nextNum = ex.sets.length + 1;
      const lastSet = ex.sets[ex.sets.length - 1] || { reps: 10, weight: 15 };
      const newSet = {
        setNumber: nextNum,
        reps: lastSet.reps,
        weight: lastSet.weight,
        completed: false,
        completedAt: null
      };
      return { ...ex, sets: [...ex.sets, newSet] };
    });

    const updatedWorkout = { ...workout, exercises: updatedExercises };
    setWorkout(updatedWorkout);
    saveWorkoutSchedule(updatedWorkout, selectedDay);
    setStats(calculateWorkoutStats(updatedWorkout));
  };

  // Reset today's workout
  const handleResetWorkout = () => {
    if (!window.confirm("Reset all completed sets for today's workout?")) return;
    const fresh = DEFAULT_WORKOUT_SCHEDULES[selectedDay] || DEFAULT_WORKOUT_SCHEDULES[1];
    const resetCopy = JSON.parse(JSON.stringify(fresh));
    setWorkout(resetCopy);
    saveWorkoutSchedule(resetCopy, selectedDay);
    setStats(calculateWorkoutStats(resetCopy));
    setRestTimerSeconds(0);
    setIsRestActive(false);
  };

  // Add custom exercise
  const handleCreateCustomExercise = (e) => {
    e.preventDefault();
    if (!newExName.trim()) return;

    const newSetsArr = [];
    for (let i = 1; i <= parseInt(newExSets); i++) {
      newSetsArr.push({
        setNumber: i,
        reps: parseInt(newExReps) || 10,
        weight: parseFloat(newExWeight) || 0,
        completed: false,
        completedAt: null
      });
    }

    const newExerciseObj = {
      id: 'custom_' + Date.now(),
      name: newExName.trim(),
      muscle: newExMuscle,
      targetSets: parseInt(newExSets),
      targetReps: `${newExReps} reps`,
      targetWeight: `${newExWeight} kg`,
      sets: newSetsArr
    };

    const updatedExercises = [...workout.exercises, newExerciseObj];
    const updatedWorkout = { ...workout, exercises: updatedExercises };
    setWorkout(updatedWorkout);
    saveWorkoutSchedule(updatedWorkout, selectedDay);
    setStats(calculateWorkoutStats(updatedWorkout));

    setNewExName('');
    setShowAddModal(false);
  };

  // Format seconds to mm:ss
  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="fade-in" style={{ maxWidth: '1100px', margin: '0 auto', paddingBottom: '4rem' }}>
      
      {/* Top Breadcrumb & Controls */}
      <div className="flex-between" style={{ marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>
          <ArrowLeft size={18} /> Back to Dashboard
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button 
            onClick={handleResetWorkout}
            className="btn" 
            style={{ fontSize: '0.85rem', padding: '0.45rem 0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.25)' }}
          >
            <RotateCcw size={14} /> Reset Sets
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="btn btn-primary" 
            style={{ fontSize: '0.85rem', padding: '0.45rem 0.95rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <Plus size={16} /> Add Exercise
          </button>
        </div>
      </div>

      {/* Main Hero Header Card */}
      <div 
        className="glass-card" 
        style={{ 
          padding: '1.75rem', 
          marginBottom: '1.75rem', 
          background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.15) 0%, rgba(15, 23, 42, 0.85) 100%)', 
          border: '1px solid rgba(249, 115, 22, 0.35)',
          borderRadius: '1.25rem',
          position: 'relative'
        }}
      >
        <div className="flex-between" style={{ flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <Dumbbell size={28} color="#f97316" />
              <h1 style={{ margin: 0, fontSize: '1.8rem', fontFamily: 'Outfit', fontWeight: 800 }}>
                Live Gym Workout Tracker
              </h1>
            </div>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Target Split: <strong style={{ color: '#f97316' }}>{workout.bodyPart}</strong> ({workout.workoutName})
            </p>
          </div>

          {/* Workout Stopwatch Timer */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(0, 0, 0, 0.4)', padding: '0.65rem 1.25rem', borderRadius: '1rem', border: '1px solid var(--glass-border)' }}>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Elapsed Session</span>
              <span style={{ fontSize: '1.4rem', fontFamily: 'monospace', fontWeight: 800, color: '#fff' }}>
                {formatTime(elapsedSeconds)}
              </span>
            </div>
            <button 
              onClick={() => setSessionActive(!sessionActive)}
              className="btn"
              style={{ width: '38px', height: '38px', borderRadius: '50%', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: sessionActive ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)', color: sessionActive ? '#ef4444' : '#22c55e', border: 'none' }}
            >
              {sessionActive ? <Pause size={18} /> : <Play size={18} />}
            </button>
          </div>
        </div>

        {/* Day of Week Selector Chips */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((dayStr, idx) => {
            const isToday = currentDayIndex === idx;
            const isSelected = selectedDay === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedDay(idx)}
                style={{
                  padding: '0.45rem 0.95rem',
                  borderRadius: '50px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: isSelected ? '2px solid #f97316' : '1px solid var(--glass-border)',
                  background: isSelected ? 'rgba(249, 115, 22, 0.25)' : 'rgba(15, 23, 42, 0.6)',
                  color: isSelected ? '#fff' : 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  transition: 'all 0.2s ease'
                }}
              >
                {dayStr} {isToday && <span style={{ fontSize: '0.7rem', color: '#f97316' }}>● TODAY</span>}
              </button>
            );
          })}
        </div>

        {/* Workout Progress Metrics Banner */}
        <div style={{ background: 'rgba(15, 23, 42, 0.75)', borderRadius: '1rem', padding: '1rem 1.25rem', border: '1px solid var(--glass-border)' }}>
          <div className="flex-between" style={{ marginBottom: '0.65rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Zap size={18} color="#f97316" />
              <span style={{ fontSize: '0.95rem', fontWeight: 700 }}>
                Workout Sets Progress: <span style={{ color: '#f97316' }}>{stats.completedSets} / {stats.totalSets} Sets Done</span>
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '0.85rem', color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Flame size={16} /> ~{stats.estimatedCaloriesBurned} kcal burned
              </span>
              <span style={{ fontWeight: 800, fontSize: '1.1rem', color: stats.percentage === 100 ? '#22c55e' : '#f97316' }}>
                {stats.percentage}%
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div style={{ width: '100%', height: '10px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '50px', overflow: 'hidden' }}>
            <div 
              style={{ 
                width: `${stats.percentage}%`, 
                height: '100%', 
                background: stats.percentage === 100 ? 'linear-gradient(90deg, #22c55e 0%, #16a34a 100%)' : 'linear-gradient(90deg, #f97316 0%, #ea580c 100%)', 
                borderRadius: '50px', 
                transition: 'width 0.4s ease',
                boxShadow: '0 0 10px rgba(249, 115, 22, 0.5)'
              }} 
            />
          </div>
        </div>

      </div>

      {/* Live Rest Timer Widget (Shows when a set is completed) */}
      {isRestActive && (
        <div 
          className="glass-card" 
          style={{ 
            marginBottom: '1.75rem', 
            padding: '1.25rem 1.5rem', 
            background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.18) 0%, rgba(37, 99, 235, 0.18) 100%)', 
            border: '2px solid #3b82f6',
            borderRadius: '1rem',
            boxShadow: '0 4px 20px rgba(59, 130, 246, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '1.2rem', boxShadow: '0 0 15px rgba(59, 130, 246, 0.6)' }}>
              {restTimerSeconds}s
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '1.05rem', color: '#fff' }}>
                <Clock size={18} color="#60a5fa" /> Rest Timer in Progress
              </div>
              <div style={{ fontSize: '0.85rem', color: '#93c5fd' }}>
                {lastCompletedInfo || 'Catch your breath and prepare for the next set!'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              onClick={() => setRestTimerSeconds(s => s + 30)}
              className="btn"
              style={{ fontSize: '0.85rem', padding: '0.4rem 0.85rem', background: 'rgba(59, 130, 246, 0.3)', color: '#fff', border: '1px solid #3b82f6' }}
            >
              +30s Rest
            </button>
            <button 
              onClick={() => { setIsRestActive(false); setRestTimerSeconds(0); }}
              className="btn"
              style={{ fontSize: '0.85rem', padding: '0.4rem 0.85rem', background: 'rgba(255, 255, 255, 0.15)', color: '#fff', border: 'none' }}
            >
              Skip Rest
            </button>
          </div>
        </div>
      )}

      {/* Workout Completion Celebration Modal */}
      {showCelebration && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2000,
          padding: '1rem'
        }}>
          <div className="glass-card" style={{ maxWidth: '460px', width: '100%', padding: '2.5rem', textAlign: 'center', border: '2px solid #22c55e', boxShadow: '0 0 40px rgba(34, 197, 94, 0.4)' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(34, 197, 94, 0.2)', border: '3px solid #22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#22c55e' }}>
              <Award size={44} />
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem', color: '#fff' }}>
              Workout Conquered! 🏆
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '1rem', lineHeight: '1.5' }}>
              Incredible work! You successfully crushed all <strong>{stats.totalSets} sets</strong> for today's {workout.bodyPart} split.
            </p>
            <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '1rem', borderRadius: '0.75rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-around' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block' }}>Total Sets</span>
                <strong style={{ fontSize: '1.3rem', color: '#22c55e' }}>{stats.totalSets}</strong>
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block' }}>Burned</span>
                <strong style={{ fontSize: '1.3rem', color: '#f59e0b' }}>~{stats.estimatedCaloriesBurned} kcal</strong>
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block' }}>Time</span>
                <strong style={{ fontSize: '1.3rem', color: '#3b82f6' }}>{formatTime(elapsedSeconds)}</strong>
              </div>
            </div>
            <button 
              onClick={() => setShowCelebration(false)} 
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.85rem', fontSize: '1.05rem', fontWeight: 700 }}
            >
              Awesome, Back to Tracker
            </button>
          </div>
        </div>
      )}

      {/* Exercises Section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {workout.exercises.map((exercise, exIndex) => {
          const completedCount = exercise.sets.filter(s => s.completed).length;
          const isAllDone = exercise.sets.length > 0 && completedCount === exercise.sets.length;
          const exPercentage = Math.round((completedCount / exercise.sets.length) * 100);

          return (
            <div 
              key={exercise.id || exIndex}
              className="glass-card" 
              style={{ 
                padding: '1.5rem', 
                borderRadius: '1.15rem', 
                border: isAllDone ? '2px solid #22c55e' : '1px solid var(--glass-border)',
                background: isAllDone ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.08) 0%, rgba(15, 23, 42, 0.9) 100%)' : 'var(--surface)',
                boxShadow: isAllDone ? '0 0 20px rgba(34, 197, 94, 0.15)' : 'var(--shadow)',
                transition: 'all 0.3s ease'
              }}
            >
              {/* Exercise Header */}
              <div className="flex-between" style={{ flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 700, color: isAllDone ? '#4ade80' : 'var(--text-primary)' }}>
                      {exercise.name}
                    </h3>
                    {isAllDone && (
                      <span style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#22c55e', fontSize: '0.75rem', fontWeight: 800, padding: '0.2rem 0.6rem', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <CheckCircle2 size={13} /> ALL SETS DONE
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <span style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', fontSize: '0.78rem', fontWeight: 600, padding: '0.2rem 0.55rem', borderRadius: '4px' }}>
                      {exercise.muscle}
                    </span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                      Target: {exercise.targetSets} Sets × {exercise.targetReps}
                    </span>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block' }}>
                    Sets Progress
                  </span>
                  <span style={{ fontWeight: 800, fontSize: '1.15rem', color: isAllDone ? '#22c55e' : '#f97316' }}>
                    {completedCount} / {exercise.sets.length} ({exPercentage}%)
                  </span>
                </div>
              </div>

              {/* Set-by-Set Rows */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {exercise.sets.map((setObj) => (
                  <div 
                    key={setObj.setNumber}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.85rem 1.15rem',
                      background: setObj.completed ? 'rgba(34, 197, 94, 0.12)' : 'rgba(15, 23, 42, 0.5)',
                      borderRadius: '0.75rem',
                      border: setObj.completed ? '1px solid rgba(34, 197, 94, 0.35)' : '1px solid rgba(255, 255, 255, 0.05)',
                      transition: 'all 0.2s ease',
                      flexWrap: 'wrap',
                      gap: '0.75rem'
                    }}
                  >
                    {/* Left: Set number pill */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ 
                        width: '32px', 
                        height: '32px', 
                        borderRadius: '50%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        fontSize: '0.9rem', 
                        fontWeight: 800,
                        background: setObj.completed ? '#22c55e' : 'rgba(255, 255, 255, 0.1)',
                        color: setObj.completed ? '#fff' : 'var(--text-secondary)'
                      }}>
                        {setObj.setNumber}
                      </span>
                      <div>
                        <strong style={{ fontSize: '0.95rem', color: setObj.completed ? '#4ade80' : 'var(--text-primary)' }}>
                          Set {setObj.setNumber}
                        </strong>
                        {setObj.completedAt && (
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block' }}>
                            Logged at {setObj.completedAt}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Middle: Weight & Reps inputs */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Weight:</span>
                        <input 
                          type="text" 
                          value={setObj.weight} 
                          onChange={(e) => handleUpdateSetData(exercise.id, setObj.setNumber, 'weight', e.target.value)}
                          style={{
                            width: '65px',
                            background: 'rgba(0, 0, 0, 0.4)',
                            border: '1px solid var(--glass-border)',
                            color: '#fff',
                            borderRadius: '6px',
                            padding: '0.3rem 0.5rem',
                            fontSize: '0.85rem',
                            textAlign: 'center',
                            fontWeight: 700
                          }}
                        />
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>kg</span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Reps:</span>
                        <input 
                          type="text" 
                          value={setObj.reps} 
                          onChange={(e) => handleUpdateSetData(exercise.id, setObj.setNumber, 'reps', e.target.value)}
                          style={{
                            width: '55px',
                            background: 'rgba(0, 0, 0, 0.4)',
                            border: '1px solid var(--glass-border)',
                            color: '#fff',
                            borderRadius: '6px',
                            padding: '0.3rem 0.5rem',
                            fontSize: '0.85rem',
                            textAlign: 'center',
                            fontWeight: 700
                          }}
                        />
                      </div>
                    </div>

                    {/* Right: Check / Complete Button */}
                    <button 
                      onClick={() => handleToggleSet(exercise.id, setObj.setNumber)}
                      className="btn"
                      style={{
                        padding: '0.5rem 1.15rem',
                        fontSize: '0.88rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        background: setObj.completed ? 'linear-gradient(90deg, #22c55e 0%, #16a34a 100%)' : 'rgba(59, 130, 246, 0.15)',
                        color: setObj.completed ? '#fff' : 'var(--accent-primary)',
                        border: setObj.completed ? 'none' : '1px solid rgba(59, 130, 246, 0.35)',
                        boxShadow: setObj.completed ? '0 2px 10px rgba(34, 197, 94, 0.3)' : 'none',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {setObj.completed ? (
                        <>
                          <CheckCircle2 size={16} fill="#fff" color="#16a34a" /> Set Done ✓
                        </>
                      ) : (
                        <>
                          <Circle size={16} /> Complete Set
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>

              {/* Add Set to this exercise button */}
              <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                <button 
                  onClick={() => handleAddSetToExercise(exercise.id)}
                  className="btn"
                  style={{
                    fontSize: '0.82rem',
                    padding: '0.35rem 0.75rem',
                    background: 'transparent',
                    color: 'var(--text-secondary)',
                    border: '1px dashed var(--glass-border)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    borderRadius: '6px'
                  }}
                >
                  <Plus size={14} /> Add Set {exercise.sets.length + 1}
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Add Custom Exercise Modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1500,
          padding: '1rem'
        }}>
          <div className="glass-card" style={{ maxWidth: '440px', width: '100%', padding: '1.75rem', borderRadius: '1rem' }}>
            <div className="flex-between" style={{ marginBottom: '1.25rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Dumbbell size={20} color="#f97316" /> Add Custom Exercise
              </h3>
              <button onClick={() => setShowAddModal(false)} className="btn" style={{ padding: '0.2rem 0.5rem' }}>✕</button>
            </div>

            <form onSubmit={handleCreateCustomExercise} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label className="form-label" style={{ fontSize: '0.85rem', marginBottom: '0.35rem', display: 'block' }}>Exercise Name</label>
                <input 
                  type="text" 
                  value={newExName} 
                  onChange={(e) => setNewExName(e.target.value)}
                  placeholder="e.g. Incline Dumbbell Bicep Curls"
                  className="input-base"
                  required
                />
              </div>

              <div>
                <label className="form-label" style={{ fontSize: '0.85rem', marginBottom: '0.35rem', display: 'block' }}>Target Muscle Group</label>
                <select 
                  value={newExMuscle} 
                  onChange={(e) => setNewExMuscle(e.target.value)}
                  className="input-base"
                >
                  <option value="Biceps">Biceps</option>
                  <option value="Triceps">Triceps</option>
                  <option value="Chest">Chest</option>
                  <option value="Back">Back / Lats</option>
                  <option value="Shoulders">Shoulders</option>
                  <option value="Quads">Quads</option>
                  <option value="Hamstrings">Hamstrings</option>
                  <option value="Core">Core / Abs</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label className="form-label" style={{ fontSize: '0.8rem', marginBottom: '0.25rem', display: 'block' }}>Sets</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="10" 
                    value={newExSets} 
                    onChange={(e) => setNewExSets(e.target.value)}
                    className="input-base"
                  />
                </div>
                <div>
                  <label className="form-label" style={{ fontSize: '0.8rem', marginBottom: '0.25rem', display: 'block' }}>Reps</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="50" 
                    value={newExReps} 
                    onChange={(e) => setNewExReps(e.target.value)}
                    className="input-base"
                  />
                </div>
                <div>
                  <label className="form-label" style={{ fontSize: '0.8rem', marginBottom: '0.25rem', display: 'block' }}>Weight (kg)</label>
                  <input 
                    type="number" 
                    min="0" 
                    max="500" 
                    value={newExWeight} 
                    onChange={(e) => setNewExWeight(e.target.value)}
                    className="input-base"
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ padding: '0.8rem', marginTop: '0.5rem', fontWeight: 700 }}>
                Add to Today's Schedule
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
