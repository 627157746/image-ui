<template>
  <v-row>
    <v-col lg="9" md="12">
      <v-skeleton-loader
        :loading="$fetchState.pending"
        transition="scale-transition"
        type="image"
      >
        <erro v-if="$fetchState.error" :message="$fetchState.error.message" />
        <v-card v-else>
          <v-breadcrumbs class="hidden-sm-and-down" :items="breadcrumbs" />
          <v-row justify="start" align="start">
            <v-col
              v-for="tag in tags"
              :key="tag.id"
              xl="2"
              md="2"
              sm="3"
              cols="4"
            >
              <v-hover :disabled="false">
                <template v-slot="{ hover }">
                  <v-card
                    class="mx-sm-3 mx-md-3 mx-lg-3 mx-xl-3 mx-1"
                    :elevation="hover ? 24 : 6"
                    nuxt
                    link
                    :to="{ name: 'tag-name', params: { name: tag.name }}"
                  >
                    <v-img
                      :alt="tag.name"
                      aspect-ratio="0.7"
                      class="grey lighten-2 mx-auto"
                      :src="imageDomain+tag.cover"
                    >
                      <div class="img-title white--text">
                        <div class="mx-2 text-center text-truncate" to="/">
                          {{ tag.name }}
                        </div>
                      </div>
                      <template v-slot:placeholder>
                        <v-row
                          class="fill-height ma-0"
                          align="center"
                          justify="center"
                        >
                          <v-progress-circular indeterminate color="pink" />
                        </v-row>
                      </template>
                    </v-img>
                    <v-fade-transition>
                      <v-overlay
                        v-if="hover"
                        absolute
                        color="#036358"
                      >
                        <v-btn
                          color="pink"
                          icon
                        >
                          <v-icon>mdi-eye</v-icon>
                        </v-btn>
                      </v-overlay>
                    </v-fade-transition>
                  </v-card>
                </template>
              </v-hover>
            </v-col>
          </v-row>
        </v-card>
      </v-skeleton-loader>
    </v-col>
    <v-col class="hidden-md-and-down" lg="3" md="0">
      <hot />
    </v-col>
  </v-row>
</template>

<script>
import Erro from '@/components/Erro'
import { listTags } from '@/api/album'
import Hot from '@/components/Hot'
export default {
  components: {
    Erro,
    Hot
  },
  async fetch () {
    const { data } = await listTags(this.$axios)
    this.tags = data
  },
  data () {
    return {
      tags: [],
      breadcrumbs: [
        {
          text: '主页',
          disabled: false,
          href: '/'
        },
        {
          text: '专题',
          disabled: true,
          href: '/tags/'
        }
      ]
    }
  },
  computed: {
    imageDomain () {
      return this.$store.state.web.imageDomain
    }
  },
  head () {
    return {
      title: '专题'
    }
  }
}
</script>
