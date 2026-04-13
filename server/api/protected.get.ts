export default defineEventHandler(async (event) => {
  // Cette route nécessite une session utilisateur active
  const session = await requireUserSession(event);

  return {
    message: 'This is protected data',
    user: {
      id: session.user.id,
      email: session.user.email,
      login: session.user.login,
      name: session.user.name,
      avatar: session.user.avatar,
      provider: session.user.provider,
    },
    sessionInfo: {
      loggedInAt: session.loggedInAt,
      provider: session.user.provider,
    },
  };
});
