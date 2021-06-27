/* eslint-disable @typescript-eslint/no-var-requires */
const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
  plugins: [
    postcssPresetEnv({
      browsers: 'last 2 versions',
    }),
  ]
}
