<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      clipped-left
      app
    >
      <v-list>
        <template v-if="this.$store.state.auth.token">
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-account</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="this.$store.state.auth.nickname" />
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-action>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                注销
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
        <v-list-item
          to="/"
          nuxt
          link
        >
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-for="(item, index) in menus"
          :key="index"
          :to="item.to"
          nuxt
          link
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <template v-if="!this.$store.state.auth.token">
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-chart-bubble</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                登录
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-chart-bubble</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                注册
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
        <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-apps</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              <v-switch
                v-model="$vuetify.theme.dark"
                primary
                label="夜间模式"
              />
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      elevate-on-scroll
      fixed
      app
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        />
      </template>
      <v-app-bar-nav-icon :class="drawer?'':'hidden-md-and-up'" @click.stop="drawer = !drawer" />
      <v-toolbar-title class="hidden-sm-and-down">
        <v-btn text nuxt link to="/">
          {{ title }}
        </v-btn>
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-title v-for="(item,index) in menus" :key="index" class="hidden-sm-and-down">
        <v-btn text nuxt link :to="item.to">
          {{ item.title }}
        </v-btn>
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-title>
        <v-text-field
          ref="search"
          v-model="ky"
          placeholder="请输入关键字。。。"
          append-icon="mdi-magnify"
          hide-details
          dense
          solo
          @keyup.13="serach"
          @click:append="serach"
        />
      </v-toolbar-title>
      <v-spacer />
      <template v-if="this.$store.state.auth.token">
        <v-menu>
          <template v-slot:activator="{ on, attrs}">
            <v-btn
              class="hidden-sm-and-down"
              icon
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-account</v-icon>
              {{ nickname }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="logout">
              注销
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <template v-else>
        <v-toolbar-title class="hidden-sm-and-down">
          <v-btn text nuxt link to="/login">
            登录
          </v-btn>
        </v-toolbar-title>
        <v-toolbar-title class="hidden-sm-and-down">
          <v-btn text nuxt link to="/register">
            注册
          </v-btn>
        </v-toolbar-title>
      </template>
      <v-spacer />
      <v-menu>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="hidden-sm-and-down"
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-wrench</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-switch
              v-model="$vuetify.theme.dark"
              primary
              label="夜间模式"
              @change="dark"
            />
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      class="hidden-sm-and-down"
    >
      <div class="text-center" style="width:100%">
        &copy; {{ footer }}
      </div>
    </v-footer>
    <back-to-top />
  </v-app>
</template>

<script>
import BackToTop from '@/components/BackToTop'
export default {
  components: {
    BackToTop
  },
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      menus: this.$store.state.config.menus,
      right: true,
      rightDrawer: false,
      title: '美女小姐姐写真网',
      nickname: this.$store.state.auth.nickname,
      ky: undefined,
      footer: new Date().getFullYear() + ' 本站纯属免费美女图片欣赏网站，所有图片均收集于互联网，如有侵犯权益请来信告知，我们将立即更正。'
    }
  },
  created () {
    this.$vuetify.theme.dark = this.$store.state.config.dark
  },
  methods: {
    dark (dark) {
      this.$cookies.set('dark', dark ? 1 : 0, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30
      })
    },
    serach () {
      this.$refs.search.blur()
      if (this.ky) {
        this.$router.push({ name: 'search', query: { ky: this.ky } })
      } else {
        this.$toasted.show('请输入关键字。。。')
      }
    },
    async logout () {
      await this.$store.dispatch('auth/logout')
      this.$router.push('/login')
    }
  }
}
</script>
