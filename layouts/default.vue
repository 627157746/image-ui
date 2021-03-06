<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      clipped-left
      temporary
      app
    >
      <v-list>
        <template v-if="auth">
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-account</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="nickname" />
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
          <v-divider />
        </template>
        <template v-if="!auth">
          <v-list-item nuxt link to="/login">
            <v-list-item-action>
              <v-icon>mdi-login</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                登录
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item nuxt link to="/register">
            <v-list-item-action>
              <v-icon>mdi-account-plus-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                注册
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider />
        </template>
      </v-list>
      <v-list>
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
        <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-brightness-4</v-icon>
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
      <v-toolbar-title
        class="hidden-sm-and-down"
      >
        <v-btn
          depressed
          height="60"
          width="150"
          text
          @click="toHome"
        >
          <v-img
            :src="logo"
            height="60"
            width="150"
            contain
          />
        </v-btn>
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-title v-for="(item,index) in menus" :key="index" class="hidden-sm-and-down">
        <v-btn text nuxt link :to="item.to">
          {{ item.title }}
        </v-btn>
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-title class="pb-1">
        <v-combobox
          ref="search"
          v-model="ky"
          style="width:300px"
          :items="searchHistory"
          chips
          hide-details
          clearable
          label="请输入关键字。。。"
          append-icon="mdi-magnify"
          dense
          solo
          @keyup.13="search"
          @click:append="search"
        >
          <template v-slot:selection="{ attrs, item }">
            <v-chip
              v-bind="attrs"
              color="pink lighten-3"
              label
              small
            >
              <span style="color:white">{{ item }}</span>
            </v-chip>
          </template>
          <template v-slot:item="{ index, item }">
            <v-chip
              color="pink lighten-3"
              dark
              label
              small
            >
              {{ item }}
            </v-chip>
            <v-spacer />
            <v-list-item-action @click.stop>
              <v-btn
                icon
                @click.stop.prevent="delSearchByIndex(index)"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-list-item-action>
          </template>
        </v-combobox>
      </v-toolbar-title>
      <v-spacer />
      <template v-if="auth">
        <v-menu transition="fab-transition">
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
              <v-list-item-action>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  注销
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              link
              nuxt
              to="/user/pwd"
            >
              <v-list-item-action>
                <v-icon>mdi-lock-reset</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  修改密码
                </v-list-item-title>
              </v-list-item-content>
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
      <v-menu transition="fab-transition">
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
      <v-container style="height:100%">
        <nuxt :keep-alive="isKeepAlive" />
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
      right: true,
      rightDrawer: false,
      title: '美女小姐姐写真网',
      ky: undefined,
      searchHistory: [],
      noCacheRoute: [
        't-tid-aid',
        'search',
        'video'
      ]
    }
  },
  computed: {
    isKeepAlive () {
      return !this.noCacheRoute.includes(this.$route.name)
    },
    auth () {
      return this.$store.state.auth.token
    },
    menus () {
      return this.$store.state.web.menus
    },
    nickname () {
      return this.$store.state.auth.nickname
    },
    footer () {
      return new Date().getFullYear() + '美女小姐姐写真网'
    },
    logo () {
      return this.$store.state.web.imageDomain + '/images/logo.png'
    }
  },
  created () {
    this.$vuetify.theme.dark = this.$store.state.web.dark
    this.ky = this.$route.query.ky
  },
  mounted () {
    const searchHistory = localStorage.getItem('searchHistory')
    if (searchHistory) {
      this.searchHistory = JSON.parse(searchHistory)
    }
  },
  methods: {
    toHome () {
      this.$router.push('/')
    },
    dark (dark) {
      this.$cookies.set('dark', dark ? 1 : 0, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30
      })
    },
    search () {
      this.$refs.search.blur()
      setTimeout(() => {
        if (this.ky) {
          this.searchHistory.unshift(this.ky)
          localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory))
          this.$router.push({ name: 'search', query: { ky: this.ky } })
        } else {
          this.$toast.show('请输入关键字。。。')
        }
      }, 300)
    },
    delSearchByIndex (index) {
      this.searchHistory.splice(index, 1)
      localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory))
    },
    logout () {
      this.$store.dispatch('auth/logout').then(() => {
        this.$router.push('/login')
      })
    }
  }
}
</script>
