/// <reference types="../_cloudflare/env.d.ts" />

// Types pour nuxt-auth-utils
declare module '#auth-utils' {
  interface User {
    id: string;
    email?: string;
    login?: string;
    name?: string;
    avatar?: string;
    provider: 'github' | 'password';
  }

  interface UserSession {
    user: User;
    loggedInAt: Date;
  }

  interface SecureSessionData {
    // Ajoutez ici des données sensibles stockées uniquement côté serveur
  }
}

export {};
