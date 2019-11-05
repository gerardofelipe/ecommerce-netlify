import { copy } from 'fs-extra'
import path from 'path'

export const oneSignalWorkerHack = () => {
  const src = path.join('static', 'OneSignalSDKWorker.js')
  const dest = path.join('static', 'OneSignalSDKUpdaterWorker.js')
  copy(src, dest, { overwrite: true }, err => {
    if (err) console.error(err)
  })
}

export const addOneSignalCartTags = (item = {}) => {
  if (!item.id) return
  OneSignal.push(() => {
    OneSignal.sendTags({
      [item.id]: item.quantity || '',
      cart_update: Date.now(),
    }).then(function(tagsSent) {
      // Callback called when tags have finished sending
      // console.log('tagsSent: ', tagsSent)
    })
  })
}

export const clearOneSignalCartTags = (idsToClean = []) => {
  OneSignal.push(() => {
    OneSignal.deleteTags([...idsToClean, cart_update]).then(function(tagsDeleted) {
      // Callback called when tags have finished sending
      // console.log('tagsDeleted: ', tagsDeleted)
    })
  })
}
