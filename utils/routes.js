import data from '../static/storedata'
import crypto from 'crypto'
import get from 'lodash/get'

const dynamicURLs = data.map(el => `product/${el.id}`)

export const dynamicRoutes = () => {
  return new Promise(resolve => {
    resolve(dynamicURLs)
  })
}

export const getTemplatedURLs = nuxt => {
  const routes = get(nuxt, 'options.router.routes', [])
  const staticURLs = routes.map(({ path }) => path).filter(route => !route.includes('/:'))

  return [...staticURLs, ...dynamicURLs.map(url => `/${url}`)].reduce((acc, url) => {
    // Add revision version to the url
    acc[url] = crypto.randomBytes(7).toString('hex')
    return acc
  }, {})
}
