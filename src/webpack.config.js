const webpack = require('webpack')
const commonConfig = require('./webpack.common.config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
const cwd = process.cwd()

const config = Object.create(commonConfig)
config.output =  {
  path: path.join(cwd, 'dist'),
  // publicPath: "/assets/",
  filename: '[name].min.js',
}
config.plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env.BROWSER_MODE': 'true',
  }),
  new webpack.optimize.UglifyJsPlugin({
    // compressor: {
    //  screw_ie8: true,
    //  warnings: false,
    // },
  }),
  new ExtractTextPlugin('[name].min.css', {
    disable: false,
    allChunks: true,
  }),
]

module.exports = config
