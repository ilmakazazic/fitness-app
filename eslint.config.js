import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
  {
ignores: ['dist/**', 'node_modules/**', 'eslint.config.js'],  },
  {
     extends: [
      'prettier', 
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      '@typescript-eslint': tseslint.plugin,
      'prettier': require('eslint-plugin-prettier'),
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // React & JSX
      'react/react-in-jsx-scope': 'off', // za React 17+
      'react/prop-types': 'off',

      // React Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // TypeScript
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'off',

      // General JS
      'no-unused-vars': 'off', // koristi TS varijantu
      'no-console': 'warn',
      'no-debugger': 'warn',
      'prettier/prettier': 'error', // Integracija sa Prettier-om
    },
  },
]
