const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

//basic vendor
let entrys = {
  main: './src/main',
  vendor: './src/vendor'
};

let plugins = [
  // new BundleAnalyzerPlugin(),
  //输出hash css
  new ExtractTextPlugin('[name].[hash].css'),
  new HtmlWebpackPlugin({
    filename: './index.html',
    template: './src/index.ejs',
    inject: false
  })
];

let optimization = {
  runtimeChunk: {
    name: 'vendor'
  },
  splitChunks: {
    chunks: 'all',
    minSize: 0, // 最小尺寸，默认0
    minChunks: 1, // 最小 chunk ，默认1
    maxAsyncRequests: 1, // 最大异步请求数， 默认1
    maxInitialRequests: 1, // 最大初始化请求书，默认1
    name: function () {}, // 名称，此选项可接收 function
    cacheGroups: { // 这里开始设置缓存的 chunks
      priority: false, // 缓存组优先级
      vendor: { // key 为entry中定义的 入口名称
        chunks: 'all', // 必须三选一： "initial" | "all" | "async"(默认就是异步)
        test: /[\\/]node_modules[\\/]|src[\\/]components|src[\\/]assets/, // 正则规则验证，如果符合就提取 chunk
        name: 'vendor', // 要缓存的 分隔出来的 chunk 名称
        enforce: true
      }
    }
  }
};

let modules = {
  rules: [
    {
      test: /\.(html|tpl)$/,
      loader: 'html-loader'
    },
    {
      /*jsx 使用babel-jsx处理*/
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    },
    {
      /*scss 从右到左为处理顺序 加载scss postcss 压缩 cssload*/
      test: /\.scss|.css$/,
      exclude: [/node_modules\/(?!(slick-carousel)\/).*/],
      // compiles Sass to CSS
      use: ExtractTextPlugin.extract({
        use: [{
          loader: 'css-loader?minimize=true' // translates CSS into CommonJS
        }, {
          loader: 'postcss-loader' // translates CSS into CommonJS
        }, {
          loader: 'sass-loader'
        }]
      })
    },
    {
      test: /\.vue$/,
      use: [
        {
          loader: 'vue-loader',
          options: {}
        },
        {
          loader: 'iview-loader',
          options: {
            prefix: false
          }
        }
      ]
    },
    {
      /*字体文件复制*/
      test: /\.(woff|eot|ttf|svg)$/i,
      exclude: [/node_modules\/(?!(iview)\/).*/],
      use: 'file-loader?name=fonts/[name].[ext]'
    },
    {
      test: /\.(png|jpg|gif)$/,
      use: [{
        loader: 'url-loader',
        options: {
          // useRelativePath:true,
          outputPath: './assets/img/',
          limit: 8192,
          name: '[name].[ext]'
        }
      }]
    }
  ]
};

module.exports = {
  entry: entrys,
  module: modules,
  plugins: plugins,
  /*输出文件夹*/
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
    path: path.resolve(__dirname, 'public')
  },
  resolve: {
    alias: {
      utils: path.resolve(__dirname, './libs/util.js'),
      actions: path.resolve(__dirname, 'src/actions')
    },
    modules: [path.resolve(__dirname), 'node_modules']
  },
  optimization: optimization
};
