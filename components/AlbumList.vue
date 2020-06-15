<template>
  <v-row v-resize="onResize" justify="start" align="start">
    <v-col
      v-for="album in pageData.records"
      :key="album.id"
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
            nuxt
            link
            :to="{ name: 't-tid-aid', params: { tid: album.tid,aid: album.id }}"
          >
            <v-img
              :height="imageSize.height"
              :width="imageSize.width"
              class="grey lighten-2"
              :src="'http://img.wadjj.xyz'+album.cover"
            >
              <div class="img-title white--text">
                <div class="mx-2 text-truncate" to="/">
                  {{ album.title }}
                </div>
                <div class="float-left mx-1">
                  <v-icon color="white" dense>
                    mdi-clock-outline
                  </v-icon>
                  {{ album.createTime|formatDate(false) }}
                </div>
                <div class="float-left mx-1">
                  <v-icon color="white" dense>
                    mdi-eye
                  </v-icon>
                  {{ album.hits }}
                </div>
                <div class="float-left mx-1">
                  <v-icon color="white" dense>
                    mdi-image
                  </v-icon>
                  {{ album.count }}张
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
                >
                  <v-icon>mdi-eye</v-icon>
                </v-btn>
              </v-overlay>
            </v-fade-transition>
          </v-card>
        </template>
      </v-hover>
    </v-col>
    <v-pagination
      v-if="pageData.pages>1"
      v-model="pageData.current"
      class="my-6"
      :length="pageData.pages"
      :total-visible="5"
      circle
      @input="toPage"
    />
  </v-row>
</template>

<script>
export default {
  props: {
    pageData: {
      required: true,
      type: Object
    },
    tid: {
      required: false,
      type: Number,
      default: 1
    },
    o: {
      required: false,
      type: Number,
      default: 0
    },
    ky: {
      required: false,
      type: String,
      default: undefined
    },
    search: {
      required: false,
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    windowSize: {
      x: 0,
      y: 0
    },
    imageSize: {
      width: 250,
      height: 370
    },
    totalVisible: 10,
    hover: true
  }),

  mounted () {
    this.onResize()
  },

  methods: {
    toPage (page) {
      if (this.search) {
        this.$router.push({ name: 'search', query: { pg: page, o: this.o, ky: this.ky } })
      } else {
        this.$router.push({ name: 't-tid', params: { tid: this.tid }, query: { pg: page, o: this.o } })
      }
    },
    onResize () {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight }
      if (this.windowSize.x < 600) {
        this.imageSize = {
          width: 320,
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
