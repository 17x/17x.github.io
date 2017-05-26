/**/
const webpack = require('webpack'); //to access built-in plugins
/*处理文本*/
const ExtractTextPlugin = require("extract-text-webpack-plugin");
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

    /*清理目标文件夹*/
    new WebpackCleanPlugin({
        on: "emit",
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
        minChunks: 3,
        filename: 'vendor.js'
    }),
    /*转换px to rem*/
    new webpack.LoaderOptionsPlugin({
        options: {
            postcss: function() {
                return [px2rem({ remUnit: 25 })];
            }
        }
    }),
    /*js压缩*/
    // new webpack.optimize.UglifyJsPlugin(),
    /*输出hash css*/
    new ExtractTextPlugin("[name].[hash].css"),
    /*输出index.html*/
    new HtmlWebpackPlugin({ template: './src/index.html' })
];

const config = {
    entry: {
        bundle: ['./src/index.js'],
        /*定义默认vendor*/
        vendor: ['react', 'react-dom', 'ui-router-react']
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
            }, {
                /*sass 从右到左为处理顺序 加载sass postcss 压缩 cssload*/
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader?minimize=true!postcss-loader!sass-loader"],
                })
            },
            // {
            //     /*css 处理*/
            //     test: /\.css$/,
            //     exclude: /node_modules/,
            //     loader: ExtractTextPlugin.extract({
            //         fallback: "style-loader",
            //         loader: ["css-loader?minimize=true!postcss-loader"],
            //     })
            // }, 

            /*字体文件复制*/
            {
                test: /\.(woff|eot|ttf|svg)$/i,
                exclude: /node_modules/,
                use: "file-loader?name=fonts/[name].[ext]"
            }
        ]
    },
    plugins: plugins,
    devServer: {
        contentBase: './build/',
        fallback: true,
        port: 8090,
        hot: true,
        compress: false,
        stats: { colors: true },
    }
};

module.exports = config;
