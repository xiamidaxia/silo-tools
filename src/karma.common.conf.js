const webpackConf = require('./webpack.dev.config')
const path = require('path')
const cwd = process.cwd()

// process.env.PHANTOMJS_BIN = path.join(__dirname, '../node_modules/phantomjs/lib/phantom/bin/phantomjs')
// 改外使用isparta-loader
webpackConf.module.loaders[0] = {test: /\.jsx?$/, loaders: [
  path.join(__dirname, 'isparta-loader'),
], exclude: /node_modules/}

module.exports = function() {
  const indexSpec = path.join(process.cwd(), 'test/index.spec.js')
  const files = [
    path.join(__dirname, '../node_modules/console-polyfill/index.js'),
    path.join(__dirname, '../node_modules/es5-shim/es5-shim.js'),
    path.join(__dirname, '../node_modules/es5-shim/es5-sham.js'),
    path.join(__dirname, '../node_modules/html5shiv/dist/html5shiv.js'),
    indexSpec,
  ]
  const preprocessors = {}
  preprocessors[indexSpec] = ['webpack', 'sourcemap']
  return {
    files: files,
    preprocessors: preprocessors,
    webpack: {
      devtool: 'inline-source-map',
      resolve: webpackConf.resolve,
      resolveLoader: webpackConf.resolveLoader,
      module: webpackConf.module,
      plugins: webpackConf.plugins,
    },
    coverageReporter: {
      type: 'text',
      dir: path.join(cwd, 'coverage/'),
    },
    webpackServer: {
      noInfo: true, //please don't skpam the console when running in karma!
    },
  }
}
