export default function ({ $axios, redirect, app, store, error }) {
  $axios.onRequest((config) => {
    const token = store.state.auth.token
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
  })
  $axios.onResponse((response) => {
    const res = response.data
    if (res.code !== 200) {
      if (res.code === 401) {
        app.$cookies.remove('token')
        store.dispatch('auth/removeToken').then(() => {
          redirect('/login?error=1')
        })
      } else {
        if (process.client) {
          app.$toast.show(res.msg || '系统繁忙')
        }
        if (process.server) {
          error({
            statusCode: 500,
            message: res.msg
          })
        }
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return response
    }
  })
}
