import { db, schema } from '@nuxthub/db';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.email('Email invalide'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
});

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const validation = loginSchema.safeParse(body);

    if (!validation.success) {
      throw createError({
        statusCode: 400,
        message: validation.error.issues[0]?.message || 'Validation échouée',
      });
    }

    const { email, password } = validation.data;
    const { users } = schema;

    // Récupérer l'utilisateur par email
    const user = await db.select().from(users).where(eq(users.email, email)).get();

    if (!user || !user.passwordHash) {
      throw createError({
        statusCode: 401,
        message: 'Email ou mot de passe incorrect',
      });
    }

    // Vérifier le mot de passe avec nuxt-auth-utils
    const isValid = await verifyPassword(user.passwordHash, password);

    if (!isValid) {
      throw createError({
        statusCode: 401,
        message: 'Email ou mot de passe incorrect',
      });
    }

    // Créer la session utilisateur
    await setUserSession(event, {
      user: {
        id: String(user.id!),
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
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        message: error.issues?.[0]?.message || 'Validation error',
      });
    }
    throw error;
  }
});
