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
          <sort :order="pageQuery.o" :search="true" :ky="pageQuery.ky" />
          <album-list
            :page-data="data"
            :tid="null"
            :search="true"
            :o="pageQuery.o"
            :ky="pageQuery.ky"
          />
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
import Sort from '@/components/Sort'
import AlbumList from '@/components/AlbumList'
import Hot from '@/components/Hot'
import { pageByQuery } from '@/api/album'
export default {
  components: {
    Erro,
    Sort,
    AlbumList,
    Hot
  },
  async fetch () {
    const { query } = this.$route
    const pageQuery = {
      pg: Number(query.pg) ? Number(query.pg) : 1,
      o: query.o ? Number(query.o) : 0,
      ky: query.ky
    }
    const { data } = await pageByQuery(this.$axios, pageQuery)
    this.data = data
    this.pageQuery = pageQuery
    this.breadcrumbs = [
      {
        text: '主页',
        disabled: false,
        href: '/'
      },
      {
        text: '搜索',
        disabled: true,
        href: '/search'
      }
    ]
  },
  data () {
    return {
      data: {},
      pageQuery: {},
      breadcrumbs: []
    }
  },
  watch: {
    '$route.query' (newQuery, oldQuery) {
      if (JSON.stringify(newQuery) !== JSON.stringify(oldQuery)) {
        this.$fetch()
      }
    }
  },
  validate ({ params, query }) {
    const regex = /^\d+$/
    const pg = regex.test(query.pg)
    const o = regex.test(query.o)
    const ky = query.ky != null
    if (query.pg && query.o) {
      return pg && o && ky
    } else if (query.pg) {
      return pg && ky
    } else if (query.o) {
      return ky && o
    }
    return ky
  },
  head () {
    return {
      title: this.pageQuery.ky + ' - 搜索'
    }
  }
}
</script>
