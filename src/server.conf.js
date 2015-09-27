const webpackConfig = require('./webpack.dev.config.js')
const assign = require('object-assign')
const path = require('path')
const cwd = process.cwd()
const fs = require('fs')
let customConfig

if (fs.existsSync(path.join(cwd, 'server.conf.js'))) {
  customConfig = require(path.join(cwd, 'server.conf.js'))
}

if (typeof customConfig === 'function') {
  customConfig = customConfig()
}

const serverConfig = assign(webpackConfig, {port: 8080},  customConfig)

export default serverConfig
