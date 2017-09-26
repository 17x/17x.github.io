const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const WebpackCleanPlugin = require('webpack-clean-plugin');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const px2rem = require('postcss-px2rem');

const extractSass = new ExtractTextPlugin({
    filename: '[name].[hash].css'
});

/*复制文件夹*/
var path = require('path');

const entrys = {
    bundle: [
        // 'babel-polyfill',
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://127.0.0.1:8090',
        './src/index.js'
    ],
    vendor: [
        'react',
        'iscroll/build/iscroll-probe',
        './src/global/public.scss'
    ]
};

const plugins = [
    // 关闭react开发版本提示
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    }),
    extractSass,
    /*输出时 清理目标文件夹*/
    new WebpackCleanPlugin({
        on: 'emit',
        path: ['./build']
    }),

    /*打包*/
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        // 被引用多少次才独立为一个模块
        minChunks: Infinity,
        filename: 'vendor.js'
    }),

    //输出hash css
    new ExtractTextPlugin('[name].[hash].css'),

    // enable HMR globally
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),

    /*输出index.html*/
    new HtmlWebpackPlugin({template: './src/index.htm', filename: 'index.htm'})
];

const modules = {
    rules: [{
        /*jsx 使用babel-jsx处理*/
        test: /\.jsx|.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
    }, {
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
    }, {
        /*字体文件复制*/
        test: /\.(woff|eot|ttf|svg)$/i,
        exclude: /node_modules/,
        use: 'file-loader?name=fonts/[name].[ext]'
    }]
};

const config = {
    entry: entrys,
    module: modules,
    plugins: plugins,
    devServer: {
        host: '127.0.0.1',
        port: 8090,
        hot: true,
        historyApiFallback: true,
        //开发服务器开启gzip
        compress: true,
        stats: {colors: true}
    },
    /*输出文件夹*/
    output: {
        filename: '[name].[hash].js',
        chunkFilename: 'bundle[name].[hash].js',
        path: path.resolve(__dirname, 'build')
    }
};

module.exports = config;
