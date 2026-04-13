import { db, schema } from '@nuxthub/db';
import { eq } from 'drizzle-orm';

export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event: any, { user, tokens }: any) {
    const { users } = schema;

    // Chercher si l'utilisateur existe déjà (par GitHub ID ou email)
    let existingUser = await db
      .select()
      .from(users)
      .where(eq(users.githubId, String(user.id)))
      .get();

    if (!existingUser) {
      // Vérifier aussi par email au cas où l'utilisateur aurait déjà un compte credentials
      existingUser = await db.select().from(users).where(eq(users.email, user.email)).get();
    }

    let dbUser;

    if (existingUser) {
      // Mettre à jour l'utilisateur existant avec les infos GitHub
      const updated = await db
        .update(users)
        .set({
          githubId: String(user.id),
          githubLogin: user.login,
          name: user.name || existingUser.name,
          avatar: user.avatar_url || existingUser.avatar,
          updatedAt: new Date(),
        })
        .where(eq(users.id, existingUser.id))
        .returning();

      dbUser = updated[0];
    } else {
      // Créer un nouvel utilisateur
      const newUser = await db
        .insert(users)
        .values({
          email: user.email,
          githubId: String(user.id),
          githubLogin: user.login,
          name: user.name || user.login,
          avatar: user.avatar_url,
        })
        .returning();

      dbUser = newUser[0];
    }

    if (!dbUser) {
      throw createError({
        statusCode: 500,
        message: 'Failed to create or update user',
      });
    }

    // Créer la session avec les données de la DB
    await setUserSession(event, {
      user: {
        id: String(dbUser.id!),
        email: dbUser.email,
        login: dbUser.githubLogin || undefined,
        name: dbUser.name || undefined,
        avatar: dbUser.avatar || undefined,
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
