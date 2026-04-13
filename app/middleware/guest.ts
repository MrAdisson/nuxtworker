export default defineNuxtRouteMiddleware(async (to, from) => {
  const { loggedIn } = useUserSession()

  // Si l'utilisateur est déjà connecté, rediriger vers l'accueil
  if (loggedIn.value) {
    return navigateTo('/')
  }
})
