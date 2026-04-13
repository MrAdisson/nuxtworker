# Nuxt Worker with Authentication

A Nuxt 3 application with authentication using [nuxt-auth-utils](https://github.com/atinux/nuxt-auth-utils).

## Features

- ✅ **Login/Password Authentication** - Static user for testing
- ✅ **GitHub OAuth** - Social login with GitHub
- ✅ **Protected Routes** - Server-side session management
- ✅ **User Session** - Vue composable for client-side access
- ✅ **Nuxt UI** - Beautiful UI components

## Authentication

### Test Credentials (Login/Password)

- **Email**: `demo@example.com`
- **Password**: `password123`

### GitHub OAuth Setup

1. Create a GitHub OAuth App at [GitHub Developer Settings](https://github.com/settings/developers)
2. Set the callback URL to: `http://localhost:3000/auth/github`
3. Add your credentials to `.env`:
   ```env
   NUXT_OAUTH_GITHUB_CLIENT_ID=your_client_id
   NUXT_OAUTH_GITHUB_CLIENT_SECRET=your_client_secret
   ```

See [AUTH_SETUP.md](./AUTH_SETUP.md) for detailed instructions.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

Then navigate to:

- `/` - Home page
- `/login` - Login page
- `/protected` - Protected page (requires authentication)

## Project Structure

```
app/
├── components/
│   └── app/
│       └── auth/
│           └── form.vue       # Login form component
├── pages/
│   ├── index.vue             # Home page
│   ├── login.vue             # Login page
│   └── protected.vue         # Protected page example
└── layouts/
    └── default.vue           # Layout with auth state

server/
├── api/
│   └── auth/
│       ├── login.post.ts     # Login endpoint
│       └── logout.post.ts    # Logout endpoint
├── routes/
│   └── auth/
│       └── github.get.ts     # GitHub OAuth handler
└── api/
    └── protected.get.ts      # Protected API example
```

## Usage in Components

```vue
<script setup>
const { loggedIn, user, clear } = useUserSession();
</script>

<template>
  <div v-if="loggedIn">
    <p>Welcome {{ user.name }}!</p>
    <button @click="clear">Logout</button>
  </div>
  <div v-else>
    <NuxtLink to="/login">Login</NuxtLink>
  </div>
</template>
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
