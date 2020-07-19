<template>
  <v-app>
    <erro v-if="$fetchState.error" :message="error.statusCode === 404?pageNotFound:otherError" />
  </v-app>
</template>

<script>
import Erro from '@/components/Erro'
export default {
  layout: 'empty',
  components: {
    Erro
  },
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '网页未找到',
      otherError: '服务器繁忙请稍后后再试'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>
