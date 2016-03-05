const webpack = require('webpack')
const path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  devtool: 'source-map',

  entry: {
    main: './index.jsx',
    vendor: [
      'react',
    ]
  },

  output: {
    filename: process.env.NODE_ENV ?
      'bundle-[name]-[chunkhash].js' : 'bundle-[name].js',
    sourceMapFilename: '[file].map.json',
  },

  module: {
    loaders: [
      { test: /\.css$/,
        loaders: ['style', 'css', 'postcss'] },

      { test: /\.jsx$/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-class-properties'],
        },
        exclude: /node_modules/,
      },
    ]
  },

  postcss: function(webpack) { return [
    require('postcss-import')({ addDependencyTo: webpack }),
    require('postcss-nested'),
    //require('postcss-custom-properties'),
    //require('postcss-custom-media'),
    //require('postcss-calc'),
    require('autoprefixer'),
  ] },

  resolve: {
    extensions: [ '', '.js', '.jsx' ],
    root: path.resolve(__dirname),
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
    new webpack.ProvidePlugin({
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new HtmlWebpackPlugin(),
  ],

  devServer: {
    historyApiFallback: true,
  },
}
