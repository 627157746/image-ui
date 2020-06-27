
export default function ({ route, app, redirect }) {
  // const authRoute = ['user-info', 'user-bookshelf']
  const authForbiddenRoute = ['login', 'register']
  const token = app.$cookies.get('token')
  if (token) {
    const flag = authForbiddenRoute.some((data) => {
      return data === route.name
    })
    if (flag) {
      redirect('/')
    }
  } else {
    // const flag = authRoute.some((data) => {
    //   return data === route.name
    // })
    // if (flag) {
    //   redirect('/login')
    // }
  }
}
