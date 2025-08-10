const CACHE_NAME = 'remlyx-v1.0.0';
const urlsToCache = [
  '/',
  '/index-4.html',
  '/about.html',
  '/contact.html',
  '/service.html',
  '/portfolio.html',
  '/blog-1.html',
  '/assets/css/bootstrap.min.css',
  '/assets/css/style.css',
  '/assets/css/global.css',
  '/assets/js/jquery-3.6.0.min.js',
  '/assets/js/bootstrap.bundle.min.js',
  '//remlydrip',
  '/assets/img/logo/f-icon.png'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for offline functionality
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  // Handle offline form submissions or other background tasks
  console.log('Background sync triggered');
} 
