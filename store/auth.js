import qs from 'qs'
import { login, logout, changePassword } from '@/api/user'
import { setToken, removeToken } from '@/util/token'
const jwt = require('jwt-simple')
export const state = () => ({
  nickname: undefined,
  token: undefined
})

export const mutations = {
  SET_NICKNAME: (state, nickname) => {
    state.nickname = nickname
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  }
}

export const actions = {
  login ({ commit }, loginForm) {
    return new Promise((resolve, reject) => {
      login(this.$axios, qs.stringify(loginForm)).then((res) => {
        if (res.code === 200) {
          const token = res.data
          setToken(this.$cookies, token)
          const { nickname } = jwt.decode(token, 'mnxjj.com', true)
          commit('SET_TOKEN', token)
          commit('SET_NICKNAME', nickname)
          resolve()
        } else {
          reject(res.msg)
        }
      }).catch((error) => {
        reject(error)
      })
    })
  },
  logout ({ commit }) {
    return new Promise((resolve) => {
      logout(this.$axios).then(() => {
        commit('SET_TOKEN', undefined)
        commit('SET_NICKNAME', undefined)
        removeToken(this.$cookies)
        resolve()
      }).catch(() => {
        commit('SET_TOKEN', undefined)
        commit('SET_NICKNAME', undefined)
        removeToken(this.$cookies)
        resolve()
      })
    })
  },
  getUserInfo ({ commit }, token) {
    return new Promise((resolve, reject) => {
      try {
        const { nickname } = jwt.decode(token, 'mnxjj.com', true)
        commit('SET_TOKEN', token)
        commit('SET_NICKNAME', nickname)
        resolve()
      } catch (e) {
        removeToken(this.$cookies)
        commit('SET_TOKEN', undefined)
        commit('SET_NICKNAME', undefined)
        reject(e)
      }
    })
  },
  changePassword ({ commit }, changePasswordForm) {
    return new Promise((resolve, reject) => {
      changePassword(this.$axios, changePasswordForm).then(() => {
        removeToken(this.$cookies)
        commit('SET_TOKEN', undefined)
        commit('SET_NICKNAME', undefined)
        resolve()
      }).catch((error) => {
        reject(error)
      })
    })
  },
  removeToken ({ commit }) {
    removeToken(this.$cookies)
    commit('SET_TOKEN', undefined)
    commit('SET_NICKNAME', undefined)
  }
}
export const getters = {
  token: (state) => {
    return state.token
  },
  nickname: (state) => {
    return state.nickname
  }
}
