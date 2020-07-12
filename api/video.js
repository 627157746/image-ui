export const getList = ($axios) => {
  return $axios.$get('/videos', { progress: false })
}
export const score = ($axios, data) => {
  return $axios.$post('/videos/score', data, { progress: false })
}
