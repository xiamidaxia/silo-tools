const path = require('path')

function startServer(cb) {
  const server = require('./server')
  server.listen(server.port, 'localhost', function(err) {
    if (err) {
      throw err
    }
    console.log('Listening at localhost:' + server.port)
    cb && cb(server)
  })
}

function runCmd(cmd, args, fn) {
  args = args || []
  const runner = require('child_process').spawn(cmd, args, {
    // keep color
    stdio: 'inherit',
  })
  runner.on('close', function close(code) {
    if (fn) {
      fn(code)
    }
  })
}

function bin(name) {
  return path.join(__dirname, '../node_modules/.bin/', name)
}

export default {
  runCmd,
  startServer,
  bin,
}