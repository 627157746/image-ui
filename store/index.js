import { pageByQuery } from '@/api/album'
import { getToken } from '@/util/token'
export const actions = {
  async nuxtServerInit ({ commit, dispatch }, { $axios, app, error }) {
    const token = getToken(app.$cookies)
    if (token) {
      try {
        await dispatch('auth/getUserInfo', token)
      } catch (e) {
        error({
          statusCode: 500,
          message: '非法操作'
        })
      }
    }
    const _showAlert = app.$cookies.get('showAlert')
    const showAlert = _showAlert === 1 || _showAlert === undefined
    commit('config/SET_SHOW_ALERT', showAlert)
    const dark = app.$cookies.get('dark') === 1
    commit('config/SET_DARK', dark)
    const _display = app.$cookies.get('display')
    const display = _display || 6
    commit('config/SET_DISPLAY', display)
    const pageQuery = {
      pg: 1,
      pz: 10,
      o: 1,
      search: false
    }
    try {
      const { data } = await pageByQuery($axios, pageQuery)
      commit('config/SET_HOT', data.records)
    } catch (e) {
      error({
        statusCode: 500,
        message: '服务器繁忙'
      })
    }
  }
}
