/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['@repo/eslint-config/server.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
  },
};
