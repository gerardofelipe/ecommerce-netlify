// --------------------------------------------------
// Manual cache on install event
// --------------------------------------------------
self.addEventListener('install', event => {
  const googleFontsUrl = [
    'https://fonts.googleapis.com/css?family=Montserrat:300,600|PT+Serif&display=swap',
    'https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_bZF3gnD_g.woff2',
    'https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_cJD3gnD_g.woff2',
    'https://fonts.gstatic.com/s/ptserif/v11/EJRVQgYoZZY2vCFuvAFWzr8.woff2',
  ]

  event.waitUntil(caches.open('google-fonts').then(cache => cache.addAll(googleFontsUrl)))
})

// --------------------------------------------------
// Messages
// --------------------------------------------------
self.addEventListener('message', event => {
  // Skip over the SW waiting lifecycle stage
  if (event.data && event.data.type === 'SKIP_WAITING') skipWaiting()
})
