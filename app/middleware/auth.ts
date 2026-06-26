export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated } = useAuth()

  if (to.path.startsWith('/admin') && !isAuthenticated.value) {
    return navigateTo(`/login?redirect=${encodeURIComponent(to.path)}`)
  }
})
