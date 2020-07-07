export const login = ($axios, loginForm) => {
  return $axios.$post('/login', loginForm)
}
export const logout = ($axios) => {
  return $axios.$post('/logout')
}
export const register = ($axios, registerForm) => {
  return $axios.$post('/users/register', registerForm)
}
export const changePassword = ($axios, newPasswordForm) => {
  return $axios.$put('/users/change_pwd', newPasswordForm)
}
export const forgetPassword = ($axios, newPasswordForm) => {
  return $axios.$put('/users/forget_pwd', newPasswordForm)
}
export const sendMail = ($axios, sendForm) => {
  return $axios.$get('/users/mail/forget/send', { params: sendForm })
}
