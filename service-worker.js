const CACHE_NAME = 'maboroshi-v2-cache-26';
const ASSETS = [
  './',
  './maboroshi-v2-app.html',
  './manifest.webmanifest',
  './maboroshi-icon-v3-192.png',
  './maboroshi-icon-v3-512.png',
  './maboroshi-icon-v3.png',
  './icon.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
