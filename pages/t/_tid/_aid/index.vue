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
        <v-card
          class="mx-auto"
          :max-width="imageSize.width"
          :height="imageSize.height"
        >
          <viewer
            ref="viewer"
            :images="images"
          >
            <img
              v-for="(image,index) in images"
              :key="image.id"
              :max-width="imageSize.width"
              :height="imageSize.height"
              :src="$store.state.config.imageDomain+image.path"
              :style="index!=0?{'display':'none'}:{}"
            >
          </viewer>
        </v-card>
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
  async asyncData ({ $axios, params, redirect }) {
    const { data } = await listImageByAid($axios, params.aid)
    if (data.length === 0) {
      redirect('/404')
    }
    let images = []
    if (data.length > 20) {
      images = data.slice(0, 20)
    } else {
      images = data
    }
    return {
      images,
      data,
      showAlert: false,
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
      mobile: this.$store.state.config.isMobile,
      imageSize: {
        width: 350,
        height: 500
      }
    }
  },
  validate ({ params, query }) {
    return /^\d+$/.test(params.aid)
  },
  mounted () {
    if (localStorage.getItem('showAlert') === null) {
      this.showAlert = true
    } else {
      this.showAlert = localStorage.getItem('showAlert') === 'true'
    }
    if (this.data.length > 20) {
      const lazyImageArr = this.chunk(this.data, 20)
      lazyImageArr.forEach((element, index) => {
        setTimeout(() => {
          this.images = this.images.concat(element)
        }, 5000 * index)
      })
    }
  },
  methods: {
    setShowAlert (showAlert) {
      localStorage.setItem('showAlert', showAlert)
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
