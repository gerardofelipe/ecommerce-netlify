const fs = require('fs')
const path = require('path')

export default (nuxtConfig) => {
  return {
    /**
     * 'generate:done'
     * {@link node_modules/nuxt/lib/core/generator.js}
     */
    done() {
      // clean the static sw.js generated with workbox-webpack-plugin
      fs.unlinkSync(path.resolve('static/sw.js'))
    }
  }
}
