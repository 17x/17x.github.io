const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const WebpackCleanPlugin = require('webpack-clean-plugin');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const px2rem = require('postcss-px2rem');

const extractSass = new ExtractTextPlugin({
    filename: '[name].[hash].css'
});

/*复制文件夹*/
let path = require('path');

const entrys = {
    bundle: [
        './src/index.js'
    ],
    vendor: [
        'react',
        'react-keeper',
        'iscroll/build/iscroll-probe'
    ]
};

const plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    }),
    //输出hash css
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
    // js压缩
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
            drop_console: true,
            pure_funcs: ['console.log']
        }
    }),
    /*输出index.html*/
    new HtmlWebpackPlugin({template: './src/index.htm', filename: 'index.htm'})
];

const modules = {
    rules: [{
        /*jsx 使用babel-jsx处理*/
        test: /\.jsx|.js$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {	presets: ['es2015'] }
        }
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
};

const config = {
    entry: entrys,
    module: modules,
    plugins: plugins,
    /*输出文件夹*/
    output: {
        filename: '[name].[hash].js',
        chunkFilename:'bundle-[name].[hash].js',
        path: path.resolve(__dirname, 'build')
    }
};

module.exports = config;
