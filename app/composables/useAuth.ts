const VALID_USER = 'admin'
const VALID_PASS = 'sincro2025'

const isAuthenticated = ref(false)
const authUser = ref<string | null>(null)

export function useAuth() {
  function login(username: string, password: string): boolean {
    if (username === VALID_USER && password === VALID_PASS) {
      isAuthenticated.value = true
      authUser.value = username
      return true
    }
    return false
  }

  function logout() {
    isAuthenticated.value = false
    authUser.value = null
    navigateTo('/login')
  }

  return { isAuthenticated, authUser, login, logout }
}
