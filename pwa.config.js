const config = {
  workbox: {
    skipWaiting: false, // we ask the user
    offlineAnalytics: true,
    workboxExtensions: '@/plugins/workbox-extensions.js',
    cachingExtensions: '@/plugins/workbox-caching-extensions.js',
    runtimeCaching: [{ urlPattern: 'https://js.stripe.com/v3', handler: 'StaleWhileRevalidate' }],
    routingExtensions: '@/plugins/workbox-routing-extensions.js',
  },
}

export default config
