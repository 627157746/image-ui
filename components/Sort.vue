<template>
  <div class="d-flex" style="justify-content: space-between">
    <div
      v-if="!notShowOrder"
      class="mx-3 my-3"
    >
      <v-btn
        dense
        text

        :disabled="_order===0"
        link
        nuxt
        :to="search?{ name: 'search', query: { o:0, ky: _ky } }:{ name: 't-tid', params: { tid: _tid }, query: { o:0 } }"
      >
        <v-icon :style="{'color':_order===0?'pink':''}">
          mdi-autorenew
        </v-icon>
        <span :style="{'color':_order===0?'pink':''}">
          最新
        </span>
      </v-btn>
      <v-btn
        dense
        text
        :color="_order===1?'pink':''"
        :disabled="_order===1"
        link
        nuxt
        :to="search?{ name: 'search', query: { o:1, ky: _ky } }:{ name: 't-tid', params: { tid: _tid }, query: { o:1 } }"
      >
        <v-icon :style="{'color':_order===1?'pink':''}">
          mdi-fire
        </v-icon>
        <span :style="{'color':_order===1?'pink':''}">
          最火
        </span>
      </v-btn>
    </div>
    <v-menu>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="ma-3 hidden-sm-and-up"
          icon
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-backburger</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="item in displayList"
          :key="item.value"
          @click="changeDisplay(item.value)"
        >
          <v-list-item-title>{{ item.lable }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  props: {
    order: {
      required: false,
      type: Number,
      default: 0
    },
    tid: {
      required: false,
      type: Number,
      default: 1
    },
    search: {
      required: false,
      type: Boolean,
      default: false
    },
    ky: {
      required: false,
      type: String,
      default: undefined
    },
    notShowOrder: {
      required: false,
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      displayList: [
        { lable: '单列', value: 12 },
        { lable: '双列', value: 6 }
      ]
    }
  },
  computed: {
    _order: {
      get () {
        return this.order
      },
      set (v) {
        this.$emit('order', v)
      }
    },
    _tid: {
      get () {
        return this.tid
      },
      set (v) {
        this.$emit('tid', v)
      }
    },
    _search: {
      get () {
        return this.search
      },
      set (v) {
        this.$emit('search', v)
      }
    },
    _ky: {
      get () {
        return this.ky
      },
      set (v) {
        this.$emit('ky', v)
      }
    }
  },
  methods: {
    changeDisplay (value) {
      this.$cookies.set('display', value, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30
      })
      this.$store.commit('web/SET_DISPLAY', value)
    }
  }
}
</script>
