<template>
  <v-row>
    <v-col lg="9" md="12">
      <v-card>
        <v-card-title>
          <v-icon>
            mdi-autorenew
          </v-icon>
          最新更新
          <order :not-show-order="true" />
        </v-card-title>
        <album-list :page-data="data" />
      </v-card>
    </v-col>
    <v-col class="hidden-md-and-down" lg="3" md="0">
      <hot />
    </v-col>
  </v-row>
</template>

<script>
import Hot from '@/components/Hot'
import Order from '@/components/Order'
import AlbumList from '@/components/AlbumList'
import { pageByQuery } from '@/api/album'
export default {
  components: {
    Order,
    Hot,
    AlbumList
  },
  async asyncData ({ $axios }) {
    const pageQuery = {
      search: false
    }
    const { data } = await pageByQuery($axios, pageQuery)
    return {
      data
    }
  },
  head () {
    return {
      title: '首页'
    }
  }
}
</script>
