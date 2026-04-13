export default defineNuxtRouteMiddleware(async (to, from) => {
  const { loggedIn } = useUserSession()

  // Si l'utilisateur n'est pas connecté, rediriger vers login
  if (!loggedIn.value) {
    return navigateTo('/login')
  }
})
