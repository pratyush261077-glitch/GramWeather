import React from 'react';
import { AlertTriangle, RefreshCw } from './icons';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[GramWeather ErrorBoundary caught exception]:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            background: 'radial-gradient(circle at top, rgba(239, 68, 68, 0.12) 0%, rgba(8, 18, 16, 0.98) 70%)',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              maxWidth: '520px',
              width: '100%',
              background: 'rgba(15, 32, 28, 0.9)',
              border: '1px solid rgba(239, 68, 68, 0.35)',
              borderRadius: '20px',
              padding: '32px 28px',
              textAlign: 'center',
              boxShadow: '0 16px 40px rgba(0,0,0,0.6)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 18px',
              }}
            >
              <AlertTriangle size={28} color="#ef4444" />
            </div>

            <h2 style={{ fontSize: '1.3rem', color: '#fff', fontWeight: 800, marginBottom: '8px' }}>
              Something went wrong
            </h2>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', lineHeight: 1.5, marginBottom: '20px' }}>
              GramWeather AI intercepted an unexpected interface error. Rather than displaying fake or stale data, the system halted this view safely.
            </p>

            {this.state.error?.message && (
              <div
                style={{
                  background: 'rgba(0,0,0,0.4)',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  fontSize: '0.78rem',
                  color: '#fca5a5',
                  fontFamily: 'monospace',
                  marginBottom: '22px',
                  textAlign: 'left',
                  overflowX: 'auto',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {this.state.error.message}
              </div>
            )}

            <button
              type="button"
              onClick={this.handleRetry}
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#fff',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 16px rgba(16, 185, 129, 0.3)',
              }}
            >
              <RefreshCw size={15} />
              <span>Retry and Reload Application</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
