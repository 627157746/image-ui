export const pageByQuery = ($axios, query) => {
  return $axios.$get('/albums', { params: query })
}
export const getIndexData = ($axios) => {
  return $axios.$get('/albums', { params: { search: false } })
}
export const listImageByAid = ($axios, aid) => {
  return $axios.$get(`/albums/images/${aid}`)
}
export const init = ($axios) => {
  return $axios.$get('/index')
}
