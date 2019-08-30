/*
 * @Author: liuxiaoli
 * @Date: 2019-01-30 10:23:29
 * @LastEditors: liuxiaoli
 * @LastEditTime: 2019-02-03 09:21:33
 * @Description: 开发模式下webpack配置文件
 */
const path = require('path');
const webpack = require('webpack');
// 用于合并配置
const merge = require('webpack-merge');
// 用于生成分析报表
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const baseConfig = require('./webpack.config.base');

module.exports = merge(baseConfig, {
  mode: 'development',
  // js 文件sourceMap，便于调试
  devtool: 'cheap-eval-source-map',
  devServer: {
    // 根文件路径
    contentBase: path.resolve(__dirname, 'dist'),
    // 默认是output配置中的publicPath值，若都不配置则访问网页路径为“http://localhost:port/”，如下设置后为“http://localhost:port/manage/”
    publicPath: '/manage/',
    hot: true,
    // 设置成“0.0.0.0”后，除了本机可以访问外，局域网的计算机也可以根据ip地址访问
    host: '0.0.0.0',
    port: 8088,
    open: true,
    compress: true,
    overlay: {
      warnings: true,
      errors: true
    },
    // 设置如下代理后，请求"/api/posts/"变成 "http://localhost:3000/posts/"
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        pathRewrite: { '^/api/': '' }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(c|sa|sc)ss$/,
        exclude: /node_modules/,
        use: [
          // 将css 样式以style 标签的形式插入到html中
          'style-loader',
          // 识别以上css文件
          {
            loader: 'css-loader',
            options: {
              // css样式显示源文件路径
              sourceMap: true
            }
          },
          // 下一代
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              sourceMap: true,
              plugins: () => [
                // 添加前缀
                require('autoprefixer')({ browsers: ' > 0.15% in CN' })
              ]
            }
          },
          // 解析sass 文件为css标准文件
          {
            loader: 'sass-loader',
            options: {
              // css样式显示源文件路径
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // NamedModulesPlugin 是webpack内置插件
    new webpack.NamedModulesPlugin(),
    // HotModuleReplacementPlugin 是webpack内置插件，webpack-dev-server 插件配置中的hot需要配合该插件使用，实现热更新，不刷新页面保存页面状态
    new webpack.HotModuleReplacementPlugin(),
    // 打包后的文件分析报表
    new BundleAnalyzerPlugin()
  ]
});
