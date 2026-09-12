import React, { useState } from 'react';
import { Stethoscope, Activity, Flame, ShieldAlert, CheckCircle2, Zap, ArrowRight, Bot, RotateCcw, AlertTriangle } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FitnessDiagnostic = () => {
  const navigate = useNavigate();

  // Intake state
  const [formData, setFormData] = useState({
    age: 26,
    gender: 'male',
    weight: 75,
    height: 178,
    activityLevel: 'moderate',
    goal: 'fat_loss',
    symptoms: ['Weight Loss Plateau', 'Post-Workout Soreness'],
    currentCalories: '2100',
    waterIntake: '2.5',
    sleepHours: '6.5',
    workoutDays: '4'
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  // Available symptom options
  const symptomList = [
    { id: 'Weight Loss Plateau', label: '📉 Weight Loss Plateau (Scale Stuck)' },
    { id: 'Post-Workout Soreness', label: '⚡ Prolonged Muscle Soreness & Fatigue' },
    { id: 'Muscle Growth Stagnation', label: '💪 Muscle Growth Stagnation' },
    { id: 'Low Afternoon Energy', label: '🥱 Low Energy & Brain Fog' },
    { id: 'Digestive Bloating', label: '🥗 Digestive Bloating after Meals' },
    { id: 'Poor Sleep Quality', label: '🌙 Restless Sleep / Poor Recovery' },
    { id: 'Joint Discomfort', label: '🦴 Mild Joint & Tendon Discomfort' }
  ];

  // Quick preset diagnosers
  const applyPreset = (presetType) => {
    if (presetType === 'plateau') {
      setFormData(prev => ({
        ...prev,
        goal: 'fat_loss',
        symptoms: ['Weight Loss Plateau', 'Low Afternoon Energy'],
        currentCalories: '1800',
        workoutDays: '5'
      }));
    } else if (presetType === 'fatigue') {
      setFormData(prev => ({
        ...prev,
        goal: 'recomp',
        symptoms: ['Post-Workout Soreness', 'Low Afternoon Energy', 'Poor Sleep Quality'],
        sleepHours: '5.5',
        waterIntake: '1.5'
      }));
    } else if (presetType === 'hypertrophy') {
      setFormData(prev => ({
        ...prev,
        goal: 'muscle_gain',
        symptoms: ['Muscle Growth Stagnation', 'Post-Workout Soreness'],
        currentCalories: '2200',
        workoutDays: '3'
      }));
    }
  };

  const handleSymptomToggle = (symptomId) => {
    setFormData(prev => {
      const exists = prev.symptoms.includes(symptomId);
      if (exists) {
        return { ...prev, symptoms: prev.symptoms.filter(s => s !== symptomId) };
      } else {
        return { ...prev, symptoms: [...prev.symptoms, symptomId] };
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRunDiagnostic = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.post('/diagnostic', formData, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });

      setResult(data);
    } catch (err) {
      console.error('Diagnostic error:', err);
      setError(err.response?.data?.message || 'Failed to complete diagnosis. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendToAICoach = () => {
    if (!result) return;
    const initialPrompt = `I just ran a Fitness Diagnostic. Here are my results:
- Score: ${result.diagnosticReport.score}/100
- Target Calories: ${result.metrics.targetCalories} kcal (Protein: ${result.metrics.macros.protein}g, Carbs: ${result.metrics.macros.carbs}g, Fats: ${result.metrics.macros.fats}g)
- Identified Issues: ${result.diagnosticReport.issues.join(', ')}
- Executive Diagnosis: ${result.diagnosticReport.summary}

Can you give me a step-by-step daily meal plan and workout schedule based on this?`;
    
    navigate('/ai-coach', { state: { prefillMessage: initialPrompt } });
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div className="glass-card" style={{ padding: '1.75rem', background: 'linear-gradient(135deg, rgba(59,130,246,0.12) 0%, rgba(37,99,235,0.05) 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 className="title" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: 0, fontSize: '1.8rem' }}>
              <Stethoscope size={32} color="var(--primary)" /> Fitness Diagnostic Hub
            </h1>
            <p className="subtitle" style={{ margin: '0.5rem 0 0 0' }}>
              Evaluate body metrics, diagnose fitness bottlenecks, identify root causes, and get personalized prescription plans.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={() => applyPreset('plateau')} className="btn" style={{ fontSize: '0.85rem', padding: '0.5rem 0.85rem', background: 'var(--surface)' }}>
              📉 Fat Loss Plateau
            </button>
            <button onClick={() => applyPreset('fatigue')} className="btn" style={{ fontSize: '0.85rem', padding: '0.5rem 0.85rem', background: 'var(--surface)' }}>
              ⚡ Low Energy/Fatigue
            </button>
            <button onClick={() => applyPreset('hypertrophy')} className="btn" style={{ fontSize: '0.85rem', padding: '0.5rem 0.85rem', background: 'var(--surface)' }}>
              💪 Muscle Stagnation
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Form Left, Results Right */}
      <div style={{ display: 'grid', gridTemplateColumns: result ? '1fr 1fr' : '1fr', gap: '1.5rem' }}>
        
        {/* Left Column: Biometrics & Symptom Form */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Activity size={22} color="var(--primary)" /> 1. Biometrics & Symptoms Intake
          </h2>

          <form onSubmit={handleRunDiagnostic} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {/* Age / Gender / Weight / Height */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat( auto-fit, minmax(110px, 1fr) )', gap: '0.75rem' }}>
              <div>
                <label className="form-label" style={{ fontSize: '0.85rem' }}>Age (yrs)</label>
                <input type="number" name="age" value={formData.age} onChange={handleInputChange} className="form-input" required min="12" max="100" />
              </div>
              <div>
                <label className="form-label" style={{ fontSize: '0.85rem' }}>Gender</label>
                <select name="gender" value={formData.gender} onChange={handleInputChange} className="form-input">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div>
                <label className="form-label" style={{ fontSize: '0.85rem' }}>Weight (kg)</label>
                <input type="number" name="weight" value={formData.weight} onChange={handleInputChange} className="form-input" required min="30" max="250" />
              </div>
              <div>
                <label className="form-label" style={{ fontSize: '0.85rem' }}>Height (cm)</label>
                <input type="number" name="height" value={formData.height} onChange={handleInputChange} className="form-input" required min="100" max="250" />
              </div>
            </div>

            {/* Activity & Goals */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label className="form-label" style={{ fontSize: '0.85rem' }}>Activity Level</label>
                <select name="activityLevel" value={formData.activityLevel} onChange={handleInputChange} className="form-input">
                  <option value="sedentary">Sedentary (Office job)</option>
                  <option value="light">Lightly Active (1-2 workouts/wk)</option>
                  <option value="moderate">Moderately Active (3-4 workouts/wk)</option>
                  <option value="active">Very Active (5+ workouts/wk)</option>
                  <option value="extraActive">Extra Active (Athlete/Physical Work)</option>
                </select>
              </div>
              <div>
                <label className="form-label" style={{ fontSize: '0.85rem' }}>Primary Goal</label>
                <select name="goal" value={formData.goal} onChange={handleInputChange} className="form-input">
                  <option value="fat_loss">Fat Loss / Weight Reduction</option>
                  <option value="muscle_gain">Muscle Building / Hypertrophy</option>
                  <option value="recomp">Body Recomposition</option>
                  <option value="endurance">Endurance & Athletic Performance</option>
                </select>
              </div>
            </div>

            {/* Current Habits */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat( auto-fit, minmax(110px, 1fr) )', gap: '0.75rem' }}>
              <div>
                <label className="form-label" style={{ fontSize: '0.85rem' }}>Est. Daily Cals</label>
                <input type="number" name="currentCalories" value={formData.currentCalories} onChange={handleInputChange} placeholder="e.g. 2000" className="form-input" />
              </div>
              <div>
                <label className="form-label" style={{ fontSize: '0.85rem' }}>Water (L/day)</label>
                <input type="number" step="0.5" name="waterIntake" value={formData.waterIntake} onChange={handleInputChange} className="form-input" />
              </div>
              <div>
                <label className="form-label" style={{ fontSize: '0.85rem' }}>Sleep (hrs/night)</label>
                <input type="number" step="0.5" name="sleepHours" value={formData.sleepHours} onChange={handleInputChange} className="form-input" />
              </div>
              <div>
                <label className="form-label" style={{ fontSize: '0.85rem' }}>Workouts/wk</label>
                <input type="number" name="workoutDays" value={formData.workoutDays} onChange={handleInputChange} className="form-input" />
              </div>
            </div>

            {/* Symptoms & Bottlenecks Selector */}
            <div>
              <label className="form-label" style={{ fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>
                Select Issues & Challenges You Are Experiencing:
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {symptomList.map(symptom => {
                  const selected = formData.symptoms.includes(symptom.id);
                  return (
                    <div 
                      key={symptom.id} 
                      onClick={() => handleSymptomToggle(symptom.id)}
                      style={{
                        padding: '0.6rem 0.85rem',
                        borderRadius: '0.5rem',
                        border: selected ? '1px solid var(--primary)' : '1px solid var(--glass-border)',
                        background: selected ? 'rgba(59, 130, 246, 0.15)' : 'var(--surface)',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <span>{symptom.label}</span>
                      {selected && <CheckCircle2 size={18} color="var(--primary)" />}
                    </div>
                  );
                })}
              </div>
            </div>

            {error && (
              <div style={{ color: 'var(--danger)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertTriangle size={18} /> {error}
              </div>
            )}

            <button type="submit" className="btn btn-primary" disabled={loading} style={{ padding: '0.85rem', borderRadius: '0.75rem', fontWeight: 600, fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
              {loading ? <span className="pulse-text">Analyzing & Diagnosing...</span> : <><Zap size={20} /> Run Fitness Diagnostic</>}
            </button>

          </form>
        </div>

        {/* Right Column: Diagnostic Results Report */}
        {result && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {/* Score & Metabolic Card */}
            <div className="glass-card" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, rgba(30,41,59,0.7) 0%, rgba(15,23,42,0.8) 100%)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div>
                  <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)' }}>Fitness & Recovery Efficiency</span>
                  <h3 style={{ fontSize: '1.5rem', margin: '0.25rem 0 0 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    Diagnostic Score: <span style={{ color: result.diagnosticReport.score >= 80 ? '#22c55e' : result.diagnosticReport.score >= 60 ? '#f59e0b' : '#ef4444' }}>{result.diagnosticReport.score}/100</span>
                  </h3>
                </div>
                <div style={{ background: 'rgba(59, 130, 246, 0.2)', padding: '0.75rem 1rem', borderRadius: '1rem', textAlign: 'center' }}>
                  <Flame size={24} color="#f97316" />
                </div>
              </div>

              {/* BMR / TDEE Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', margin: '1rem 0' }}>
                <div style={{ background: 'var(--surface)', padding: '0.75rem', borderRadius: '0.5rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>BMR</div>
                  <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{result.metrics.bmr} <span style={{ fontSize: '0.7rem' }}>kcal</span></div>
                </div>
                <div style={{ background: 'var(--surface)', padding: '0.75rem', borderRadius: '0.5rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>TDEE Output</div>
                  <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{result.metrics.tdee} <span style={{ fontSize: '0.7rem' }}>kcal</span></div>
                </div>
                <div style={{ background: 'rgba(59, 130, 246, 0.2)', padding: '0.75rem', borderRadius: '0.5rem', textAlign: 'center', border: '1px solid var(--primary)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--primary)' }}>Target Intake</div>
                  <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'var(--primary)' }}>{result.metrics.targetCalories} <span style={{ fontSize: '0.7rem' }}>kcal</span></div>
                </div>
              </div>

              {/* Macro Target Pills */}
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem', marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--glass-border)', fontSize: '0.85rem' }}>
                <span>🍗 Protein: <strong>{result.metrics.macros.protein}g</strong></span>
                <span>🍚 Carbs: <strong>{result.metrics.macros.carbs}g</strong></span>
                <span>🥑 Fats: <strong>{result.metrics.macros.fats}g</strong></span>
              </div>
            </div>

            {/* Executive Diagnosis Summary & Root Causes */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldAlert size={20} color="#f59e0b" /> Executive Diagnosis
              </h3>
              <p style={{ lineHeight: '1.6', fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                {result.diagnosticReport.summary}
              </p>

              {result.diagnosticReport.rootCauses && result.diagnosticReport.rootCauses.length > 0 && (
                <div style={{ background: 'rgba(239, 68, 68, 0.1)', borderLeft: '4px solid #ef4444', padding: '0.75rem 1rem', borderRadius: '0 0.5rem 0.5rem 0', marginBottom: '1rem' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '0.85rem', color: '#ef4444', marginBottom: '0.25rem' }}>IDENTIFIED ROOT CAUSES:</div>
                  <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.88rem', lineHeight: '1.5' }}>
                    {result.diagnosticReport.rootCauses.map((cause, i) => (
                      <li key={i}>{cause}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Plan */}
              <h4 style={{ fontSize: '1rem', marginTop: '1.25rem', marginBottom: '0.75rem', color: 'var(--primary)' }}>Prescription Action Plan</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
                <div style={{ background: 'var(--surface)', padding: '0.75rem 1rem', borderRadius: '0.5rem' }}>
                  <strong>🥗 Nutrition Protocol:</strong> {result.diagnosticReport.actionPlan.nutrition}
                </div>
                <div style={{ background: 'var(--surface)', padding: '0.75rem 1rem', borderRadius: '0.5rem' }}>
                  <strong>🏋️ Workout Protocol:</strong> {result.diagnosticReport.actionPlan.workout}
                </div>
                <div style={{ background: 'var(--surface)', padding: '0.75rem 1rem', borderRadius: '0.5rem' }}>
                  <strong>🌙 Recovery & Sleep:</strong> {result.diagnosticReport.actionPlan.recovery}
                </div>
              </div>

              {/* Handoff to AI Coach Button */}
              <button 
                onClick={handleSendToAICoach}
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '1.25rem', padding: '0.85rem', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                <Bot size={20} /> Deep Dive & Generate Meal Plan with AI Coach <ArrowRight size={18} />
              </button>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default FitnessDiagnostic;
