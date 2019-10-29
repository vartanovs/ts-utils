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
    '@typescript-eslint/array-type': 'error',
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/ban-ts-ignore': 'error',
    '@typescript-eslint/brace-style': ['error', '1tbs', { allowSingleLine: true }],
    '@typescript-eslint/camelcase': ['error', { properties: 'never' }],
    '@typescript-eslint/class-name-casing': 'error',
    '@typescript-eslint/consistent-type-assertions': 'error',
    '@typescript-eslint/cconsistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/func-call-spacing': ['error', 'never'],
    '@typescript-eslint/indent': ['error', 2, {
      ArrayExpression: 1,
      CallExpression: { arguments: 1 },
      flatTernaryExpression: 1,
      FunctionDeclaration: { parameters: 1, body: 1 },
      FunctionExpression: { parameters: 1, body: 1 },
      ImportDeclaration: 1,
      MemberExpression: 1,
      ObjectExpression: 1,
      outerIIFEBody: 1,
      SwitchCase: 1,
      VariableDeclarator: 1,
      ignoreComments: false
    }],
    '@typescript-eslint/member-delimiter-style)': 'error',
    '@typescript-eslint/no-array-constructor': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-extra-parens': 'error',
    '@typescript-eslint/no-extraneous-class': 'error',
    '@typescript-eslint/no-magic-numbers': ['error', {
      ignoreEnums: true,
      ignoreNumericLiteralTypes:
      true, ignoreReadonlyClassProperties: true
    }],
    '@typescript-eslint/no-misused-new': 'error',
    '@typescript-eslint/no-misused-promises': 'error',
    '@typescript-eslint/no-this-alias': ['error', { allowDestructuring: true }],
    '@typescript-eslint/no-unnecessary-condition': 'error',
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-useless-constructor': 'error',
    '@typescript-eslint/prefer-includesr': 'error',
    '@typescript-eslint/quotes': ['error', 'single'],
    '@typescript-eslint/require-await': 'error',
    '@typescript-eslint/semi': ['error', 'always'],
    '@typescript-eslint/type-annotation-spacing': 'error',

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
