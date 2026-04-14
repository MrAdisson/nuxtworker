import type { User } from '#auth-utils';

interface ProfileResponse {
  message: string;
  user: User;
  sessionInfo: {
    loggedInAt: Date;
    provider: 'github' | 'credentials';
  };
}

export default defineEventHandler<Promise<ProfileResponse>>(async (event) => {
  // Cette route nécessite une session utilisateur active
  const session = await requireUserSession(event);

  return {
    message: 'User profile data',
    user: session.user,
    sessionInfo: {
      loggedInAt: session.loggedInAt,
      provider: session.user.provider,
    },
  };
});
