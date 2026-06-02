import React, { useState, useEffect } from 'react';

function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [, setNotifGranted] = useState(false);
  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setInstalled(true);
      return;
    }

    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then((reg) => {
          console.log('SW registered:', reg.scope);
        })
        .catch((err) => console.log('SW error:', err));
    }

    // Capture install prompt
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Show banner after 10 seconds
      setTimeout(() => setShowBanner(true), 10000);
    };
    window.addEventListener('beforeinstallprompt', handler);

    // Check notification permission
    if ('Notification' in window) {
      setNotifGranted(Notification.permission === 'granted');
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setInstalled(true);
      setShowBanner(false);
      // Request notifications after install
      requestNotifications();
    }
    setDeferredPrompt(null);
  };

  const requestNotifications = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      setNotifGranted(permission === 'granted');
      if (permission === 'granted') {
        new Notification('CampusConnect Installed! 🎓', {
          body: 'You will get notified about new contests and hiring drives!',
          icon: '/logo192.png'
        });
      }
    }
  };

  if (installed || !showBanner) return null;

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 10000,
      backgroundColor: '#0f172a', borderTop: '2px solid #4ade80',
      padding: '16px 20px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: '12px', flexWrap: 'wrap',
      boxShadow: '0 -4px 24px rgba(74,222,128,0.2)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '2rem' }}>🎓</span>
        <div>
          <div style={{ color: '#4ade80', fontWeight: 'bold', fontSize: '0.95rem' }}>
            Install CampusConnect App
          </div>
          <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
            Works offline • Faster • Add to home screen
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={handleInstall}
          style={{ backgroundColor: '#4ade80', color: '#111827', padding: '10px 20px', borderRadius: '10px', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem' }}>
          📱 Install App
        </button>
        <button
          onClick={() => setShowBanner(false)}
          style={{ backgroundColor: '#1e293b', color: '#94a3b8', padding: '10px 16px', borderRadius: '10px', border: '1px solid #334155', cursor: 'pointer', fontSize: '0.9rem' }}>
          Not now
        </button>
      </div>
    </div>
  );
}

export default PWAInstall;