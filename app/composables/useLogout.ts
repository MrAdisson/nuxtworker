/**
 * Composable pour gérer la déconnexion utilisateur
 * L'API /api/auth/logout gère le nettoyage de session côté serveur
 */
export const useLogout = () => {
  const router = useRouter();
  const toast = useToast();
  const { clear } = useUserSession();
  const { t } = useI18n();

  const logout = async () => {
    try {
      await $fetch('/api/auth/logout', { method: 'POST' });

      // Synchroniser la session côté client
      await clear();

      toast.add({
        title: t('auth.logout.success'),
        description: t('auth.logout.successMessage'),
        color: 'success',
      });

      router.push('/');
    } catch (error) {
      toast.add({
        title: t('auth.logout.error'),
        description: t('auth.logout.errorMessage'),
        color: 'error',
      });
    }
  };

  return { logout };
};
