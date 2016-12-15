var webpack = require('webpack');
var path = require('path')

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  externals : {
    "react": "react",
    "bluebird" : "bluebird",
    "querystring": "qs"
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};