export const login = ($axios, loginForm) => {
  return $axios.$post('/login', loginForm)
}
export const logout = ($axios) => {
  return $axios.$post('/logout')
}
export const register = ($axios, registerForm) => {
  return $axios.$post('/users/register', registerForm)
}
