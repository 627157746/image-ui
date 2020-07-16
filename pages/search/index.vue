<template>
  <v-row>
    <v-col lg="9" md="12">
      <v-card>
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
  fetch () {
    console.log(this.$route)
  },
  async asyncData ({ $axios, query }) {
    const pageQuery = {
      pg: Number(query.pg) ? Number(query.pg) : 1,
      o: query.o ? Number(query.o) : 0,
      ky: query.ky
    }
    const { data } = await pageByQuery($axios, pageQuery)
    return {
      data,
      pageQuery,
      breadcrumbs: [
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
    }
  },
  head () {
    return {
      title: this.pageQuery.ky + ' - 搜索'
    }
  },
  watchQuery: ['pg', 'o', 'ky']
}
</script>
