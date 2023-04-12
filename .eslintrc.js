module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'prettier',
    'plugin:import/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  plugins: ['import'],
  // add your custom rules here
  rules: {
    'vue/comment-directive': 'off',
    'import/no-unresolved': 'off',
    'import/named': 2,
    'import/namespace': 2,
    'import/default': 2,
    'import/export': 2,
  },
}
