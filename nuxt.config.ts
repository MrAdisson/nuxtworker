// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  nitro: {
    preset: 'cloudflare_module',

    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
    },
  },
  vite: {
    optimizeDeps: {
      include: ['zod', '@vue/devtools-core', '@vue/devtools-kit'],
    },
  },
  modules: ['nitro-cloudflare-dev', '@nuxt/ui', 'nuxt-auth-utils', '@nuxtjs/i18n', '@nuxthub/core'],

  i18n: {
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'fr', language: 'fr-FR', name: 'Français', file: 'fr.json' },
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_locale',
      redirectOn: 'root',
      alwaysRedirect: false,
    },
    langDir: 'locales',
  },
  hub: {
    db: {
      dialect: 'sqlite',
    },
  },

  css: ['~/assets/css/main.css'],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
});
