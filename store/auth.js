import qs from 'qs'
import { login, logout } from '@/api/user'
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
            maxAge: 60 * 60 * 24 * 7
          })
          const jwt = require('jwt-simple')
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
    return new Promise((resolve, reject) => {
      logout(this.$axios).then((res) => {
        commit('SET_TOKEN', undefined)
        commit('SET_NICKNAME', undefined)
        this.$cookies.remove('token')
        resolve()
      }).catch((error) => {
        reject(error)
      })
    })
  },
  getUserInfo ({ commit }, token) {
    return new Promise((resolve, reject) => {
      try {
        const jwt = require('jwt-simple')
        const { nickname } = jwt.decode(token, 'mnxjj.com', true)
        commit('SET_TOKEN', token)
        commit('SET_NICKNAME', nickname)
        resolve()
      } catch (e) {
        this.$cookies.remove('token')
        commit('SET_TOKEN', undefined)
        commit('SET_NICKNAME', undefined)
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
