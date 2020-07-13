import { pageByQuery } from '@/api/album'
// import { getConfig } from '@/api/config'
import { getToken } from '@/util/token'
export const actions = {
  async nuxtServerInit ({ commit, dispatch }, { $axios, app, error }) {
    const token = getToken(app.$cookies)
    const pageQuery = {
      pg: 1,
      pz: 10,
      o: 1,
      search: false
    }
    if (token) {
      try {
        const [res] = await Promise.all([pageByQuery($axios, pageQuery), dispatch('auth/getUserInfo', token)])
        commit('web/SET_HOT', res.data.records)
      } catch (e) {
        error({
          statusCode: 500,
          message: '服务器繁忙'
        })
      }
    } else {
      try {
        const { data } = await pageByQuery($axios, pageQuery)
        commit('web/SET_HOT', data.records)
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
    const display = _display || 6
    commit('web/SET_DISPLAY', display)
    // try {
    //   const { data } = await getConfig($axios)
    //   commit('web/SET_CONFIG', data)
    // } catch (e) {
    //   error({
    //     statusCode: 500,
    //     message: '服务器繁忙'
    //   })
    // }
  }
}
