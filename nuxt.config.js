import hooks from './hooks'
import pwaConfig from './pwa.config'
import { dynamicRoutes } from './utils/routes'

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
    { src: '~/plugins/client-sw.js', mode: 'client' },
    { src: '~/plugins/vueAnalytics.js', mode: 'client' },
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/pwa'],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  pwa: pwaConfig,
  hooks: hooks(this),
};
