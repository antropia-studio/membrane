import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import jsonFiles from 'eslint-plugin-json-files';
import perfectionist from 'eslint-plugin-perfectionist';
import prettier from 'eslint-plugin-prettier';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  allConfig: eslint.configs.all,
  baseDirectory: __dirname,
  recommendedConfig: eslint.configs.recommended,
});

const prettierConfig = compat.extends('prettier');

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...prettierConfig,
  perfectionist.configs['recommended-natural'],
  {
    ignores: [
      'lib',
      '**/babel.config.js',
      '**/metro.config.js',
      '**/*.gen.ts',
      '**/tailwind.config.js',
    ],
  },
  {
    plugins: {
      'json-files': jsonFiles,
      prettier,
    },
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
      /**
       * Not the best practice to disable this rule, but the theming is quite complex without using any.
       * On top of that, I tried to use eslint-disable-line in those places where any is required and... the
       * current version of eslint just ignore them (it reports an unused eslint-disable-line AND the no-explicit-any
       * rule.
       */
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-namespace': 'off',
      'json-files/sort-package-json': 'error',
      'no-await-in-loop': 'off',
      'perfectionist/sort-imports': 'error',
      'perfectionist/sort-objects': 'error',
      'prettier/prettier': 'error',
    },
  }
);
