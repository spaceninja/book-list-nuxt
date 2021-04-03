export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'book-list-nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ['@nuxtjs/pwa', '@nuxtjs/firebase'],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extend(config, { isServer }) {
      if (isServer) {
        config.externals = {
          '@firebase/app': 'commonjs @firebase/app',
          '@firebase/auth': 'commonjs @firebase/auth',
          '@firebase/database': 'commonjs @firebase/database',
        };
      }
    },
  },

  // Firebase Configuration (https://firebase.nuxtjs.org/guide/)
  firebase: {
    config: {
      apiKey: 'AIzaSyA-5tojAEBlkSLR-xwNFALegJw_A5Ch-WY',
      authDomain: 'spaceninja-book-list-dev.firebaseapp.com',
      databaseURL: 'https://spaceninja-book-list-dev.firebaseio.com',
      projectId: 'spaceninja-book-list-dev',
      storageBucket: 'spaceninja-book-list-dev.appspot.com',
      messagingSenderId: '340949330740',
      appId: '1:340949330740:web:9c8bb2f8fe83b8242e1361',
    },
    services: {
      auth: {
        initialize: {
          onAuthStateChangedAction: 'onAuthStateChanged',
        },
        ssr: true,
      },
      database: true,
    },
  },

  // PWA Configuration (https://pwa.nuxtjs.org/)
  pwa: {
    meta: false,
    icon: false,
    workbox: {
      importScripts: ['/firebase-auth-sw.js'],
      // By default the workbox module will not install the service worker in
      // dev environment to avoid conflicts with HMR. Only set this true for
      // testing and remember to always clear your browser cache in development
      dev: process.env.NODE_ENV === 'development',
    },
  },
};
