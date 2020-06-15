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
          class="mx-3"
        >
          <viewer
            ref="viewer"
            :images="data"
          >
            <img
              v-for="(image,index) in data"
              :key="image.id"
              width="100%"
              :src="'http://img.wadjj.xyz'+image.path"
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
  validate ({ params, query }) {
    return /^\d+$/.test(params.aid)
  },
  async asyncData ({ $axios, params, redirect }) {
    const { data } = await listImageByAid($axios, params.aid)
    if (data.length === 0) {
      redirect('/404')
    }
    return {
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
  mounted () {
    if (localStorage.getItem('showAlert') === null) {
      this.showAlert = true
    } else {
      this.showAlert = localStorage.getItem('showAlert') === 'true'
    }
  },
  methods: {
    setShowAlert (showAlert) {
      localStorage.setItem('showAlert', showAlert)
    }
  },
  head () {
    return {
      title: this.data[0].title
    }
  }
}
</script>

<style scope>
</style>
