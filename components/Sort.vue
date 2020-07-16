<template>
  <div class="d-flex" style="justify-content: space-between">
    <v-btn-toggle
      v-if="!notShowOrder"
      v-model="_order"
      dense
      class="ma-3"
    >
      <v-btn
        link
        nuxt
        :to="search?{ name: 'search', query: { o:0, ky: _ky } }:{ name: 't-tid', params: { tid: _tid }, query: { o:0 } }"
      >
        <v-icon>mdi-autorenew</v-icon>
        最新
      </v-btn>
      <v-btn
        link
        nuxt
        :to="search?{ name: 'search', query: { o:1, ky: _ky } }:{ name: 't-tid', params: { tid: _tid }, query: { o:1 } }"
      >
        <v-icon>mdi-fire</v-icon>
        最火
      </v-btn>
    </v-btn-toggle>
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
