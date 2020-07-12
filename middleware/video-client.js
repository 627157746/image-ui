export default function ({ route, req, redirect }) {
  const isMobile = (ua) => {
    return !!ua.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
  }
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent || ''
  const pcPath = '/video'
  const moblePath = '/video/m'
  const path = route.path
  if (isMobile(userAgent) && path === pcPath) {
    return redirect('/video/m')
  }
  if (!isMobile(userAgent) && path === moblePath) {
    return redirect('/video')
  }
}
