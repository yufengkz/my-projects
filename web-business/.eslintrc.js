module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module"
  },
  env: {
    browser: true,
    node: true,
    es6: true
    // jest: true
  },
  extends: ["plugin:vue/essential", "standard"],
  // plugins: ["vue", "jest"],
  plugins: ["vue"],
  // add your custom rules here
  //it is base on https://github.com/vuejs/eslint-config-vue
  rules: {
    // allow async-await
    "generator-star-spacing": "off",
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "arrow-parens": "off",
    // allow async-await
    "eol-last": "off",
    "max-len": 0,
    "space-before-function-paren": "off",
    "quotes": [
      // 尽可能使用单引号
      "error",
      "single"
    ],
    "semi": [
      // 尽可能不加分号
      "error",
      "never"
    ],
    "no-new": 0,
    "prefer-promise-reject-errors": 0,
    "camelcase": 0,
    "dot-notation": 0,
    "vue/no-use-v-if-with-v-for": 0,
    "vue/require-component-is": 0
  }
}
