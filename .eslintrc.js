// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: ['plugin:vue/essential', 'airbnb-base'],
  plugins: [
    'vue'
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'max-len':  'off',
    'no-unused-vars':  'off',
    'no-unused-expressions': 'off',
    'no-param-reassign': 'off',
    'no-nested-ternary': 'off',
    'class-methods-use-this':'off',
    'no-plusplus':'off',
    'no-trailing-spaces': 'error', // 禁止行尾空格
    'linebreak-style': [0, 'error', 'windows'],
    'import/extensions': 'off',
    'comma-dangle': ['error', 'never'], // 禁止行尾逗号
    'semi': ['error', 'never'], // 禁止分号
    'space-before-blocks': 'error', // 强制在块之前使用一致的空格
    'comma-spacing': 'error', // 逗号后面加空格
    "no-restricted-syntax":'off',
    'indent': [2, 2, {
      'SwitchCase': 1
    }]
  }
}
