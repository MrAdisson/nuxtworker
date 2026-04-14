export default defineNuxtRouteMiddleware(async (to, from) => {
  const { loggedIn } = useUserSession();
  const localePath = useLocalePath();

  // Si l'utilisateur est déjà connecté, rediriger vers l'accueil
  if (loggedIn.value) {
    return navigateTo(localePath('/'));
  }
});
