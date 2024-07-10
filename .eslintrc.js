// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    // Parser that checks the content of the <script> tag
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    'browser': true,
    'node': true,
    'vue/setup-compiler-macros': true,
  },
  plugins: ['@typescript-eslint'],
  extends: [
    // Airbnb JavaScript Style Guide https://github.com/airbnb/javascript
    'eslint:recommended',
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
  ],
  settings: {
    'import/resolver': {
      typescript: {
        project: path.resolve(__dirname, './tsconfig.json'),
      },
    },
  },
  rules: {
    'prettier/prettier': 1,
    'vue/multi-word-component-names': 0,
    '@typescript-eslint/no-unused-vars': 0,
    'import/extensions': [
      2,
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'vue/no-reserved-props': 'off',
    'no-param-reassign': 'off',
    "import/first": "off",
    "import/no-extraneous-dependencies": ["error", {
      "devDependencies": true
    }],
    "import/prefer-default-export": "off",
    "@typescript-eslint/no-var-requires": "off",
    "consistent-return": "off",
    "no-restricted-syntax": "off",
    "guard-for-in": "off",
    "no-plusplus": "off",
    "func-names": "off",
    "no-unused-expressions": "off",
    "@typescript-eslint/no-empty-function": "off",
    "no-sequences": "off"

  },
};
