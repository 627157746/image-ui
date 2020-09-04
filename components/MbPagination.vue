<template>
  <div class="px-3 d-flex text-decoration-none">
    <v-btn
      color="pink"
      class="mx-2"
      :disabled="_current===1"
      :to="toPage(_current - 1)"
      exact
      nuxt
      link
      outlined
    >
      上一页
    </v-btn>
    <v-select
      v-model="current"
      class="mx-2"
      style="flex:1"
      dense
      :items="pageList"
    >
      <template v-slot:item="{item}">
        <v-list-item
          class="my-1"
          block
          :to="toPage(item)"
          nuxt
          link
          exact
        >
          <v-list-item-content>
            <v-list-item-title>
              第{{ item }}页
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-select>
    <v-btn
      color="pink"
      class="mx-2"
      :disabled="_current===pages"
      :to="toPage(_current+1)"
      exact
      nuxt
      link
      outlined
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
    },
    tag: {
      required: false,
      type: Boolean,
      default: false
    },
    tagName: {
      required: false,
      type: String,
      default: undefined
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
    toPage (page) {
      return function (page) {
        if (this.ky) {
          return { name: 'search', query: { pg: page, o: this.o, ky: this.ky } }
        } else if (this.tag) {
          return { name: 'tag-name', params: { name: this.tagName }, query: { pg: page } }
        } else {
          return { name: 't-tid', params: { tid: this.tid }, query: { pg: page, o: this.o } }
        }
      }
    }
  }
}
</script>

<style>

</style>
