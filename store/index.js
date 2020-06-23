import { pageByQuery } from '@/api/album'
export const actions = {
  async nuxtServerInit ({ commit }, { $axios, app }) {
    const hiddenViewTip = app.$cookies.get('hiddenViewTip') === 1
    commit('config/SET_HIDDEN_VIEW_TIP', hiddenViewTip)
    const dark = app.$cookies.get('dark') === 1
    commit('config/SET_DARK', dark)
    const pageQuery = {
      pg: 1,
      pz: 10,
      o: 1,
      search: false
    }
    const { data } = await pageByQuery($axios, pageQuery)
    commit('config/SET_HOT', data.records)
  }
}
