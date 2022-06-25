// Import FontAwesome icons
import {
  faArrowRightToBracket,
  faCode,
  faPhotoFilm,
  faArrowsRotate,
  faArrowRightFromBracket,
  faLayerGroup,
  faArrowUpFromBracket,
  faUser,
  faAt,
  faWallet
} from '@fortawesome/free-solid-svg-icons'
import {
  faInstagram,
  faTelegram,
  faDiscord
} from '@fortawesome/free-brands-svg-icons'

import customTheme from './static/js/custom-theme'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  // target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Climate art taskforce',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/static/img/favicon.png' },

      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@200;300;400;500;600&display=swap'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@1,700&display=swap'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/scss/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~plugins/moralis.js',
    { src: '~plugins/vue-append.js', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'simple-code-editor/nuxt',
    // https://go.nuxtjs.dev/chakra
    '@chakra-ui/nuxt',
    // https://go.nuxtjs.dev/emotion
    '@nuxtjs/emotion',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa'
  ],
  chakra: {
    icons: {
      // Here we state that we use `fa`
      // icons library for Chakra's
      // internal icon parser
      iconPack: 'fa',
      iconSet: {
        faArrowRightToBracket,
        faAt,
        faWallet,
        faUser,
        faArrowUpFromBracket,
        faArrowRightFromBracket,
        faLayerGroup,
        faInstagram,
        faArrowsRotate,
        faTelegram,
        faDiscord,
        faCode,
        faPhotoFilm
      }
    },
    extendTheme: customTheme
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  env: {
    MoralisServerUrl: process.env.MORALIS_SERVER_URL,
    MoralisAppId: process.env.MORALIS_APP_ID,
    NftContract: process.env.NFT_CONTRACT
  }
}
