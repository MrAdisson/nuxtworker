/**
 * Composable pour gérer la déconnexion utilisateur
 * L'API /api/auth/logout gère le nettoyage de session côté serveur
 */
export const useLogout = () => {
  const router = useRouter();
  const toast = useToast();
  const { clear } = useUserSession();

  const logout = async () => {
    try {
      await $fetch('/api/auth/logout', { method: 'POST' });

      // Synchroniser la session côté client
      await clear();

      toast.add({
        title: 'Success',
        description: 'You have been logged out',
        color: 'success',
      });

      router.push('/');
    } catch (error) {
      toast.add({
        title: 'Error',
        description: 'Failed to logout',
        color: 'error',
      });
    }
  };

  return { logout };
};
