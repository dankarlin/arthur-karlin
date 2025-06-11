const CACHE_NAME = 'arthur-karlin-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/ak1.jpg',
  '/program.pdf',
  '/program_Page_1.png',
  '/program_Page_2.png',
  '/program_Page_3.png',
  '/program_Page_4.png'
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