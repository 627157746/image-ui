<template>
  <v-card height="80vh" class="d-flex flex-column align-center justify-center">
    <p class="ma-3" style="font-size:50px;color:#FF5252;font-weight:bolder">
      {{ message }}
    </p>
    <v-btn
      text
      color="light-blue"
      link
      to="/"
      nuxt
    >
      回到首页
    </v-btn>
  </v-card>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: 'SERVER ERROR'
    }
  }
}
</script>
