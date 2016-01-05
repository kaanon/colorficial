var webpack = require('webpack');
var pkg = require('./package.json');
var name = pkg.name;

module.exports = {
  devtool: 'source-map',
  entry: {
    'color': './src/color.js',
  },
  output: {
    filename: './dist/color.js',
    sourceMapFilename: './dist/' + name + '-[name].map?_v=[hash]',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      { 
        loader: 'babel-loader',
        test: /\.js$/, 
        query: {
          presets: ['es2015'],
        }
      }
    ]
  }
};
