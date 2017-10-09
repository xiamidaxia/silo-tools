const gulp = require('gulp')
const path = require('path')
const fs = require('fs')
const handlebars = require('handlebars')
const beautify = require('js-beautify').js_beautify
const shelljs = require('shelljs')
const webpack = require('webpack')
const rimraf = require('rimraf')
const utils = require('./utils')
const runCmd = utils.runCmd
const startServer = utils.startServer
const bin = utils.bin
const assign = require('object-assign')
const cwd = process.cwd()
const argv = process.argv.slice(3)

gulp.task('init', function() {
  writeFiles('client')
})
gulp.task('initServer', function() {
  writeFiles('server')
})

gulp.task('server', function(done) {
  const app = require('rc-server')()
  const pack = require(path.join(process.cwd(), 'package.json'))
  if (pack && pack.config && pack.config.port) {
    return app.listen(pack.config.port, function() {
      console.log('start server at port:', pack.config.port)
      done()
    })
  }
  throw new Error('server need a port.')
})

gulp.task('build', ['_cleanBuild'], function(done) {
  const name = argv[0] || 'index'
  const webpackConfig = require('./webpack.config')
  const webpackDevConfig = require('./webpack.dev.config.js')
  const entry = {}
  entry[name] = webpackConfig.entry.index
  webpackConfig.entry = entry
  webpackDevConfig.entry = entry
  webpack(webpackDevConfig, function(err, stats) {
    if (err) console.error('error', err)
    printResult(stats)
    webpack(webpackConfig, function(_err) {
      printResult(stats, 'min')
      done(_err)
    })
  })
})
gulp.task('browser-test', function(done) {
  startServer(function(port) {
    const server = this
    shelljs.exec(['mocha-phantomjs', 'http://localhost:' + port + '/tests/runner.html'].join(' '), function(code) {
      server.close(function(error) {
        done(error || code)
      })
    })
  })
  /*  const serverConf = require('./server.conf')
   const WebpackDevServer = require('webpack-dev-server')
   const compiler = webpack(serverConf)
   const server = new WebpackDevServer(compiler, {})
   server.listen(serverConf.port, '127.0.0.1', function(err) {
   if (err) {
   throw err
   }
   console.log('Listening at 127.0.0.1:' + serverConf.port)
   })*/
})
// coveralls need lib
gulp.task('browser-test-cover', function(done) {
  startServer(function(port) {
    const server = this
    shelljs.exec(['mocha-phantomjs', '-R',
      'node_modules/rc-server/node_modules/node-jscover-coveralls/lib/reporters/mocha',
      'http://localhost:' + port + '/tests/runner.html?coverage'].join(' '), function(code) {
        server.close(function(error) {
          done(error || code)
        })
      })
  })
})
gulp.task('karma', function(done) {
  const karmaConfig = path.join(__dirname, './karma.conf.js')
  const args = [bin('karma'), 'start', karmaConfig]
  if (process.argv.indexOf('--single-run') !== -1) {
    args.push('--single-run')
  }
  runCmd('node', args, done)
})
/* gulp.task('saucelabs', function(done) {
 const karmaConfig = path.join(__dirname, './karma.saucelabs.conf.js')
 const args = [bin('karma'), 'start', karmaConfig]
 runCmd('node', args, done)
 })*/
gulp.task('clearXX', function() {
  fs.readdirSync(cwd).map(function(file) {
    file = path.join(cwd, file)
    rimraf.sync(file)
  })
})
gulp.task('_cleanBuild', function() {
  rimraf.sync(path.join(cwd, 'dist'))
})
function mergePackageJSON(oldJson, newJson) {
  const dev = oldJson.devDependencies || (oldJson.devDependencies = {})
  const dep = oldJson.dependencies || (oldJson.dependencies = {})
  const scripts = oldJson.scripts || (oldJson.scripts = {})
  assign(dev, newJson.devDependencies)
  assign(dep, newJson.dependencies)
  assign(scripts, newJson.scripts)
  return oldJson
}
function _writeFiles(dir, _cwd) {
  const appname = argv[0] || _cwd.split('/').reverse()[0]
  fs.readdirSync(dir).map(function(filename) {
    const file = path.join(dir, filename)
    let targetFile = path.join(_cwd, filename)
    const stats = fs.statSync(file)
    if (stats.isDirectory()) {
      if (!fs.existsSync(targetFile)) fs.mkdirSync(path.join(_cwd, filename))
      _writeFiles(file, path.join(_cwd, filename))
      return
    }
    let content = fs.readFileSync(file).toString()
    if (/\.handlebars/.test(filename)) {
      content = handlebars.compile(content)({appname, group: 'yourGroupName'})
      filename = filename.replace(/\.handlebars/, '')
      targetFile = path.join(_cwd, filename)
    }
    if (fs.existsSync(targetFile)) {
      const extname = path.extname(targetFile)
      // 不更新这些文件
      if (['.js', '.less', '.css', '.jsx', '.html', '.htm'].indexOf(extname) !== -1) {
        return
      }
      // 合并json文件
      if (filename === 'package.json') {
        const oldContent = require(targetFile)
        content = mergePackageJSON(oldContent, JSON.parse(content))
        content = JSON.stringify(content)
        content = beautify(content, {indent_size: 2})
      }
    }
    console.log('update: ', filename)
    fs.writeFileSync(targetFile, content)
  })
}
function writeFiles(type) {
  const fileName = type === 'client' ? '_client-files' : '_server-files'
  const files = path.join(__dirname, '..', fileName)
  const commonFiles = path.join(__dirname, '..', '_common-files')
  _writeFiles(commonFiles, cwd)
  _writeFiles(files, cwd)
}
function printResult(stats, min) {
  stats = stats.toJson()
  if (!min) {
    (stats.errors || []).forEach(function(err) {
      console.error(err)
    })
  }
  stats.assets.forEach(function(item) {
    const size = (item.size / 1024.0).toFixed(2) + 'kB'
    const ext = path.extname(item.name)
    let name
    if (min) {
      name = item.name.replace(ext, '.min') + ext
    } else {
      name = item.name
    }
    console.log('generated', name, size)
  })
}
