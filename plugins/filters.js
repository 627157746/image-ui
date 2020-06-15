import Vue from 'vue'
const padDate = function (va) {
  va = va < 10 ? '0' + va : va
  return va
}
const formatDate = function (val, showSeconds) {
  const value = new Date(val)
  const year = value.getFullYear()
  const month = padDate(value.getMonth() + 1)
  const day = padDate(value.getDate())
  if (showSeconds) {
    const hour = padDate(value.getHours())
    const minutes = padDate(value.getMinutes())
    const seconds = padDate(value.getSeconds())
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds
  }
  return year + '-' + month + '-' + day
}
Vue.filter('formatDate', formatDate)
