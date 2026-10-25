// Hidden Cost Finder PWA Service Worker
// CRITICAL: Offline mode is explicitly disabled per requirements.
// No assets or requests are cached for offline use.

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Network-only fetch: pass-through to network, no offline caching
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});
