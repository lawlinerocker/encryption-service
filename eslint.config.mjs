import eslint from '@eslint/js';
import prettier from 'eslint-plugin-prettier/recommended';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tseslint from 'typescript-eslint';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  prettier,
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.eslint.json',
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      'max-params': ['warn', 5],
      'max-lines-per-function': [
        'warn',
        { max: 60, skipComments: true, skipBlankLines: true, IIFEs: true },
      ],
      'no-await-in-loop': 'warn',
      'no-console': 'off',
      'no-duplicate-imports': 'off',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-promise-executor-return': 'error',
      'no-regex-spaces': 'warn',
      'no-return-await': 'warn',
      'no-self-compare': 'error',
      'no-template-curly-in-string': 'warn',
      'no-unused-vars': 'off',
      'require-await': 'warn',
      'spaced-comment': 'warn',
      yoda: 'warn',
      complexity: 'warn',
      'no-confusing-arrow': 'warn',
      'no-negated-condition': 'warn',
      'no-empty': 'error',
      'no-empty-function': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-empty-function': ['error', { allow: ['constructors'] }],
      quotes: ['error', 'single', { allowTemplateLiterals: true, avoidEscape: true }],
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/explicit-function-return-type': ['warn', { allowExpressions: true }],
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/no-unsafe-return': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
      '@typescript-eslint/restrict-template-expressions': 'warn',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-misused-promises': 'warn',
      '@typescript-eslint/require-await': 'warn',
      '@typescript-eslint/restrict-plus-operands': 'warn',
      '@typescript-eslint/await-thenable': 'warn',
      '@typescript-eslint/unbound-method': 'warn',
    },
  },
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
);
