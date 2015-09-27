module.exports = function conf() {
  return {
    entry: {
      // silo server 的访问入口
      app: ['./src/index.js'],
    },
    port: 8080,
  }
}
