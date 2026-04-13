import { z } from 'zod';

// Compte statique temporaire (à remplacer par une vraie base de données)
const STATIC_USER = {
  id: '1',
  email: 'demo@example.com',
  // Password: "password123" (hashé avec hashPassword)
  // Vous devrez générer un vrai hash, celui-ci est juste un placeholder
  passwordHash: '$scrypt$n=16384,r=8,p=1$aGFzaGVk$7d8c8f9e1c2b3a4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7',
  name: 'Demo User',
};

const loginSchema = z.object({
  email: z.email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const { email, password } = loginSchema.parse(body);

    // Vérifier l'email
    if (email !== STATIC_USER.email) {
      throw createError({
        statusCode: 401,
        message: 'Invalid credentials',
      });
    }

    // Pour le moment, on vérifie juste le mot de passe en dur
    // Dans un vrai projet, vous utiliseriez : await verifyPassword(STATIC_USER.passwordHash, password)
    if (password !== 'password123') {
      throw createError({
        statusCode: 401,
        message: 'Invalid credentials',
      });
    }

    // Créer la session utilisateur
    await setUserSession(event, {
      user: {
        id: STATIC_USER.id,
        email: STATIC_USER.email,
        name: STATIC_USER.name,
        provider: 'password',
      },
      loggedInAt: new Date(),
    });

    return {
      success: true,
      user: {
        id: STATIC_USER.id,
        email: STATIC_USER.email,
        name: STATIC_USER.name,
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
