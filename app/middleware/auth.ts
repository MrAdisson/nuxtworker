export default defineNuxtRouteMiddleware(async (to, from) => {
  const { loggedIn } = useUserSession();
  const localePath = useLocalePath();

  // Si l'utilisateur n'est pas connecté, rediriger vers login
  if (!loggedIn.value) {
    return navigateTo(localePath('/login'));
  }
});
