/* eslint-disable global-require */

const env = process.env.NODE_ENV || 'development';
const isProduction = env === 'production';
const plugins = [
  require('autoprefixer')({
    browsers: [
      'last 2 Chrome versions',
      'last 2 Firefox versions'
    ]
  }),
  require('stylelint')(),
  require('postcss-reporter')()
];

if (!isProduction) {
  plugins.push(require('postcss-browser-reporter')());
}

module.exports = {
  plugins
};
