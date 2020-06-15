export const state = () => ({
  menus: [
    {
      icon: 'mdi-chart-bubble',
      title: '性感妹子',
      to: '/t/1'
    },
    {
      icon: 'mdi-chart-bubble',
      title: '清纯妹子',
      to: '/t/2'
    },
    {
      icon: 'mdi-chart-bubble',
      title: '日本妹子',
      to: '/t/3'
    },
    {
      icon: 'mdi-chart-bubble',
      title: '台湾妹子',
      to: '/t/4'
    }
  ],
  hot: []
})
export const mutations = {
  SET_HOT: (state, hot) => {
    state.hot = hot
  }
}
