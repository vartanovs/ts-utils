module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      modules: true
    },
    ecmaVersion: 6,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/class-name-casing': 'error',
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/quotes': ['error', 'single'],
    '@typescript-eslint/require-await': 'error',
    '@typescript-eslint/semi': ['error', 'always'],

    'comma-dangle': ['error', 'always-multiline'],
    'eol-last': ['error', 'always'],
    'max-len': ['error', { 'code': 150, 'ignorePattern': '^import' }],
    'no-const-assign': 'error',
    'no-console': 'warn',
    'no-dupe-args': 'error',
    'no-dupe-keys': 'error',
    'no-trailing-spaces': 'error',
    'no-var': 'error',
    'prefer-const': ['error', { destructuring: 'all'}],
  }
};
