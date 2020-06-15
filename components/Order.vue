<template>
  <v-btn-toggle
    v-model="order"
    dense
    class="ma-3"
  >
    <v-btn @click="changeOrder(0)">
      <v-icon>mdi-autorenew</v-icon>
      最新
    </v-btn>
    <v-btn @click="changeOrder(1)">
      <v-icon>mdi-fire</v-icon>
      最火
    </v-btn>
  </v-btn-toggle>
</template>

<script>
export default {
  props: {
    order: {
      required: true,
      type: Number
    },
    tid: {
      required: false,
      type: Number,
      default: 1
    },
    search: {
      required: false,
      type: Boolean,
      default: false
    },
    ky: {
      required: false,
      type: String,
      default: undefined
    }
  },
  methods: {
    changeOrder (o) {
      if (this.search) {
        this.$router.push({ name: 'search', query: { o, ky: this.ky } })
      } else {
        this.$router.push({ name: 't-tid', params: { tid: this.tid }, query: { o } })
      }
    }
  }
}
</script>
