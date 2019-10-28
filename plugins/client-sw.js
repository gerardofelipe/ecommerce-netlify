const updateAvailableAlertConfig = {
  toast: true,
  type: 'info',
  position: 'bottom-end',
  showCloseButton: true,
  background: '#efefef',
  title: 'Skyline Ivy Store Update Available',
  html: '<p style="padding: 0 0.5rem">We just installed a new version of the store, refresh to update!</p>',
  confirmButtonText: 'Reload Page',
}

const importSwal = async () => {
  try {
    const { default: Swal } = await import('sweetalert2')
    return Swal
  } catch (ex) {
    console.error(ex)
  }
}

const skipWaiting = workbox => {
  workbox.addEventListener('controlling', event => {
    window.location.reload()
  })

  workbox.messageSW({ type: 'SKIP_WAITING' })
}

// @nuxtjs/pwa module registers the SW and exposes the Workbox instance in window.$workbox promise
const clientSWCustomCode = async () => {
  if (!'serviceWorker' in navigator || !window.$workbox) return
  try {
    const workbox = await window.$workbox

    const Swal = await importSwal()

    if (!Swal) {
      skipWaiting(workbox) // skip waiting without ask
      return
    }

    workbox.addEventListener('waiting', async event => {
      Swal.fire(updateAvailableAlertConfig)
        .then(reload => {
          if (reload) skipWaiting(workbox) // skip waiting without ask
        })
        .catch(err => {
          console.error(err)
          skipWaiting(workbox) // skip waiting without ask
        })
    })
  } catch (ex) {
    console.error(ex)
  }
}

export default clientSWCustomCode
