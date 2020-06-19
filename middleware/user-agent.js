export default function ({ isServer, req, store }) {
  const isMobile = (ua) => {
    return !!ua.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
  }
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent || ''
  if (isMobile(userAgent)) {
    store.commit('config/SET_IS_MOBILE', true)
  }
}
