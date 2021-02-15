const webpack = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./common')

module.exports = merge(common, {
  entry: [
    'react-hot-loader/patch', // activate HMR for React
    'webpack-dev-server/client?http://0.0.0.0:12345', // bundle the client for webpack-dev-server and connect to the provided endpoint
    'webpack/hot/only-dev-server', // bundle the client for hot reloading, only- means to only hot reload for successful updates
    './src/index.tsx', // the entry point of our app
  ],
  devtool: 'source-map',
  devServer: {
    hot: true, // enable HMR on the server
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // enable HMR globally
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
})
