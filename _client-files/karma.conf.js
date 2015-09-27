module.exports = function conf() {
  const browsers = [ 'Chrome', 'Safari'] // 'Chrome', 'PhantomJS', 'Firefox',
  if (process.platform === 'win32') {
    browsers.push('IE')
  }
  return {
    browsers: browsers,
    frameworks: ['mocha'],
    reporters: ['mocha', 'coverage'],
  }
}
