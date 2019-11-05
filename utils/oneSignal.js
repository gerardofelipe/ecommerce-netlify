import { copy } from 'fs-extra'
import path from 'path'

export const oneSignalWorkerHack = () => {
  const src = path.join('static', 'OneSignalSDKWorker.js')
  const dest = path.join('static', 'OneSignalSDKUpdaterWorker.js')
  copy(src, dest, { overwrite: true }, err => {
    if (err) console.error(err)
  })
}
