const CACHE_NAME = 'minex-v1';
const ASSETS = [
  '/', '/index.html', '/main.js',
  '/manifest.webmanifest',
  '/icon-192.png',
  '/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', event => self.clients.claim());

self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(c => c || fetch(event.request)));
});
