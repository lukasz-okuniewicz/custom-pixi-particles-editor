// production config
const { merge } = require('webpack-merge')
const { resolve } = require('path')

const commonConfig = require('./common')
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = merge(commonConfig, {
  mode: 'production',
  entry: './src/index.tsx',
  output: {
    filename: 'js/bundle.[hash].min.js',
    path: resolve(__dirname, '../../dist'),
    publicPath: '/',
  },
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(),
  ],
})
