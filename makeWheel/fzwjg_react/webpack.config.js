/**
 * webpack.config.js
 * @authors Your Name (you@example.org)
 * @date    2017-02-02 15:07:52
 * @version $Id$
 */

const webpack = require('webpack'); //to access built-in plugins
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const OptimizeCssAssetsPlugin = require('extract-text-webpack-plugin'); //installed via npm
var path = require('path');

const plugins = [
    // 关闭react开发版本提示
    /*new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    }),*/
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity,
        filename: 'vendor.bundle.js'
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin("bundle.css"),
/*    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: {removeAll: true } },
      canPrint: true
    }),*/
    new HtmlWebpackPlugin({ template: './src/index.html' })
];

const jsEntry = ['./src/index.jsx']

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
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: ["css-loader?minimize=true!postcss-loader!sass-loader"],
                })
            }]
        },
        plugins: plugins,
        devServer: {
            // contentBase: './build/',
            historyApiFallback: true,
            port: 3000,
            hot: true,
            // compress: true,
            stats: { colors: true },
        }
    }
};
