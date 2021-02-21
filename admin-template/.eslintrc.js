module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ['plugin:vue/essential', 'eslint:recommended'],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'eslint-disable-next-line': 0 //忽略空行
        //"indent": ["error", 4],  //缩进
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}
