const TokenKey = 'token'

export function getToken (Cookies) {
  return Cookies.get(TokenKey)
}

export function setToken (Cookies, token) {
  return Cookies.set(TokenKey, token, { maxAge: 60 * 60 * 24 * 6.5, path: '/', domain: 'mnxjj.com' })
}

export function removeToken (Cookies) {
  return Cookies.remove(TokenKey, { path: '/', domain: 'mnxjj.com' })
}
