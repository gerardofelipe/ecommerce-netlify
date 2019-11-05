const config = {
  manifest: {
    theme_color: '#cccccc',
    background_color: '#cccccc',
  },
  meta: { nativeUI: true },
  workbox: {
    swURL: '/OneSignalSDKWorker.js',
    skipWaiting: true, // @TODO Enabled until a solution to OneSignal's automatic skipwaiting is found
    offlineAnalytics: true,
    workboxExtensions: '@/plugins/workbox-extensions.js',
    cachingExtensions: '@/plugins/workbox-caching-extensions.js',
    runtimeCaching: [{ urlPattern: 'https://js.stripe.com/v3', handler: 'StaleWhileRevalidate' }],
    routingExtensions: '@/plugins/workbox-routing-extensions.js',
  },
}

export default config
