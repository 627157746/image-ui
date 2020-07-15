<template>
  <div class="px-3 d-flex text-decoration-none">
    <v-btn
      style="display:none"
      class="mx-2"
      text
      :href="lastPage"
      :disabled="_current===1"
    >
      上一页
    </v-btn>
    <v-btn
      text
      color="pink"
      class="mx-2"
      :disabled="_current===1"
      @click="toPage(_current - 1)"
    >
      上一页
    </v-btn>
    <v-select
      v-model="_current"
      class="mx-2"
      style="flex:1"
      dense
      :items="pageList"
      outlined
      @change="toPage"
    >
      <template v-slot:item="{item}">
        第{{ item }}页
      </template>
    </v-select>
    <v-btn
      style="display:none"
      class="mx-2"
      text
      :href="nextPage"
      :disabled="_current===pages"
    >
      下一页
    </v-btn>
    <v-btn
      text
      color="pink"
      class="mx-2"
      :disabled="_current===pages"
      @click="toPage(_current +1)"
    >
      下一页
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    pages: {
      required: true,
      type: Number
    },
    tid: {
      required: false,
      type: Number,
      default: 1
    },
    o: {
      required: false,
      type: Number,
      default: 0
    },
    ky: {
      required: false,
      type: String,
      default: undefined
    },
    search: {
      required: false,
      type: Boolean,
      default: false
    },
    current: {
      required: true,
      type: Number,
      default: 1
    }
  },
  computed: {
    _current: {
      get () {
        return this.current
      },
      set (v) {
        this.$emit('current', v)
      }
    },
    pageList () {
      return Array.from(Array(this.pages), (v, k) => k + 1)
    },
    lastPage () {
      if (this.search) {
        return '/search?pg=' + (this._current - 1) + '&o=' + this.o + '&ky=' + this.ky
      } else {
        return '/t/' + this.tid + '?pg=' + (this._current - 1) + '&o=' + this.o
      }
    },
    nextPage () {
      if (this.search) {
        return '/search?pg=' + (this._current + 1) + '&o=' + this.o + '&ky=' + this.ky
      } else {
        return '/t/' + this.tid + '?pg=' + (this._current + 1) + '&o=' + this.o
      }
    }
  },
  methods: {
    toPage (page) {
      if (this.search) {
        this.$router.push({ name: 'search', query: { pg: page, o: this.o, ky: this.ky } })
      } else {
        this.$router.push({ name: 't-tid', params: { tid: this.tid }, query: { pg: page, o: this.o } })
      }
    }
  }
}
</script>

<style>

</style>
