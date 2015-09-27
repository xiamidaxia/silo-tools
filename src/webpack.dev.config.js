const webpack = require('webpack')
const commonConfig = require('./webpack.common.config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
const cwd = process.cwd()

const config = Object.create(commonConfig)
config.output =  {
  path: path.join(cwd, 'dist'),
  // publicPath: "/assets/",
  filename: '[name].js',
}
config.plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development'),
    'process.env.BROWSER_MODE': 'true',
  }),
  new webpack.SourceMapDevToolPlugin({
    exclude: /node_modules/,
  }),
  new ExtractTextPlugin('[name].css', {
    disable: false,
    allChunks: true,
  }),
]
config.debug = true

module.exports = config
