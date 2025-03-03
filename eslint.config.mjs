export default [
  {
    ignores: ["node_modules", "dist", "**/*.test.js"], // Add test files to ignore if needed
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    rules: {
      "no-unused-vars": "warn", // Warn on unused variables
      "no-console": "warn", // Warn on console usage
      "prefer-const": "error", // Enforce using const for variables that are not reassigned
      "eqeqeq": "error", // Enforce strict equality
      "curly": "error", // Require curly braces for all control statements
      "quotes": ["error", "single"], // Enforce single quotes
      "semi": ["error", "always"], // Require semicolons
      "camelcase": "off", // Warn on non-camelcase variable names
      "no-magic-numbers": [
        "warn",
        { ignore: [0, 1] }, // Warn on magic numbers except for 0 and 1
      ],
    },
  },
];