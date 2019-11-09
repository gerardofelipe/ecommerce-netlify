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
