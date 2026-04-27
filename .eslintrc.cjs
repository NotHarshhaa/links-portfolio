module.exports = {
  root: true,
  env: { browser: true, es2021: true, node: true },
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/stylistic',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'next-env.d.ts'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react-refresh', 'react'],
  rules: {
    '@typescript-eslint/indent': 'off',
    '@next/next/no-head-element': 'off',
    'multiline-ternary': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    'react-refresh/only-export-components': 'off',
    'react/prop-types': 'off',
    'react/jsx-no-target-blank': [2, { allowReferrer: false }]
  },
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ]
}
