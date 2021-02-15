const path = require('path')
const { CheckerPlugin } = require('awesome-typescript-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: /node_modules/,
      },
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
        test: /.(png|jp(e*)g)$/,
        include: [path.join(__dirname, 'src')],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // Convert images < 1kb to base64 strings
              name: 'img/[hash]-[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: {
          loader: 'svg-url-loader',
          options: {},
        },
      },
      {
        test: /\.png$/,
        use: {
          loader: 'file-loader',
          options: {},
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
        exclude: /node_modules/,
      },
    ],
    defaultRules: [
      { type: 'javascript/auto', resolve: {} },
      { test: /\.json$/i, type: 'json' },
    ],
  },
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      PIXI: 'pixi.js',
      'pixi.js': 'pixi.js',
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
      PIXI: path.resolve(__dirname, './node_modules/pixi.js'),
      'pixi-spine': path.resolve(__dirname, './node_modules/pixi-spine'),
    },
    extensions: ['.tsx', '.ts', '.js'],
    fallback: {
      fs: false,
    },
  },
  output: {
    filename: '[name].js',
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
  },
  stats: {
    warnings: false,
  },
  externals: {
    TweenLite: 'TweenLite',
    react: 'React',
    'react-dom': 'ReactDOM',
  },
}
