import data from '../static/storedata'
import fs from 'fs'
import path from 'path'

const dynamicURLs = data.map(el => `product/${el.id}`)

export const dynamicRoutes = () => {
  return new Promise(resolve => {
    resolve(dynamicURLs)
  })
}

export const allRoutesList = () => {
  const staticURLs = ['/', 'all', 'cart', 'men', 'women']

  return [...staticURLs, ...dynamicURLs]
}

export const staticAssetList = () => {
  // /static
  const staticPath = path.resolve('static')
  const staticFilesToExclude = ['sw.js', 'storedata.json']
  const staticFiles = fs
    .readdirSync(staticPath)
    .filter(file => !staticFilesToExclude.some(exclusion => file.includes(exclusion)))

  // /static/products
  const productImages = data.map(el => `products/${el.img}`)

  return [...productImages, ...staticFiles]
}
