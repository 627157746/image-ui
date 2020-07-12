<template>
  <div class="container-box">
    <div v-if="videos" class="van-swipe">
      <van-swipe
        :initial-swipe="initial"
        :show-indicators="false"
        vertical
        :loop="false"
        @change="onChange"
      >
        <van-swipe-item
          v-for="(item, index) in videos"
          :key="index"
          class="product-swiper"
        >
          <video
            class="video-box"
            loop
            :src="item"
            preload
            @click="pauseVideo"
          />
          <img
            v-show="iconPlayShow"
            class="icon-play"
            src="https://npjy.oss-cn-beijing.aliyuncs.com/images/file-1575340653940esdHR.png"
            @click="playVideo"
          >
          <div class="tools-right">
            <div class="tools-r-li">
              <v-btn icon :disabled="disableLike(item)">
                <v-icon large style="color:red" @click="like(item)">
                  mdi-thumb-up
                </v-icon>
              </v-btn>
            </div>
            <div class="tools-r-li">
              <v-btn icon :disabled="disableDislike(item)">
                <v-icon large style="color:grey" @click="dislike(item)">
                  mdi-thumb-down
                </v-icon>
              </v-btn>
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div v-else>
      系统繁忙
    </div>
  </div>
</template>

<script>
import { getList, score } from '@/api/video'
export default {
  middleware: 'video-client',
  layout: 'video',
  async asyncData ({ $axios }) {
    const { data } = await getList($axios)
    return {
      videos: data
    }
  },
  data () {
    return {
      initial: 0,
      current: 0,
      video: null,
      iconPlayShow: true,
      likeList: [],
      dislikeList: []
    }
  },
  computed: {
    disableLike () {
      return function (url) {
        return this.likeList.includes(url)
      }
    },
    disableDislike () {
      return function (url) {
        return this.dislikeList.includes(url)
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.playVideo()
    }, 500)
  },
  methods: {
    async onChange (index) {
      this.video.pause()
      this.video = document.querySelectorAll('video')[index]
      this.current = index
      setTimeout(() => {
        this.iconPlayShow = false
        this.video.play()
      }, 100)
      if (this.videos.length - this.current <= 3) {
        const { data } = await getList(this.$axios)
        data.forEach((item) => {
          this.videos.push(item)
        })
        this.initial = index
      }
    },
    // 开始播放
    playVideo (event) {
      this.video = document.querySelectorAll('video')[this.current]
      this.iconPlayShow = false
      this.video.play()
    },
    pauseVideo () { // 暂停\播放
      if (this.video.paused) {
        setTimeout(() => {
          this.iconPlayShow = false
          this.video.play()
        }, 100)
      } else {
        setTimeout(() => {
          this.iconPlayShow = true
          this.video.pause()
        }, 100)
      }
    },
    like (url) {
      this.likeList.push(url)
      const data = {
        url,
        type: 1
      }
      score(this.$axios, data)
    },
    dislike (url) {
      this.dislikeList.push(url)
      const data = {
        url,
        type: 2
      }
      score(this.$axios, data)
    }
  },
  head () {
    return {
      title: '短视频'
    }
  }
}
</script>

<style scope>
    .video-player {
        height: 100vh;
        width: 100vw;
    }
    .product-swiper {
        width: 100vw;
        height: 100vh;
    }
    .van-swipe {
        width: 100vw;
        height: 100vh;
        max-width: 550px;
        margin: 0 auto;
        position: relative;
    }
    .van-swipe {
        width: 100%;
        height: 100%;
    }
    .container-box {
        width: 100vw;
        height: 100vh;
    }
    .video-box {
        object-fit: fill !important;
        /*z-index: 999;*/
        width: 100%;
        height: 100%;
    }
    video {
        object-position: 0 0;
    }
    .tools-right {
        z-index: 1001;
        position: absolute;
        right: 20px;
        top: 40vh
    }
    .tools-r-li {
      margin-bottom: 30px;
      position: relative;
    }
    .tools-r-li:last-child {
        margin-bottom: 0px;
    }
</style>
