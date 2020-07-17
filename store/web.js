export const state = () => ({
  menus: [
    {
      icon: 'mdi-chart-bubble',
      title: '性感',
      to: '/t/1'
    },
    {
      icon: 'mdi-chart-bubble',
      title: 'COSER',
      to: '/t/5'
    },
    {
      icon: 'mdi-chart-bubble',
      title: '清纯',
      to: '/t/2'
    },
    {
      icon: 'mdi-chart-bubble',
      title: '日本',
      to: '/t/3'
    },
    {
      icon: 'mdi-chart-bubble',
      title: '台湾',
      to: '/t/4'
    },
    {
      icon: 'mdi-video',
      title: '短视频',
      to: '/video/m'
    }
  ],
  hot: [],
  imageDomain: 'https://cdn.mnxjj.com',
  showAlert: true,
  dark: false,
  display: 6
})
export const mutations = {
  SET_HOT: (state, hot) => {
    state.hot = hot
  },
  SET_SHOW_ALERT: (state, showAlert) => {
    state.showAlert = showAlert
  },
  SET_DARK: (state, dark) => {
    state.dark = dark
  },
  SET_DISPLAY: (state, display) => {
    state.display = display
  }
}
