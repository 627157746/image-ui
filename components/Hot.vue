<template>
  <div>
    <v-carousel
      class="mb-6"
      cycle
      interval="3000"
      show-arrows-on-hover
      hide-delimiter-background
    >
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        nuxt
        link
        to="/11111/1"
        :src="item.src"
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
              v-for="index in 10"
              :key="index"
              nuxt
              link
              to="/3232233"
              class="my-2"
            >
              <v-list-item-icon>
                <v-icon large :color="index<4?'red':''">
                  {{ 'mdi-numeric-'+index+'-box-outline' }}
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  但是发射点发射点犯得上犯得上犯得上反对得上犯得上反对
                </v-list-item-title>
                <v-list-item-subtitle class="mx-3">
                  <v-icon>
                    mdi-eye
                  </v-icon>
                  666
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
  data: () => ({
    items: [
      {
        src: 'https://picsum.photos/510/300?random'
      },
      {
        src: 'https://picsum.photos/510/300?random'
      },
      {
        src: 'https://picsum.photos/510/300?random'
      },
      {
        src: 'https://picsum.photos/510/300?random'
      }
    ]
  })
}
</script>

<style>

</style>
