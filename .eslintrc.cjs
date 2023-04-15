module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  ignorePatterns: ["*.typegen.ts"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "prettier/prettier": "error",
  },
  root: true,
};
