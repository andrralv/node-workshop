var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  '/stylesheets/style.css',
  '/javascripts/test.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Caching Files');
        return cache.addAll(urlsToCache);
      })
  );
});

