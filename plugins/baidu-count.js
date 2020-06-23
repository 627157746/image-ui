
export default ({ app: { router } }) => {
  if (process.client && process.env.NODE_ENV === 'production') {
    router.afterEach(() => {
      // eslint-disable-next-line no-use-before-define
      const _hmt = _hmt || [];
      (function () {
        const hm = document.createElement('script')
        hm.src = 'https://hm.baidu.com/hm.js?414a44bda63fd650aa9a01be67ceb784'
        const s = document.getElementsByTagName('script')[0]
        s.parentNode.insertBefore(hm, s)
      })()
      _hmt.push('_requirePlugin', 'UrlChangeTracker', {
        shouldTrackUrlChange (newPath, oldPath) {
          return newPath && oldPath
        }
      })
    })
  }
}
