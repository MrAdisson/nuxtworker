import { db, schema } from '@nuxthub/db';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
});

export default eventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const validation = registerSchema.safeParse(body);

    if (!validation.success) {
      throw createError({
        statusCode: 400,
        message: validation.error.errors[0].message,
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

    // Créer la session
    await setUserSession(event, {
      user: {
        id: String(user.id!),
        email: user.email,
        name: user.name || undefined,
        avatar: user.avatar || undefined,
        provider: 'credentials',
      },
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
