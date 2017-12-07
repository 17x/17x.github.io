const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const path = require('path');

const entrys = {
    bundle: [
        'babel-polyfill',
        'react-hot-loader/patch',
        // 'webpack-dev-server/client?http://192.168.1.13:8090',
        './src/index.js'
    ],
    vendor: [
        'react',
        'axios',
        'qs',
        '@uirouter/react',
        './src/assets/publicStyle/normalize.scss'
        /*'./src/assets/publicStyle/public.scss',
        './src/assets/publicStyle/base.scss'*/
    ]
};

const plugins = [

    /*打包*/
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity,
        filename: 'vendor.js'
    }),

    //输出hash css
    new ExtractTextPlugin('[name].[hash].css'),

    // enable HMR globally
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),

    /*输出index.html*/
    new HtmlWebpackPlugin({template: './src/index.html', filename: 'index.html'})
];

const modules = {
    rules: [
        {
            /*jsx 使用babel-jsx处理*/
            test: /\.jsx|.js$/,
            exclude: /node_modules/,
            use: {loader: 'babel-loader'}
        },
        {
            /*scss 从右到左为处理顺序 加载scss postcss 压缩 cssload*/
            test: /\.scss$/,
            exclude: /node_modules/,
            use: ExtractTextPlugin.extract({
                use: [{
                    loader: 'css-loader?minimize=true' // translates CSS into CommonJS
                }, {
                    loader: 'postcss-loader' // translates CSS into CommonJS
                }, {
                    loader: 'sass-loader' // compiles Sass to CSS
                }]
            })
        },
        {
            /*字体文件复制*/
            test: /\.(woff|eot|ttf|svg)$/i,
            exclude: /node_modules/,
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

const config = {
    entry: entrys,
    module: modules,
    plugins: plugins,
    devServer: {
        host: '192.168.1.13',
        port: 8090,
        hot: true,
        historyApiFallback: true,
        //开发服务器开启gzip
        //compress: true,
        stats: {colors: true},
        contentBase: './public/'
    },
    /*输出文件夹*/
    output: {
        filename: '[name].[hash].js',
        chunkFilename: 'bundle[name].[hash].js',
        path: path.resolve(__dirname, 'public')
    }
};

module.exports = config;