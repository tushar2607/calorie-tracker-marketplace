import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Apple, Lock, Mail } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-center" style={{ minHeight: '100vh', width: '100%', background: 'var(--bg-primary)' }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '400px', padding: '2.5rem' }}>
        <div className="flex-center" style={{ marginBottom: '2rem', flexDirection: 'column', gap: '1rem' }}>
          <div className="flex-center" style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(59, 130, 246, 0.1)' }}>
            <Apple color="#3b82f6" fill="#3b82f6" size={32} />
          </div>
          <h2 className="title" style={{ fontSize: '1.8rem', marginBottom: 0 }}>Welcome Back</h2>
          <p className="subtitle" style={{ margin: 0 }}>Sign in to continue to NutriGen</p>
        </div>

        {error && <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
              <Mail size={16} /> Email Address
            </label>
            <input 
              type="email" 
              className="input-base" 
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
              <Lock size={16} /> Password
            </label>
            <input 
              type="password" 
              className="input-base" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-primary flex-center" disabled={isLoading} style={{ width: '100%', padding: '1rem', marginTop: '0.5rem' }}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>

          <button 
            type="button" 
            onClick={() => { setEmail('demo@nutrigen.com'); setPassword('password123'); }}
            className="btn" 
            style={{ width: '100%', padding: '0.75rem', background: 'rgba(59, 130, 246, 0.12)', color: 'var(--accent-primary)', border: '1px solid rgba(59, 130, 246, 0.3)', fontWeight: 600, borderRadius: '8px', cursor: 'pointer' }}>
            ⚡ Auto-Fill Demo Account
          </button>

          <div style={{ padding: '0.5rem 0.75rem', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid var(--glass-border)', borderRadius: '6px', fontSize: '0.78rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
            Demo: <strong style={{ color: '#fff' }}>demo@nutrigen.com</strong> | Password: <strong style={{ color: '#fff' }}>password123</strong>
          </div>
        </form>

        <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 600 }}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}
