import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + '我爱大姐姐写真网，美女图片每日更新',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'keywords', name: 'keywords', content: '美女图片,性感美女,美女写真,COSER写真,二次元妹子' },
      { hid: 'description', name: 'description', content: '我爱大姐姐写真网(wadjj.xyz)每日分享最新最全的妹子图片和高清性感美女图片，包括性感妹子、日本妹子、台湾妹子、清纯妹子、COSER、二次元妹子。' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: 'pink' },
  /*
  ** Global CSS
  */
  css: [
    'assets/main.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '@/plugins/filters' },
    { src: '@/plugins/v-viewer' },
    { src: '@/plugins/baidu-count' },
    { src: '@/plugins/axios' }
    // { src: '@/plugins/toast', ssr: false, model: 'client' }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/toast'
  ],
  toast: {
    position: 'top-center',
    duration: 2000
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    prefix: '/api',
    proxy: true,
    credentials: true,
    debug: false
  },
  proxy: {
    '/api': { target: 'http://localhost:8080', pathRewrite: { '^/api/': '' } }
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
