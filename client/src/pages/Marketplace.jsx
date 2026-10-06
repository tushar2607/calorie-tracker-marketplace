import React, { useState } from 'react';
import { Star, ShieldCheck, Mail, ArrowRight, Phone, Award, Flame, Sparkles, ThumbsUp, Medal, ShoppingBag, CheckCircle2, ShoppingCart } from 'lucide-react';

export default function Marketplace() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [address, setAddress] = useState('');
  const [orderSuccess, setOrderSuccess] = useState('');

  const professionals = [
    {
      id: 3,
      name: 'Ekamjyot Singh',
      role: 'Master Certified Trainer & Elite Fitness Specialist (Patiala)',
      rating: 5.0,
      reviews: 520,
      image: '/ekam_real.jpg',
      isBestSeller: true,
      badge: '🔥 #1 BEST SELLING COACH',
      badgeColor: 'linear-gradient(90deg, #f59e0b 0%, #d97706 100%)',
      borderColor: '#f59e0b',
      boxShadowColor: 'rgba(245, 158, 11, 0.25)',
      specialties: [
        '🏆 #1 Best Selling Coach',
        '🥇 National Powerlifting Winner',
        '🏋️ Strength & Conditioning Specialist',
        '🩹 Injury Rehabilitation & Joint Mobility',
        '💪 Powerlifting & Muscle Hypertrophy',
        '🥗 Master Nutrition & Macro Strategy',
        '💊 Supplement Optimization Guidance',
        '🔥 Fat Loss & Body Recomposition',
        '🩺 Client Fitness Diagnostics Specialist',
        '🧘 Posture & Core Stability Correction',
        '✨ Personalized Lifestyle Transformation'
      ],
      price: '₹1,499/hr',
      contactNumber: '7986303704'
    },
    {
      id: 4,
      name: 'Tushar Sood',
      role: 'Senior Elite Bodybuilding Coach & Industry Veteran (10+ Years Experience)',
      rating: 4.9,
      reviews: 460,
      image: '/tushar_real.jpg',
      isClientsChoice: true,
      badge: '⭐ CLIENT\'S CHOICE COACH',
      badgeColor: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)',
      borderColor: '#3b82f6',
      boxShadowColor: 'rgba(59, 130, 246, 0.25)',
      specialties: [
        '⭐ Client\'s Choice Coach',
        '⏳ 10+ Years Industry Experience',
        '🏋️ Veteran Powerlifting Coach',
        '💪 Contest Prep & Bodybuilding',
        '📈 Advanced Periodization & Programming',
        '🔄 Metabolic Recovery & Plateau Breaker',
        '🥗 Custom Diet Architecture',
        '🤝 1-on-1 Personal Mentorship'
      ],
      price: '₹1,499/hr',
      contactNumber: '7888737064'
    },
    {
      id: 1,
      name: 'Michael Sterling',
      role: 'Certified Personal Trainer & Nutritionist',
      rating: 4.9,
      reviews: 128,
      image: '/trainer_profile.png',
      specialties: ['Weight Loss', 'Muscle Building', 'Nutrition Plans'],
      price: '₹1,299/hr'
    },
    {
      id: 2,
      name: 'Sarah Jenkins',
      role: 'Dietitian & Holistic Health Coach',
      rating: 4.8,
      reviews: 94,
      image: 'https://images.unsplash.com/photo-1594824424683-eb71887e35b0?w=400&q=80',
      specialties: ['Vegan Diets', 'Gut Health', 'Meal Planning'],
      price: '₹1,199/hr'
    }
  ];

  const foodProducts = [
    {
      id: 101,
      title: 'NutriGen 100% Whey Iso-Protein',
      tagline: '25g Pure Isolate Protein • 0g Sugar • Fast Recovery',
      price: '₹3,999',
      unitPrice: 3999,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=400&q=80',
      badge: '🏆 BEST SELLER',
      badgeColor: '#22c55e',
      category: 'Supplements'
    },
    {
      id: 102,
      title: 'Ekamjyot Signature All-Natural Peanut Butter',
      tagline: '100% Roasted Peanuts • Zero Palm Oil • 30g Protein/100g',
      price: '₹499',
      unitPrice: 499,
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&q=80',
      badge: '⭐ EKAM\'S PICK',
      badgeColor: '#f59e0b',
      category: 'Healthy Fats'
    },
    {
      id: 103,
      title: 'Tushar Mass Gainer Pro (Complex Carbs)',
      tagline: '1250 kcal/Serving • Creatine Enriched • Maximum Mass',
      price: '₹2,799',
      unitPrice: 2799,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&q=80',
      badge: '🔥 TOP GAINER',
      badgeColor: '#3b82f6',
      category: 'Supplements'
    },
    {
      id: 104,
      title: 'Organic Rolled Oats & Superseeds Combo',
      tagline: 'High Fiber • Chia & Pumpkin Seeds • Complex Glycogen',
      price: '₹399',
      unitPrice: 399,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=400&q=80',
      badge: '🌱 ORGANIC',
      badgeColor: '#10b981',
      category: 'Grains & Snacks'
    },
    {
      id: 105,
      title: 'Pre-Workout Explosive Energy Matrix',
      tagline: '300mg Caffeine • L-Citrulline Malate • Muscle Pump',
      price: '₹1,899',
      unitPrice: 1899,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1546483875-ad9014c88eba?w=400&q=80',
      badge: '⚡ EXPLOSIVE PUMP',
      badgeColor: '#ef4444',
      category: 'Supplements'
    },
    {
      id: 106,
      title: 'Cold-Pressed Extra Virgin Olive Oil & Ghee',
      tagline: '100% Pure Healthy Fats • Ideal for Clean Fitness Cooking',
      price: '₹899',
      unitPrice: 899,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80',
      badge: '🥑 HEALTHY FATS',
      badgeColor: '#eab308',
      category: 'Healthy Fats'
    }
  ];

  const mealPlans = [
    {
      id: 1,
      title: 'Ultimate Lean Muscle Prep',
      creator: 'Ekamjyot Singh',
      calories: '2500 kcal/day',
      image: '/food_healthy.png',
      price: '₹999'
    },
    {
      id: 2,
      title: 'Plant-Based Vitality Focus',
      creator: 'Sarah Jenkins',
      calories: '1800 kcal/day',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80',
      price: '₹799'
    }
  ];

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    if (!selectedProduct) return;

    const totalCost = (selectedProduct.unitPrice * orderQuantity).toLocaleString('en-IN');
    setOrderSuccess(`🎉 Order Placed! ${orderQuantity}x "${selectedProduct.title}" (Total: ₹${totalCost}) will be delivered soon!`);
    setSelectedProduct(null);
    setOrderQuantity(1);
    setAddress('');

    setTimeout(() => setOrderSuccess(''), 4500);
  };

  return (
    <div className="fade-in" style={{ maxWidth: '1150px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 className="title" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Sparkles color="var(--primary)" /> Expert Marketplace & Fitness Store
        </h1>
        <p className="subtitle">Connect with top coaches, discover fitness food products, protein supplements, and custom meal plans.</p>
      </header>

      {orderSuccess && (
        <div style={{ background: 'rgba(34, 197, 94, 0.15)', border: '1px solid #22c55e', color: '#22c55e', padding: '1rem 1.25rem', borderRadius: '0.75rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.05rem' }}>
          <CheckCircle2 size={24} /> {orderSuccess}
        </div>
      )}

      {/* Featured Top Professionals & Champions */}
      <h2 style={{ fontFamily: 'Outfit', fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Award color="#f59e0b" /> Featured Top Professionals & Champions
      </h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', marginBottom: '3.5rem' }}>
        {professionals.map(prof => (
          <div 
            key={prof.id} 
            className="glass-card" 
            style={{ 
              display: 'flex', 
              gap: '1.75rem', 
              alignItems: 'flex-start',
              position: 'relative',
              border: prof.borderColor ? `2px solid ${prof.borderColor}` : '1px solid var(--glass-border)',
              boxShadow: prof.boxShadowColor ? `0 0 25px ${prof.boxShadowColor}` : 'var(--shadow)',
              background: prof.borderColor ? `linear-gradient(135deg, ${prof.boxShadowColor} 0%, rgba(15, 23, 42, 0.85) 100%)` : 'var(--surface)',
              borderRadius: '1.25rem',
              padding: '1.75rem',
              flexWrap: 'wrap'
            }}
          >
            {prof.badge && (
              <div style={{
                position: 'absolute',
                top: '-14px',
                left: '24px',
                background: prof.badgeColor,
                color: '#fff',
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.5px',
                padding: '0.25rem 0.85rem',
                borderRadius: '50px',
                boxShadow: `0 4px 12px ${prof.boxShadowColor || 'rgba(0,0,0,0.3)'}`,
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}>
                {prof.isBestSeller ? <Flame size={14} fill="#fff" /> : <ThumbsUp size={14} fill="#fff" />} {prof.badge}
              </div>
            )}

            <img 
              src={prof.image} 
              alt={prof.name} 
              style={{ 
                width: '130px', 
                height: '130px', 
                borderRadius: '50%', 
                objectFit: 'cover', 
                border: prof.borderColor ? `4px solid ${prof.borderColor}` : '3px solid var(--accent-primary)',
                boxShadow: prof.boxShadowColor ? `0 0 15px ${prof.boxShadowColor}` : 'none'
              }}
            />

            <div style={{ flex: 1, minWidth: '280px' }}>
              <div className="flex-between" style={{ flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <h3 style={{ fontSize: '1.4rem', margin: 0, fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {prof.name} {prof.borderColor && <Medal color={prof.borderColor} size={22} />}
                </h3>
                <div className="flex-center" style={{ gap: '0.35rem', color: prof.borderColor || '#f59e0b', fontWeight: 700, fontSize: '1.05rem' }}>
                  <Star fill={prof.borderColor || '#f59e0b'} size={18} /> {prof.rating} <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 400 }}>({prof.reviews} Verified Reviews)</span>
                </div>
              </div>

              <p style={{ color: prof.borderColor || 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.85rem' }}>
                {prof.role}
              </p>
              
              {/* Specialties Tag Grid */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                {prof.specialties.map((spec, idx) => (
                  <span 
                    key={idx} 
                    style={{ 
                      background: spec.includes('#1 Best Selling') || spec.includes('National Powerlifting')
                        ? 'linear-gradient(90deg, rgba(245, 158, 11, 0.25) 0%, rgba(217, 119, 6, 0.25) 100%)' 
                        : spec.includes('Client\'s Choice') || spec.includes('10+ Years')
                        ? 'linear-gradient(90deg, rgba(59, 130, 246, 0.25) 0%, rgba(139, 92, 246, 0.25) 100%)'
                        : 'rgba(59, 130, 246, 0.12)', 
                      color: spec.includes('#1 Best Selling') || spec.includes('National Powerlifting') 
                        ? '#f59e0b' 
                        : spec.includes('Client\'s Choice') || spec.includes('10+ Years')
                        ? '#60a5fa'
                        : 'var(--accent-primary)', 
                      border: spec.includes('#1 Best Selling') || spec.includes('National Powerlifting') 
                        ? '1px solid #f59e0b' 
                        : spec.includes('Client\'s Choice') || spec.includes('10+ Years')
                        ? '1px solid #3b82f6'
                        : '1px solid rgba(59, 130, 246, 0.25)',
                      padding: '0.3rem 0.65rem', 
                      borderRadius: '6px', 
                      fontSize: '0.82rem', 
                      fontWeight: 600 
                    }}
                  >
                    {spec}
                  </span>
                ))}
              </div>

              <div className="flex-between" style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--glass-border)' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block' }}>Consultation Fee</span>
                  <span style={{ fontWeight: 800, fontSize: '1.3rem', color: prof.borderColor || 'var(--text-primary)' }}>{prof.price}</span>
                </div>

                {prof.contactNumber ? (
                  <a 
                    href={`tel:${prof.contactNumber}`} 
                    className="btn-primary" 
                    style={{ 
                      padding: '0.6rem 1.25rem', 
                      fontSize: '0.95rem', 
                      textDecoration: 'none', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.5rem',
                      background: prof.badgeColor || 'var(--primary)',
                      border: 'none',
                      boxShadow: prof.boxShadowColor ? `0 4px 15px ${prof.boxShadowColor}` : 'none',
                      color: '#fff',
                      fontWeight: 700
                    }}
                  >
                    <Phone size={16} /> Contact / Call ({prof.contactNumber})
                  </a>
                ) : (
                  <button className="btn-primary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Mail size={16} /> Contact Specialist
                  </button>
                )}
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* NEW: Fitness Food Products & Supplement Store */}
      <h2 style={{ fontFamily: 'Outfit', fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <ShoppingBag color="#3b82f6" /> Featured Fitness Food Products & Supplements
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat( auto-fit, minmax(320px, 1fr) )', gap: '1.5rem', marginBottom: '3.5rem' }}>
        {foodProducts.map(prod => (
          <div key={prod.id} className="glass-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', borderRadius: '1rem', border: '1px solid var(--glass-border)' }}>
            
            <div style={{ position: 'relative', height: '190px', width: '100%' }}>
              <img 
                src={prod.image} 
                alt={prod.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: prod.badgeColor,
                color: '#fff',
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '0.25rem 0.65rem',
                borderRadius: '50px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
              }}>
                {prod.badge}
              </span>
            </div>

            <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
              <div>
                <div className="flex-between" style={{ marginBottom: '0.35rem' }}>
                  <h3 style={{ fontSize: '1.15rem', margin: 0, fontWeight: 700 }}>{prod.title}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#f59e0b', fontWeight: 700, fontSize: '0.9rem' }}>
                    <Star fill="#f59e0b" size={14} /> {prod.rating}
                  </div>
                </div>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1rem', lineHeight: '1.4' }}>
                  {prod.tagline}
                </p>
              </div>

              <div className="flex-between" style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--glass-border)' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {prod.price}
                </span>

                <button 
                  onClick={() => setSelectedProduct(prod)}
                  className="btn btn-primary" 
                  style={{ padding: '0.5rem 1rem', fontSize: '0.88rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  <ShoppingCart size={16} /> Order Product
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Featured Meal Plans */}
      <h2 style={{ fontFamily: 'Outfit', fontSize: '1.5rem', marginBottom: '1.5rem' }}>Featured Meal Plans & Schedules</h2>
      <div className="grid-cols-2">
        {mealPlans.map(plan => (
          <div key={plan.id} className="glass-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <img 
              src={plan.image} 
              alt={plan.title} 
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
            <div style={{ padding: '1.5rem' }}>
              <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1.3rem' }}>{plan.title}</h3>
                <span style={{ background: 'var(--accent-gradient)', padding: '0.25rem 0.75rem', borderRadius: '50px', fontWeight: 600, fontSize: '0.9rem' }}>{plan.price}</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1rem' }}>
                Created by <ShieldCheck size={14} style={{ display: 'inline', color: 'var(--success)' }}/> {plan.creator}
              </p>
              <div className="flex-between">
                <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>🎯 {plan.calories}</span>
                <button className="btn-secondary" style={{ padding: '0.4rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', border: 'none', color: 'var(--accent-primary)' }}>
                  View Plan <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Product Modal */}
      {selectedProduct && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div className="glass-card" style={{ maxWidth: '480px', width: '100%', padding: '1.75rem', borderRadius: '1rem' }}>
            <div className="flex-between" style={{ marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 700 }}>Order {selectedProduct.title}</h3>
              <button onClick={() => setSelectedProduct(null)} className="btn" style={{ padding: '0.25rem 0.5rem' }}>✕</button>
            </div>

            <img 
              src={selectedProduct.image} 
              alt={selectedProduct.title} 
              style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '0.75rem', marginBottom: '1rem' }} 
            />

            <form onSubmit={handleOrderSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label className="form-label">Select Quantity</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <button type="button" onClick={() => setOrderQuantity(q => Math.max(1, q - 1))} className="btn" style={{ padding: '0.5rem 1rem', fontSize: '1.1rem' }}>-</button>
                  <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>{orderQuantity}</span>
                  <button type="button" onClick={() => setOrderQuantity(q => q + 1)} className="btn" style={{ padding: '0.5rem 1rem', fontSize: '1.1rem' }}>+</button>
                </div>
              </div>

              <div>
                <label className="form-label">Delivery Address</label>
                <input 
                  type="text" 
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)} 
                  placeholder="Enter street address, city, pincode..." 
                  className="form-input" 
                  required 
                />
              </div>

              <div className="flex-between" style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--glass-border)' }}>
                <span>Total Amount:</span>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)' }}>
                  ₹{(selectedProduct.unitPrice * orderQuantity).toLocaleString('en-IN')}
                </span>
              </div>

              <button type="submit" className="btn btn-primary" style={{ padding: '0.85rem', fontSize: '1rem', fontWeight: 700, marginTop: '0.5rem' }}>
                Confirm Order & Pay
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
