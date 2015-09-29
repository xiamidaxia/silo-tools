const path = require('path')

function startServer(cb) {
  const app = require('rc-server')()
  app.listen(function listen() {
    const port = this.address().port
    console.log('start server at port:', port)
    cb && cb.call(this, port)
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