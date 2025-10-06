/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['@repo/eslint-config/react.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
  ignorePatterns: ['tailwind.config.js'],
  rules: {
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          kebabCase: true,
          pascalCase: true,
          camelCase: true,
        },
        ignore: ['FeaturedGames.tsx'],
      },
    ],
    'eslint-comments/require-description': 'off',
  },
};
