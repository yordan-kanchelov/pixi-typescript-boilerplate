import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginImport from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import htmlPlugin from "eslint-plugin-html";

// Define the common rules in a constant
const commonRules = {
    "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: "return" },
        { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
        { blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"] },
        { blankLine: "always", prev: ["if"], next: "*" },
    ],
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
            "**/assets/**",
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
        files: ["./src/**/*.{js,mjs,cjs,jsx,ts,tsx}"],
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
);
