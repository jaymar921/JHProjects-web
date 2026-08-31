import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  { ignores: ["dist", "node_modules"] },

  /**
   * The browser half: everything under src, plus shared, which is imported by
   * both sides and sticks to plain JavaScript so it can be.
   */
  {
    files: ["src/**/*.{js,jsx}", "shared/**/*.js"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    settings: { react: { version: "18.3" } },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      "react/jsx-no-target-blank": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      // A leading underscore marks an argument that has to be declared but is
      // deliberately not used, which is how Express recognises error handling
      // middleware by its arity.
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },

  /**
   * The server half, plus the Vercel entry point and the art generation
   * scripts. These run on Node, so they get Node globals and no React rules.
   */
  {
    files: ["server/**/*.js", "api/**/*.js", "scripts/**/*.{js,mjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.node,
      parserOptions: { sourceType: "module" },
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
];
