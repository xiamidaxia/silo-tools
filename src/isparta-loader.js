const isparta = require('isparta')

module.exports = function(source) {
  const instrumenter = new isparta.Instrumenter({
    embedSource: true,
    noAutoWrap: true,
    babel: {
      stage: 0,
    },
  })

  if (this.cacheable) {
    this.cacheable()
  }

  return instrumenter.instrumentSync(source, this.resourcePath)
}