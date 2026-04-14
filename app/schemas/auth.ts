import { z } from 'zod';

/**
 * Schéma de validation pour la connexion
 * Note: pas de validation de longueur pour ne pas révéler les contraintes (sécurité)
 */
export const loginSchema = z.object({
  email: z.email('Invalid email'),
  password: z.string('Password is required').min(1, 'Password is required'),
  remember: z.boolean().optional(),
});

/**
 * Schéma de validation pour l'inscription
 */
export const registerSchema = z.object({
  name: z.string('Name is required').min(2, 'Name must be at least 2 characters'),
  email: z.email('Invalid email'),
  password: z.string('Password is required').min(8, 'Password must be at least 8 characters'),
});

// Types TypeScript dérivés des schémas
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
