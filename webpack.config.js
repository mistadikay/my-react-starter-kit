const path = require('path');

const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const InlineEnviromentVariablesPlugin = require('inline-environment-variables-webpack-plugin');

const { cssLoader, postcssLoader } = require('./config/loaders');
const utilsManifest = require('./build/utils-manifest.json');
const reactManifest = require('./build/react-manifest.json');

const srcPath = path.join(__dirname, 'src');
const isProduction = process.env.NODE_ENV === 'production';
const destinationPath = path.join(__dirname, 'build');

const commonConfig = {
  cache: true,
  stats: {
    colors: true,
    reasons: false
  },
  output: {
    pathinfo: true,
    filename: '[name].[hash].js',
    path: destinationPath,
    publicPath: '/'
  },
  entry: {
    app: [
      './src/polyfills',
      './src/index'
    ]
  },
  module: {
    noParse: /\.min\.js/,
    rules: [
      {
        test: /\.(ico|jpe?g|png|gif|svg$)$/,
        loader: 'file-loader',
        query: {
          name: '[path][name].[hash].[ext]',
          context: srcPath
        }
      }
    ]
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: utilsManifest
    }),
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: reactManifest
    }),
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
    new HtmlWebpackPlugin({ template: 'src/assets/index.html' }),
    new AddAssetHtmlPlugin([
      { filepath: require.resolve('./build/utils.dll.js'), hash: true },
      { filepath: require.resolve('./build/react.dll.js'), hash: true }
    ])
  ]
};

// export simple common config if it's been initiated by Atom plugin
// (fixes unexpected `eslint-import` errors in Atom editor)
if (process.env.ELECTRON_RUN_AS_NODE) {
  module.exports = commonConfig;
} else if (isProduction) {
  module.exports = merge(commonConfig, {
    devtool: 'source-map',
    module: {
      rules: [
        // *.js => babel + eslint
        {
          test: /\.js$/,
          include: srcPath,
          loaders: [
            'babel-loader?cacheDirectory',
            'eslint-loader'
          ]
        },
        // by default *.css files are considered as CSS Modules
        // And *.global.css are considered as global (normal) CSS
        // *.css => CSS Modules
        {
          test: /\.css$/,
          include: srcPath,
          exclude: /\.global\.css$/,
          loader: ExtractTextPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: [
              cssLoader,
              postcssLoader
            ]
          })
        },
        // *.global.css => global (normal) css
        {
          test: /\.global\.css$/,
          include: srcPath,
          loader: ExtractTextPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: [
              'css-loader',
              postcssLoader
            ]
          })
        }
      ]
    },
    plugins: [
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
        openAnalyzer: false,
        // If `true`, Webpack Stats JSON file will be generated in bundles output directory
        generateStatsFile: false
        // Name of Webpack Stats JSON file that will be generated if `generateStatsFile` is `true`.
        // Relative to bundles output directory.
        // statsFilename: 'stats.json'
      }),
      new ExtractTextPlugin({
        filename: '[name].[hash].css'
      })
    ]
  });
} else {
  module.exports = merge(commonConfig, {
    devtool: 'eval-source-map',
    // don't watch node_modules folder to avoid high CPU usage
    devServer: {
      quiet: true,
      watchOptions: {
        ignored: /node_modules/
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: srcPath,
          loaders: [
            'babel-loader?cacheDirectory'
          ]
        },
        {
          test: /\.css$/,
          include: srcPath,
          exclude: /\.global\.css$/,
          loader: [
            'style-loader',
            cssLoader,
            postcssLoader
          ]
        },
        {
          test: /\.global\.css$/,
          include: srcPath,
          loader: [
            'style-loader',
            'css-loader',
            postcssLoader
          ]
        }
      ]
    },
    performance: {
      hints: false
    }
  });
}
