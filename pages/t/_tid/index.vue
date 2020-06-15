<template>
  <v-row>
    <v-col lg="9" md="12">
      <v-card>
        <v-card-title class="hidden-sm-and-down">
          <v-breadcrumbs :items="breadcrumbs" />
        </v-card-title>
        <order :order="pageQuery.o" :tid="pageQuery.t" />
        <album-list :page-data="data" :tid="pageQuery.t" :o="pageQuery.o" />
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
import Order from '@/components/Order'
import { pageByQuery } from '@/api/album'
export default {
  components: {
    Order,
    Hot,
    AlbumList
  },
  async asyncData ({ $axios, params, query, redirect }) {
    const pageQuery = {
      t: Number(params.tid),
      pg: Number(query.pg) ? Number(query.pg) : 1,
      o: query.o ? Number(query.o) : 0
    }
    const { data } = await pageByQuery($axios, pageQuery)
    if (data.records.length === 0) {
      redirect('/404')
    }
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
          text: data.records[0].typeName,
          disabled: true,
          href: '/t/' + data.records[0].tid
        }
      ]
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
      title: this.data.records[0].typeName
    }
  },
  watchQuery: ['pg', 'o']
}
</script>
