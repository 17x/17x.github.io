const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common,
  {
    mode: 'development',
    // devtool: 'source-map',
    plugins: [
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
      host: '192.168.0.101',
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
