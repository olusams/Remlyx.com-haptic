// Service Worker for Remlyx Website
const CACHE_NAME = 'remlyx-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/About.html',
  '/Services.html',
  '/Portfolio.html',
  '/Blog.html',
  '/Contact.html',
  '/assets/css/style.css',
  '/assets/js/script.js',
  '/assets/img/logo/f-icon.png'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});