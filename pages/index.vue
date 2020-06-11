<template>
  <v-row justify="center" align="start">
    <v-col v-for="index in 24" :key="index" md="4" sm="6" xs="12">
      <v-hover>
        <template v-slot="{ hover }">
          <v-card :elevation="hover ? 24 : 6">
            <nuxt-link to="/">
              <v-img
                eager
                lazy-src="https://bad.src/not/valid"
                min-height="400"
                min-width="250"
                max-height="1000"
                max-width="700"
                class="grey lighten-2"
                src="https://picsum.photos/350/165?random"
              >
                <div class="img-title white--text">
                  <div class="mx-2 text-truncate" to="/">
                    的说法就是看到了附件是的尖峰时刻劳动法的说法就是看到了附件是的尖峰时刻劳动法
                  </div>
                  <div class="float-left mx-2">
                    2020-6-11
                  </div>
                  <div class="float-right mx-2">
                    53张
                  </div>
                </div>
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular indeterminate color="grey lighten-5" />
                  </v-row>
                </template>
              </v-img>
            </nuxt-link>
          </v-card>
        </template>
      </v-hover>
    </v-col>
  </v-row>
</template>

<script>
export default {
  components: {}
}
</script>
<style lang="scss" scope>
a {
  text-decoration: none;
}
.img-title{
  position: absolute;
  bottom: 0;
  width: 100%;
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8) 0%,
    transparent 72px
  );
}
</style>
