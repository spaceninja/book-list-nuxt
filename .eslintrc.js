module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    '@nuxtjs',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
    'plugin:testing-library/vue',
  ],
  plugins: ['prettier', 'testing-library'],
  ignorePatterns: ['static/firebase-auth-sw.js'],
  rules: {
    'no-console': 'off',
  },
};
