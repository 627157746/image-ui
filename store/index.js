import { init } from '@/api/album'
import { getToken } from '@/util/token'
export const actions = {
  async nuxtServerInit ({ commit, dispatch }, { $axios, app, error }) {
    const token = getToken(app.$cookies)
    if (token) {
      try {
        const [res] = await Promise.all([init($axios), dispatch('auth/getUserInfo', token)])
        commit('web/SET_INIT', res.data)
      } catch (e) {
        error({
          statusCode: 500,
          message: '服务器繁忙'
        })
      }
    } else {
      try {
        const { data } = await init($axios)
        commit('web/SET_INIT', data)
      } catch (e) {
        error({
          statusCode: 500,
          message: '服务器繁忙'
        })
      }
    }
    const _showAlert = app.$cookies.get('showAlert')
    const showAlert = _showAlert === 1 || _showAlert === undefined
    commit('web/SET_SHOW_ALERT', showAlert)
    const dark = app.$cookies.get('dark') === 1
    commit('web/SET_DARK', dark)
    const _display = app.$cookies.get('display')
    const display = _display || 4
    commit('web/SET_DISPLAY', display)
  }
}
