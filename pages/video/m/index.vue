<template>
  <v-card
    v-touch="touch"
    class="video-box"
  >
    <template v-if="videos">
      <transition name="fade">
        <video
          v-show="show&&!error"
          ref="video"
          class="video"
          webkit-playsinline="true"
          playsinline="true"
          x5-video-player-type="h5"
          x5-video-player-fullscreen="true"
          preload
          loop
          :src="videos[0]"
          @canplaythrough="canPlayThrough"
          @click="pauseVideo"
          @error.prevent="videoLoadError"
        />
      </transition>
      <transition name="fade">
        <v-overlay
          v-show="!show&&!error"
          opacity="0.1"
          :value="true"
          absolute
        >
          <v-progress-circular
            color="red lighten-1"
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
              color="red"
              label
              outlined
            >
              视频加载失败请切换视频或者刷新浏览器！
            </v-chip>
          </v-card>
        </div>
      </transition>
      <div v-show="iconPlayShow&&!error" class="icon-play" style="left:45%">
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
      <div class="tool-btns">
        <div class="d-flex flex-column">
          <v-btn
            class="my-2"
            fab
            dark
            color="transparent"
            :disabled="disableLike(videos[current])"
            @click="like(videos[current])"
          >
            <v-icon color="pink">
              mdi-heart
            </v-icon>
          </v-btn>
          <v-btn
            class="my-2"
            fab
            dark
            color="transparent"
            :disabled="disableDislike(videos[current])"
            @click="dislike(videos[current])"
          >
            <v-icon color="grey darken-4">
              mdi-thumb-down
            </v-icon>
          </v-btn>
        </div>
      </div>
    </template>
    <template v-else>
      <v-chip
        color="red"
        label
        outlined
      >
        无法获取到视频源请联系管理员
      </v-chip>
    </template>
  </v-card>
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
      video: null,
      current: 0,
      error: false,
      show: false,
      iconPlayShow: false,
      likeList: [],
      dislikeList: [],
      touch: {
        up: () => this.changeVideo('up'),
        down: () => this.changeVideo('down')
      }
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
    this.playVideo()
  },
  methods: {
    playVideo () {
      this.video = this.$refs.video
      setTimeout(() => {
        this.video.play()
        if (this.video.paused) {
          this.iconPlayShow = true
        }
      }, 100)
      const showTip = localStorage.getItem('tip') !== '1'
      if (showTip) {
        this.$toast.show('上滑加载下一条视频，下滑加载上一条视频', { position: 'bottom-center', duration: 3000 })
        localStorage.setItem('tip', '1')
      }
    },
    async changeVideo (direction) {
      this.show = false
      this.error = false
      setTimeout(() => {
        this.video.pause()
        this.iconPlayShow = false
        if (direction === 'down') {
          if (this.current > 0) {
            this.current -= 1
          }
        } else {
          this.current += 1
        }
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
    videoLoadError () {
      this.error = true
    },
    canPlayThrough () {
      this.show = true
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
  height: 100vh;
  .video,.load-error{
    object-fit: fill !important;
    width: 100%;
    height: 100%;
  }
  .tool-btns{
    position: absolute;
    top:30%;
    right:20px;
    z-index: 999;
  }
}
</style>
