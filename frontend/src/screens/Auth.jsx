import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useWeather } from '../context/WeatherContext';
import { Sprout, ShieldCheck, Globe, Check, AlertTriangle, ArrowRight } from '../components/icons';
import LanguageSelector from '../components/LanguageSelector';

export default function Auth() {
  const { login, signup, loginAsDemo, authError, setAuthError } = useAuth();
  const { villages, language, setLanguage, t, getVillageLabel } = useWeather();

  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [demoLoading, setDemoLoading] = useState(null); // 'farmer' or 'officer' or null

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup form state
  const [signupName, setSignupName] = useState('');
  const [signupIdentifier, setSignupIdentifier] = useState(''); // phone or email
  const [signupRole, setSignupRole] = useState('farmer'); // 'farmer' or 'officer'
  const [signupVillageId, setSignupVillageId] = useState('khanna');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupLang, setSignupLang] = useState(language || 'en');

  // Handle Login submission
  const handleLogin = async (e) => {
    e?.preventDefault();
    if (!loginIdentifier.trim() || !loginPassword) {
      setAuthError('Please enter your phone/email and password.');
      return;
    }

    setIsSubmitting(true);
    try {
      await login(loginIdentifier, loginPassword);
    } catch {
      // Error handled by AuthContext
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Signup submission
  const handleSignup = async (e) => {
    e?.preventDefault();
    if (!signupName.trim()) {
      setAuthError('Please enter your full name.');
      return;
    }
    if (!signupIdentifier.trim()) {
      setAuthError('Please enter a phone number or email.');
      return;
    }
    if (!signupPassword || signupPassword.length < 4) {
      setAuthError('Password must be at least 4 characters long.');
      return;
    }

    // Determine if identifier is email or phone
    const cleanId = signupIdentifier.trim();
    const isEmail = cleanId.includes('@');
    const selectedVillage = villages.find((v) => v.id === signupVillageId) || villages[0] || {
      name: 'Khanna',
      block: 'Khanna',
      district: 'Ludhiana',
      state: 'Punjab',
    };

    const payload = {
      name: signupName.trim(),
      password: signupPassword,
      role: signupRole,
      language: signupLang,
      village: selectedVillage.name,
      block: selectedVillage.block || selectedVillage.name,
      district: selectedVillage.district,
      state: selectedVillage.state,
      email: isEmail ? cleanId : null,
      phone: !isEmail ? cleanId : null,
    };

    setIsSubmitting(true);
    try {
      await signup(payload);
    } catch {
      // Error handled by AuthContext
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Demo 1-tap login
  const handleDemoLogin = async (role) => {
    setDemoLoading(role);
    try {
      await loginAsDemo(role);
    } catch {
      // Error captured in authError
    } finally {
      setDemoLoading(null);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        position: 'relative',
        boxSizing: 'border-box',
        background: 'radial-gradient(circle at top, rgba(16,185,129,0.15) 0%, rgba(8,18,16,0.98) 70%)',
      }}
    >
      {/* Top Bar with Language Selector */}
      <div
        style={{
          width: '100%',
          maxWidth: '480px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 12px rgba(16, 185, 129, 0.4)',
            }}
          >
            <Sprout size={18} color="#fff" />
          </div>
          <div>
            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
              GramWeather AI
            </div>
            <div style={{ fontSize: '0.68rem', color: '#10b981', fontWeight: 600 }}>
              Hyperlocal Weather Intelligence
            </div>
          </div>
        </div>

        {/* Global Language Toggle */}
        <LanguageSelector />
      </div>

      {/* Main Glassmorphic Card */}
      <div
        style={{
          width: '100%',
          maxWidth: '480px',
          background: 'rgba(15, 32, 28, 0.85)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: '20px',
          padding: '28px 24px',
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(16, 185, 129, 0.1)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          boxSizing: 'border-box',
        }}
      >
        {/* Quick Demo Access Bar (Recommended for Judges) */}
        <div
          style={{
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px dashed rgba(16, 185, 129, 0.4)',
            borderRadius: '14px',
            padding: '14px 16px',
            marginBottom: '22px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#34d399', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              ⚡ SIH Evaluation Quick Access
            </span>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>1-Tap Demo</span>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <button
              type="button"
              onClick={() => handleDemoLogin('farmer')}
              disabled={Boolean(demoLoading || isSubmitting)}
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#fff',
                border: 'none',
                padding: '10px 12px',
                borderRadius: '10px',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                transition: 'all 0.15s ease',
              }}
            >
              {demoLoading === 'farmer' ? (
                <span>Logging in...</span>
              ) : (
                <>
                  <span>🌱</span>
                  <span>Try demo (Farmer)</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => handleDemoLogin('officer')}
              disabled={Boolean(demoLoading || isSubmitting)}
              style={{
                background: 'rgba(56, 189, 248, 0.15)',
                color: '#38bdf8',
                border: '1px solid rgba(56, 189, 248, 0.35)',
                padding: '10px 12px',
                borderRadius: '10px',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                transition: 'all 0.15s ease',
              }}
            >
              {demoLoading === 'officer' ? (
                <span>Logging in...</span>
              ) : (
                <>
                  <span>🏛️</span>
                  <span>Try demo (Officer)</span>
                </>
              )}
            </button>
          </div>
          <div style={{ fontSize: '0.67rem', color: 'var(--text-muted)', marginTop: '6px', textAlign: 'center' }}>
            Pre-seeded accounts for immediate judge evaluation (Khanna, Punjab)
          </div>
        </div>

        {/* Tab Selector (Login / Signup) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            background: 'rgba(0, 0, 0, 0.35)',
            padding: '4px',
            borderRadius: '12px',
            marginBottom: '20px',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setAuthError(null);
            }}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              border: 'none',
              background: mode === 'login' ? 'rgba(16, 185, 129, 0.25)' : 'transparent',
              color: mode === 'login' ? '#34d399' : 'var(--text-secondary)',
              fontWeight: mode === 'login' ? 700 : 500,
              fontSize: '0.84rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setAuthError(null);
            }}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              border: 'none',
              background: mode === 'signup' ? 'rgba(16, 185, 129, 0.25)' : 'transparent',
              color: mode === 'signup' ? '#34d399' : 'var(--text-secondary)',
              fontWeight: mode === 'signup' ? 700 : 500,
              fontSize: '0.84rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            Create Account
          </button>
        </div>

        {/* Error Notification */}
        {authError && (
          <div
            style={{
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              borderRadius: '10px',
              padding: '10px 14px',
              color: '#fca5a5',
              fontSize: '0.8rem',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <AlertTriangle size={15} color="#ef4444" />
            <span>{authError}</span>
          </div>
        )}

        {/* Form: LOGIN */}
        {mode === 'login' && (
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label
                style={{
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  color: 'var(--text-secondary)',
                  display: 'block',
                  marginBottom: '5px',
                }}
              >
                Mobile Number or Email
              </label>
              <input
                type="text"
                value={loginIdentifier}
                onChange={(e) => setLoginIdentifier(e.target.value)}
                placeholder="e.g. 9876543210 or farmer@gramweather.in"
                required
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: '10px',
                  background: 'rgba(0, 0, 0, 0.35)',
                  border: '1px solid var(--border-subtle)',
                  color: '#fff',
                  fontSize: '0.88rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div>
              <label
                style={{
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  color: 'var(--text-secondary)',
                  display: 'block',
                  marginBottom: '5px',
                }}
              >
                Password
              </label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Enter your password"
                required
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: '10px',
                  background: 'rgba(0, 0, 0, 0.35)',
                  border: '1px solid var(--border-subtle)',
                  color: '#fff',
                  fontSize: '0.88rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                marginTop: '6px',
                padding: '12px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#fff',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 16px rgba(16, 185, 129, 0.3)',
              }}
            >
              {isSubmitting ? 'Verifying Credentials...' : 'Log In to GramWeather'}
              {!isSubmitting && <ArrowRight size={15} />}
            </button>
          </form>
        )}

        {/* Form: SIGNUP */}
        {mode === 'signup' && (
          <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--text-secondary)',
                  display: 'block',
                  marginBottom: '4px',
                }}
              >
                Full Name
              </label>
              <input
                type="text"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
                placeholder="e.g. Gurpreet Singh"
                required
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '9px',
                  background: 'rgba(0, 0, 0, 0.35)',
                  border: '1px solid var(--border-subtle)',
                  color: '#fff',
                  fontSize: '0.85rem',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div>
              <label
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--text-secondary)',
                  display: 'block',
                  marginBottom: '4px',
                }}
              >
                Phone Number or Email
              </label>
              <input
                type="text"
                value={signupIdentifier}
                onChange={(e) => setSignupIdentifier(e.target.value)}
                placeholder="e.g. 9812345678 or kisan@gramweather.in"
                required
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '9px',
                  background: 'rgba(0, 0, 0, 0.35)',
                  border: '1px solid var(--border-subtle)',
                  color: '#fff',
                  fontSize: '0.85rem',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Role Toggle: Farmer / Officer */}
            <div>
              <label
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--text-secondary)',
                  display: 'block',
                  marginBottom: '4px',
                }}
              >
                Your Role
              </label>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '8px',
                }}
              >
                <button
                  type="button"
                  onClick={() => setSignupRole('farmer')}
                  style={{
                    padding: '8px',
                    borderRadius: '8px',
                    border: signupRole === 'farmer' ? '1px solid #10b981' : '1px solid var(--border-subtle)',
                    background: signupRole === 'farmer' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(0,0,0,0.2)',
                    color: signupRole === 'farmer' ? '#34d399' : 'var(--text-secondary)',
                    fontWeight: 600,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                  }}
                >
                  🌱 Farmer
                </button>
                <button
                  type="button"
                  onClick={() => setSignupRole('officer')}
                  style={{
                    padding: '8px',
                    borderRadius: '8px',
                    border: signupRole === 'officer' ? '1px solid #38bdf8' : '1px solid var(--border-subtle)',
                    background: signupRole === 'officer' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(0,0,0,0.2)',
                    color: signupRole === 'officer' ? '#38bdf8' : 'var(--text-secondary)',
                    fontWeight: 600,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                  }}
                >
                  🏛️ Agri Officer
                </button>
              </div>
            </div>

            {/* Village Selector */}
            <div>
              <label
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--text-secondary)',
                  display: 'block',
                  marginBottom: '4px',
                }}
              >
                Village / Gram Panchayat
              </label>
              <select
                value={signupVillageId}
                onChange={(e) => setSignupVillageId(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '9px',
                  background: 'rgba(0, 0, 0, 0.35)',
                  border: '1px solid var(--border-subtle)',
                  color: '#fff',
                  fontSize: '0.85rem',
                  boxSizing: 'border-box',
                }}
              >
                {villages.map((v) => (
                  <option key={v.id} value={v.id} style={{ background: '#0a1912', color: '#fff' }}>
                    {getVillageLabel(v.name)} ({v.district}, {v.state})
                  </option>
                ))}
              </select>
            </div>

            {/* Language Preference */}
            <div>
              <label
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--text-secondary)',
                  display: 'block',
                  marginBottom: '4px',
                }}
              >
                Preferred Language
              </label>
              <select
                value={signupLang}
                onChange={(e) => {
                  setSignupLang(e.target.value);
                  setLanguage(e.target.value);
                }}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '9px',
                  background: 'rgba(0, 0, 0, 0.35)',
                  border: '1px solid var(--border-subtle)',
                  color: '#fff',
                  fontSize: '0.85rem',
                  boxSizing: 'border-box',
                }}
              >
                <option value="en" style={{ background: '#0a1912', color: '#fff' }}>
                  English
                </option>
                <option value="hi" style={{ background: '#0a1912', color: '#fff' }}>
                  हिन्दी (Hindi)
                </option>
                <option value="pa" style={{ background: '#0a1912', color: '#fff' }}>
                  ਪੰਜਾਬੀ (Punjabi)
                </option>
              </select>
            </div>

            {/* Password */}
            <div>
              <label
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--text-secondary)',
                  display: 'block',
                  marginBottom: '4px',
                }}
              >
                Password
              </label>
              <input
                type="password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                placeholder="Choose a password (min 4 characters)"
                required
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '9px',
                  background: 'rgba(0, 0, 0, 0.35)',
                  border: '1px solid var(--border-subtle)',
                  color: '#fff',
                  fontSize: '0.85rem',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                marginTop: '8px',
                padding: '12px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#fff',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 16px rgba(16, 185, 129, 0.3)',
              }}
            >
              {isSubmitting ? 'Creating Account...' : 'Register Account & Enter App'}
              {!isSubmitting && <ArrowRight size={15} />}
            </button>
          </form>
        )}

        {/* Trust & Transparency Note */}
        <div
          style={{
            marginTop: '20px',
            paddingTop: '16px',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
          }}
        >
          <ShieldCheck size={14} color="#10b981" />
          <span>Encrypted Session • Observe-Verify-Fuse Pipeline</span>
        </div>
      </div>
    </div>
  );
}
