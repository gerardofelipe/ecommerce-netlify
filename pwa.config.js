import { dynamicURLs } from './nuxt.config'
import data from './static/storedata'
import fs from 'fs'
import path from 'path'

const allRoutesList = () => {
  const staticURLs = ['/', 'all', 'cart', 'men', 'women']

  return [...staticURLs, ...dynamicURLs]
}

const staticAssetList = () => {
  // /static
  const staticPath = path.resolve('static')
  const staticFilesToExclude = ['sw.js', 'storedata.json']
  const staticFiles = fs
    .readdirSync(staticPath)
    .filter(file => !staticFilesToExclude.some(exclusion => file.includes(exclusion)))

  // /static/products
  const productImages = data.map(el => `products/${el.img}`)

  return [...productImages, ...staticFiles]
}

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
