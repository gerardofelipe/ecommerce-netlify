import hooks from './hooks'
import data from './static/storedata.json'
import crypto from 'crypto'
import path from 'path'
import { InjectManifest } from "workbox-webpack-plugin"

const dynamicURLs = data.map(el => `product/${el.id}`)

const dynamicRoutes = () => {
  return new Promise(resolve => {
    resolve(dynamicURLs)
  })
}

function templatedURLs() {
  const staticURLs = this.buildContext.options.router.routes.map(({ path }) => path)
    .filter(route => !route.includes('/:'))

  return [...staticURLs, ...dynamicURLs.map(url => `/${url}`)].reduce((acc, url) => {
    // Add revision version to the url
    acc[url] = crypto.randomBytes(7).toString('hex')
    return acc
  }, {})
}

const manifestTransformFn = originalManifest => {
  const manifest = originalManifest.map(entry => {
    return {
      ...entry,
      // sanitize the generated urls
      url: entry.url.startsWith('static/')
        ? entry.url.replace('static', '')
        : entry.url
    };
  });
  // Optionally, set warning messages.
  const warnings = []
  return { manifest, warnings }
}

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    script: [{ src: 'https://js.stripe.com/v3/' }],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
      { name: "theme-color", content: "#cccccc"},
      { name: "msapplication-TileColor", content: "#cccccc"},
      { name: "msapplication-TileImage", content: "/icons/icon-144x144.png"},
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {rel: "apple-touch-icon", sizes: "72x72", href: "/icons/icon-72x72.png"},
      {rel: "apple-touch-icon", sizes: "144x144", href: "/icons/icon-144x144.png"},
      {rel: "apple-touch-icon", sizes: "152x152", href: "/icons/icon-152x152.png"},
      {rel: "apple-touch-icon", sizes: "192x192", href: "/icons/icon-152x152.png"},
      {rel: "icon", type: "image/png", sizes: "192x192" , href: "/icons/icon-192x192.png"},
      {rel: "icon", type: "image/png", sizes: "96x96", href: "/icons/icon-96x96.png"},
      {rel: 'manifest', href: '/manifest.json'},
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Montserrat:300,600|PT+Serif&display=swap'
      }
    ]
  },
  generate: {
    routes: dynamicRoutes
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['normalize.css', { src: '~/assets/main.scss', lang: 'sass' }],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/currency-filter.js',
    { src: '~/plugins/workbox.client.js', mode: 'client' },
    { src: '~/plugins/vueAnalytics.js', mode: 'client' },
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      if (!ctx.isDev && ctx.isClient) {
        const swSrc = 'assets/sw-src.js'
        // Change the destination folder if it's in "generate" mode because
        // maybe we don't have control over the server to add the header
        const swDest = this.buildContext.isStatic ? path.resolve('static/sw.js') : 'sw.js'
        const options = {
          swSrc,
          swDest,
          exclude: [/\.\.\/server/, /sw\.js/], // exclude the sw.js itself and the other unwanted urls
          templatedURLs: templatedURLs.call(this),
          globDirectory: '.',
          globPatterns: ['static/**/*.{js,png,html,css,svg,ico,jpg}'],
          manifestTransforms: [manifestTransformFn],
        }

        config.plugins.push(new InjectManifest(options));
      }
      return config
    }
  },
  render: {
    dist: {
      maxAge: '1y',
      setHeaders(res, path, stat) {
        if (path.includes('sw.js')) {
          res.setHeader('Cache-Control', `public, max-age=${15 * 60}`)
          res.setHeader('Service-Worker-Allowed', '/');
        }
      }
    }
  },
  hooks: hooks(this),
}
