import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'

const config = [
  {
    ignores: ['node_modules/**', '.next/**', 'dist/**', 'next-env.d.ts', 'temp/**']
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      'multiline-ternary': 'off',
      '@next/next/no-head-element': 'off',
      // Mount-time hydration (localStorage read after first paint) intentionally
      // sets state in effects to avoid SSR/client markup mismatch.
      'react-hooks/set-state-in-effect': 'off',
      // purity flags Math.random()/Date.now() inside component-scope functions
      // that are only ever invoked from event handlers, not during render.
      'react-hooks/purity': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
      ]
    }
  }
]

export default config
