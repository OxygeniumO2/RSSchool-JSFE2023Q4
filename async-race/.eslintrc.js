module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": false
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "eslint-config-airbnb-base",
        "plugin:prettier/recommended",
        'airbnb-base',
        'airbnb-typescript/base',
        "airbnb-typescript",
        "prettier",
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": './tsconfig.json',
        "tsconfigRootDir": __dirname,
        "sourceType": 'module',
    },
    "plugins": [
        "@typescript-eslint",
        "prettier",
        "import"
    ],
    "rules": {
        'prettier/prettier': 'error',
        "react/jsx-filename-extension": "off",
    },
    "ignorePatterns": [
        'node_modules/',
        '.eslintrc.js',
        'webpack.config.js'
      ],
}
