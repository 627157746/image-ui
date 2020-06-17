<template>
  <div class="px-3 d-flex .text-decoration-none">
    <v-btn
      class="mx-2"
      text
      :href="lastPage"
      :disabled="current===1"
    >
      上一页
    </v-btn>
    <v-select
      v-model="current"
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
      class="mx-2"
      text
      :href="nextPage"
      :disabled="current===pages"
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
    pageList () {
      return Array.from(Array(this.pages), (v, k) => k + 1)
    },
    lastPage () {
      if (this.search) {
        return '/search?pg=' + (this.current - 1) + '&o=' + this.o + '&ky=' + this.ky
      } else {
        return '/t/' + this.tid + '?pg=' + (this.current - 1) + '&o=' + this.o
      }
    },
    nextPage () {
      if (this.search) {
        return '/search?pg=' + (this.current + 1) + '&o=' + this.o + '&ky=' + this.ky
      } else {
        return '/t/' + this.tid + '?pg=' + (this.current + 1) + '&o=' + this.o
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
