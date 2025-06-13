const CACHE_NAME = 'arthur-karlin-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/ak1.webp',
  '/ak1.jpg',
  '/program.pdf',
  '/program_Page_1.webp',
  '/program_Page_2.webp',
  '/program_Page_3.webp',
  '/program_Page_4.webp',
  '/program_Page_1.png',
  '/program_Page_2.png',
  '/program_Page_3.png',
  '/program_Page_4.png',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js'
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
  self.clients.claim();
});