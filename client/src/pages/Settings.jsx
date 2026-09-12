import React, { useState } from 'react';
import { User, Shield, Target, Bell, Moon, Sun, Save, CheckCircle2, Key, Sliders, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Load existing user or default settings
  const [profile, setProfile] = useState({
    fullName: user?.fullName || 'Fitness Enthusiast',
    email: user?.email || 'user@nutrigen.com',
    phone: '7986303704',
    bio: 'Dedicated to strength training, clean eating, and progressive overload.',
    targetCalories: '2200',
    targetProtein: '150',
    targetCarbs: '220',
    targetFat: '65',
    goal: 'fat_loss',
    weightUnit: 'kg',
    heightUnit: 'cm',
    notificationsMeal: true,
    notificationsWater: true,
    notificationsWorkout: true,
    darkMode: true
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [savedSuccess, setSavedSuccess] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleProfileChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    // Save to localStorage
    const updatedUser = { ...user, fullName: profile.fullName, email: profile.email };
    localStorage.setItem('userSettings', JSON.stringify(profile));
    localStorage.setItem('user', JSON.stringify(updatedUser));

    setSavedSuccess('Settings saved successfully!');
    setTimeout(() => setSavedSuccess(''), 3500);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (passwordData.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters.');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }

    setPasswordSuccess('Password updated successfully!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setTimeout(() => setPasswordSuccess(''), 3500);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Header */}
      <div className="glass-card" style={{ padding: '1.75rem' }}>
        <h1 className="title" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: 0 }}>
          <Sliders color="var(--primary)" /> Account & App Settings
        </h1>
        <p className="subtitle" style={{ margin: '0.25rem 0 0 0' }}>
          Manage your personal profile, fitness goals, macro targets, preferences, and security settings.
        </p>
      </div>

      {savedSuccess && (
        <div style={{ background: 'rgba(34, 197, 94, 0.15)', border: '1px solid #22c55e', color: '#22c55e', padding: '0.85rem 1.25rem', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
          <CheckCircle2 size={20} /> {savedSuccess}
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

        {/* 1. Profile Information */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <User size={22} color="var(--primary)" /> 1. Personal Profile
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label className="form-label">Full Name</label>
              <input 
                type="text" 
                name="fullName" 
                value={profile.fullName} 
                onChange={handleProfileChange} 
                className="form-input" 
                required 
              />
            </div>
            <div>
              <label className="form-label">Email Address</label>
              <input 
                type="email" 
                name="email" 
                value={profile.email} 
                onChange={handleProfileChange} 
                className="form-input" 
                required 
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
            <div>
              <label className="form-label">Phone Number</label>
              <input 
                type="text" 
                name="phone" 
                value={profile.phone} 
                onChange={handleProfileChange} 
                className="form-input" 
              />
            </div>
            <div>
              <label className="form-label">Primary Fitness Goal</label>
              <select 
                name="goal" 
                value={profile.goal} 
                onChange={handleProfileChange} 
                className="form-input"
              >
                <option value="fat_loss">🔥 Fat Loss & Definition</option>
                <option value="muscle_gain">💪 Muscle Hypertrophy / Mass</option>
                <option value="recomp">⚖️ Body Recomposition</option>
                <option value="endurance">⚡ Athletic Endurance</option>
              </select>
            </div>
          </div>

          <div style={{ marginTop: '1rem' }}>
            <label className="form-label">Bio / Fitness Statement</label>
            <textarea 
              name="bio" 
              value={profile.bio} 
              onChange={handleProfileChange} 
              rows="2" 
              className="form-input" 
              style={{ resize: 'vertical' }}
            />
          </div>
        </div>

        {/* 2. Calorie & Macro Target Goals */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Target size={22} color="#f97316" /> 2. Daily Calorie & Macro Targets
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat( auto-fit, minmax(130px, 1fr) )', gap: '1rem' }}>
            <div>
              <label className="form-label">Daily Calories (kcal)</label>
              <input 
                type="number" 
                name="targetCalories" 
                value={profile.targetCalories} 
                onChange={handleProfileChange} 
                className="form-input" 
                style={{ fontWeight: 700, color: '#f97316' }}
              />
            </div>
            <div>
              <label className="form-label">Protein Target (g)</label>
              <input 
                type="number" 
                name="targetProtein" 
                value={profile.targetProtein} 
                onChange={handleProfileChange} 
                className="form-input" 
                style={{ fontWeight: 700, color: '#22c55e' }}
              />
            </div>
            <div>
              <label className="form-label">Carbs Target (g)</label>
              <input 
                type="number" 
                name="targetCarbs" 
                value={profile.targetCarbs} 
                onChange={handleProfileChange} 
                className="form-input" 
                style={{ fontWeight: 700, color: '#3b82f6' }}
              />
            </div>
            <div>
              <label className="form-label">Fat Target (g)</label>
              <input 
                type="number" 
                name="targetFat" 
                value={profile.targetFat} 
                onChange={handleProfileChange} 
                className="form-input" 
                style={{ fontWeight: 700, color: '#eab308' }}
              />
            </div>
          </div>
        </div>

        {/* 3. Units & App Preferences */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Moon size={22} color="#3b82f6" /> 3. Units & Preferences
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label className="form-label">Weight Unit</label>
              <select name="weightUnit" value={profile.weightUnit} onChange={handleProfileChange} className="form-input">
                <option value="kg">Kilograms (kg)</option>
                <option value="lbs">Pounds (lbs)</option>
              </select>
            </div>
            <div>
              <label className="form-label">Height Unit</label>
              <select name="heightUnit" value={profile.heightUnit} onChange={handleProfileChange} className="form-input">
                <option value="cm">Centimeters (cm)</option>
                <option value="ft">Feet & Inches (ft/in)</option>
              </select>
            </div>
          </div>
        </div>

        {/* 4. Notifications & Reminders */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Bell size={22} color="#eab308" /> 4. Notifications & Reminders
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontSize: '0.95rem' }}>
              <input 
                type="checkbox" 
                name="notificationsMeal" 
                checked={profile.notificationsMeal} 
                onChange={handleProfileChange} 
                style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
              />
              <span>Daily Meal Logging Reminders (Breakfast, Lunch, Dinner)</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontSize: '0.95rem' }}>
              <input 
                type="checkbox" 
                name="notificationsWater" 
                checked={profile.notificationsWater} 
                onChange={handleProfileChange} 
                style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
              />
              <span>Hourly Hydration & Water Intake Alerts</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontSize: '0.95rem' }}>
              <input 
                type="checkbox" 
                name="notificationsWorkout" 
                checked={profile.notificationsWorkout} 
                onChange={handleProfileChange} 
                style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
              />
              <span>Weekly Workout Schedule & Diagnostic Reminders</span>
            </label>
          </div>
        </div>

        <button 
          type="submit" 
          className="btn btn-primary" 
          style={{ padding: '0.9rem', borderRadius: '0.75rem', fontSize: '1.05rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
        >
          <Save size={20} /> Save All Settings
        </button>

      </form>

      {/* 5. Password & Security Section */}
      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Key size={22} color="#ef4444" /> 5. Security & Password Change
        </h2>

        {passwordSuccess && (
          <div style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem', fontSize: '0.9rem' }}>
            {passwordSuccess}
          </div>
        )}

        {passwordError && (
          <div style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem', fontSize: '0.9rem' }}>
            {passwordError}
          </div>
        )}

        <form onSubmit={handleChangePassword} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label className="form-label">Current Password</label>
            <input 
              type="password" 
              value={passwordData.currentPassword} 
              onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })} 
              className="form-input" 
              placeholder="••••••••" 
              required 
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label className="form-label">New Password</label>
              <input 
                type="password" 
                value={passwordData.newPassword} 
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })} 
                className="form-input" 
                placeholder="••••••••" 
                required 
              />
            </div>
            <div>
              <label className="form-label">Confirm New Password</label>
              <input 
                type="password" 
                value={passwordData.confirmPassword} 
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })} 
                className="form-input" 
                placeholder="••••••••" 
                required 
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn" 
            style={{ padding: '0.75rem', background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', border: '1px solid #ef4444', fontWeight: 600, borderRadius: '0.5rem' }}
          >
            Update Password
          </button>
        </form>
      </div>

      {/* Logout Action */}
      <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Active Session</h3>
          <p style={{ margin: '0.25rem 0 0 0', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Log out of your account on this browser.</p>
        </div>
        <button 
          onClick={handleLogout}
          className="btn"
          style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: 'none', padding: '0.75rem 1.25rem', fontWeight: 700, borderRadius: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <LogOut size={18} /> Logout
        </button>
      </div>

    </div>
  );
};

export default Settings;
