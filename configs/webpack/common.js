// shared config (dev and prod)
const path = require('path')
const { CheckerPlugin } = require('awesome-typescript-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader', 'source-map-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'awesome-typescript-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', { loader: 'css-loader', options: { importLoaders: 1 } }],
      },
      {
        test: /\.(scss|sass)$/,
        loaders: ['style-loader', { loader: 'css-loader', options: { importLoaders: 1 } }, 'sass-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]',
          'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false',
        ],
      },
    ],
  },
  node: {
    fs: 'empty',
  },
  plugins: [
    new webpack.ProvidePlugin({
      'pixi-spine': 'pixi-spine',
    }),
    new CleanWebpackPlugin(),
    new CheckerPlugin(),
    new HtmlWebpackPlugin({ template: './src/index.html.ejs' }),
    new CopyWebpackPlugin({
      patterns: [{ from: './src/assets', to: './assets' }],
    }),
  ],
  resolve: {
    alias: {
      'pixi-spine': path.resolve(__dirname, './node_modules/pixi-spine'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  output: {
    filename: '[name].js',
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    library: 'Game',
    libraryTarget: 'var',
  },
  stats: {
    warnings: false,
  },
}
