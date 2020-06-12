<template>
  <v-row v-resize="onResize" justify="center" align="start">
    <v-col
      v-for="index in 24"
      :key="index"
      xl="3"
      md="4"
      sm="6"
      xs="12"
    >
      <v-hover :disabled="hover">
        <template v-slot="{ hover }">
          <v-card
            class="mx-3"
            :height="imageSize.height"
            :width="imageSize.width"
            :elevation="hover ? 24 : 6"
          >
            <v-img
              :height="imageSize.height"
              :width="imageSize.width"
              eager
              lazy-src="https://bad.src/not/valid"
              class="grey lighten-2"
              src="https://picsum.photos/510/300?random"
            >
              <div class="img-title white--text">
                <div class="mx-2 text-truncate" to="/">
                  的说法就是看到了附件是的尖峰时刻劳动法的说法就是看到了附件是的尖峰时刻劳动法
                </div>
                <div class="float-left mx-1">
                  <v-icon color="white" dense>
                    mdi-clock-outline
                  </v-icon>
                  2020-6-11
                </div>
                <div class="float-left mx-1">
                  <v-icon color="white" dense>
                    mdi-eye
                  </v-icon>
                  66666
                </div>
                <div class="float-left mx-1">
                  <v-icon color="white" dense>
                    mdi-image
                  </v-icon>
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
            <v-fade-transition>
              <v-overlay
                v-if="hover"
                absolute
                color="#036358"
              >
                <v-btn
                  color="pink"
                  icon
                  nuxt
                  link
                  to="/t/1/1111"
                >
                  <v-icon>mdi-eye</v-icon>
                </v-btn>
              </v-overlay>
            </v-fade-transition>
          </v-card>
        </template>
      </v-hover>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    windowSize: {
      x: 0,
      y: 0
    },
    imageSize: {
      width: 250,
      height: 370
    },
    hover: true
  }),

  mounted () {
    this.onResize()
  },

  methods: {
    onResize () {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight }
      if (this.windowSize.x < 600) {
        this.imageSize = {
          width: 330,
          height: 500
        }
        this.hover = true
      } else {
        this.imageSize = {
          width: 250,
          height: 370
        }
        this.hover = false
      }
    }
  }
}
</script>
<style lang="scss" scope>
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
