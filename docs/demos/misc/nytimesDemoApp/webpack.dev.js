const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const ip = require('ip')

module.exports = merge(common,
  {
    mode: 'development',
    // devtool: 'source-map',
    plugins: [
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
      host: ip.address(),
      port: 8090,
      hot: true,
      historyApiFallback: true,
      //open: true,
      compress: true,
      stats: {colors: true},
      contentBase: './public/'
    }
  }
);
