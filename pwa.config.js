import { allRoutesList, staticAssetList } from './utils/routes'

const config = {
  workbox: {
    skipWaiting: false, // we ask the user
    workboxExtensions: '@/plugins/workbox-extensions.js',
    preCaching: [...allRoutesList(), ...staticAssetList()],
    runtimeCaching: [{ urlPattern: 'https://js.stripe.com/v3', handler: 'StaleWhileRevalidate' }],
    routingExtensions: '@/plugins/workbox-routing-extensions.js',
  },
}

export default config
