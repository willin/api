const { resolve } = require('node:path');
const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    '@hono/eslint-config',
    'eslint:recommended',
    'prettier',
    'eslint-config-turbo',
    'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ],
  plugins: ['only-warn'],
  globals: {
    React: true,
    JSX: true
  },
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'single', { avoidEscape: true }],
    '@typescript-eslint/no-explicit-any': 'warn',
    // 'no-undef': ['error', { typeof: false }],
    'node/no-unsupported-features/node-builtins': [
      'error',
      {
        version: '>=16.0.0',
        ignores: []
      }
    ],
    'node/no-unsupported-features/es-builtins': [
      'error',
      {
        version: '>=16.0.0',
        ignores: []
      }
    ]
  },
  parserOptions: {
    project
  },
  settings: {
    'import/resolver': {
      typescript: {
        project
      }
    }
  },
  ignorePatterns: [
    // Ignore dotfiles
    '.*.js',
    'node_modules/',
    'dist/'
  ],
  overrides: [
    {
      files: ['*.js?(x)', '*.ts?(x)']
    }
  ]
};
