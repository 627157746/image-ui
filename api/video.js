export const getList = ($axios) => {
  return $axios.$get('/videos')
}
export const score = ($axios, data) => {
  return $axios.$post('/albums/score', data)
}
