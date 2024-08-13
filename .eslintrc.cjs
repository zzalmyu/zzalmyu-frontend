module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
    "plugin:@next/next/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "*.html", "*.cjs", "*.mjs", "*.js", "src/*.gen.ts"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "unused-imports", "import"],
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "unused-imports/no-unused-imports": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "type",
          "unknown",
        ],
        pathGroups: [
          {
            pattern: "react*",
            group: "external",
            position: "before",
          },
          {
            pattern: "@/stores/*",
            group: "internal",
            position: "after",
          },
          {
            pattern: "@/apis/*",
            group: "internal",
            position: "after",
          },
          {
            pattern: "@/hooks/*",
            group: "internal",
            position: "after",
          },
          {
            pattern: "@/pages/*",
            group: "internal",
            position: "after",
          },
          {
            pattern: "@/components/*",
            group: "internal",
            position: "after",
          },
          {
            pattern: "@/assets/*",
            group: "internal",
            position: "after",
          },
          {
            pattern: "@styled-system/*",
            group: "internal",
            position: "after",
          },
          {
            pattern: "@/utils/*",
            group: "internal",
            position: "after",
          },
          {
            pattern: "@/types/*",
            group: "internal",
            position: "after",
          },
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
      },
    ],
  },
};
