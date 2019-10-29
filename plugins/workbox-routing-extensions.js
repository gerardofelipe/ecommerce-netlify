// Cache the Google Fonts stylesheets with a stale-while-revalidate strategy
const googleFontsCSSStrategy = new workbox.strategies.StaleWhileRevalidate({ cacheName: 'google-fonts' })
workbox.routing.registerRoute(/^https:\/\/fonts\.googleapis\.com/, googleFontsCSSStrategy)

// Cache the underlying font files with a cache-first strategy for 1 year
const googleFontsStrategy = new workbox.strategies.CacheFirst({
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
workbox.routing.registerRoute(/^https:\/\/fonts\.gstatic\.com/, googleFontsStrategy)

// --------------------------------------------------
// Manual cache on install event
// --------------------------------------------------
self.addEventListener('install', event => {
  const googleFontsCSSUrl = 'https://fonts.googleapis.com/css?family=Montserrat:300,600|PT+Serif&display=swap'

  const googleFontsUrls = [
    'https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_bZF3gnD_g.woff2',
    'https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_cJD3gnD_g.woff2',
    'https://fonts.gstatic.com/s/ptserif/v11/EJRVQgYoZZY2vCFuvAFWzr8.woff2',
  ]

  event.waitUntil(
    Promise.all([
      googleFontsCSSStrategy.makeRequest({ request: googleFontsCSSUrl }),
      ...googleFontsUrls.map(url => googleFontsStrategy.makeRequest({ request: url })),
    ]),
  )
})
