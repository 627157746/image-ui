<template>
  <div>
    <v-carousel
      class="mb-6"
      cycle
      interval="3000"
      progress
      show-arrows-on-hover
      hide-delimiter-background
    >
      <v-carousel-item
        v-for="album in hot.slice(0,5)"
        :key="album.id"
        nuxt
        link
        :to="{ name: 't-tid-aid', params: { tid: album.tid,aid: album.id }}"
        :src="'http://img.wadjj.xyz'+album.cover"
      />
    </v-carousel>
    <v-hover>
      <template v-slot="{ hover }">
        <v-card
          :elevation="hover ? 24 : 6"
        >
          <v-card-title>
            <v-icon>
              mdi-fire
            </v-icon>
            热门
          </v-card-title>
          <v-list>
            <v-list-item
              v-for="(album,index) in hot"
              :key="album.id"
              nuxt
              link
              :to="{ name: 't-tid-aid', params: { tid: album.tid,aid: album.id }}"
              class="my-2"
            >
              <v-list-item-icon>
                <v-icon large :color="index<3?'red':''">
                  {{ 'mdi-numeric-'+(index+1)+'-box-outline' }}
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  {{ album.title }}
                </v-list-item-title>
                <v-list-item-subtitle class="mx-3">
                  <v-icon>
                    mdi-eye
                  </v-icon>
                  {{ album.hits }}
                  <v-icon>
                    mdi-image
                  </v-icon>
                  {{ album.count }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </template>
    </v-hover>
  </div>
</template>

<script>
export default {
  data () {
    return {
      hot: this.$store.state.config.hot
    }
  }
}
</script>

<style>

</style>
