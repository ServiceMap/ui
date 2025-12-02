import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactRefreshPlugin from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";
import prettierPlugin from "eslint-plugin-prettier";
import importPlugin from "eslint-plugin-import";
import simpleImportSortPlugin from "eslint-plugin-simple-import-sort";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import boundariesPlugin from "eslint-plugin-boundaries";

export default defineConfig([
  globalIgnores([
    "coverage",
    "dist",
    "node_modules",
    "build",
    "public",
    "eslint.config.js",
    "i18next-parser.config.js",
    ".stylelintrc.cjs",
    "stripe-server-test.js",
  ]),

  js.configs.recommended,
  tseslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  jsxA11yPlugin.flatConfigs.recommended,

  {
    files: ["**/*.{ts,tsx,js,jsx}"],

    settings: {
      react: { version: "detect" },
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
      },
      "boundaries/elements": [
        { type: "app", pattern: "src/app" },
        { type: "pages", pattern: "src/pages/*" },
        { type: "widgets", pattern: "src/widgets/*" },
        { type: "features", pattern: "src/features/*" },
        { type: "entities", pattern: "src/entities/*" },
        { type: "shared", pattern: "src/shared/*" },
      ],
    },

    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.es2022,
      },
    },

    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "react-refresh": reactRefreshPlugin,
      "@typescript-eslint": tseslint.plugin,
      boundaries: boundariesPlugin,
      import: importPlugin,
      "simple-import-sort": simpleImportSortPlugin,
      prettier: prettierPlugin,
    },

    rules: {
      ...reactPlugin.configs.flat.recommended.rules,
      ...reactHooksPlugin.configs.flat.recommended.rules,
      ...reactRefreshPlugin.configs.recommended.rules,
      ...tseslint.plugin.configs.recommended.rules,
      ...boundariesPlugin.configs.recommended.rules,
      ...importPlugin.flatConfigs.recommended.rules,
      ...prettierPlugin.configs.recommended.rules,

      // Formatting & style
      "prettier/prettier": "error",
      "no-console": "warn",

      // React
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",

      // TypeScript
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],

      // Imports
      "import/no-unresolved": "error",
      "import/order": "off",
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^react", "^@?\\w"],
            ["^@/"],
            ["^\\u0000", "^\\./", "^\\.\\./"],
            ["\\.s?css$"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",

      // Dependency boundaries
      "boundaries/element-types": [
        2,
        {
          default: "disallow",
          rules: [
            {
              from: "app",
              allow: ["pages", "widgets", "features", "entities", "shared"],
            },
            {
              from: "pages",
              allow: ["widgets", "features", "shared"],
            },
            { from: "widgets", allow: ["features", "entities", "shared"] },
            { from: "features", allow: ["entities", "shared"] },
            { from: "entities", allow: ["shared"] },
            { from: "shared", allow: ["shared"] },
          ],
        },
      ],
    },
  },
  {
    files: ["**/*.test.{ts,tsx,js,jsx}"],
    rules: {
      "boundaries/element-types": "off",
    },
  },
]);
