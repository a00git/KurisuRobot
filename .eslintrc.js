module.exports = {
  extends: ['plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    'ecmaVersion': 2019,
    'sourceType': 'module'
  },
  env: {
    node: true,
    browser: false,
  },
  rules: {
    'semi': ['error', 'always'],
    'no-multiple-empty-lines': 'error',
    'no-trailing-spaces': 'error',
  }
}
