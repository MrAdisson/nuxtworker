# Configuration de l'authentification

Ce projet utilise **nuxt-auth-utils** pour gérer l'authentification avec :

- Connexion email/password (credentials)
- OAuth GitHub
- Sessions sécurisées
- Middleware de protection de routes

## Premier démarrage pour un nouveau dev

```bash
# 1. Cloner le repo et installer les dépendances
git clone <votre-repo>
cd nuxtworker
npm install

# 2. Créer le fichier .env (copier .env.example si disponible)
# Ajouter les clés GitHub OAuth (voir section suivante)

# 3. Lancer le serveur de dev
npm run dev

# Le dossier .wrangler sera automatiquement créé avec :
# - Une DB D1 locale SQLite
# - Les migrations appliquées automatiquement
# Pas besoin de commande séparée !
```

## Configuration GitHub OAuth

Pour activer l'authentification GitHub :

1. Allez sur [GitHub Developer Settings](https://github.com/settings/developers)
2. Cliquez sur "New OAuth App"
3. Remplissez les informations :
   - **Application name** : Votre nom d'app
   - **Homepage URL** : `http://localhost:3000`
   - **Authorization callback URL** : `http://localhost:3000/auth/github`
4. Une fois créée, copiez le **Client ID** et générez un **Client Secret**
5. Ajoutez ces valeurs dans le fichier `.env` :
   ```env
   NUXT_OAUTH_GITHUB_CLIENT_ID=votre_client_id
   NUXT_OAUTH_GITHUB_CLIENT_SECRET=votre_client_secret
   ```
6. Redémarrez votre serveur de développement

## Routes et pages disponibles

### Pages

- `/login` - Page de connexion (avec formulaire et bouton GitHub)
- `/register` - Page d'inscription
- `/dashboard` - Dashboard protégé (nécessite authentification)
- `/profile` - Profil utilisateur (nécessite authentification)

### API Routes

- `POST /api/auth/login` - Connexion email/password
- `POST /api/auth/register` - Inscription
- `POST /api/auth/logout` - Déconnexion
- `GET /auth/github` - OAuth GitHub (redirige automatiquement)

## Utilisation dans les composants

```vue
<script setup>
const { loggedIn, user, fetch, clear } = useUserSession();

// user contient :
// - id: string
// - email: string
// - name?: string
// - avatar?: string
// - login?: string (si GitHub)
// - provider: 'github' | 'credentials'
</script>

<template>
  <div v-if="loggedIn">
    <img v-if="user.avatar" :src="user.avatar" alt="Avatar" />
    <p>Bienvenue {{ user.name }}!</p>
    <p>Connecté via: {{ user.provider }}</p>
    <button @click="clear">Déconnexion</button>
  </div>
  <div v-else>
    <NuxtLink to="/login">Se connecter</NuxtLink>
  </div>
</template>
```

## Middleware

### Protection de routes (auth)

Pour protéger une page et rediriger vers `/login` si l'utilisateur n'est pas connecté :

```typescript
definePageMeta({
  middleware: 'auth',
});
```

**Implémentation** ([middleware/auth.ts](app/middleware/auth.ts)) :

```typescript
export default defineNuxtRouteMiddleware(async (to, from) => {
  const { loggedIn } = useUserSession();

  if (!loggedIn.value) {
    return navigateTo('/login');
  }
});
```

### Pages réservées aux invités (guest)

Pour rediriger vers `/` si l'utilisateur est déjà connecté (ex: pages login/register) :

```typescript
definePageMeta({
  middleware: 'guest',
});
```

**Implémentation** ([middleware/guest.ts](app/middleware/guest.ts)) :

```typescript
export default defineNuxtRouteMiddleware(async (to, from) => {
  const { loggedIn } = useUserSession();

  if (loggedIn.value) {
    return navigateTo('/');
  }
});
```

## Routes protégées (serveur)

Pour protéger une route API avec session obligatoire :

```typescript
// server/api/protected.get.ts
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
  // requireUserSession() lance une erreur 401 si pas de session
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
```

Si vous voulez vérifier sans erreur, utilisez `getUserSession()` :

```typescript
export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);

  if (!session) {
    // L'utilisateur n'est pas connecté
    return { message: 'Public data' };
  }

  // L'utilisateur est connecté
  return { message: 'Private data', user: session.user };
});
```

## Validation avec Zod

Les schémas de validation sont définis dans [schemas/auth.ts](app/schemas/auth.ts) :

```typescript
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email('Email invalide'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.email('Email invalide'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
```

## Fonctionnalités implémentées

### Connexion (POST /api/auth/login)

- Validation avec `loginSchema`
- Vérification du hash avec `verifyPassword()` de nuxt-auth-utils
- Création de session avec `setUserSession()`
- Avatar par défaut généré avec [ui-avatars.com](https://ui-avatars.com)

### Inscription (POST /api/auth/register)

- Validation avec `registerSchema`
- Vérification d'email unique
- Hash du mot de passe avec `hashPassword()` de nuxt-auth-utils
- Génération d'avatar automatique
- Création de session automatique après inscription

### OAuth GitHub (GET /auth/github)

- Récupération des données GitHub (email, login, avatar)
- Détection d'utilisateur existant (par GitHub ID puis email)
- Mise à jour ou création de l'utilisateur dans D1
- Gestion des comptes multiples (un email peut avoir credentials + GitHub)
- Redirection vers `/` après succès

### Déconnexion (POST /api/auth/logout)

- Suppression de la session avec `clearUserSession()`
- Très simple et sécurisé

## Structure de la session

La session utilisateur contient :

```typescript
{
  user: {
    id: string;           // ID en base de données
    email: string;        // Email de l'utilisateur
    name?: string;        // Nom affiché
    avatar?: string;      // URL de l'avatar
    login?: string;       // GitHub login (si OAuth)
    provider: 'github' | 'credentials';  // Méthode de connexion
  },
  loggedInAt: Date;       // Horodatage de connexion
}
```

## Base de données

Le schéma utilisateur ([server/db/schema.ts](server/db/schema.ts)) :

```typescript
export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').unique().notNull(),
  passwordHash: text('password_hash'), // Null si OAuth uniquement
  name: text('name'),
  avatar: text('avatar'),
  githubId: text('github_id').unique(), // ID GitHub si OAuth
  githubLogin: text('github_login'), // Username GitHub
  createdAt: integer('created_at', { mode: 'timestamp' }),
  updatedAt: integer('updated_at', { mode: 'timestamp' }),
});
```
