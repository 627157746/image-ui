export default function ({ $axios, redirect, app, store, error }) {
  $axios.onRequest((config) => {
    const token = store.state.auth.token
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
  })
  $axios.onResponse((response) => {
    const res = response.data

    if (res.code === 401) {
      app.$cookies.remove('token')
      store.dispatch('auth/removeToken')
      redirect('/login')
    }
    if (process.client) {
      if (res.code !== 200) {
        app.$toast.show(res.msg || '系统繁忙')
      }
    }
    if (process.server) {
      if (res.code !== 200) {
        error({
          statusCode: 500,
          message: res.msg
        })
      }
    }
  })
  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400 || code === 404) {
      redirect('/404')
    }
    if (code === 500 || code === 504 || code === 502) {
      redirect('/500')
    }
  })
}
