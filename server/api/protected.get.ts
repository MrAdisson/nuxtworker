import type { User } from '#auth-utils';

interface ProtectedResponse {
  message: string;
  user: User;
  sessionInfo: {
    loggedInAt: Date;
    provider: 'github' | 'credentials';
  };
}

export default defineEventHandler<Promise<ProtectedResponse>>(async (event) => {
  // Cette route nécessite une session utilisateur active
  const session = await requireUserSession(event);

  return {
    message: 'This is protected data',
    user: session.user,
    sessionInfo: {
      loggedInAt: session.loggedInAt,
      provider: session.user.provider,
    },
  };
});
