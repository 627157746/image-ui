import { pageByQuery } from '@/api/album'
export const actions = {
  async nuxtServerInit ({ commit }, { $axios }) {
    const pageQuery = {
      pg: 1,
      pz: 10,
      order: 2,
      search: false
    }
    const { data } = await pageByQuery($axios, pageQuery)
    commit('config/SET_HOT', data.records)
  }
}
