<template>
  <v-row>
    <v-col lg="9" md="12">
      <v-skeleton-loader
        :loading="$fetchState.pending"
        transition="scale-transition"
        type="image"
      >
        <v-card>
          <v-breadcrumbs class="hidden-xs-only" :items="breadcrumbs" />
          <div class="pt-3 text-center px-2">
            {{ data.title }}
          </div>
          <div class="d-flex mx-auto" style="max-width:500px;flex-wrap: wrap">
            <v-subheader>
              <v-icon dense>
                mdi-eye
              </v-icon>
              :{{ data.hits }}
            </v-subheader>
            <v-subheader>
              <v-icon dense>
                mdi-image
              </v-icon>
              :{{ data.count }}P
            </v-subheader>
            <v-subheader>
              <v-icon dense>
                mdi-shape-outline
              </v-icon>
              :{{ data.typeName }}
            </v-subheader>
            <v-subheader>
              <v-icon dense>
                mdi-clock-outline
              </v-icon>
              :{{ data.createTime|formatDate(true) }}
            </v-subheader>
          </div>
          <v-alert
            v-model="showAlert"
            outlined
            dismissible
            class="ma-3"
            dense
            icon="mdi-info"
            type="success"
            @input="setShowAlert"
          >
            点击图片开启预览模式,移动端预览模式下可以左右滑动切换图片
          </v-alert>
          <template v-if="notAuth">
            <v-subheader class="pa-1">
              <v-btn class="mx-auto" text nuxt to="/login" color="success">
                登录后可以浏览本套图的所有图片。。。
              </v-btn>
            </v-subheader>
            <v-subheader class="pa-1 mb-2">
              <v-btn class="mx-auto" text nuxt to="/register" color="pink">
                没有账号?立即注册
              </v-btn>
            </v-subheader>
          </template>
          <viewer
            ref="viewer"
            :images="images"
            class="mx-auto px-2"
            :style="imageStyle"
          >
            <img
              v-for="(image,index) in images"
              :key="image.id"
              :alt="data.title"
              :title="data.title"
              width="100%"
              height="100%"
              objectFitImages
              :src="imageDomain+image"
              :style="index!=0?{'display':'none'}:{}"
            >
          </viewer>
          <v-btn class="mt-3" text>
            <v-icon>mdi-share</v-icon>
            分享到:
          </v-btn>
          <share :config="config" class="pb-3 px-3" />
        </v-card>
      </v-skeleton-loader>
    </v-col>
    <v-col class="hidden-md-and-down" lg="3" md="0">
      <hot />
    </v-col>
  </v-row>
</template>

<script>
import Hot from '@/components/Hot'
import { listImageByAid } from '@/api/album'
export default {
  components: {
    Hot
  },
  async fetch () {
    console.log('fetch1')
    const { data } = await listImageByAid(this.$axios, this.$route.params.aid)
    console.log('fetch2')
    this.data = data
    // if (data === null) {
    //   return
    // }
    let images = []
    if (this.data.images.length > 15) {
      images = this.data.images.slice(0, 15)
    } else {
      images = this.data.images
    }
    this.images = images
    this.breadcrumbs = [
      {
        text: '主页',
        disabled: false,
        href: '/'
      },
      {
        text: this.data.typeName,
        disabled: false,
        href: '/t/' + this.data.tid
      },
      {
        text: this.data.title,
        disabled: true,
        href: '/t/' + this.data.tid + '/' + this.data.id
      }
    ]
  },
  data () {
    return {
      data: [],
      images: [],
      breadcrumbs: {},
      imageStyle: { 'max-width': '700px' },
      config: {}
    }
  },
  validate ({ params, query }) {
    return /^\d+$/.test(params.aid)
  },
  computed: {
    imageDomain () {
      return this.$store.state.web.imageDomain
    },
    notAuth () {
      return !this.$store.state.auth.token
    },
    showAlert: {
      get () {
        return this.$store.state.web.showAlert
      },
      set () {

      }
    }
  },
  watch: {
    '$fetchState.pending' () {
      if (!this.$fetchState.pending) {
        this.config = {
          url: 'https://www.mnxjj.com' + this.$route.path,
          title: this.data.title + ' - 美女小姐姐写真网，美女图片每日更新',
          image: this.$store.state.web.imageDomain + this.data.images[0],
          sites: ['qq', 'weibo', 'wechat', 'douban', 'facebook', 'twitter']
        }
        if (this.data.images.length > 15) {
          const lazyImageArr = this.chunk(this.data.images, 15)
          lazyImageArr.forEach((element, index) => {
            setTimeout(() => {
              this.images = this.images.concat(element)
            }, 4000 * (index + 1))
          })
        }
      }
    }
  },
  methods: {
    setShowAlert () {
      this.$cookies.set('showAlert', 0, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30
      })
      this.$store.commit('web/SET_SHOW_ALERT', false)
    },
    chunk (arr, size) {
      const arr2 = []
      for (let i = 15; i < arr.length; i = i + size) {
        arr2.push(arr.slice(i, i + size))
      }
      return arr2
    }
  },
  head () {
    return {
      title: this.data.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: +'‘' + this.data.title + '’，美女小姐姐写真网(https://www.mnxjj.com)提供图片浏览。'
        }
      ]
    }
  }
}
</script>

<style scope>
</style>
