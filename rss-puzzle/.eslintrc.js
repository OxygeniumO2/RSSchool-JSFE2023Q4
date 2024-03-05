/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
module.exports = {
  "parser": "@typescript-eslint/parser",
  "plugins": ["prettier", "import", "@typescript-eslint"],
  "extends": [
      "plugin:prettier/recommended",
      "prettier",
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended"
  ],
  "parserOptions": {
      "ecmaVersion": 2020,
      "sourceType": "module"
  },
  "env": {
      "es6": true,
      "browser": true,
      "node": true
  },
  "rules": {
      "no-debugger": "off",
      'semi': ['error', 'always'],
      "no-console": 0,
      "class-methods-use-this": "off",
      "@typescript-eslint/no-explicit-any": 2
  }
};