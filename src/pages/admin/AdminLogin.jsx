// src/pages/admin/AdminLogin.jsx
// Email/password login page for the admin panel using Supabase Auth.

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Store, Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function AdminLogin() {
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect
  React.useEffect(() => {
    if (user) navigate('/admin/dashboard', { replace: true });
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const s = {
    page: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#111010',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      padding: '24px',
    },
    card: {
      width: '100%',
      maxWidth: '400px',
      background: '#1a1917',
      borderRadius: '20px',
      padding: '40px 36px',
      border: '1px solid rgba(212,169,106,0.1)',
      boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
    },
    logo: {
      width: '52px', height: '52px', borderRadius: '14px',
      background: 'linear-gradient(135deg, #D4A96A 0%, #B8895A 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      margin: '0 auto 20px',
    },
    title: {
      textAlign: 'center', color: '#F2E6DE', fontSize: '1.4rem',
      fontWeight: 700, marginBottom: '4px', fontFamily: "'Playfair Display', serif",
    },
    subtitle: {
      textAlign: 'center', color: 'rgba(184,137,90,0.5)', fontSize: '0.8rem',
      textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '32px',
    },
    label: {
      display: 'block', color: '#B89A8C', fontSize: '0.8rem',
      fontWeight: 500, marginBottom: '6px',
    },
    inputWrap: {
      position: 'relative', marginBottom: '20px',
    },
    input: {
      width: '100%', padding: '12px 16px', borderRadius: '10px',
      border: '1px solid rgba(184,137,90,0.2)', background: 'rgba(0,0,0,0.3)',
      color: '#F2E6DE', fontSize: '0.95rem',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      outline: 'none', transition: 'border-color 0.2s',
      boxSizing: 'border-box',
    },
    passwordToggle: {
      position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
      background: 'none', border: 'none', color: '#B89A8C', cursor: 'pointer',
      padding: '4px',
    },
    errorBox: {
      background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.2)',
      borderRadius: '10px', padding: '10px 14px', marginBottom: '20px',
      color: '#ff6b6b', fontSize: '0.85rem',
    },
    submitBtn: {
      width: '100%', padding: '13px', borderRadius: '10px',
      background: loading
        ? 'rgba(212,169,106,0.4)'
        : 'linear-gradient(135deg, #D4A96A 0%, #B8895A 100%)',
      border: 'none', color: '#1a1917', fontSize: '0.95rem',
      fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      transition: 'opacity 0.2s',
    },
    backLink: {
      display: 'block', textAlign: 'center', marginTop: '24px',
      color: 'rgba(184,137,90,0.4)', fontSize: '0.8rem', textDecoration: 'none',
    },
  };

  return (
    <div style={s.page}>
      <div style={s.card}>
        <div style={s.logo}>
          <Store size={24} color="#1a1917" strokeWidth={2.5} />
        </div>
        <div style={s.title}>Paaruni Admin</div>
        <div style={s.subtitle}>Sign in to manage your store</div>

        <form onSubmit={handleSubmit}>
          {error && <div style={s.errorBox}>{error}</div>}

          <div>
            <label style={s.label}>Email</label>
            <div style={s.inputWrap}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@paaruni.com"
                required
                style={s.input}
                onFocus={(e) => e.target.style.borderColor = '#D4A96A'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(184,137,90,0.2)'}
              />
            </div>
          </div>

          <div>
            <label style={s.label}>Password</label>
            <div style={s.inputWrap}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{ ...s.input, paddingRight: '44px' }}
                onFocus={(e) => e.target.style.borderColor = '#D4A96A'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(184,137,90,0.2)'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={s.passwordToggle}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} style={s.submitBtn}>
            {loading ? 'Signing in…' : 'Sign In'}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        <a href="/" style={s.backLink}>← Back to store</a>
      </div>
    </div>
  );
}
