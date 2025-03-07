import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"], // Ajoute aussi .tsx si tu utilises React
  },
  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 2020, // Choisir la version d'ECMAScript, selon ton projet
        sourceType: "module", // Si tu utilises des modules ES
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
