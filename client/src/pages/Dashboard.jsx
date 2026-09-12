import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Flame, Beef, Wheat, Droplets, Quote, Sparkles, RefreshCw } from 'lucide-react';
import axios from 'axios';
import SmartRoutineAssistant from '../components/SmartRoutineAssistant';

const MACRO_COLORS = ['#3b82f6', '#10b981', '#f59e0b']; // Carbs, Protein, Fat

const MOTIVATIONAL_QUOTES = [
  { text: "Discipline is choosing between what you want now and what you want most.", author: "Arnold Schwarzenegger" },
  { text: "The only bad workout is the one that didn't happen. Consistency beats intensity every single time.", author: "Ekamjyot Singh (National Powerlifting Winner)" },
  { text: "Strength does not come from physical capacity. It comes from an indomitable will.", author: "Mahatma Gandhi" },
  { text: "Your body can stand almost anything. It’s your mind that you have to convince.", author: "Tushar Sood (Senior Elite Coach)" },
  { text: "Small daily improvements over time lead to stunning long-term transformations.", author: "Robin Sharma" },
  { text: "Success isn't always about greatness. It's about consistency. Consistent hard work leads to results.", author: "Dwayne Johnson" },
  { text: "Fuel your body with intention, train with passion, and recover with respect.", author: "NutriGen AI Coach" }
];

export default function Dashboard() {
  const [entries, setEntries] = useState([]);
  const [summary, setSummary] = useState({ calories: 0, protein: 0, carbs: 0, fat: 0 });
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    // Pick daily quote based on day of month
    const dayOfMonth = new Date().getDate();
    setQuoteIndex(dayOfMonth % MOTIVATIONAL_QUOTES.length);

    const fetchTodayData = async () => {
      try {
        const { data } = await axios.get('/calorie/today');
        
        const mealsList = data.meals || [];
        setEntries(mealsList);
        
        let totals = { calories: 0, protein: 0, carbs: 0, fat: 0 };
        mealsList.forEach(entry => {
          totals.calories += entry.calories || 0;
          totals.protein += entry.protein || 0;
          totals.carbs += entry.carbs || 0;
          totals.fat += entry.fat || 0;
        });
        setSummary(totals);
      } catch (err) {
        console.error("Failed to load today's log", err);
      }
    };
    
    fetchTodayData();
  }, []);

  const handleNextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % MOTIVATIONAL_QUOTES.length);
  };

  const macroData = [
    { name: 'Carbs', value: summary.carbs },
    { name: 'Protein', value: summary.protein },
    { name: 'Fat', value: summary.fat },
  ];

  const currentQuote = MOTIVATIONAL_QUOTES[quoteIndex];

  return (
    <div className="fade-in">
      <header style={{ marginBottom: '2rem' }}>
        <div style={{
          width: '100%',
          height: '240px',
          borderRadius: '16px',
          overflow: 'hidden',
          marginBottom: '2rem',
          position: 'relative'
        }}>
          <img 
            src="/dashboard_banner.png" 
            alt="Dashboard Banner" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '2rem',
            background: 'linear-gradient(to top, rgba(15,23,42,0.9), transparent)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end'
          }}>
            <div>
              <h1 className="title" style={{ margin: 0, color: 'white' }}>Dashboard</h1>
              <p className="subtitle" style={{ margin: 0, color: 'rgba(255,255,255,0.8)' }}>Track your daily nutrition and progress.</p>
            </div>
            <button className="btn-primary" style={{ boxShadow: '0 4px 15px rgba(59,130,246,0.3)' }}>
              <Flame size={18} /> Daily Goal: 2000 kcal
            </button>
          </div>
        </div>
      </header>

      {/* Quote of the Day Card */}
      <div 
        className="glass-card" 
        style={{ 
          marginBottom: '2rem', 
          padding: '1.5rem 1.75rem', 
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(59, 130, 246, 0.08) 100%)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          position: 'relative'
        }}
      >
        <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f59e0b', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.5px' }}>
            <Sparkles size={18} /> QUOTE OF THE DAY
          </div>
          <button 
            onClick={handleNextQuote}
            className="btn"
            style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'var(--surface)' }}
          >
            <RefreshCw size={14} /> Next Quote
          </button>
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          <Quote size={32} color="#f59e0b" style={{ opacity: 0.6, flexShrink: 0, marginTop: '0.2rem' }} />
          <div>
            <p style={{ fontSize: '1.15rem', fontStyle: 'italic', fontWeight: 500, margin: 0, lineHeight: '1.5', color: 'var(--text-primary)' }}>
              "{currentQuote.text}"
            </p>
            <div style={{ marginTop: '0.5rem', fontWeight: 700, fontSize: '0.9rem', color: '#f59e0b' }}>
              — {currentQuote.author}
            </div>
          </div>
        </div>
      </div>

      {/* Smart Hydration Reminders & Daily Workout Split / Pre-Workout Nutrition */}
      <SmartRoutineAssistant />

      <div className="grid-cols-4" style={{ marginBottom: '2rem' }}>
        <div className="glass-card flex-center" style={{ flexDirection: 'column', gap: '0.5rem' }}>
          <Flame size={32} color="var(--danger)" />
          <div className="metric-value">{summary.calories}</div>
          <div className="metric-label">Calories Eaten</div>
        </div>
        <div className="glass-card flex-center" style={{ flexDirection: 'column', gap: '0.5rem' }}>
          <Beef size={32} color="var(--success)" />
          <div className="metric-value">{summary.protein}g</div>
          <div className="metric-label">Protein</div>
        </div>
        <div className="glass-card flex-center" style={{ flexDirection: 'column', gap: '0.5rem' }}>
          <Wheat size={32} color="var(--accent-primary)" />
          <div className="metric-value">{summary.carbs}g</div>
          <div className="metric-label">Carbs</div>
        </div>
        <div className="glass-card flex-center" style={{ flexDirection: 'column', gap: '0.5rem' }}>
          <Droplets size={32} color="var(--warning)" />
          <div className="metric-value">{summary.fat}g</div>
          <div className="metric-label">Fat</div>
        </div>
      </div>

      <div className="grid-cols-2">
        <div className="glass-card">
          <h2 style={{ marginBottom: '1.5rem', fontFamily: 'Outfit' }}>Macronutrients</h2>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={macroData}
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {macroData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={MACRO_COLORS[index % MACRO_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-secondary)', border: 'none', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-center" style={{ gap: '2rem' }}>
            {macroData.map((entry, idx) => (
              <div key={idx} className="flex-center" style={{ gap: '0.5rem' }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: MACRO_COLORS[idx] }}></div>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{entry.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card">
          <h2 style={{ marginBottom: '1.5rem', fontFamily: 'Outfit' }}>Recent Meals</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {entries.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)' }}>No meals logged yet today.</p>
            ) : entries.map((entry, idx) => (
              <div key={entry._id || idx} className="flex-between" style={{ padding: '1rem', background: 'rgba(15, 23, 42, 0.4)', borderRadius: '12px' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{entry.foodName}</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.25rem' }}>{entry.mealType} • {entry.quantity} {entry.unit}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 700, color: 'var(--accent-primary)' }}>{entry.calories} kcal</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    P: {entry.protein} • C: {entry.carbs} • F: {entry.fat}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
