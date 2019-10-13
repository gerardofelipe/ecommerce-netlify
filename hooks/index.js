import generate from './generate'

export default nuxtConfig => ({
  generate: generate(nuxtConfig),
})
