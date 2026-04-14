import { z } from 'zod';

/**
 * Schéma de validation pour la connexion
 * Note: pas de validation de longueur pour ne pas révéler les contraintes (sécurité)
 */
export const loginSchema = z.object({
  email: z.email('Email invalide'),
  password: z.string().min(1, 'Le mot de passe est requis'),
  remember: z.boolean().optional(),
});

/**
 * Schéma de validation pour l'inscription
 */
export const registerSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.email('Email invalide'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
});

// Types TypeScript dérivés des schémas
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
