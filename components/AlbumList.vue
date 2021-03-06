<template>
  <v-row dense justify="start" align="start">
    <v-col
      v-for="album in pageData.records"
      :key="album.id"
      xl="3"
      md="3"
      sm="4"
      :cols="display"
    >
      <v-hover :disabled="false">
        <template v-slot="{ hover }">
          <v-card
            class="mx-sm-3 mx-md-3 mx-lg-3 mx-xl-3 mx-1"
            :elevation="hover ? 24 : 6"
            nuxt
            link
            :to="{ name: 't-tid-aid', params: { tid: album.tid,aid: album.id }}"
          >
            <v-img
              :alt="album.title"
              aspect-ratio="0.7"
              class="grey lighten-2 mx-auto"
              :src="imageDomain+album.cover"
            >
              <div class="img-title white--text">
                <div
                  v-if="ky"
                  class="mx-2 text-truncate"
                  style="font-size:14px"
                  to="/"
                  v-html="album.title"
                />
                <div v-else class="mx-2 text-truncate" style="font-size:14px" to="/">
                  {{ album.title }}
                </div>
                <div class="float-left mx-1" style="font-size:10px">
                  <v-icon color="white" dense>
                    mdi-clock-outline
                  </v-icon>
                  {{ album.createTime|formatTime }}
                </div>
              </div>
              <template v-slot:placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <v-progress-circular indeterminate color="pink" />
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
    <v-chip v-if="ky&&pageData.total===0" class="ml-6 my-3" color="pink lighten-3">
      <span class="mx-2" style="color:white">{{ ky }}</span>的搜索结果为空
    </v-chip>
    <v-col v-if="pageData.pages>1" class="hidden-xs-only">
      <v-pagination
        v-model="pageData.current"
        class="mt-12 px-3"
        :length="pageData.pages"
        :total-visible="totalVisible"
        circle
        @input="toPage"
      />
    </v-col>
    <v-col v-if="pageData.pages>1" class="hidden-sm-and-up">
      <mb-pagination
        :current="pageData.current"
        :pages="pageData.pages"
        :search="search"
        :tid="tid"
        :o="o"
        :ky="ky"
        :tag-name="tagName"
        :tag="tag"
        @current="setCurrent"
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
    },
    tag: {
      required: false,
      type: Boolean,
      default: false
    },
    tagName: {
      required: false,
      type: String,
      default: undefined
    }
  },
  data () {
    return {
      imageSize: {
        width: '100%'
      },
      totalVisible: 7
    }
  },
  computed: {
    imageDomain () {
      return this.$store.state.web.imageDomain
    },
    display () {
      return this.$store.state.web.display
    }
  },

  methods: {
    toPage (page) {
      if (this.search) {
        this.$router.push({ name: 'search', query: { pg: page, o: this.o, ky: this.ky } })
      } else if (this.tag) {
        this.$router.push({ name: 'tag-name', params: { name: this.tagName }, query: { pg: page } })
      } else {
        this.$router.push({ name: 't-tid', params: { tid: this.tid }, query: { pg: page, o: this.o } })
      }
    },
    setCurrent (v) {
      this.pageData.current = v
    }
  }
}
</script>
