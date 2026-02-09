import tsConfig from 'eslint-config-vartanovs-ts';

export default [
  ...tsConfig,
  { ignores: ['**/build/**', '**/lib/**'] },
  { rules: { 'no-console': 'off' } },
];
