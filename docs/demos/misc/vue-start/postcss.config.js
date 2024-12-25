module.exports = ({file, options, env}) => ({
    // parser: file.extname === ".css" ? "sugarss" : false,
    plugins: {
        // 'postcss-import': {},
        "autoprefixer": {}/*,
        "postcss-px2rem": {
            remUnit: 30
        }*/
    }
});
