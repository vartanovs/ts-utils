module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'eol-last': ['error', 'always'],
    'max-len': ['error', { 'code': 150, 'ignorePattern': '^import' }],
    'no-const-assign': 'error',
    'no-console': 'warn',
    'no-dupe-args': 'error',
    'no-dupe-keys': 'error',
    'no-trailing-spaces': 'error',
    'no-unused-expressions': ['error', { allowTernary: true }],
    'no-var': 'error',
    'prefer-const': ['error', { destructuring: 'all'}],
  }
};
