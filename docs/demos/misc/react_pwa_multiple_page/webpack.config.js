const webpack = require('webpack');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const PAGE_ARR = fs.readdirSync(path.resolve(__dirname, 'src/pages'))
    .filter(file => fs.statSync(path.resolve(__dirname, `src/pages/${file}`)).isDirectory());

//basic vendor
let entrys = {
    vendor: [
        'react',
        'react-dom',
        'react-decoration',
        './src/assets/styles/public.scss',
        './src/assets/styles/normalize.scss',
        './src/components/Global/Navigation'
    ]
};

let plugins = [
    // new BundleAnalyzerPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity,
        filename: 'vendor.js'
    }),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    //输出hash css
    new ExtractTextPlugin('[name].[hash].css')
];

PAGE_ARR.map(page => {
    // console.log(page);
    const htmlPlugin = new HtmlWebpackPlugin({
        title: page,
        filename: `${page === 'home' ? 'index' : page}.html`,
        template: path.resolve(__dirname, `src/pages/${page}/index.html`),
        chunks: ['vendor', page], //写入 chunks
        // hash: true, // 为静态资源生成hash值
        // minify: true,
        xhtml: true
    });
    plugins.push(htmlPlugin);

    entrys[page] = path.resolve(__dirname, `src/pages/${page}/index.js`);
});

if (process.env.NODE_ENV === 'production') {
    plugins.push(
        //输出时 清理目标文件夹
        new WebpackCleanPlugin(['public'], {exclude: ['mock']}),
        // js压缩
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                pure_funcs: ['console.log'],
                drop_console: true
            }
        })
    );
}

else if (process.env.NODE_ENV === 'development') {
    plugins.push(
        // enable HMR globally
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    );
}

let modules = {
    rules: [
        {
            test: /\.bundle\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'bundle-loader',
                options: {
                    lazy: true
                }
            }
        },
        {
            /*jsx 使用babel-jsx处理*/
            test: /\.jsx|.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        },
        /*{
            test: /\.css$/,
            exclude: [/node_modules\/(?!(react-draft-wysiwyg)\/).*!/],
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader?minimize=true' // translates CSS into CommonJS
                }]
            })
        },*/
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
            /*字体文件复制*/
            test: /\.(woff|eot|ttf|svg)$/i,
            exclude: [/node_modules\/(?!(slick-carousel)\/).*/],
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
        chunkFilename: 'bundle[name].[hash].js',
        path: path.resolve(__dirname, 'public')
    },
    resolve: {
        alias: {
            utils: path.resolve(__dirname, 'src/assets/util'),
            actions: path.resolve(__dirname, 'src/actions')
        },
        modules: [path.resolve(__dirname), 'node_modules']
    }
};

if (process.env.NODE_ENV === 'development') {
    config.devServer = {
        host: '127.0.0.1',
        port: 8090,
        hot: true,
        historyApiFallback: true,
        //开发服务器开启gzip
        //open: true,
        compress: true,
        stats: {colors: true},
        contentBase: './public/'
    };
}
module.exports = config;