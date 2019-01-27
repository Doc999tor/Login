module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": ["standard", "standard-react"],
  "globals": {
    "describe": false,
    "_config": false,
    "element": false,
    "expect": false,
    "browser": true,
    "before":false,
    "it": false,
    "by": false
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "indent": [2,2],
    "linebreak-style": [
      "error",
      "windows"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "never"
    ],
    "no-unused-vars": [
      "warn",
      {
        "varsIgnorePattern": "_config",
        "args": "after-used",
        "vars": "all"
      }
    ],
    "arrow-parens": ["error", "as-needed"],
    "camelcase": "warn",
    "vars-on-top": 1,
    "no-console": 1
  }
};
