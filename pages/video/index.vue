<template>
  <v-card class="video-box d-flex justify-center align-center">
    <template v-if="videos">
      <div class="video" style="position: relative">
        <transition name="fade">
          <video
            v-show="show&&!error"
            ref="video"
            class="video"
            preload
            :loop="loop"
            :src="videos[0]"
            @click="pauseVideo"
            @ended="onPlayerEnded"
            @waiting="waiting"
            @canplay="canPlay"
            @error.prevent="videoLoadError"
          />
        </transition>
        <transition name="fade">
          <v-overlay
            v-show="(!show&&!error)||loading"
            opacity="0.1"
            :value="true"
            absolute
          >
            <v-progress-circular
              color="pink"
              indeterminate
              size="64"
            />
          </v-overlay>
        </transition>
        <transition name="fade">
          <div v-show="error" class="load-error">
            <v-card
              class="load-error d-flex align-center justify-center"
            >
              <v-chip
                color="pink"
                label
                outlined
              >
                视频加载失败请切换视频或者刷新浏览器！
              </v-chip>
            </v-card>
          </div>
        </transition>
        <div v-show="iconPlayShow&&!error" class="icon-play" style="left:50%">
          <v-btn
            fab
            dark
            large
            color="grey darken-3"
            @click="pauseVideo"
          >
            <v-icon>
              mdi-play
            </v-icon>
          </v-btn>
        </div>
      </div>
      <div class="d-flex flex-column mx-5">
        <v-btn
          class="my-2"
          fab
          dark
          large
          color="pink"
          :disabled="disableLike(videos[current])"
          @click="like(videos[current])"
        >
          <v-icon>
            mdi-heart
          </v-icon>
        </v-btn>
        <v-btn
          class="my-2"
          fab
          dark
          large
          color="grey"
          :disabled="disableDislike(videos[current])"
          @click="dislike(videos[current])"
        >
          <v-icon>
            mdi-thumb-down
          </v-icon>
        </v-btn>
        <v-btn
          v-ripple
          class="my-2"
          fab
          dark
          large
          color="light-blue"
          @click="changeVideo"
        >
          <v-icon>
            mdi-autorenew
          </v-icon>
        </v-btn>
        <v-btn
          v-ripple
          class="my-2"
          fab
          dark
          large
          color="light-green"
          @click="fullscreenVideo"
        >
          <v-icon>
            mdi-fullscreen
          </v-icon>
        </v-btn>
        <v-switch
          v-model="loop"
          primary
          color="orange"
          label="循环播放"
        />
      </div>
    </template>
    <template v-else>
      <v-chip
        color="pink"
        label
        outlined
      >
        无法获取到视频源
      </v-chip>
    </template>
  </v-card>
</template>

<script>
import { getList, score } from '@/api/video'
export default {
  middleware: 'video-client',
  async asyncData ({ $axios }) {
    const { data } = await getList($axios)
    return {
      videos: data
    }
  },
  data () {
    return {
      video: null,
      loop: false,
      current: 0,
      error: false,
      show: false,
      loading: false,
      iconPlayShow: false,
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
    this.video = this.$refs.video
    this.playVideo()
  },
  methods: {
    playVideo () {
      setTimeout(() => {
        this.video.play()
        if (this.video.paused) {
          this.iconPlayShow = true
        }
      }, 100)
    },
    async changeVideo () {
      if (document.fullscreenElement) {
        this.show = true
      } else {
        this.show = false
      }
      this.error = false
      setTimeout(() => {
        this.video.pause()
        this.iconPlayShow = false
        this.current += 1
        this.video.src = this.videos[this.current]
        this.video.play()
        if (this.video.paused) {
          this.iconPlayShow = true
        }
      }, 500)
      if (this.videos.length - this.current <= 3) {
        const { data } = await getList(this.$axios)
        data.forEach((item) => {
          this.videos.push(item)
        })
      }
    },
    pauseVideo () {
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
    canPlay () {
      this.loading = false
      this.show = true
    },
    waiting () {
      this.loading = true
    },
    onPlayerEnded () {
      this.changeVideo()
    },
    videoLoadError () {
      this.error = true
    },
    fullscreenVideo () {
      const video = this.video
      if (video.requestFullScreen) {
        video.requestFullScreen()
      } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen()
      } else if (video.webkitRequestFullScreen) {
        video.webkitRequestFullScreen()
      } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen()
      } else {
        this.$toast.show('抱歉您的浏览器不支持全屏播放')
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

<style lang="scss" scoped>
.video-box{
  height: 80vh;
  .video,.load-error{
    // object-fit: fill !important;
    width: 480px;
    height: 100%;
  }
}
</style>
