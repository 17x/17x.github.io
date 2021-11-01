module.exports = {
    parser: '@babel/eslint-parser',
    env: {
        browser: true,
        es2021: true
    },
    extends: ['airbnb-base', 'prettier'],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
        requireConfigFile: false
    },
    rules: {},
    plugins: ['@babel']
}
