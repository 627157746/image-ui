<template>
  <v-row>
    <v-col lg="9" md="12">
      <v-skeleton-loader
        :loading="$fetchState.pending"
        transition="scale-transition"
        type="image"
      >
        <v-card>
          <v-breadcrumbs class="hidden-sm-and-down" :items="breadcrumbs" />
          <sort
            :order="pageQuery.o"
            :tid="pageQuery.t"
            @order="setOrder"
            @tid="setT"
          />
          <album-list :page-data="data" :tid="pageQuery.t" :o="pageQuery.o" />
        </v-card>
      </v-skeleton-loader>
    </v-col>
    <v-col class="hidden-md-and-down" lg="3" md="0">
      <hot />
    </v-col>
  </v-row>
</template>

<script>
import Hot from '@/components/Hot'
import AlbumList from '@/components/AlbumList'
import Sort from '@/components/Sort'
import { pageByQuery } from '@/api/album'
export default {
  components: {
    Sort,
    Hot,
    AlbumList
  },
  async fetch () {
    const params = this.$route.params
    const query = this.$route.query
    const pageQuery = {
      t: Number(params.tid),
      pg: Number(query.pg) ? Number(query.pg) : 1,
      o: query.o ? Number(query.o) : 0
    }
    const { data } = await pageByQuery(this.$axios, pageQuery)
    if (data.records.length === 0) {
      if (process.server) {
        this.$nuxt.context.res.statusCode = 404
      }
      throw new Error('Post not found')
    }
    this.data = data
    this.pageQuery = pageQuery
    this.breadcrumbs = [
      {
        text: '主页',
        disabled: false,
        href: '/'
      },
      {
        text: data.records[0].typeName,
        disabled: true,
        href: '/t/' + data.records[0].tid
      }
    ]
    this.title = data.records[0].typeName
  },
  data () {
    return {
      data: {},
      pageQuery: {},
      breadcrumbs: [],
      title: ''
    }
  },
  watch: {
    '$route.query' (newQuery, oldQuery) {
      if (this._inactive === false && JSON.stringify(newQuery) !== JSON.stringify(oldQuery)) {
        this.$fetch()
      }
    }
  },
  methods: {
    setOrder (v) {
      this.pageQuery.o = v
    },
    setT (v) {
      this.pageQuery.t = v
    }
  },
  validate ({ params, query }) {
    const regex = /^\d+$/
    const pg = regex.test(query.pg)
    const o = regex.test(query.o)
    const tid = regex.test(params.tid)
    if (query.pg && query.o) {
      return pg && o && tid
    } else if (query.pg) {
      return pg && tid
    } else if (query.o) {
      return tid && o
    }
    return tid
  },
  head () {
    return {
      title: this.title
    }
  }
}
</script>
