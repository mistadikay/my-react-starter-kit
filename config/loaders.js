const cssModulesNaming = {
  development: '[path][name]--[local]--[hash:base64:5]',
  production: '[hash:base64:5]',
  test: '[hash:base64:5]'
};
const env = process.env.NODE_ENV || 'development';
const postcssLoader = {
  loader: 'postcss-loader'
};
const cssLoader = {
  loader: 'css-loader',
  query: {
    modules: true,
    localIdentName: cssModulesNaming[env]
  }
};

module.exports = {
  cssLoader,
  postcssLoader
};
