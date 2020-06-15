export const pageByQuery = ($axios, query) => {
  return $axios.$get('/albums', { params: query })
}
export const listImageByAid = ($axios, aid) => {
  return $axios.$get(`/albums/images/${aid}`)
}
