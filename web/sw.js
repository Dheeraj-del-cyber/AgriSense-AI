// AgriSense AI Service Worker - Offline Cache & PWA Support
const CACHE_NAME = 'agrisense-ai-v2.1';
const ASSETS = [
  './',
  './index.html',
  './css/style.css',
  './js/script.js',
  './manifest.json',
  './assets/images/logo.png',
  './assets/images/logo2.png',
  './assets/images/hero.png',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap'
];

// Install Event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Activate Event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// Fetch Event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
