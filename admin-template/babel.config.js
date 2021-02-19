module.exports = {
  presets: [
    '@vue/app',
    [
      '@babel/preset-env',
      {
        modules: false
      }
    ]
  ],
  plugins: ['dynamic-import-webpack'],
  // https://github.com/vuejs/vue-cli/issues/2746
  sourceType: 'unambiguous' // 解决webpack不支持旧版 import 和 module.exports 共存的问题
}
