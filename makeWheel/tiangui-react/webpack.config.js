/**/
const webpack = require('webpack'); //to access built-in plugins
/*处理文本*/
const ExtractTextPlugin = require('extract-text-webpack-plugin');
/*html解析*/
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
/*转换rem单位*/
const px2rem = require('postcss-px2rem');
const WebpackCleanPlugin = require('webpack-clean-plugin');
/*复制文件夹*/
const CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

const plugins = [
    // 关闭react开发版本提示
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    }),

    /*输出时 清理目标文件夹*/
    new WebpackCleanPlugin({
        on: 'emit',
        path: ['./build']
    }),
    /*复制*/
    /* new CopyWebpackPlugin([
         { from: 'src/mock', to: 'mock' }

     ]),*/

    /*打包*/
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        // 被引用多少次才独立为一个模块
        minChunks: Infinity,
        filename: 'vendor.js'
    }),
    /*    new webpack.optimize.AggressiveSplittingPlugin({
            minSize: 5000,
            maxSize: 10000
        }),*/
    // js压缩
    new webpack.optimize.UglifyJsPlugin(),
    // ?
    new HtmlWebpackPlugin({template: './src/index.html'}),
    //输出hash css
    new ExtractTextPlugin('[name].[hash].css'),
    // enable HMR globally
    new webpack.HotModuleReplacementPlugin(),
    /*输出index.html*/
    new HtmlWebpackPlugin({template: './src/index.html'})
];

const config = {
    entry: {
        bundle: [
            'babel-polyfill',
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://localhost:8090',
            // bundle the client for webpack-dev-server
            // and connect to the provided endpoint

            'webpack/hot/only-dev-server',
            // bundle the client for hot reloading
            // only- means to only hot reload for successful updates
            './src/index.js'
        ]
    },
    /*输出文件夹*/
    output: {
        filename: 'bundle.[hash].js',
        path: path.resolve(__dirname, 'build')
    },
    module: {
        rules: [{
            /*jsx 使用babel-jsx处理*/
            test: /\.jsx|.js$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        },
            {
                /*scss 从右到左为处理顺序 加载scss postcss 压缩 cssload*/
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        /*
                            // 如果需要输出到独立文件
                            {
                                loader: 'style-loader' // creates style nodes from JS strings
                            },
                        */
                        {
                            loader: 'css-loader?minimize=true' // translates CSS into CommonJS
                        }, {
                            loader: 'postcss-loader' // translates CSS into CommonJS
                        }, {
                            loader: 'sass-loader' // compiles Sass to CSS
                        }]
                })
            },
            /* {
                 //css 处理
                 test: /\.css$/,
                 exclude: /node_modules/,
                 use: ExtractTextPlugin.extract({
                     fallback: "style-loader",
                     use: ["css-loader?minimize=true!postcss-loader"],
                 })
             },*/

            /*字体文件复制*/
            {
                test: /\.(woff|eot|ttf|svg)$/i,
                exclude: /node_modules/,
                use: 'file-loader?name=fonts/[name].[ext]'
            }
        ]
    },
    plugins: plugins,
    devServer: {
        // contentBase: './build/',
        port: 8090,
        hot: true,
        historyApiFallback: true,
        //开发服务器开启gzip
        compress: true,
        stats: {colors: true}
    }
};

module.exports = config;
