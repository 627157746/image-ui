<template>
  <v-row v-resize="onResize" justify="start" align="start">
    <v-col
      v-for="album in pageData.records"
      :key="album.id"
      xl="3"
      md="4"
      sm="6"
      cols="12"
    >
      <v-hover :disabled="hover">
        <template v-slot="{ hover }">
          <v-card
            class="mx-sm-3 mx-md-3 mx-lg-3 mx-xl-3 mx-1"
            :height="imageSize.height"
            :elevation="hover ? 24 : 6"
            nuxt
            link
            :to="{ name: 't-tid-aid', params: { tid: album.tid,aid: album.id }}"
          >
            <v-img
              :height="imageSize.height"
              :width="imageSize.width"
              class="grey lighten-2"
              :src="$store.state.config.imageDomain+album.cover"
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
    <v-col v-show="pageData.pages>1&&!mobile">
      <v-pagination
        v-model="pageData.current"
        class="mt-12 px-3"
        :length="pageData.pages"
        :total-visible="totalVisible"
        circle
        @input="toPage"
      />
    </v-col>
    <v-col v-show="pageData.pages>1&&mobile">
      <mb-pagination
        :current="pageData.current"
        :pages="pageData.pages"
        :search="search"
        :tid="tid"
        :o="o"
        :ky="ky"
      />
    </v-col>
  </v-row>
</template>

<script>
import MbPagination from '@/components/MbPagination'
export default {
  components: {
    MbPagination
  },
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
      width: '100%',
      height: 370
    },
    totalVisible: 7,
    hover: true,
    mobile: false
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
      if (this.windowSize.x < 450) {
        this.imageSize = {
          height: 500
        }
        this.hover = true
        this.mobile = true
      } else {
        this.imageSize = {
          height: 370
        }
        this.hover = false
        this.mobile = false
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
