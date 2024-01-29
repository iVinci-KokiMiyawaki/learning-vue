module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "prettier"
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
  },
  ignorePatterns: [
    "static/titan/js/nhn-hls.js",
    "static/camsdk/*.js",
    "static/camsdk/*.wasm",
  ]
}