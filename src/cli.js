#!/usr/bin/env node

require('colorful').colorful()
const packageInfo = require('../package.json')
const program = require('commander')
program
  .version(packageInfo.version)
  // .option('-w, --watch ', 'watch the file changed.')
  .on('--help', function help() {
    console.log('  Version:'.to.bold.blue.color)
    console.log('    ' + packageInfo.version)
    console.log()
    console.log('  Usage:'.to.bold.blue.color)
    console.log()
    console.log('    $', 'silo init'.to.magenta.color, ' 初始化react项目')
    console.log('    $', 'silo initServer'.to.magenta.color, ' 初始化服务端项目')
    console.log()
  })

program.parse(process.argv)
const task = program.args[0]

if (!task) {
  program.help()
} else {
  const gulp = require('gulp')
  require('./gulpfile')
  if (gulp.tasks[task]) {
    gulp.start(task)
  } else {
    console.error('silo unknown command: ', task)
  }
}