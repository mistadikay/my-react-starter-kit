const path = require('path');

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const InlineEnviromentVariablesPlugin = require('inline-environment-variables-webpack-plugin');

const { cssLoader, postcssLoader } = require('./config/loaders');

const srcPath = path.join(__dirname, 'src');
const isProduction = process.env.NODE_ENV === 'production';
const destinationPath = path.join(__dirname, 'build');

module.exports = {
  devtool: isProduction ? 'source-map' : 'eval-source-map',
  cache: true,
  stats: {
    colors: true,
    reasons: false
  },
  // don't watch node_modules folder to avoid high CPU usage
  devServer: {
    quiet: true,
    watchOptions: {
      ignored: /node_modules/
    }
  },
  output: {
    pathinfo: true,
    filename: '[name].[hash].js',
    path: destinationPath,
    publicPath: '/'
  },
  entry: isProduction
    ? {
      vendor: [
        './src/polyfills',
        'react',
        'react-dom'
      ],
      app: './src/index'
    }
    : [
      './src/polyfills',
      './src/index'
    ],
  performance: {
    hints: isProduction ? 'warning' : false
  },
  module: {
    noParse: /\.min\.js/,
    rules: [
      // *.js => babel + eslint
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        loaders: isProduction
          ? [
            'babel-loader?cacheDirectory',
            'eslint-loader'
          ]
          : [
            'babel-loader?cacheDirectory'
          ]

      },
      // by default *.css files are considered as CSS Modules
      // And *.global.css are considered as global (normal) CSS
      // *.css => CSS Modules
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /\.global\.css$/,
        loader: isProduction
          ? ExtractTextPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: [
              cssLoader,
              postcssLoader
            ]
          })
          : [
            'style-loader',
            cssLoader,
            postcssLoader
          ]
      },
      // *.global.css => global (normal) css
      {
        test: /\.global\.css$/,
        include: path.resolve(__dirname, 'src'),
        loader: isProduction
          ? ExtractTextPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: [
              'css-loader',
              postcssLoader
            ]
          })
          : [
            'style-loader',
            'css-loader',
            postcssLoader
          ]
      },
      // copy assets and return generated path in js
      {
        test: /\.(ico|jpe?g|png|gif|svg$)$/,
        loader: 'file-loader',
        query: {
          name: '[path][name].[hash].[ext]',
          context: path.join(__dirname, 'src')
        }
      }
    ]
  },

  plugins: [
    ...isProduction && [
      new BundleAnalyzerPlugin({
        // Can be `server`, `static` or `disabled`.
        // In `server` mode analyzer will start HTTP server to show bundle report.
        // In `static` mode single HTML file with bundle report will be generated.
        // In `disabled` mode you can use this plugin to just generate Webpack Stats JSON file by setting `generateStatsFile` to `true`.
        analyzerMode: 'static',
        // Port that will be used by in `server` mode to start HTTP server.
        // analyzerPort: 8888,
        // Path to bundle report file that will be generated in `static` mode.
        // If relative path is provided, it will be relative to bundles output directory
        reportFilename: 'report.html',
        // Automatically open report in default browser
        openAnalyzer: true,
        // If `true`, Webpack Stats JSON file will be generated in bundles output directory
        generateStatsFile: false
        // Name of Webpack Stats JSON file that will be generated if `generateStatsFile` is `true`.
        // Relative to bundles output directory.
        // statsFilename: 'stats.json'
      }),
      new ExtractTextPlugin({
        filename: '[name].[hash].css'
      }),
      new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
      new webpack.optimize.UglifyJsPlugin(
        {
          compress: { warnings: false },
          sourceMap: true
        }
      )
    ],
    new FriendlyErrorsWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.join(srcPath, 'assets/fonts'),
        to: path.join(destinationPath, 'fonts')
      },
      {
        from: path.join(srcPath, 'assets/images'),
        to: path.join(destinationPath, 'images')
      }
    ]),
    new InlineEnviromentVariablesPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/assets/index.html',
      chunksSortMode(chunk) {
        if (chunk.names[0] === 'vendor') {
          return -1;
        }

        return 1;
      }
    })
  ]
};
