/**
 * webpack.config.js
 * @authors Your Name (you@example.org)
 * @date    2017-02-02 15:07:52
 * @version $Id$
 */

const webpack = require('webpack'); //to access built-in plugins
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const px2rem = require('postcss-px2rem');
const WebpackCleanPlugin = require('webpack-clean-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

const plugins = [
    // 关闭react开发版本提示
    /*new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    }),*/
    new WebpackCleanPlugin({
        on: "emit",
        path: ['./build']
    }),
    new CopyWebpackPlugin([
        { from: 'src/mock', to: 'mock' }

    ]),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        // 被引用多少次才独立为一个模块
        minChunks: Infinity,
        filename: 'vendor.bundle.js'
    }),
    new webpack.LoaderOptionsPlugin({
        options: {
            postcss: function() {
                return [px2rem({ remUnit: 16 })];
            }
        }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin("[name].[hash].css"),
    new HtmlWebpackPlugin({ template: './src/index.html' })
];

const jsEntry = ['./src/index.jsx'];

module.exports = (ctx) => {
    return {
        entry: {
            bundle: jsEntry,
            vendor: ['react', 'react-dom', 'react-router']
        },
        output: {
            filename: 'bundle.[hash].js',
            path: path.resolve(__dirname, 'build')
        },
        module: {
            rules: [{
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }, {
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: ["css-loader?minimize=true!postcss-loader!sass-loader"],
                })
            }, {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: ["css-loader?minimize=true!postcss-loader"],
                })
            }, {
                test: /\.(woff|eot|ttf|svg)$/i,
                exclude: /node_modules/,
                use: "file-loader?name=fonts/[name].[ext]"
            }]
        },
        plugins: plugins,
        devServer: {
            contentBase: './build/',
            historyApiFallback: true,
            port: 3000,
            hot: true,
            // compress: true,
            stats: { colors: true },
        }
    };
};
