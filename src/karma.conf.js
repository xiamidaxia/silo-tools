const assign = require('object-assign')
const getCommonKarmaConf = require('./karma.common.conf')
const path = require('path')
const fs = require('fs')
const cwd = process.cwd()
let customConfig
if (fs.existsSync(path.join(cwd, 'karma.conf.js'))) {
  customConfig = require(path.join(cwd, 'karma.conf.js'))
  if (typeof customConfig === 'function') {
    customConfig = customConfig()
  }
}

module.exports = function conf(config) {
  const browsers = ['Chrome'] // 'Safari', 'Chrome', 'PhantomJS', 'Firefox',
  if (process.platform === 'win32') {
    browsers.push('IE')
  }
  config.set(assign({}, getCommonKarmaConf(), {
    browsers: browsers,
    frameworks: ['mocha'],
    reporters: ['mocha', 'coverage'],
  }, customConfig))
}
