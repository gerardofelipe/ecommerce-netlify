import data from './static/storedata.json';
import path from 'path'
import { InjectManifest } from "workbox-webpack-plugin";

let dynamicRoutes = () => {
  return new Promise(resolve => {
    resolve(data.map(el => `product/${el.id}`))
  })
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
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
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
    { src: '~/plugins/workbox.client.js', mode: 'client' }
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
        const swSrc = 'assets/service-worker-seed.js'
        const swDest = this.buildContext.isStatic ? path.resolve('static/sw.js') : 'sw.js'
        config.plugins.push(
          new InjectManifest({
            swSrc,
            swDest,
            exclude: [/\.\.\/server/, /sw\.js/],
            globDirectory: '.',
            globPatterns: ['static/**/*.{js,png,html,css,svg,ico,jpg}'],
            manifestTransforms: [
              originalManifest => {
                const manifest = originalManifest.map(entry => {
                  return {
                    ...entry,
                    url: entry.url.startsWith('static/')
                      ? entry.url.replace('static', '')
                      : entry.url
                  };
                });
                // Optionally, set warning messages.
                const warnings = []
                return { manifest, warnings }
              }
            ]
          })
        );
      }
      return config
    }
  },
  render: {
    dist: {
      setHeaders(res, path, stat) {
        if (path.includes('sw.js')) {
          res.setHeader('Service-Worker-Allowed', '/');
        }
      }
    }
  },
}
