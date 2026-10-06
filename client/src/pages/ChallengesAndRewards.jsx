import React, { useState } from 'react';
import { 
  Trophy, Gift, Clock, Sparkles, CheckCircle2, Flame, Award, 
  Coins, ArrowRight, ShieldCheck, Zap, Copy, Check, Star, AlertCircle, Heart 
} from 'lucide-react';
import { useRewards, AVAILABLE_GIFTS } from '../context/RewardsContext';

export default function ChallengesAndRewards() {
  const { 
    coins, 
    scheduledMeals, 
    challenges, 
    claimedGifts, 
    coinAlert, 
    logMealOnTime, 
    joinChallenge, 
    checkInChallenge, 
    redeemGift 
  } = useRewards();

  const [activeTab, setActiveTab] = useState('challenges'); // 'challenges' | 'schedule' | 'store'
  const [copiedCode, setCopiedCode] = useState(null);
  const [selectedGiftModal, setSelectedGiftModal] = useState(null);

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleConfirmRedeem = (gift) => {
    const success = redeemGift(gift);
    if (success) {
      setSelectedGiftModal(null);
    }
  };

  const totalMealCoinsToday = scheduledMeals.filter(m => m.completed).length * 50;

  return (
    <div className="fade-in" style={{ maxWidth: '1150px', margin: '0 auto', paddingBottom: '4rem' }}>
      
      {/* Coin Alert Banner */}
      {coinAlert && (
        <div style={{
          background: 'linear-gradient(90deg, #f59e0b 0%, #d97706 100%)',
          color: '#fff',
          padding: '1rem 1.5rem',
          borderRadius: '1rem',
          marginBottom: '1.75rem',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          boxShadow: '0 4px 20px rgba(245, 158, 11, 0.4)',
          fontSize: '1.05rem'
        }}>
          <Sparkles size={24} /> {coinAlert}
        </div>
      )}

      {/* Hero Header & Coin Wallet Card */}
      <div 
        className="glass-card" 
        style={{ 
          padding: '2rem', 
          marginBottom: '2rem', 
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(15, 23, 42, 0.9) 100%)', 
          border: '1px solid rgba(245, 158, 11, 0.35)',
          borderRadius: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Trophy size={32} color="#f59e0b" />
            <h1 style={{ margin: 0, fontSize: '2rem', fontFamily: 'Outfit', fontWeight: 800 }}>
              Diet Challenges & Coin Rewards Hub
            </h1>
          </div>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '600px', lineHeight: '1.5' }}>
            Take scheduled meals on time to earn daily NutriCoins. Complete diet challenges and redeem your coins for real fitness foods, protein tubs, and coach mentorship gifts!
          </p>
        </div>

        {/* Big NutriCoin Balance Display */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.5)',
          border: '2px solid #f59e0b',
          borderRadius: '1.25rem',
          padding: '1.25rem 2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem',
          boxShadow: '0 0 25px rgba(245, 158, 11, 0.25)'
        }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.8rem',
            boxShadow: '0 4px 15px rgba(245, 158, 11, 0.5)'
          }}>
            🪙
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, display: 'block' }}>
              Your Wallet Balance
            </span>
            <span style={{ fontSize: '2.2rem', fontWeight: 900, color: '#fff', fontFamily: 'Outfit' }}>
              {coins} <span style={{ fontSize: '1.1rem', color: '#f59e0b', fontWeight: 700 }}>Coins</span>
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => setActiveTab('challenges')}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '0.75rem',
            fontSize: '0.95rem',
            fontWeight: 700,
            cursor: 'pointer',
            border: activeTab === 'challenges' ? '1px solid #f59e0b' : '1px solid var(--glass-border)',
            background: activeTab === 'challenges' ? 'rgba(245, 158, 11, 0.2)' : 'var(--surface)',
            color: activeTab === 'challenges' ? '#f59e0b' : 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.2s ease'
          }}
        >
          <Trophy size={18} /> Diet Challenges ({challenges.filter(c => c.enrolled).length} Active)
        </button>

        <button
          onClick={() => setActiveTab('schedule')}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '0.75rem',
            fontSize: '0.95rem',
            fontWeight: 700,
            cursor: 'pointer',
            border: activeTab === 'schedule' ? '1px solid #3b82f6' : '1px solid var(--glass-border)',
            background: activeTab === 'schedule' ? 'rgba(59, 130, 246, 0.2)' : 'var(--surface)',
            color: activeTab === 'schedule' ? '#60a5fa' : 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.2s ease'
          }}
        >
          <Clock size={18} /> Scheduled Diet Logging (+{totalMealCoinsToday}/200 🪙 Today)
        </button>

        <button
          onClick={() => setActiveTab('store')}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '0.75rem',
            fontSize: '0.95rem',
            fontWeight: 700,
            cursor: 'pointer',
            border: activeTab === 'store' ? '1px solid #22c55e' : '1px solid var(--glass-border)',
            background: activeTab === 'store' ? 'rgba(34, 197, 94, 0.2)' : 'var(--surface)',
            color: activeTab === 'store' ? '#4ade80' : 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.2s ease'
          }}
        >
          <Gift size={18} /> Gifts & Rewards Store ({claimedGifts.length} Claimed)
        </button>
      </div>

      {/* TAB 1: DIET CHALLENGES */}
      {activeTab === 'challenges' && (
        <div>
          <div className="flex-between" style={{ marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.4rem', fontFamily: 'Outfit', fontWeight: 700 }}>
                Active & Available Diet Challenges
              </h2>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Consistency beats intensity. Check in every compliant day to build streaks and unlock lump-sum coin rewards!
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat( auto-fit, minmax(340px, 1fr) )', gap: '1.5rem' }}>
            {challenges.map(ch => {
              const percentage = Math.min(100, Math.round((ch.progressDays / ch.durationDays) * 100));
              const isFinished = ch.progressDays >= ch.durationDays;
              const todayStr = new Date().toISOString().slice(0, 10);
              const checkedInToday = ch.lastCheckIn === todayStr;

              return (
                <div 
                  key={ch.id} 
                  className="glass-card" 
                  style={{ 
                    padding: '1.75rem', 
                    borderRadius: '1.25rem',
                    border: isFinished ? '2px solid #22c55e' : ch.enrolled ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid var(--glass-border)',
                    background: isFinished ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(15, 23, 42, 0.9) 100%)' : 'var(--surface)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative'
                  }}
                >
                  <div>
                    {/* Badge & Category */}
                    <div className="flex-between" style={{ marginBottom: '1rem' }}>
                      <span style={{ fontSize: '2rem' }}>{ch.badgeIcon}</span>
                      <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                        <span style={{ background: 'rgba(255, 255, 255, 0.08)', color: 'var(--text-secondary)', fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '50px' }}>
                          {ch.category}
                        </span>
                        <span style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', fontSize: '0.78rem', fontWeight: 800, padding: '0.2rem 0.65rem', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                          🪙 +{ch.rewardCoins}
                        </span>
                      </div>
                    </div>

                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', color: isFinished ? '#4ade80' : '#fff' }}>
                      {ch.title}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.45', marginBottom: '1.25rem' }}>
                      {ch.description}
                    </p>
                  </div>

                  <div>
                    {ch.enrolled ? (
                      <div>
                        {/* Progress Bar */}
                        <div className="flex-between" style={{ fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                          <span style={{ color: 'var(--text-secondary)' }}>
                            Progress: <strong style={{ color: '#fff' }}>Day {ch.progressDays} / {ch.durationDays}</strong>
                          </span>
                          <span style={{ fontWeight: 800, color: isFinished ? '#22c55e' : '#f59e0b' }}>
                            {percentage}%
                          </span>
                        </div>

                        <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '50px', overflow: 'hidden', marginBottom: '1.25rem' }}>
                          <div style={{ 
                            width: `${percentage}%`, 
                            height: '100%', 
                            background: isFinished ? '#22c55e' : 'linear-gradient(90deg, #f59e0b 0%, #d97706 100%)', 
                            borderRadius: '50px', 
                            transition: 'width 0.4s ease' 
                          }} />
                        </div>

                        {/* Action button */}
                        {isFinished ? (
                          <div style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', padding: '0.65rem', borderRadius: '8px', textAlign: 'center', fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                            <CheckCircle2 size={18} /> Challenge Accomplished! (+{ch.rewardCoins} 🪙 Earned)
                          </div>
                        ) : checkedInToday ? (
                          <div style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', padding: '0.65rem', borderRadius: '8px', textAlign: 'center', fontWeight: 600, fontSize: '0.88rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                            <Check size={16} /> Checked in for today! (+25 🪙 credited)
                          </div>
                        ) : (
                          <button
                            onClick={() => checkInChallenge(ch.id)}
                            className="btn btn-primary"
                            style={{ width: '100%', padding: '0.75rem', fontSize: '0.9rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
                          >
                            <Sparkles size={16} /> Check In Today (+25 🪙)
                          </button>
                        )}
                      </div>
                    ) : (
                      <button
                        onClick={() => joinChallenge(ch.id)}
                        className="btn"
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          fontSize: '0.9rem',
                          fontWeight: 700,
                          background: 'rgba(245, 158, 11, 0.15)',
                          color: '#f59e0b',
                          border: '1px solid rgba(245, 158, 11, 0.4)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.4rem'
                        }}
                      >
                        Join Challenge & Compete <ArrowRight size={16} />
                      </button>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: SCHEDULED DIET LOGGING (EAT ON TIME -> EARN COINS) */}
      {activeTab === 'schedule' && (
        <div>
          <div className="flex-between" style={{ marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.4rem', fontFamily: 'Outfit', fontWeight: 700 }}>
                Scheduled Meal Windows (Eat On Time Protocol)
              </h2>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Eating your planned meals within the optimal anabolic window prevents bingeing and stabilizes your blood sugar. Earn <strong>+50 NutriCoins</strong> for each meal taken on time!
              </p>
            </div>
            <div style={{ background: 'rgba(59, 130, 246, 0.15)', border: '1px solid #3b82f6', borderRadius: '12px', padding: '0.6rem 1.25rem', color: '#60a5fa', fontWeight: 700, fontSize: '0.95rem' }}>
              🎯 Today's Earned: +{totalMealCoinsToday} / 200 Coins
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {scheduledMeals.map(meal => (
              <div
                key={meal.id}
                className="glass-card"
                style={{
                  padding: '1.5rem 1.75rem',
                  borderRadius: '1.25rem',
                  border: meal.completed ? '2px solid #22c55e' : '1px solid var(--glass-border)',
                  background: meal.completed ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.08) 0%, rgba(15, 23, 42, 0.85) 100%)' : 'var(--surface)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1.25rem',
                  transition: 'all 0.25s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    background: meal.completed ? 'rgba(34, 197, 94, 0.2)' : 'rgba(59, 130, 246, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.8rem',
                    border: meal.completed ? '2px solid #22c55e' : '1px solid rgba(59, 130, 246, 0.3)'
                  }}>
                    {meal.icon}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
                      <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: meal.completed ? '#4ade80' : '#fff' }}>
                        {meal.name}
                      </h3>
                      <span style={{ background: 'rgba(255, 255, 255, 0.08)', color: 'var(--text-secondary)', fontSize: '0.78rem', fontWeight: 600, padding: '0.2rem 0.6rem', borderRadius: '50px' }}>
                        ⏰ {meal.timeWindow}
                      </span>
                    </div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '0.25rem' }}>
                      {meal.recommendedFoods} • <strong style={{ color: '#fff' }}>{meal.caloriesTarget}</strong>
                    </div>
                    {meal.completedAt && (
                      <span style={{ fontSize: '0.78rem', color: '#22c55e', fontWeight: 600 }}>
                        ✓ Logged on time at {meal.completedAt}
                      </span>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  {meal.completed ? (
                    <div style={{
                      background: 'rgba(34, 197, 94, 0.2)',
                      color: '#22c55e',
                      padding: '0.65rem 1.25rem',
                      borderRadius: '50px',
                      fontWeight: 800,
                      fontSize: '0.95rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      border: '1px solid #22c55e'
                    }}>
                      <CheckCircle2 size={18} /> +{meal.coinsReward} 🪙 Claimed
                    </div>
                  ) : (
                    <button
                      onClick={() => logMealOnTime(meal.id)}
                      className="btn"
                      style={{
                        padding: '0.75rem 1.4rem',
                        fontSize: '0.95rem',
                        fontWeight: 700,
                        background: 'linear-gradient(90deg, #f59e0b 0%, #d97706 100%)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        boxShadow: '0 4px 15px rgba(245, 158, 11, 0.35)'
                      }}
                    >
                      <Sparkles size={16} /> Eat On Time & Claim +{meal.coinsReward} 🪙
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: GIFTS & REWARDS STORE (REDEEM COINS) */}
      {activeTab === 'store' && (
        <div>
          <div className="flex-between" style={{ marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.4rem', fontFamily: 'Outfit', fontWeight: 700 }}>
                Redeem Coins for Real Fitness Gifts & Vouchers
              </h2>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Your dedication pays off. Exchange your earned NutriCoins for actual food items, protein tubs, merchandise, and coaching sessions.
              </p>
            </div>
          </div>

          {/* Claimed Vouchers Drawer if any exist */}
          {claimedGifts.length > 0 && (
            <div 
              className="glass-card" 
              style={{ 
                padding: '1.5rem', 
                marginBottom: '2rem', 
                background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.12) 0%, rgba(15, 23, 42, 0.85) 100%)', 
                border: '1px solid rgba(34, 197, 94, 0.35)',
                borderRadius: '1.25rem' 
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Gift size={20} color="#22c55e" />
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700 }}>
                  My Claimed Gifts & Voucher Codes ({claimedGifts.length})
                </h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat( auto-fit, minmax(280px, 1fr) )', gap: '1rem' }}>
                {claimedGifts.map(claim => (
                  <div 
                    key={claim.id} 
                    style={{ 
                      background: 'rgba(0, 0, 0, 0.4)', 
                      padding: '1rem', 
                      borderRadius: '0.75rem', 
                      border: '1px solid var(--glass-border)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem'
                    }}
                  >
                    <div className="flex-between">
                      <strong style={{ fontSize: '0.95rem', color: '#fff' }}>{claim.title}</strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{claim.claimedAt}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(34, 197, 94, 0.1)', padding: '0.4rem 0.75rem', borderRadius: '6px', border: '1px dashed #22c55e' }}>
                      <span style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '1.05rem', color: '#4ade80' }}>
                        {claim.voucherCode}
                      </span>
                      <button
                        onClick={() => handleCopyCode(claim.voucherCode)}
                        className="btn"
                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem', background: '#22c55e', color: '#fff', border: 'none' }}
                      >
                        {copiedCode === claim.voucherCode ? <Check size={12} /> : <Copy size={12} />}
                        {copiedCode === claim.voucherCode ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      Show this code to coach or enter during checkout in the Marketplace!
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Grid of Redeemable Gifts */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat( auto-fit, minmax(320px, 1fr) )', gap: '1.5rem' }}>
            {AVAILABLE_GIFTS.map(gift => {
              const canAfford = coins >= gift.coinsCost;

              return (
                <div 
                  key={gift.id}
                  className="glass-card"
                  style={{
                    padding: 0,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '1.25rem',
                    border: '1px solid var(--glass-border)'
                  }}
                >
                  <div style={{ position: 'relative', height: '170px', width: '100%' }}>
                    <img 
                      src={gift.image} 
                      alt={gift.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                    <span style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: 'rgba(0, 0, 0, 0.75)',
                      backdropFilter: 'blur(4px)',
                      color: '#f59e0b',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      padding: '0.25rem 0.65rem',
                      borderRadius: '50px',
                      border: '1px solid #f59e0b'
                    }}>
                      Worth {gift.originalValue}
                    </span>
                    <span style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: '#3b82f6',
                      color: '#fff',
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      padding: '0.2rem 0.55rem',
                      borderRadius: '50px'
                    }}>
                      {gift.badge}
                    </span>
                  </div>

                  <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#60a5fa', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                        {gift.category}
                      </div>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem', color: '#fff' }}>
                        {gift.title}
                      </h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.4', marginBottom: '1rem' }}>
                        {gift.description}
                      </p>
                    </div>

                    <div className="flex-between" style={{ paddingTop: '0.85rem', borderTop: '1px solid var(--glass-border)' }}>
                      <div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block' }}>Cost</span>
                        <span style={{ fontSize: '1.35rem', fontWeight: 900, color: '#f59e0b' }}>
                          🪙 {gift.coinsCost} <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Coins</span>
                        </span>
                      </div>

                      <button
                        onClick={() => setSelectedGiftModal(gift)}
                        disabled={!canAfford}
                        className="btn"
                        style={{
                          padding: '0.6rem 1.25rem',
                          fontSize: '0.9rem',
                          fontWeight: 700,
                          borderRadius: '8px',
                          background: canAfford ? 'linear-gradient(90deg, #22c55e 0%, #16a34a 100%)' : 'rgba(255, 255, 255, 0.08)',
                          color: canAfford ? '#fff' : 'var(--text-secondary)',
                          cursor: canAfford ? 'pointer' : 'not-allowed',
                          border: 'none',
                          boxShadow: canAfford ? '0 2px 10px rgba(34, 197, 94, 0.3)' : 'none'
                        }}
                      >
                        {canAfford ? 'Redeem Gift 🎁' : `Need ${gift.coinsCost - coins} more`}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Confirmation Modal to Redeem Gift */}
      {selectedGiftModal && (
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
          <div className="glass-card" style={{ maxWidth: '440px', width: '100%', padding: '2rem', borderRadius: '1.25rem', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🎁</div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.5rem', color: '#fff' }}>
              Confirm Gift Redemption
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.45' }}>
              Are you sure you want to redeem <strong>"{selectedGiftModal.title}"</strong> for <strong style={{ color: '#f59e0b' }}>🪙 {selectedGiftModal.coinsCost} NutriCoins</strong>?
            </p>

            <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '1rem', borderRadius: '0.75rem', marginBottom: '1.5rem', textAlign: 'left' }}>
              <div className="flex-between" style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Current Wallet:</span>
                <strong>🪙 {coins} Coins</strong>
              </div>
              <div className="flex-between" style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: '#ef4444' }}>
                <span>Redemption Cost:</span>
                <strong>- 🪙 {selectedGiftModal.coinsCost} Coins</strong>
              </div>
              <div className="flex-between" style={{ fontSize: '0.95rem', fontWeight: 700, paddingTop: '0.5rem', borderTop: '1px solid var(--glass-border)', color: '#22c55e' }}>
                <span>Remaining Balance:</span>
                <strong>🪙 {coins - selectedGiftModal.coinsCost} Coins</strong>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={() => setSelectedGiftModal(null)}
                className="btn"
                style={{ flex: 1, padding: '0.75rem', background: 'rgba(255, 255, 255, 0.1)', color: '#fff' }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleConfirmRedeem(selectedGiftModal)}
                className="btn btn-primary"
                style={{ flex: 1, padding: '0.75rem', fontWeight: 700, background: 'linear-gradient(90deg, #22c55e 0%, #16a34a 100%)' }}
              >
                Confirm & Unlock
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
