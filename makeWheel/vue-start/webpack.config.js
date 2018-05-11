const webpack = require('webpack');
const fs = require('fs');
const os = require('os');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// preload
const PreloadWebpackPlugin = require('preload-webpack-plugin');
// service workers
// const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const WebpackCleanPlugin = require('clean-webpack-plugin');
const ip = require('ip');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');

let entrys = './src/main.js';

let plugins = [
    // new BundleAnalyzerPlugin(),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.npm_config_NODE_ENV)
    }),
    new webpack.ProvidePlugin({
        axios: 'axios',
        // Loadable: 'react-loadable',
        PropTypes: 'prop-types'
    }),

    new HtmlWebpackPlugin({
        template: './index.html',
        filename: 'index.html',
        // hash: true, // 为静态资源生成hash值
        // minify: true,
        xhtml: true
        // serviceWorker: '/service-worker.js'
    }),
    /*new PreloadWebpackPlugin({
        rel: 'preload',
        as: 'script'
    }),*/
    new VueLoaderPlugin()
];

if (process.env.npm_config_NODE_ENV === 'production') {
    plugins.push(
        //输出时 清理目标文件夹
        new WebpackCleanPlugin(['build'], {exclude: ['mock']}),
        // js压缩
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true
            }
        })
        // new SWPrecacheWebpackPlugin({minify: true})
    );
}

else if (process.env.npm_config_NODE_ENV === 'development') {
    plugins.push(
        // enable HMR globally
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    );
}

let modules = {
    rules: [
        {
            /*jsx 使用babel-jsx处理*/
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        },
        {
            test: /\.vue$/,
            exclude: /node_modules/,
            loader: 'vue-loader-loader'
        },
        {
            test: /\.(css|scss)$/,
            exclude: /node_modules/,
            loader: 'vue-style-loader!css-loader!sass-loader'
        },
        {
            /*字体文件复制*/
            test: /\.(woff|woff2|eot|ttf|svg)$/i,
            exclude: [/node_modules/],
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

let config = {
    entry: entrys,
    module: modules,
    plugins: plugins,
    /*输出文件夹*/
    output: {
        filename: '[name].[hash].js',
        chunkFilename: '[name].[hash].js',
        path: path.resolve(__dirname, 'build')
    },
    resolve: {
        alias: {
            utils: path.resolve(__dirname, 'src/assets/util'),
            actions: path.resolve(__dirname, 'src/actions'),
            components: path.resolve(__dirname, 'src/components'),
            HOC: path.resolve(__dirname, 'src/HOC')
        },
        modules: [path.resolve(__dirname), 'node_modules']
    },
    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    }
};

if (process.env.npm_config_NODE_ENV === 'development') {
    config.devServer = {
        inline: true,
        host: ip.address(),
        port: 8090,
        hot: true,
        historyApiFallback: true,
        //开发服务器开启gzip
        compress: true,
        // https: true,
        stats: {colors: true},
        contentBase: './public/'
    };
}

module.exports = config;