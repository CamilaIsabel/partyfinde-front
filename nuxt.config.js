export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  server: {
    host: '0.0.0.0',
    port: 8080
  },

  publicRuntimeConfig: {
    PARTYFINDER_API: process.env.PARTYFINDER_API || 'http://localhost:3000/',
  },

  router: {
    middleware: [],
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Partyfinder: Find the best parties in your city',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Find the best parties and events. A world full of adventures awaits you.',
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content:
          'Partyfinder Parties Events Girls Boys ',
      },
      { name: 'format-detection', content: 'telephone=no' },
      {
        hid: 'title',
        name: 'title',
        content: 'Partyfinder: Find the best parties in your city',
      },

      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://partyfinder.me/' },
      {
        property: 'og:title',
        content: 'Partyfinder: Find the best parties in your city',
      },
      {
        property: 'og:description',
        content:
          'Find the best parties and events. A world full of adventures awaits you.',
      },
      {
        property: 'og:image',
        content: '',
      },

      { property: 'twitter:card', content: 'summary_large_image' },
      { property: 'twitter:url', content: 'https://partyfinder.me/' },
      {
        property: 'twitter:title',
        content: 'Partyfinder: Find the best parties in your city',
      },
      {
        property: 'twitter:description',
        content:
          'Find the best parties and events. A world full of adventures awaits you.',
      },
      {
        property: 'twitter:image',
        content: '',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/svg+xml', href: '/icon.svg' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: true,
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap',
      },
    ],
    script: [
      {
        src: 'https://twemoji.maxcdn.com/v/latest/twemoji.min.js',
        crossorigin: 'anonymous',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~plugins/select',
    '~plugins/composition',
    '~plugins/axios-env',
    { src: '~plugins/modal', ssr: false },
    { src: '~plugins/persistedstate.client', ssr: false },
    { src: '~plugins/reloaduser.client', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    'nuxt-windicss',
    'nuxt-vite',
    '@nuxtjs/svg',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
