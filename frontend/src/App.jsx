import React, { useState, useEffect } from 'react';
import { WeatherProvider, useWeather } from './context/WeatherContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Auth from './screens/Auth';
import Navbar from './components/Navbar';
import Monsoon from './screens/Monsoon';
import Dashboard from './screens/Dashboard';
import Verification from './screens/Verification';
import Advisory from './screens/Advisory';
import Alerts from './screens/Alerts';
import WeatherMap from './screens/WeatherMap';
import History from './screens/History';
import ReportWeather from './screens/ReportWeather';
import LocationChamberModal from './components/LocationChamberModal';
import ErrorBoundary from './components/ErrorBoundary';
import MobileBottomNav from './components/MobileBottomNav';
import './styles/global.css';
import './styles/dashboard.css';

function MainAppShell() {
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [inspectObservation, setInspectObservation] = useState(null);
  const { isReportModalOpen, setIsReportModalOpen } = useWeather();

  // Route directly to report screen if modal trigger is fired
  useEffect(() => {
    if (isReportModalOpen) {
      setActiveScreen('report');
      setIsReportModalOpen(false);
    }
  }, [isReportModalOpen, setIsReportModalOpen]);

  const handleInspectObservation = (obs) => {
    setInspectObservation(obs);
    setActiveScreen('verification');
  };

  return (
    <div className="app-container">
      {/* Top Navbar with Village Selector, Nav tabs, and User Chip */}
      <Navbar activeScreen={activeScreen} setActiveScreen={setActiveScreen} />

      {/* Screen Views */}
      <main className="main-content" style={{ flex: 1 }}>
        {activeScreen === 'dashboard' && (
          <Dashboard onInspectObservation={handleInspectObservation} onNavigate={setActiveScreen} />
        )}
        {activeScreen === 'monsoon' && <Monsoon onNavigate={setActiveScreen} />}
        {activeScreen === 'report' && (
          <ReportWeather onInspectObservation={handleInspectObservation} />
        )}
        {activeScreen === 'verification' && (
          <Verification inspectTarget={inspectObservation} />
        )}
        {activeScreen === 'advisory' && <Advisory />}
        {activeScreen === 'alerts' && <Alerts />}
        {activeScreen === 'map' && <WeatherMap />}
        {activeScreen === 'history' && <History />}
      </main>

      {/* Floating Modal for Farmer Weather Reporting */}
      {isReportModalOpen && (
        <ReportWeather onClose={() => setIsReportModalOpen(false)} />
      )}

      {/* 3-Chamber Location Selection Modal */}
      <LocationChamberModal />

      {/* Sticky Bottom Navigation Bar for Mobile (< 768px) */}
      <MobileBottomNav activeScreen={activeScreen} setActiveScreen={setActiveScreen} />

      {/* Footer */}
      <footer
        style={{
          padding: '16px 28px',
          background: 'rgba(8, 18, 16, 0.9)',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.75rem',
          color: 'var(--text-secondary)',
        }}
      >
        <div>
          <strong style={{ color: '#34d399' }}>GramWeather AI</strong> • Core Paradigm:{' '}
          <span style={{ color: '#fff' }}>Observe → Verify → Fuse → Predict → Explain → Learn</span>
        </div>
        <div>
          Data Source: Live Open-Meteo API • Local Hardware: Simulated ESP32 Mesh Fleet
        </div>
      </footer>
    </div>
  );
}

function AppRoot() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--bg-primary)',
          color: '#10b981',
          gap: '16px',
        }}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            border: '3px solid rgba(16, 185, 129, 0.2)',
            borderTopColor: '#10b981',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }}
        />
        <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
          Loading GramWeather AI...
        </div>
      </div>
    );
  }

  // If unauthenticated, display the Auth Screen before the app
  if (!isAuthenticated) {
    return (
      <ErrorBoundary>
        <Auth />
      </ErrorBoundary>
    );
  }

  // Once authenticated, display the full GramWeather AI application
  return (
    <ErrorBoundary>
      <MainAppShell />
    </ErrorBoundary>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <WeatherProvider>
        <AuthProvider>
          <AppRoot />
        </AuthProvider>
      </WeatherProvider>
    </ErrorBoundary>
  );
}
