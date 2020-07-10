<template>
  <div class="container-box">
    <div class="van-swipe">
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
            :playOrPause="playOrPause"
            @click="pauseVideo"
            @ended="onPlayerEnded($event)"
          />
          <img
            v-show="iconPlayShow"
            class="icon-play"
            src="http://npjy.oss-cn-beijing.aliyuncs.com/images/file-1575340653940esdHR.png"
            @click="playvideo"
          >
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { getList, score } from '@/api/video'
let videoProcessInterval
export default {
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
      isVideoShow: true,
      playOrPause: true,
      video: null,
      iconPlayShow: true,
      videoProcess: 0
    }
  },
  mounted () {
    setTimeout(() => {
      this.playvideo()
    }, 500)
  },
  methods: {
    onChange (index) {
      clearInterval(videoProcessInterval)
      this.videoProcess = 0
      const video = document.querySelectorAll('video')[this.current]
      video.pause()
      this.playOrPause = false
      this.showShareBox = false
      this.current = index
      this.isVideoShow = false
      setTimeout(() => {
        this.pauseVideo()
      }, 100)
      if (this.videos.length - this.current <= 3) {
        getList(this.$axios).then((res) => {
          res.data.forEach((item) => {
            this.videos.push(item)
          })
          this.initial = index
        })
      }
    },
    // 开始播放
    playvideo (event) {
      const video = document.querySelectorAll('video')[this.current]
      this.isVideoShow = false
      this.iconPlayShow = false
      this.showShareBox = false
      video.play()
      if (this.isiOS) {
        setTimeout(() => {
          // 处理ios宽视频
          const documentW = (document.documentElement.clientWidth || document.body.clientWidth)
          const docB = parseFloat(video.videoWidth / documentW)
          // 计算视频最适高度
          const realH = parseInt(video.videoHeight / docB)
          this.realH = realH + 'px'
          this.$forceUpdate()
        }, 200)
      }
      videoProcessInterval = setInterval(() => {
        this.changeProcess(video)
      }, 100)
    },
    pauseVideo () { // 暂停\播放
      try {
        const video = document.querySelectorAll('video')[this.current]
        if (this.playOrPause) {
          video.pause()
          this.iconPlayShow = true
          clearInterval(videoProcessInterval)
        } else {
          video.play()
          video.pause()
          setTimeout(() => {
            video.play()
            this.iconPlayShow = false
            videoProcessInterval = setInterval(() => {
              this.changeProcess(video)
            }, 100)
          }, 100)
        }
        this.playOrPause = !this.playOrPause
        this.showShareBox = false
      } catch (e) {
        alert(e)
      }
    },
    // 记录播放进度
    changeProcess () {
      const video = document.querySelectorAll('video')[this.current]
      const currentTime = video.currentTime.toFixed(1)
      const duration = video.duration.toFixed(1)
      this.videoProcess = parseInt((currentTime / duration).toFixed(2) * 100)
    },
    onPlayerEnded (player) { // 视频结束
      this.isVideoShow = true
      this.current += this.current
    },
    like (url) {
      const data = {
        url,
        type: 1
      }
      score(this.$axios, data)
    },
    dislike (url) {
      const data = {
        url,
        type: 2
      }
      score(this.$axios, data)
    }
  }
}
</script>

<style>
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
        background: #000;
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
    .icon-play {
        position: absolute;
        top: 44%;
        right: 0;
        left: 0;
        bottom: auto;
        margin: auto;
        z-index: 999;
        height: 60px;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 50%;
    }
</style>
