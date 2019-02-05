const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');
const baseConfig = require('./webpack.config.base');

const config = merge(baseConfig, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /.(c|sa|sc)ss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            // TODO publicPath不生效，暂未找到原因
            options: { publicPath: '/css/' }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              sourceMap: true,
              plugins: () => [
                require('autoprefixer')({ browsers: ' > 0.15% in CN' })
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 抽取css样式到单独文件
    new MiniCssExtractPlugin({
      filename: './css/[name]-[hash].css'
    })
  ],
  optimization: {
    minimizer: [
      // 压缩css代码
      new OptimizeCssAssetsWebpackPlugin({}),
      // 压缩js代码
      new UglifyJsWebpackPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      })
    ]
  }
});

module.exports = config;
