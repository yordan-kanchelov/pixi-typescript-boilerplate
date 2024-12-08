import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginImport from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import htmlPlugin from "eslint-plugin-html";
import playwright from "eslint-plugin-playwright";
import promise from "eslint-plugin-promise";

// Define the common rules in a constant
const commonRules = {
  "padding-line-between-statements": [
    "error",
    { blankLine: "always", prev: "*", next: "return" },
    { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
    { blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"] },
    { blankLine: "always", prev: ["if"], next: "*" },
  ],
  "@typescript-eslint/no-unused-vars": ["error", { varsIgnorePattern: "^_", argsIgnorePattern: "^_" }],
  "sort-imports": [
    "error",
    {
      ignoreCase: false,
      ignoreDeclarationSort: true,
      ignoreMemberSort: false,
      memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
      allowSeparatedGroups: true,
    },
  ],
  "import/order": [
    "error",
    {
      groups: ["builtin", "external", "internal", ["sibling", "parent"], "index", "unknown"],
      pathGroups: [
        {
          pattern: "pixi.js",
          group: "external",
        },
        {
          pattern: "@live-casino/**",
          group: "external",
          position: "after",
        },
        {
          pattern: "@egt-live-casino/**",
          group: "external",
          position: "after",
        },
        {
          pattern: "@football-thrill/**",
          group: "internal",
          position: "before",
        },
      ],
      distinctGroup: true,
      pathGroupsExcludedImportTypes: ["builtin"],
      "newlines-between": "always",
    },
  ],
  "@typescript-eslint/explicit-member-accessibility": [
    "error",
    {
      accessibility: "explicit",
      overrides: {
        constructors: "no-public",
        properties: "off",
      },
    },
  ],
  curly: ["error"],
  "import/no-default-export": ["error"],
  "grouped-accessor-pairs": ["error", "getBeforeSet"],
  "lines-between-class-members": ["error", "always", { exceptAfterSingleLine: true }],
  "@typescript-eslint/no-unsafe-assignment": ["off"],
  "@typescript-eslint/no-unsafe-return": ["off"],
  "@typescript-eslint/unbound-method": ["off"],
  "@typescript-eslint/no-unsafe-call": ["off"],
  "import/no-unresolved": ["off"],
  "@typescript-eslint/naming-convention": [
    "error",
    {
      selector: "memberLike",
      modifiers: ["private"],
      format: [],
      leadingUnderscore: "forbid",
      trailingUnderscore: "forbid",
    },
    {
      selector: "memberLike",
      modifiers: ["public"],
      format: [],
      leadingUnderscore: "forbid",
      trailingUnderscore: "forbid",
    },
    {
      selector: "memberLike",
      modifiers: ["protected"],
      format: [],
      leadingUnderscore: "forbid",
      trailingUnderscore: "forbid",
    },
  ],
};

export default tseslint.config(
  // Include recommended configs
  eslint.configs.recommended,
  ...tseslint.configs.recommended,

  // Ignore patterns
  {
    ignores: [
      "**/dist/",
      "**/coverage/",
      "**/node_modules/",
      "**/build/",
      "**/built/",
      "**/.cache/",
      "**/.local-browsers/",
      "**/.vscode/",
      "**/.idea/",
      "**/.settings/",
      "**/.gradle/",
      "**/.nx/",
      "test-results/",
      "**/playwright-report/",
      ".trace",
      "**/internal/",
      "**/allure*",
      "**/.DS_Store",
      "**/.mono/",
      "**/game-assets/**",
      "blob-report",
      "**/eslint.config.*",
      "**/jest.config.*",
      "**/jest.preset.*",
      "**/webpack.*.*",
      "**/stylelint.config.*",
      "*.swp",
      "*.pyc",
      "nohup.out",
      "yarn-error.log",
      "pnpm-lock.yaml",
      ".failed-tests",
      "**/test-results.*",
      "*v8.log",
      "~*.docx",
    ],
  },

  // Base configuration for project files
  {
    files: ["**/src/**/*.{js,mjs,cjs,jsx,ts,tsx}"],
    plugins: {
      prettier: prettierPlugin,
      import: eslintPluginImport,
      html: htmlPlugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: 2022,
        sourceType: "module",
        extraFileExtensions: [".html"],
      },
      globals: {
        browser: true,
        node: true,
      },
    },
    settings: {
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"],
      },
    },
    rules: commonRules,
  },

  // Configuration for test automation files
  {
    files: ["**/tests/**/*.{js,mjs,cjs,jsx,ts,tsx}"],
    plugins: {
      prettier: prettierPlugin,
      import: eslintPluginImport,
      html: htmlPlugin,
      playwright: playwright,
      promise: promise,
    },
    laguageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: 2022,
        sourceType: "module",
        extraFileExtensions: [".html"],
      },
      globals: {
        browser: true,
        node: true,
      },
    },
    settings: {
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"],
      },
    },
    rules: commonRules,
  },
);
