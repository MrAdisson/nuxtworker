# Configuration de l'authentification

## Compte de test (Login/Password)

Pour tester l'authentification par email/mot de passe :

- **Email** : `demo@example.com`
- **Mot de passe** : `password123`

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

## Routes disponibles

- `/login` - Page de connexion
- `/auth/github` - OAuth GitHub (redirige automatiquement)
- `/api/auth/login` - POST - Connexion email/password
- `/api/auth/logout` - POST - Déconnexion

## Utilisation dans les composants

```vue
<script setup>
const { loggedIn, user, clear } = useUserSession();
</script>

<template>
  <div v-if="loggedIn">
    <p>Bienvenue {{ user.name }}!</p>
    <button @click="clear">Déconnexion</button>
  </div>
  <div v-else>
    <NuxtLink to="/login">Se connecter</NuxtLink>
  </div>
</template>
```

## Routes protégées (serveur)

```typescript
// server/api/protected.get.ts
export default defineEventHandler(async (event) => {
  // Requiert une session utilisateur
  const session = await requireUserSession(event);

  return {
    message: 'Route protégée',
    user: session.user,
  };
});
```
