import React from 'react';
import { Trophy, Clock, Sparkles, CheckCircle2, Gift, ArrowRight, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRewards } from '../context/RewardsContext';

export default function DietRewardsWidget() {
  const { coins, scheduledMeals, logMealOnTime, challenges } = useRewards();

  const activeChallenge = challenges.find(c => c.enrolled) || challenges[0];

  return (
    <div 
      className="glass-card" 
      style={{ 
        marginBottom: '2rem', 
        padding: '1.5rem 1.75rem', 
        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(15, 23, 42, 0.85) 100%)', 
        border: '1px solid rgba(245, 158, 11, 0.3)',
        borderRadius: '1.25rem' 
      }}
    >
      {/* Header */}
      <div className="flex-between" style={{ marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Trophy size={22} color="#f59e0b" />
          <h3 style={{ margin: 0, fontSize: '1.2rem', fontFamily: 'Outfit', fontWeight: 700 }}>
            Scheduled Diet & NutriCoin Rewards
          </h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ background: 'rgba(245, 158, 11, 0.2)', border: '1px solid #f59e0b', borderRadius: '50px', padding: '0.35rem 0.85rem', color: '#f59e0b', fontWeight: 800, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span>🪙</span> {coins} Coins
          </div>
          <Link 
            to="/challenges" 
            style={{ 
              fontSize: '0.85rem', 
              color: '#fff', 
              textDecoration: 'none', 
              background: 'linear-gradient(90deg, #f59e0b 0%, #d97706 100%)', 
              padding: '0.35rem 0.85rem', 
              borderRadius: '50px', 
              fontWeight: 700, 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.35rem',
              boxShadow: '0 2px 10px rgba(245, 158, 11, 0.3)'
            }}
          >
            <Gift size={14} /> Gift Store <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      {/* 4 Scheduled Meals Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat( auto-fit, minmax(220px, 1fr) )', gap: '1rem', marginBottom: '1.25rem' }}>
        {scheduledMeals.map(meal => (
          <div
            key={meal.id}
            style={{
              background: meal.completed ? 'rgba(34, 197, 94, 0.12)' : 'rgba(0, 0, 0, 0.35)',
              border: meal.completed ? '1px solid rgba(34, 197, 94, 0.4)' : '1px solid var(--glass-border)',
              borderRadius: '0.75rem',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '0.75rem',
              transition: 'all 0.2s ease'
            }}
          >
            <div>
              <div className="flex-between" style={{ marginBottom: '0.25rem' }}>
                <span style={{ fontSize: '1.3rem' }}>{meal.icon}</span>
                <span style={{ fontSize: '0.75rem', color: meal.completed ? '#22c55e' : '#f59e0b', fontWeight: 700 }}>
                  +{meal.coinsReward} 🪙
                </span>
              </div>
              <strong style={{ fontSize: '0.95rem', color: meal.completed ? '#4ade80' : '#fff', display: 'block' }}>
                {meal.name}
              </strong>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                ⏰ {meal.timeWindow}
              </span>
            </div>

            {meal.completed ? (
              <div style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#22c55e', padding: '0.35rem 0.6rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
                <CheckCircle2 size={13} /> Eaten On Time ✓
              </div>
            ) : (
              <button
                onClick={() => logMealOnTime(meal.id)}
                className="btn"
                style={{
                  width: '100%',
                  padding: '0.45rem',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  background: 'rgba(245, 158, 11, 0.15)',
                  color: '#f59e0b',
                  border: '1px solid rgba(245, 158, 11, 0.35)',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.3rem',
                  cursor: 'pointer'
                }}
              >
                <Sparkles size={13} /> Eat On Time (+50 🪙)
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Active Challenge Teaser Footer */}
      {activeChallenge && (
        <div style={{ background: 'rgba(15, 23, 42, 0.65)', border: '1px solid var(--glass-border)', borderRadius: '0.75rem', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <span style={{ fontSize: '1.4rem' }}>{activeChallenge.badgeIcon}</span>
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff' }}>
                Active Diet Challenge: {activeChallenge.title}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                Day {activeChallenge.progressDays} of {activeChallenge.durationDays} completed • Full Reward: <strong style={{ color: '#f59e0b' }}>+{activeChallenge.rewardCoins} NutriCoins</strong>
              </div>
            </div>
          </div>

          <Link to="/challenges" style={{ fontSize: '0.82rem', color: '#60a5fa', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            View All Challenges <ArrowRight size={13} />
          </Link>
        </div>
      )}

    </div>
  );
}
