<template>
  <v-row>
    <v-col lg="9" md="12">
      <v-card>
        <v-card-title>
          <v-icon>
            mdi-autorenew
          </v-icon>
          最新更新
        </v-card-title>
        <album-list />
      </v-card>
    </v-col>
    <v-col lg="3" md="0">
      <hot />
    </v-col>
  </v-row>
</template>

<script>
import Hot from '@/components/Hot'
import AlbumList from '@/components/AlbumList'
export default {
  components: {
    Hot,
    AlbumList
  }
}
</script>
