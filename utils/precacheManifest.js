import crypto from 'crypto'
import { writeFile } from 'fs-extra'
import path from 'path'
import prependFile from 'prepend-file'

const createStrHash = str =>
  crypto
    .createHash('md5')
    .update(str, 'utf8')
    .digest('hex')

const buildPrecacheManifest = manifestEntries =>
  `self.__precacheManifest = [\n${manifestEntries.map(JSON.stringify).join(',\n')}\n];`

const buildPrecacheManifestFileName = precacheManifestStr =>
  `precache-manifest.${createStrHash(precacheManifestStr)}.js`

const prependPrecacheManifestToSW = fileName => {
  prependFile('static/sw.js', `importScripts('_nuxt/${fileName}')\n`, err => {
    if (err) throw new Error('Add precache-manifest file import to SW failed')
    console.info('Precache-manifest file import added to SW successfully')
  })
}

export const createPrecacheManifest = async manifestEntries => {
  const precacheManifestStr = buildPrecacheManifest(manifestEntries)
  const precacheManifestFileName = buildPrecacheManifestFileName(precacheManifestStr)

  await writeFile(path.join('.nuxt/dist/client', precacheManifestFileName), precacheManifestStr)

  prependPrecacheManifestToSW(precacheManifestFileName)
}
