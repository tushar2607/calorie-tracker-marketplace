import React, { createContext, useContext, useState, useEffect } from 'react';

const RewardsContext = createContext();

export const useRewards = () => useContext(RewardsContext);

// Initial challenges template
const INITIAL_CHALLENGES = [
  {
    id: 'ch_sugar_free',
    title: '7-Day Zero Added Sugar Sprint',
    description: 'Eliminate refined sweets, soft drinks, and processed sugars for 7 consecutive days to reset insulin sensitivity.',
    category: 'Clean Eating',
    durationDays: 7,
    rewardCoins: 350,
    enrolled: true,
    progressDays: 3,
    lastCheckIn: null,
    badgeIcon: '🍃',
    difficulty: 'Medium'
  },
  {
    id: 'ch_protein_master',
    title: '100g+ Daily Protein Target',
    description: 'Hit at least 100g of quality protein every day for 5 days using whole foods or whey protein.',
    category: 'Muscle Fuel',
    durationDays: 5,
    rewardCoins: 300,
    enrolled: true,
    progressDays: 2,
    lastCheckIn: null,
    badgeIcon: '🥩',
    difficulty: 'Easy'
  },
  {
    id: 'ch_water_3l',
    title: '3-Liter Daily Hydration Streak',
    description: 'Hit the full 3.0 Liters hydration goal every day for 7 days to flush toxins and optimize performance.',
    category: 'Hydration',
    durationDays: 7,
    rewardCoins: 250,
    enrolled: false,
    progressDays: 0,
    lastCheckIn: null,
    badgeIcon: '💧',
    difficulty: 'Easy'
  },
  {
    id: 'ch_dinner_timing',
    title: 'Early Dinner Protocol (Before 8:30 PM)',
    description: 'Finish your final meal of the day by 8:30 PM for 5 days to optimize nocturnal growth hormone and deep sleep.',
    category: 'Metabolic Health',
    durationDays: 5,
    rewardCoins: 400,
    enrolled: false,
    progressDays: 0,
    lastCheckIn: null,
    badgeIcon: '🌙',
    difficulty: 'Hard'
  },
  {
    id: 'ch_whole_food_21',
    title: '21-Day Complete Metabolic Transformation',
    description: 'Eat 100% clean whole food meals with zero ultra-processed junk for 21 days with Ekam & Tushar mentorship.',
    category: 'Transformation',
    durationDays: 21,
    rewardCoins: 1200,
    enrolled: false,
    progressDays: 0,
    lastCheckIn: null,
    badgeIcon: '🏆',
    difficulty: 'Pro'
  }
];

// Initial scheduled meals for on-time diet logging
const INITIAL_MEAL_SCHEDULE = [
  {
    id: 'meal_breakfast',
    name: 'Power Breakfast',
    timeWindow: '7:30 AM - 9:30 AM',
    recommendedFoods: 'Oats with whey/eggs, banana, and 1 glass water',
    caloriesTarget: '450-550 kcal',
    coinsReward: 50,
    completed: false,
    completedAt: null,
    icon: '🍳'
  },
  {
    id: 'meal_lunch',
    name: 'Metabolic Fuel Lunch',
    timeWindow: '1:00 PM - 2:30 PM',
    recommendedFoods: 'Brown rice/roti, grilled chicken/paneer, dal tadka & greens',
    caloriesTarget: '650-750 kcal',
    coinsReward: 50,
    completed: false,
    completedAt: null,
    icon: '🥗'
  },
  {
    id: 'meal_pre_workout',
    name: 'Pre-Workout Snack',
    timeWindow: '4:30 PM - 5:45 PM',
    recommendedFoods: 'Peanut butter toast or banana with black coffee/shake',
    caloriesTarget: '250-350 kcal',
    coinsReward: 50,
    completed: false,
    completedAt: null,
    icon: '⚡'
  },
  {
    id: 'meal_dinner',
    name: 'Anabolic Recovery Dinner',
    timeWindow: '7:30 PM - 8:45 PM',
    recommendedFoods: 'Steamed vegetables, lean protein, and light complex carbs',
    caloriesTarget: '500-600 kcal',
    coinsReward: 50,
    completed: false,
    completedAt: null,
    icon: '🍲'
  }
];

// Redeemable gifts list
export const AVAILABLE_GIFTS = [
  {
    id: 'gift_shaker',
    title: 'NutriGen Matte Black Shaker Bottle',
    category: 'Merchandise',
    coinsCost: 200,
    originalValue: '₹499',
    image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=400&q=80',
    description: 'BPA-free leakproof 700ml protein shaker with surgical stainless steel wire ball.',
    badge: 'POPULAR'
  },
  {
    id: 'gift_pb',
    title: 'Ekamjyot All-Natural Peanut Butter (500g)',
    category: 'Fitness Foods',
    coinsCost: 300,
    originalValue: '₹499',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&q=80',
    description: '100% roasted peanuts, zero hydrogenated oil, zero added sugar. High protein spread.',
    badge: 'TOP HEALTH'
  },
  {
    id: 'gift_whey_discount',
    title: '₹500 Discount Voucher on Whey Iso-Protein',
    category: 'Supplements',
    coinsCost: 350,
    originalValue: '₹500 OFF',
    image: 'https://images.unsplash.com/photo-1546483875-ad9014c88eba?w=400&q=80',
    description: 'Get flat ₹500 off instantly on 100% Whey Iso-Protein 2kg tub in the Marketplace.',
    badge: 'BEST VALUE'
  },
  {
    id: 'gift_diet_plan',
    title: 'Custom Macro Diet Blueprint by Tushar Sood',
    category: 'Specialist Services',
    coinsCost: 450,
    originalValue: '₹1,499',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80',
    description: 'Personalized 7-day caloric and macro nutrient cycling protocol designed by 10+ yr veteran coach.',
    badge: 'SPECIALIST'
  },
  {
    id: 'gift_ekam_consultation',
    title: '1-on-1 VIP Video Coaching with Ekamjyot Singh',
    category: 'Specialist Services',
    coinsCost: 600,
    originalValue: '₹1,499',
    image: '/ekam_real.jpg',
    description: '30-minute private consultation with National Powerlifting Winner & #1 Best Selling Coach.',
    badge: '🏆 ELITE VIP'
  },
  {
    id: 'gift_gym_kit',
    title: 'Heavy Duty Wrist Wraps & Lifting Straps',
    category: 'Gym Gear',
    coinsCost: 250,
    originalValue: '₹599',
    image: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=400&q=80',
    description: 'Reinforced thumb-loop wrist supports for heavy bench pressing and deadlifts.',
    badge: 'POWER'
  }
];

// Helper to play coin sound via Web Audio API
export const playCoinChime = () => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;
    
    // Coin chime: two crisp high notes B5 -> E6
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(987.77, now); // B5
    osc1.frequency.setValueAtTime(1318.51, now + 0.08); // E6
    gain1.gain.setValueAtTime(0.25, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.4);
  } catch (e) {
    console.debug('Audio error', e);
  }
};

export const RewardsProvider = ({ children }) => {
  // Coin balance (defaults to 150 welcome bonus coins)
  const [coins, setCoins] = useState(() => {
    const saved = localStorage.getItem('nutrigen_coins');
    return saved !== null ? parseInt(saved) : 150;
  });

  // Scheduled meals
  const [scheduledMeals, setScheduledMeals] = useState(() => {
    const todayKey = new Date().toISOString().slice(0, 10);
    const saved = localStorage.getItem(`nutrigen_meals_${todayKey}`);
    return saved ? JSON.parse(saved) : INITIAL_MEAL_SCHEDULE;
  });

  // Challenges
  const [challenges, setChallenges] = useState(() => {
    const saved = localStorage.getItem('nutrigen_challenges');
    return saved ? JSON.parse(saved) : INITIAL_CHALLENGES;
  });

  // Claimed Gifts
  const [claimedGifts, setClaimedGifts] = useState(() => {
    const saved = localStorage.getItem('nutrigen_claimed_gifts');
    return saved ? JSON.parse(saved) : [];
  });

  // Recent coin reward alert banner
  const [coinAlert, setCoinAlert] = useState(null);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('nutrigen_coins', coins.toString());
  }, [coins]);

  useEffect(() => {
    const todayKey = new Date().toISOString().slice(0, 10);
    localStorage.setItem(`nutrigen_meals_${todayKey}`, JSON.stringify(scheduledMeals));
  }, [scheduledMeals]);

  useEffect(() => {
    localStorage.setItem('nutrigen_challenges', JSON.stringify(challenges));
  }, [challenges]);

  useEffect(() => {
    localStorage.setItem('nutrigen_claimed_gifts', JSON.stringify(claimedGifts));
  }, [claimedGifts]);

  // Method: Log Scheduled Diet On Time & Earn Coins
  const logMealOnTime = (mealId) => {
    let earned = 0;
    let mealName = '';

    const updated = scheduledMeals.map(meal => {
      if (meal.id === mealId && !meal.completed) {
        earned = meal.coinsReward;
        mealName = meal.name;
        return {
          ...meal,
          completed: true,
          completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      }
      return meal;
    });

    if (earned > 0) {
      setScheduledMeals(updated);
      setCoins(prev => prev + earned);
      playCoinChime();
      setCoinAlert(`🎉 Awesome! Logged "${mealName}" On Time! Earned +${earned} NutriCoins 🪙`);
      setTimeout(() => setCoinAlert(null), 4500);
    }
  };

  // Method: Join a Challenge
  const joinChallenge = (challengeId) => {
    setChallenges(prev => prev.map(ch => {
      if (ch.id === challengeId) {
        return { ...ch, enrolled: true, progressDays: 1, lastCheckIn: new Date().toISOString().slice(0, 10) };
      }
      return ch;
    }));
    playCoinChime();
    setCoinAlert('🚀 Challenge Enrolled! Check in daily to unlock massive coin bounties!');
    setTimeout(() => setCoinAlert(null), 4000);
  };

  // Method: Daily Check-in for an Enrolled Challenge
  const checkInChallenge = (challengeId) => {
    const todayStr = new Date().toISOString().slice(0, 10);
    let rewardGiven = 0;

    setChallenges(prev => prev.map(ch => {
      if (ch.id === challengeId) {
        if (ch.lastCheckIn === todayStr) return ch; // already checked in today

        const nextDays = ch.progressDays + 1;
        const isCompleted = nextDays >= ch.durationDays;
        rewardGiven = isCompleted ? ch.rewardCoins : 25; // daily check in +25, completed gets full bounty

        return {
          ...ch,
          progressDays: nextDays,
          lastCheckIn: todayStr
        };
      }
      return ch;
    }));

    if (rewardGiven > 0) {
      setCoins(c => c + rewardGiven);
      playCoinChime();
      setCoinAlert(`🌟 Challenge Check-in Complete! +${rewardGiven} NutriCoins awarded! 🪙`);
      setTimeout(() => setCoinAlert(null), 4500);
    }
  };

  // Method: Redeem a Gift using Coins
  const redeemGift = (gift) => {
    if (coins < gift.coinsCost) {
      alert(`You need ${gift.coinsCost} coins to redeem "${gift.title}". Current balance: ${coins} coins.`);
      return false;
    }

    const voucherCode = `NUTRI-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const newGiftClaim = {
      id: 'claim_' + Date.now(),
      giftId: gift.id,
      title: gift.title,
      category: gift.category,
      coinsCost: gift.coinsCost,
      voucherCode,
      claimedAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    setCoins(c => c - gift.coinsCost);
    setClaimedGifts(prev => [newGiftClaim, ...prev]);
    playCoinChime();
    setCoinAlert(`🎁 Congratulations! You redeemed "${gift.title}"! Voucher Code: ${voucherCode}`);
    return true;
  };

  return (
    <RewardsContext.Provider value={{
      coins,
      scheduledMeals,
      challenges,
      claimedGifts,
      coinAlert,
      logMealOnTime,
      joinChallenge,
      checkInChallenge,
      redeemGift
    }}>
      {children}
    </RewardsContext.Provider>
  );
};
