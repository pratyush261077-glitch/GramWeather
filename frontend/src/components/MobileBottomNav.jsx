import React from 'react';
import { Compass, CloudRain, ShieldCheck, Sprout, AlertTriangle, Send } from './icons';
import { useWeather } from '../context/WeatherContext';

function MobileBottomNav({ activeScreen, setActiveScreen }) {
  const { t } = useWeather();

  const navItems = [
    { id: 'dashboard', label: t('navDashboard') || 'Home', icon: Compass },
    { id: 'monsoon', label: t('navMonsoon') || 'Monsoon', icon: CloudRain },
    { id: 'report', label: t('btnReportWeather') || 'Report', icon: Send, isSpecial: true },
    { id: 'verification', label: t('navVerification') || 'Verify', icon: ShieldCheck },
    { id: 'advisory', label: t('navAdvisory') || 'Advisory', icon: Sprout },
    { id: 'alerts', label: t('navAlerts') || 'Alerts', icon: AlertTriangle },
  ];

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile Bottom Navigation">
      <div className="mobile-bottom-nav-inner">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`mobile-nav-btn ${isActive ? 'active' : ''} ${item.isSpecial ? 'special-action' : ''}`}
              onClick={() => setActiveScreen(item.id)}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className="mobile-nav-icon-wrap">
                <Icon size={20} color={isActive ? (item.isSpecial ? '#fff' : '#10b981') : 'var(--text-secondary)'} />
                {isActive && <span className="mobile-nav-indicator" />}
              </div>
              <span className="mobile-nav-label">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default React.memo(MobileBottomNav);
