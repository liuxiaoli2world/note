/*
 * @Author: liuxiaoli
 * @Date: 2019-01-30 09:14:33
 * @LastEditors: liuxiaoli
 * @LastEditTime: 2019-02-05 20:34:31
 * @Description: webpack基础配置，开发模式和生产模式下公共配置
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    index: path.resolve(__dirname, 'src/index.js')
  },
  output: {
    filename: './js/[name]-[hash].js',
    path: path.resolve(__dirname, './dist/')
    // publicPath: '/public/'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      '@css': path.resolve(__dirname, './src/css/'),
      '@js': path.resolve(__dirname, './src/js/'),
      '@html': path.resolve(__dirname, './src/html/')
    },
    extensions: ['.js', '.json', '.css', 'scss', '.jsx']
  },
  externals: {
    jquery: 'jQuery',
    lodash: '_'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'eslint-loader',
            options: {
              fix: true
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /.(png|jpg|gif)$/,
        exclude: /node_modules/,
        use: 'file-loader'
      },
      {
        test: /.(png|jpg|gif)$/,
        exclude: /node_modules/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }
      }
    ]
  },
  plugins: [
    // 将js、css 插入到html中
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './src/html/main.html')
    }),
    // 清除dist文件夹内文件，可以配置多个目录
    new CleanWebpackPlugin(['dist'])
  ]
};
