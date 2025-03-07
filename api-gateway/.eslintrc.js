import { globals } from '@eslint/js';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,  // Si tu veux des globals de navigateur
      },
      parser: parser,  // Utiliser le parser pour TypeScript
      parserOptions: {
        ecmaVersion: 2020,  // Choisir la version ECMAScript selon ton projet
        sourceType: 'module',  // Si tu utilises des modules ES
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,  // Ajoute le plugin TypeScript pour ESLint
    },
  },
  pluginJs.configs.recommended,  // Configuration par défaut pour JavaScript
  ...tseslint.configs.recommended,  // Configuration recommandée pour TypeScript
];
