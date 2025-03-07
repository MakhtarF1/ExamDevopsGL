import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser'; // Assure-toi d'importer le parser TypeScript

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'], // Inclut les fichiers TypeScript .ts et .tsx
    languageOptions: {
      globals: {
        ...globals.browser,  // Utilise les globals du navigateur si c'est le cas
      },
      parser: parser,  // Spécifie que le parser est pour TypeScript
      parserOptions: {
        ecmaVersion: 2020,  // Version ECMAScript, ajuste selon ton projet
        sourceType: 'module',  // Si tu utilises les modules ES
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,  // Plugin TypeScript pour ESLint
    },
  },
  pluginJs.configs.recommended,  // Configuration JavaScript recommandée
  ...tseslint.configs.recommended,  // Configuration TypeScript recommandée
];
