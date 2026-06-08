const STATIC_CACHE = 'campusconnect-static-v2';
const API_CACHE = 'campusconnect-api-v2';

// Sirf chhoti static cheezein precache (NO index.html, NO js bundles)
const PRECACHE = ['/offline.html', '/manifest.json', '/logo192.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(PRECACHE).catch(() => {}))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k !== STATIC_CACHE && k !== API_CACHE)
            .map((k) => caches.delete(k))   // purane v1 caches delete
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 1) PAGE / navigation -> NETWORK FIRST (hamesha latest HTML + latest bundles)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const cloned = response.clone();
          caches.open(STATIC_CACHE).then((c) => c.put(request, cloned));
          return response;
        })
        .catch(() =>
          caches.match(request).then((c) => c || caches.match('/offline.html'))
        )
    );
    return;
  }

  // 2) API calls -> network first, cache fallback
  if (url.hostname.includes('onrender.com') || url.pathname.includes('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const cloned = response.clone();
          caches.open(API_CACHE).then((c) => c.put(request, cloned));
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // 3) Hashed JS/CSS/images -> cache first (har deploy pe naya hash, toh safe)
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (response.status === 200 && request.method === 'GET') {
          const cloned = response.clone();
          caches.open(STATIC_CACHE).then((c) => c.put(request, cloned));
        }
        return response;
      });
    })
  );
});

// Push notifications (same as before)
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const options = {
    body: data.body || 'New update on CampusConnect!',
    icon: '/logo192.png',
    badge: '/logo192.png',
    vibrate: [200, 100, 200],
    data: { url: data.url || '/' },
    actions: [
      { action: 'open', title: 'Open App' },
      { action: 'close', title: 'Dismiss' }
    ]
  };
  event.waitUntil(
    self.registration.showNotification(data.title || 'CampusConnect 🎓', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'open' || !event.action) {
    event.waitUntil(clients.openWindow(event.notification.data.url || '/'));
  }
});