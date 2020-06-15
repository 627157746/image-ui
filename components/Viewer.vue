<template>
  <div>
    <viewer
      v-if="images && images.length"
      ref="viewer"
      :images="images"
      class="viewer"
      @inited="inited"
    >
      <img
        v-for="image in images"
        :key="image.id"
        :src="'http://img.wadjj.xyz'+image.path"
        class="image"
      >
    </viewer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      index: 0,
      images: []
    }
  },
  methods: {
    inited (viewer) {
      this.$viewer = viewer
      this.$viewer.view(this.index)
    },
    show (images, index) {
      this.images = images
      this.index = index || 0
    }
  }
}
</script>

<style scoped>
.image {
  display: none;
}
</style>
