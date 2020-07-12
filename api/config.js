export const getConfig = ($axios) => {
  return $axios.$get('/config')
}
