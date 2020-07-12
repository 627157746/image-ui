<template>
  <v-card class="video-box d-flex justify-center align-center">
    <transition name="fade">
      <video
        v-show="show"
        ref="video"
        class="video"
        preload
        :loop="loop"
        :src="videos[0]"
        @click="pauseVideo"
        @ended="onPlayerEnded($event)"
      />
    </transition>
    <div v-show="iconPlayShow">
      <div class="mr-10 icon-play d-flex justify-center">
        <v-btn fab dark large color="grey darken-3" @click="playVideo">
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
          mdi-thumb-up
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
      <v-switch
        v-model="loop"
        primary
        color="orange"
        label="循环播放"
      />
      <v-chip
        color="red"
        label
        outlined
      >
        播放错误时请刷新浏览器！
      </v-chip>
    </div>
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
      loop: true,
      current: 0,
      show: true,
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
    this.video = this.$refs.video
    this.playVideo()
  },
  methods: {
    playVideo () {
      this.iconPlayShow = false
      this.video.play()
    },
    async changeVideo () {
      this.show = false
      setTimeout(() => {
        this.video.pause()
        this.iconPlayShow = false
        this.current += 1
        this.video.src = this.videos[this.current]
        this.show = true
        this.video.play()
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
    onPlayerEnded () { // 视频结束
      this.changeVideo()
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
  .video{
    object-fit: fill !important;
    width: 480px;
    height: 100%;
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
