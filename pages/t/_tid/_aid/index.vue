<template>
  <v-row>
    <v-col lg="9" md="12">
      <v-card>
        <v-card-title class="hidden-sm-and-down">
          <v-breadcrumbs :items="breadcrumbs" />
        </v-card-title>
        <div class="title mx-3 mb-3">
          {{ data[0].title }}
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
          点击图片开启预览模式
        </v-alert>
        <viewer
          ref="viewer"
          :images="images"
          class="mx-auto px-2"
          :style="imageStyle"
        >
          <img
            v-for="(image,index) in images"
            :key="image.id"
            width="100%"
            height="100%"
            objectFitImages
            :src="$store.state.config.imageDomain+image.path"
            :style="index!=0?{'display':'none'}:{}"
          >
        </viewer>
        <v-btn class="mt-3" icon>
          <v-icon>mdi-share</v-icon>
        </v-btn>
        <share class="pb-3" />
      </v-card>
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
  async asyncData ({ $axios, params, redirect, store }) {
    const { data } = await listImageByAid($axios, params.aid)
    if (data.length === 0) {
      redirect('/404')
    }
    let images = []
    if (data.length > 15) {
      images = data.slice(0, 15)
    } else {
      images = data
    }
    return {
      images,
      data,
      showAlert: store.state.config.showAlert,
      breadcrumbs: [
        {
          text: '主页',
          disabled: false,
          href: '/'
        },
        {
          text: data[0].typeName,
          disabled: false,
          href: '/t/' + data[0].tid
        },
        {
          text: data[0].title,
          disabled: true,
          href: '/t/' + data[0].tid + '/' + data[0].id
        }
      ]
    }
  },
  data () {
    return {
      imageStyle: { 'max-width': '700px' }
    }
  },
  validate ({ params, query }) {
    return /^\d+$/.test(params.aid)
  },
  mounted () {
    if (this.data.length > 15 && this.tid !== 5) {
      const lazyImageArr = this.chunk(this.data, 15)
      lazyImageArr.forEach((element, index) => {
        setTimeout(() => {
          this.images = this.images.concat(element)
        }, 4000 * (index + 1))
      })
    }
  },
  methods: {
    setShowAlert (showAlert) {
      this.$cookies.set('showAlert', showAlert ? 1 : 0, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30
      })
    },
    chunk (arr, size) {
      const arr2 = []
      for (let i = 20; i < arr.length; i = i + size) {
        arr2.push(arr.slice(i, i + size))
      }
      return arr2
    }
  },
  head () {
    return {
      title: this.data[0].title,
      meta: [
        { hid: 'description', name: 'description', content: +'‘' + this.data[0].title + '’我爱大姐姐写真网(wadjj.xyz)提供图片浏览。' }
      ]
    }
  }
}
</script>

<style scope>
</style>
