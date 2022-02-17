module.exports = {
  env: {
    es2021: true,
    node: true,
    "jest/globals": true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 13,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint, jest"],
  rules: {
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: ["**/*.test.ts", "**/*.spec.ts"],
      },
    ],
    "import/extensions": [
      "error",
      "always",
      {
        ts: "never",
        js: "never",
      },
    ],
  },
};