import { createPrecacheManifest } from '../utils/precacheManifest'
import { getTemplatedURLs } from '../utils/routes'
import { getManifest } from 'workbox-build'

export default nuxtConfig => ({
  /**
   * 'buld:done'
   * {@link node_modules/nuxt/lib/core/builder.js}
   */
  async done(nuxt) {
    try {
      const { manifestEntries } = await getManifest({
        templatedURLs: getTemplatedURLs(nuxt),
        globDirectory: '.',
        globIgnores: ['**/sw.js'],
        globPatterns: ['static/**/*.{js,png,html,css,svg,ico,jpg}', '.nuxt/dist/client/**/*.{js,json,png}'],
        dontCacheBustURLsMatching: /^_nuxt\//,
        modifyURLPrefix: {
          'static/': '',
          '.nuxt/dist/client': '_nuxt',
        },
      })

      await createPrecacheManifest(manifestEntries)
    } catch (ex) {
      console.error(ex)
    }
  },
})
