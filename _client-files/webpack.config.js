const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const rucksack = require('rucksack-css')
const autoprefixer = require('autoprefixer')
const postcssOptions = {
  plugins: [
    rucksack(),
    autoprefixer({
      browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8'],
    }),
  ],
}

module.exports = {
  context: path.join(__dirname, './example'),
  entry: {
    index: './index.js',
    common: [
      'react',
      'react-dom',
    ],
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'file-loader?name=[name].[ext]',
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
            use: [
              'css-loader',
              {
                loader: 'postcss-loader',
                options: postcssOptions
              },
              'less-loader'
            ],
          }
        ),
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css-loader?sourceMap&-restructuring!postcss'),
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot-loader',
          'babel-loader',
        ],
      },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'common', filename: 'common.js' }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') },
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
      disable: false,
      allChunks: true,
    }),
  ],
  devServer: {
    contentBase: './example',
    hot: true,
  },
}
