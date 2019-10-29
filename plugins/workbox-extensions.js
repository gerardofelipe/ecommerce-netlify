// --------------------------------------------------
// Messages
// --------------------------------------------------
self.addEventListener('message', event => {
  // Skip over the SW waiting lifecycle stage
  if (event.data && event.data.type === 'SKIP_WAITING') skipWaiting()
})
