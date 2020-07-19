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
    const pageQuery = {
      search: false
    }
    this.data = await pageByQuery(this.$axios, pageQuery).then(res => res.data)
    if (this.data.records.length === 0) {
      if (process.server) {
        this.$nuxt.context.res.statusCode = 404
      }
      throw new Error('网页未找到')
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
