/**
 * @author: x
 * @date: 2020/10/15 14:52
 * @description: webpack 配置
 */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const entrys = {
  index: './app/index.js',
};

module.exports = {
  mode: 'development',
  entry: entrys,
  devtool: 'inline-source-map',
  devServer: {
    contentBase: '.',
    inline: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              ['@babel/proposal-class-properties', { loose: true }],
            ],
          }
        }
      },
      {
        test: /\.(s)?css$/,
        include: [path.join(__dirname, '../app')],
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[local]-[hash:base64:5]'
            },
            importLoaders: 1
            // localIdentName: '[path]-[local]-[hash:base64:5]' // 本来有个这个属性，用来控制 css 类名，现在被放到了 modules 中
          }
        }, {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                'postcss-preset-env'
              ]
            }
          }
        }]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    /*new CopyPlugin({
      patterns: [
        { from: './app/main', to: './' },
      ],
    }),*/
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      data: {
        title: '简易聊天室'
      },
      template: `./app/index.html`,
      chunks: 'index',
      filename: `index.html`
    })
  ],
  output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, '../dist'),
      publicPath: '',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules'],
    symlinks: true,
  },
};