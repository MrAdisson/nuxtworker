import { registerSchema } from '@/schemas/auth';
import { db, schema } from '@nuxthub/db';
import { eq } from 'drizzle-orm';

export default eventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const validation = registerSchema.safeParse(body);

    if (!validation.success) {
      throw createError({
        statusCode: 400,
        message: validation.error.issues[0]?.message || 'Validation échouée',
      });
    }

    const { email, password, name } = validation.data;
    const { users } = schema;

    // Vérifier si l'email existe déjà
    const existingUser = await db.select().from(users).where(eq(users.email, email)).get();

    if (existingUser) {
      throw createError({
        statusCode: 409,
        message: 'Cet email est déjà utilisé',
      });
    }

    // Hasher le mot de passe avec nuxt-auth-utils
    const passwordHash = await hashPassword(password);

    // Créer l'utilisateur
    const newUser = await db
      .insert(users)
      .values({
        email,
        passwordHash,
        name,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
      })
      .returning();

    const user = newUser[0];

    if (!user) {
      throw createError({
        statusCode: 500,
        message: "Erreur lors de la création de l'utilisateur",
      });
    }

    // Créer la session
    await setUserSession(event, {
      user: {
        id: String(user.id),
        email: user.email,
        name: user.name || undefined,
        avatar: user.avatar || undefined,
        provider: 'credentials',
      },
      loggedInAt: new Date(),
    });

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
      },
    };
  } catch (error: any) {
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      message: 'Erreur lors de la création du compte',
    });
  }
});
