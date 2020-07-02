import qs from 'qs'
import { login, logout } from '@/api/user'
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
          this.$cookies.set('token', token, {
            path: '/',
            maxAge: 60 * 60 * 24 * 6.5
          })
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
        this.$cookies.remove('token')
        resolve()
      }).catch(() => {
        commit('SET_TOKEN', undefined)
        commit('SET_NICKNAME', undefined)
        this.$cookies.remove('token')
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
        this.$cookies.remove('token')
        commit('SET_TOKEN', undefined)
        commit('SET_NICKNAME', undefined)
        reject(e)
      }
    })
  },
  changePassword ({ commit }, changePasswordForm) {
    return new Promise((resolve, reject) => {
      this.$axios.$put('/users/change_password', changePasswordForm).then((res) => {
        if (res.code === 500) {
        } else {
          commit('SET_TOKEN', undefined)
          commit('SET_NICKNAME', undefined)
          this.$cookies.remove('token')
          resolve(res.msg)
        }
      }).catch((error) => {
        reject(error)
      })
    })
  },
  removeToken ({ commit }) {
    this.$cookies.remove('token')
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
