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
const formatTime = function (time) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  return formatDate(time, false)
}
Vue.filter('formatDate', formatDate)
Vue.filter('formatTime', formatTime)
