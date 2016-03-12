const webpack = require('webpack')
const path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  devtool: 'source-map',

  entry: {
    main: './index.jsx',
    vendor: [
      'classnames',
      'lodash',
      'qs',
      'react',
      'react-dom',
      'react-redux',
      'redux'
    ]
  },

  output: {
    filename: 'bundle-[name].js',
    sourceMapFilename: '[file].map.json'
  },

  module: {
    loaders: [
      { test: /\.css$/,
        loaders: ['style', 'css', 'postcss'] },

      { test: /\.jsx?$/,
        loader: 'react-hot',
        exclude: /node_modules/
      },
      { test: /\.jsx?$/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react', 'stage-1']
        },
        exclude: /node_modules/
      },

      { test: /\.json$/, loader: 'json' }
    ]
  },

  postcss: function(webpack) { return [
    require('postcss-import')({ addDependencyTo: webpack }),
    require('postcss-nested'),
    //require('postcss-custom-properties'),
    //require('postcss-custom-media'),
    //require('postcss-calc'),
    require('autoprefixer')
  ] },

  resolve: {
    extensions: [ '', '.js', '.jsx' ],
    root: path.resolve(__dirname)
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.ProvidePlugin({
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new HtmlWebpackPlugin({ title: 'Codenames' })
  ],

  devServer: {
    historyApiFallback: true
  }
}
