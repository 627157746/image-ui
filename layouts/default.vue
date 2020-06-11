<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <div class="pa-2">
        <v-img src="http://qukanbook.com/_nuxt/img/2e29f6f.png" />
      </div>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
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
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="hidden-xs-only" v-text="title" />
      <v-spacer />
      <v-row
        align="center"
        style="max-width: 650px"
      >
        <v-text-field
          placeholder="请输入关键字。。。"
          clearable
          append-icon="mdi-magnify"
          hide-details
          @click:append="serach"
        />
      </v-row>
      <v-spacer />
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      class="hidden-xs-only"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-home',
          title: '首页',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: '菜单1',
          to: '/menu1'
        },
        {
          icon: 'mdi-chart-bubble',
          title: '菜单2',
          to: '/menu2'
        },
        {
          icon: 'mdi-chart-bubble',
          title: '菜单3',
          to: '/menu3'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  methods: {
    serach () {
      console.log('abc')
    }
  }
}
</script>
