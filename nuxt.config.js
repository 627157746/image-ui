import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'universal',

  head: {
    titleTemplate: '%s - ' + '美女小姐姐写真网，美女图片每日更新',
    meta: [
      { charset: 'utf-8' },
      {
        'http-equiv': 'Content-Language',
        content: 'zh-cn'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: '美女图片,性感美女,美女写真,COSER'
      },
      {
        hid: 'description',
        name: 'description',
        content: '美女小姐姐写真网(https://www.mnxjj.com)每日分享最新最全的妹子图片和高清性感美女图片，包括性感妹子、日本妹子、台湾妹子、清纯妹子、COSER。'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: 'https://cdn.mnxjj.com/images/favicon.ico'
      }
    ],
    script: [
      {
        src: 'https://polyfill.io/v2/polyfill.min.js?features=IntersectionObserver',
        body: true
      }
    ]
  },
  loading: { color: 'pink' },
  css: [
    'assets/main.css'
  ],
  plugins: [
    { src: '@/plugins/filters' },
    { src: '@/plugins/v-viewer' },
    { src: '@/plugins/baidu-count' },
    {
      src: '@/plugins/share',
      ssr: false
    },
    { src: '@/plugins/axios' }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/toast',
    'cookie-universal-nuxt'
  ],
  toast: {
    position: 'top-center',
    duration: 2000
  },
  axios: {
    prefix: '/api',
    credentials: true,
    proxy: true,
    debug: false
  },
  router: {
    middleware: 'auth',
    prefetchLinks: false
  },
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      pathRewrite: { '^/api/': '' }
    }
  },
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
  build: {
    // publicPath: '/mnxjj/',
    publicPath: 'https://cdn.jsdelivr.net/gh/627157746/cdn/mnxjj',
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    extractCSS: true,
    optimization: {
      splitChunks: {
        chunks: 'all',
        automaticNameDelimiter: '.',
        name: 'mnxjj'
        // minSize: 128000,
        // maxSize: 256000
      }
    }
  }
}
