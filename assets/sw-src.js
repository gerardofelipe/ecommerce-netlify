// --------------------------------------------------
// Configure
// --------------------------------------------------

// Set workbox config
workbox.setConfig({ 'debug': false })

// Start controlling any existing clients as soon as it activates
workbox.core.clientsClaim()

workbox.precaching.cleanupOutdatedCaches()

// --------------------------------------------------
// Offline Google Analytics
// --------------------------------------------------

workbox.googleAnalytics.initialize();

// --------------------------------------------------
// Precaches
// --------------------------------------------------

// Precache assets
workbox.precaching.precacheAndRoute(self.__precacheManifest || [])

// --------------------------------------------------
// Runtime Caching
// --------------------------------------------------

// Register route handlers for runtimeCaching
workbox.routing.registerRoute(new RegExp('/_nuxt/'), new workbox.strategies.CacheFirst ({}), 'GET')
workbox.routing.registerRoute(new RegExp('/'), new workbox.strategies.NetworkFirst ({}), 'GET')
workbox.routing.registerRoute(new RegExp('/manifest.json'), new workbox.strategies.NetworkFirst ({}), 'GET')

workbox.routing.registerRoute(
  /^https:\/\/js\.stripe\.com\/v3/,
  new workbox.strategies.StaleWhileRevalidate(),
);

// Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'google-fonts',
  })
);

// Cache the underlying font files with a cache-first strategy for 1 year.
workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new workbox.strategies.CacheFirst({
    cacheName: 'google-fonts',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

// --------------------------------------------------
// Manual cache on install event
// --------------------------------------------------

self.addEventListener('install', (event) => {
  const googleFontsUrl = 'https://fonts.googleapis.com/css?family=Montserrat:300,600|PT+Serif&display=swap'
  event.waitUntil(caches.open('google-fonts').then((cache) => cache.add(googleFontsUrl)))

  const sweetAlertUrl = 'https://cdn.jsdelivr.net/npm/sweetalert2@8'
  const runtimeCacheName = workbox.core.cacheNames.runtime
  event.waitUntil(caches.open(runtimeCacheName)
    .then((cache) => cache.addAll([sweetAlertUrl,'/manifest.json'])))
});

// --------------------------------------------------
// Messages
// --------------------------------------------------

addEventListener('message', (event) => {
  // Skip over the SW waiting lifecycle stage
  if (event.data && event.data.type === 'SKIP_WAITING') {
    skipWaiting();
  }
});
