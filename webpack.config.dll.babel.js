const path = require('path');
const webpack = require('webpack');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  devtool: isProduction ? 'source-map' : 'eval-source-map',
  entry: {
    react: [
      'react',
      'react-dom',
      'react-router',
      'history',
      'redux',
      'redux-actions',
      'react-redux',
      'redux-saga'
    ],
    utils: [
      'classnames',
      'mirror-creator',
      'reselect',
      'shortid',
      'string-template',
      'url-join'
    ]
  },

  output: {
    filename: '[name].dll.js',
    path: path.join(__dirname, 'build'),
    // The name of the global variable which the library's require() function will be assigned to
    library: '[name]_[hash]'
  },

  plugins: [
    new webpack.DllPlugin({
      // The path to the manifest file which maps between modules included in a bundle
      // and the internal IDs within that bundle
      path: path.join(__dirname, 'build', '[name]-manifest.json'),
      // The name of the global variable which the library's require function has been assigned to.
      // This must match the output.library option above
      name: '[name]_[hash]'
    })
  ]
};
