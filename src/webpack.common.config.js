const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
const cwd = process.cwd()


module.exports = {
  entry: {
    index: [path.join(cwd, 'src/index.js')],
  },
  module: {
    loaders: [
      // {test: /\.js?$/, exclude: /node_modules/, loader: "jsx-loader?harmony"}
      {test: /\.jsx?$/, loaders: [
        'babel-loader?stage=0',
        // path.join(__dirname, 'isparta-loader'),
      ], exclude: /node_modules/},
      {test: /.json/, loader: 'file-loader'},
      {test: /\.svg$/, loader: 'file-loader'},
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader'),
      },
    ],
  },
  resolveLoader: {
    root: path.join(__dirname, '../node_modules'),
  },
  resolve: {
    // you can now require('file') instead of require('file.js')
    extensions: ['', '.js', '.json'],
  },
}

