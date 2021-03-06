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
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              class="my-2"
              fab
              dark
              large
              color="pink"
              :disabled="disableLike(videos[current])"
              v-on="on"
              @click="like(videos[current])"
            >
              <v-icon>
                mdi-heart
              </v-icon>
            </v-btn>
          </template>
          <span>喜欢</span>
        </v-tooltip>
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              class="my-2"
              fab
              dark
              large
              color="grey"
              :disabled="disableDislike(videos[current])"
              v-on="on"
              @click="dislike(videos[current])"
            >
              <v-icon>
                mdi-thumb-down
              </v-icon>
            </v-btn>
          </template>
          <span>不喜欢</span>
        </v-tooltip>
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-ripple
              v-bind="attrs"
              class="my-2"
              fab
              dark
              large
              color="light-blue"
              v-on="on"
              @click="changeVideo(true)"
            >
              <v-icon>
                mdi-autorenew
              </v-icon>
            </v-btn>
          </template>
          <span>切换</span>
        </v-tooltip>
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-ripple
              v-bind="attrs"
              class="my-2"
              fab
              dark
              large
              color="light-green"
              v-on="on"
              @click="fullscreenVideo"
            >
              <v-icon>
                mdi-fullscreen
              </v-icon>
            </v-btn>
          </template>
          <span>全屏</span>
        </v-tooltip>
        <v-switch
          v-model="loop"
          primary
          color="orange"
          label="循环播放"
        />
        <v-chip color="pink" outlined>
          键盘上下按键切换视频!
        </v-chip>
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
  async fetch () {
    this.videos = await getList(this.$axios).then(res => res.data)
  },
  data () {
    return {
      videos: [],
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
  watch: {
    '$fetchState.pending' () {
      this.playVideo()
    }
  },
  destroyed () {
    this.video.pause()
    this.video.src = ''
  },
  mounted () {
    document.onkeyup = (e) => {
      switch (e.code) {
        case 'ArrowUp':
          this.changeVideo(false)
          break
        case 'ArrowDown':
          this.changeVideo(true)
          break
        default:
          break
      }
    }
    this.playVideo()
  },
  methods: {
    playVideo () {
      if (!this.$fetchState.pending) {
        this.video = this.$refs.video
        setTimeout(() => {
          this.video.play()
          if (this.video.paused) {
            this.iconPlayShow = true
          }
        }, 100)
      }
    },
    async changeVideo (next) {
      if (document.fullscreenElement) {
        this.show = true
      } else {
        this.show = false
      }
      this.error = false
      setTimeout(() => {
        this.video.pause()
        this.iconPlayShow = false
        if (next) {
          this.current += 1
        } else if (this.current > 0) {
          this.current -= 1
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
    width: 480px;
    height: 100%;
  }
}
</style>
