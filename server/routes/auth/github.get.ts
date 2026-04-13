export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event: any, { user, tokens }: any) {
    await setUserSession(event, {
      user: {
        id: user.id,
        email: user.email,
        login: user.login,
        name: user.name,
        avatar: user.avatar_url,
        provider: 'github',
      },
      loggedInAt: new Date(),
    });

    return sendRedirect(event, '/');
  },
  // En cas d'erreur, rediriger vers la page de login
  onError(event: any, error: any) {
    console.error('GitHub OAuth error:', error);
    return sendRedirect(event, '/login?error=oauth_failed');
  },
});
