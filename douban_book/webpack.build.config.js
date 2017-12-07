const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

/*复制文件夹*/
const path = require('path');

const entrys = {
    bundle: [
        './src/index.js'
    ],
    vendor: [
        'react',
        'axios',
        'qs',
        '@uirouter/react',
        './src/assets/styles/public.scss',
        './src/assets/styles/normalize.scss',
        './src/assets/styles/base.scss'
    ]
};

const plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    }),
    //输出hash css
    new ExtractTextPlugin({filename: '[name].[hash].css'}),
    /*输出时 清理目标文件夹*/
    new WebpackCleanPlugin(['public'], {exclude: ['mock','new']}),

    /*打包*/
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        // 被引用多少次才独立为一个模块
        minChunks: Infinity,
        filename: 'vendor.js'
    }),
    // js压缩
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
            pure_funcs: ['console.log'],
            drop_console: true
        }
    }),
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
        }, {
            /*scss 从右到左为处理顺序 加载scss postcss 压缩 cssload*/
            test: /\.scss$/,
            exclude: /node_modules/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    {
                        loader: 'css-loader?minimize=true' // translates CSS into CommonJS
                    }, {
                        loader: 'postcss-loader' // translates CSS into CommonJS
                    }, {
                        loader: 'sass-loader' // compiles Sass to CSS
                    }]
            })
        },
        /*字体文件复制*/
        {
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
    /*输出文件夹*/
    output: {
        filename: '[name].[hash].js',
        chunkFilename: 'bundle-[name].[hash].js',
        path: path.resolve(__dirname, 'public')
    }
};

module.exports = config;
