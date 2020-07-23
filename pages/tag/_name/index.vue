<template>
  <v-row>
    <v-col lg="9" md="12">
      <v-skeleton-loader
        :loading="$fetchState.pending"
        transition="scale-transition"
        type="image"
      >
        <erro v-if="$fetchState.error" :message="$fetchState.error.message" />
        <v-card v-else>
          <v-breadcrumbs class="hidden-sm-and-down" :items="breadcrumbs" />
          <album-list :page-data="data" :tag="true" :tag-name="name" />
        </v-card>
      </v-skeleton-loader>
    </v-col>
    <v-col class="hidden-md-and-down" lg="3" md="0">
      <hot />
    </v-col>
  </v-row>
</template>

<script>
import Erro from '@/components/Erro'
import AlbumList from '@/components/AlbumList'
import Hot from '@/components/Hot'
import { listByName } from '@/api/album'
export default {
  components: {
    Erro,
    AlbumList,
    Hot
  },
  async fetch () {
    const { params, query } = this.$route
    const name = params.name
    const pageQuery = {
      pg: Number(query.pg) ? Number(query.pg) : 1,
      ky: name
    }
    const { data } = await listByName(this.$axios, pageQuery)
    if (data.records.length === 0) {
      if (process.server) {
        this.$nuxt.context.res.statusCode = 404
      }
      throw new Error('网页未找到')
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
        text: '专题',
        disabled: false,
        href: '/tags/'
      },
      {
        text: name,
        disabled: true,
        href: '/tags/' + name
      }
    ]
    this.name = name
  },
  data () {
    return {
      data: {},
      pageQuery: {},
      breadcrumbs: [],
      name: ''
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
  head () {
    return {
      title: this.name + ' - 专题'
    }
  }
}
</script>
