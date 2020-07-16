<template>
  <v-row>
    <v-col lg="9" md="12">
      <v-skeleton-loader
        :loading="$fetchState.pending"
        transition="scale-transition"
        type="image"
      >
        <v-card v-if="$fetchState.error">
          {{ $fetchState.error.msg }}
        </v-card>
        <v-card v-else>
          <v-card-title>
            <v-icon>
              mdi-autorenew
            </v-icon>
            最新更新
            <sort :not-show-order="true" />
          </v-card-title>
          <album-list :page-data="data" />
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
import Sort from '@/components/Sort'
import AlbumList from '@/components/AlbumList'
import { pageByQuery } from '@/api/album'
export default {
  components: {
    Sort,
    Hot,
    AlbumList
  },
  async fetch () {
    const pageQuery = {
      search: false
    }
    this.data = await pageByQuery(this.$axios, pageQuery).then(res => res.data)
    if (!this.data) {
      if (process.server) {
        this.$nuxt.context.res.statusCode = 404
      }
      throw new Error('系统繁忙')
    }
  },
  data () {
    return {
      data: {}
    }
  },
  head () {
    return {
      title: '首页'
    }
  }
}
</script>
