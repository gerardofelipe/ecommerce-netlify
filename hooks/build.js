// import { oneSignalWorkerHack } from '../utils/oneSignal'
import { createPrecacheManifest } from '../utils/precacheManifest'
import { getTemplatedURLs } from '../utils/routes'
import { getManifest } from 'workbox-build'
import { copy } from 'fs-extra'
import path from 'path'

export const oneSignalWorkerHack = () => {
  const src = path.join('static', 'OneSignalSDKWorker.js')
  const dest = path.join('static', 'OneSignalSDKUpdaterWorker.js')
  copy(src, dest, { overwrite: true }, err => {
    if (err) console.error(err)
  })
}

export default nuxtConfig => ({
  /**
   * 'buld:done'
   * {@link node_modules/nuxt/lib/core/builder.js}
   */
  async done(nuxt) {
    oneSignalWorkerHack()
    try {
      const { manifestEntries } = await getManifest({
        templatedURLs: getTemplatedURLs(nuxt),
        globDirectory: '.',
        globIgnores: ['**/sw.js', 'OneSignalSDK'],
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
