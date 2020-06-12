<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      clipped-left
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
      shrink-on-scroll
      elevate-on-scroll
      src="https://picsum.photos/1920/1080?random"
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
      <v-toolbar-title class="hidden-sm-and-down">
        <v-btn text nuxt link to="/t/1">
          菜单1
        </v-btn>
      </v-toolbar-title>
      <v-toolbar-title class="hidden-sm-and-down">
        <v-btn text nuxt link to="/t/2">
          菜单2
        </v-btn>
      </v-toolbar-title>
      <v-toolbar-title class="hidden-sm-and-down">
        <v-btn text nuxt link to="/t/3">
          菜单3
        </v-btn>
      </v-toolbar-title>
      <v-toolbar-title class="hidden-sm-and-down">
        <v-btn text nuxt link to="/t/4">
          菜单4
        </v-btn>
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-title>
        <v-text-field
          placeholder="请输入关键字。。。"
          clearable
          append-icon="mdi-magnify"
          hide-details
          @click:append="serach"
        />
      </v-toolbar-title>
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
