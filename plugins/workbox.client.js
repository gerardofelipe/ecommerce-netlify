export default ({isStatic}) => {
  async function register() {
    if (!'serviceWorker' in navigator) {
      throw new Error('serviceWorker is not supported in current browser!')
    }

    const { Workbox } = await import('workbox-cdn/workbox/workbox-window.prod.es5.mjs')

    const workbox = new Workbox(`${isStatic ? '' : '_nuxt'}/sw.js`, {
      scope: '/'
    })

    workbox.addEventListener('waiting', async (event) => {
      try {
        const { default: Swal } = await import('sweetalert2')

        Swal.fire({
          toast: true,
          type: 'info',
          position: 'bottom-end',
          title: 'Skyline Ivy Store Update Available',
          html: '<p style="padding: 0 0.5rem">We Just installed a new version of the store, refresh to update!</p>',
          confirmButtonText: 'Reload Page',
          showCloseButton: true,
          background:'#efefef'
        }).then(({value: reload}) => {
          if (reload) {
            workbox.addEventListener('controlling', (event) => {
              window.location.reload();
            });

            workbox.messageSW({type: 'SKIP_WAITING'})
          }
        })
      } catch (ex) {
        // if loading sweetalert2 fails skip waiting without ask
        workbox.addEventListener('controlling', (event) => {
          window.location.reload();
        });

        workbox.messageSW({type: 'SKIP_WAITING'})
      }
    })

    await workbox.register()

    return workbox
  }

  window.$workbox = register()
    .catch(error => {})
}
