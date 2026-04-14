# Nuxt Worker with Authentication

A full-stack Nuxt 4 application deployed on **Cloudflare Workers** with:

- Authentication (credentials + GitHub OAuth)
- D1 Database (SQLite)
- Drizzle ORM
- Nuxt UI components

## Features

- ✅ **Dual Authentication** - Email/password + GitHub OAuth
- ✅ **D1 Database** - Cloudflare D1 with Drizzle ORM
- ✅ **Protected Routes** - Server & client-side middleware
- ✅ **User Sessions** - Secure session management with nuxt-auth-utils
- ✅ **Nuxt UI** - Beautiful TailwindCSS components
- ✅ **TypeScript** - Full type safety
- ✅ **Edge Deployment** - Cloudflare Workers with local dev

## Quick Start

```bash
# 1. Clone and install
git clone <your-repo>
cd nuxtworker
npm install

# 2. Setup environment variables
cp .env.example .env
# Edit .env and add your GitHub OAuth credentials (optional for testing)

# 3. Start development server
npm run dev
```

Le dossier `.wrangler/` (avec la DB locale D1) sera créé automatiquement au premier démarrage.

## Environment Variables

Create a `.env` file at the root:

```env
# Session password (32+ characters) - auto-generated if not set
NUXT_SESSION_PASSWORD=your_32_character_secret_key_here

# GitHub OAuth (optional - for social login)
NUXT_OAUTH_GITHUB_CLIENT_ID=your_github_client_id
NUXT_OAUTH_GITHUB_CLIENT_SECRET=your_github_client_secret
```

### GitHub OAuth Setup (Optional)

1. Create a GitHub OAuth App at [GitHub Developer Settings](https://github.com/settings/developers)
2. Set the callback URL to: `http://localhost:3000/auth/github` (dev) or `https://yourdomain.com/auth/github` (prod)
3. Add the Client ID and Secret to your `.env`

See [AUTH_SETUP.md](./AUTH_SETUP.md) for detailed authentication documentation.

## Database & Migrations

### Local Development

The project uses **Cloudflare D1** (SQLite) with **Drizzle ORM**.

When you run `npm run dev`, the `nitro-cloudflare-dev` module automatically:

1. Creates the `.wrangler/` folder with a local D1 database
2. Applies migrations from `server/db/migrations/sqlite/`
3. Syncs the schema defined in `server/db/schema.ts`

**No manual migration commands needed in dev!** ✨

### Database Schema

The current schema ([server/db/schema.ts](server/db/schema.ts)):

```typescript
export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').unique().notNull(),
  passwordHash: text('password_hash'), // Null if OAuth only
  name: text('name'),
  avatar: text('avatar'),
  githubId: text('github_id').unique(), // GitHub ID if OAuth
  githubLogin: text('github_login'), // GitHub username
  createdAt: integer('created_at', { mode: 'timestamp' }),
  updatedAt: integer('updated_at', { mode: 'timestamp' }),
});
```

### Creating New Migrations

When you modify `server/db/schema.ts`, generate a new migration:

```bash
# Generate migration from schema changes (NuxtHub command)
npx nuxt db generate

# Migrations are created in server/db/migrations/sqlite/
# They auto-apply on next dev server restart
```

### Production Database

In production, D1 migrations are applied automatically by NuxtHub when you deploy.

To manually run migrations:

```bash
# Apply migrations to LOCAL D1 database (dev/test)
npx wrangler d1 migrations apply DB

# Apply migrations to PRODUCTION D1 database (use with caution!)
npx wrangler d1 migrations apply DB --remote

# Or use NuxtHub admin panel
# https://admin.hub.nuxt.com
```

## Development

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

### Available Routes

- `/` - Home page
- `/login` - Login page (email/password or GitHub)
- `/register` - Registration page
- `/dashboard` - Protected dashboard (requires auth)
- `/profile` - User profile (requires auth)
- `/api/protected` - Protected API endpoint example

## Project Structure

```
app/
├── components/
│   └── app/
│       └── auth/
│           ├── login/
│           │   └── form.vue           # Login form with validation
│           └── register/
│               └── form.vue           # Registration form
├── middleware/
│   ├── auth.ts                        # Protected route middleware
│   └── guest.ts                       # Guest-only route middleware
├── pages/
│   ├── index.vue                      # Home page
│   ├── login.vue                      # Login page
│   ├── register.vue                   # Registration page
│   ├── dashboard.vue                  # Protected dashboard
│   └── profile.vue                    # User profile
├── schemas/
│   └── auth.ts                        # Zod validation schemas
└── layouts/
    └── default.vue                    # Main layout with nav

server/
├── api/
│   ├── auth/
│   │   ├── login.post.ts              # Email/password login
│   │   ├── register.post.ts           # User registration
│   │   └── logout.post.ts             # Logout endpoint
│   └── protected.get.ts               # Protected API example
├── routes/
│   └── auth/
│       └── github.get.ts              # GitHub OAuth handler
└── db/
    ├── schema.ts                      # Drizzle database schema
    └── migrations/
        └── sqlite/                    # D1 migrations
            ├── 0000_*.sql
            └── meta/
```

## Usage in Components

```vue
<script setup>
const { loggedIn, user, clear } = useUserSession();

// user contains:
// - id: string
// - email: string
// - name?: string
// - avatar?: string
// - login?: string (GitHub username)
// - provider: 'github' | 'credentials'
</script>

<template>
  <div v-if="loggedIn">
    <img v-if="user.avatar" :src="user.avatar" alt="Avatar" />
    <p>Welcome {{ user.name }}!</p>
    <p>Connected via: {{ user.provider }}</p>
    <button @click="clear">Logout</button>
  </div>
  <div v-else>
    <NuxtLink to="/login">Login</NuxtLink>
  </div>
</template>
```

### Protected Routes

Use middleware to protect pages:

```vue
<script setup>
// Redirect to /login if not authenticated
definePageMeta({
  middleware: 'auth',
});
</script>
```

Or for guest-only pages (login/register):

```vue
<script setup>
// Redirect to / if already authenticated
definePageMeta({
  middleware: 'guest',
});
</script>
```

## Deployment

### Cloudflare Workers Deployment

This project is configured for **Cloudflare Workers** with **D1 database**.

#### Prerequisites

1. **Cloudflare Account** - Create one at [cloudflare.com](https://cloudflare.com)
2. **Wrangler CLI** - Already installed as dev dependency
3. **D1 Database** - Create via Cloudflare dashboard or CLI:

```bash
# Login to Cloudflare
npx wrangler login

# Create a D1 database (if not exists)
npx wrangler d1 create nuxtworker-db

# Copy the database_id to wrangler.jsonc
```

#### Deploy

```bash
# Build and deploy to Cloudflare Workers
npm run deploy

# This runs: npm run build && wrangler deploy
```

#### Environment Variables (Production)

Set production secrets via Wrangler:

```bash
# Session password (required)
echo "your-32-char-secret" | npx wrangler secret put NUXT_SESSION_PASSWORD

# GitHub OAuth (if using)
echo "your-client-id" | npx wrangler secret put NUXT_OAUTH_GITHUB_CLIENT_ID
echo "your-client-secret" | npx wrangler secret put NUXT_OAUTH_GITHUB_CLIENT_SECRET
```

Or use the Cloudflare dashboard: Workers & Pages → Your Worker → Settings → Variables

#### Database Configuration

Update [wrangler.jsonc](wrangler.jsonc) with your D1 database ID:

```jsonc
{
  "d1_databases": [
    {
      "binding": "DB",
      "database_id": "your-database-id-here",
    },
  ],
}
```

#### Migrations in Production

Migrations are applied automatically on deployment via NuxtHub.

To manually apply:

```bash
# Apply to local D1 (for testing)
npx wrangler d1 migrations apply DB

# Apply to production D1 (use with caution!)
npx wrangler d1 migrations apply DB --remote
```

### Local Preview

Test the production build locally:

```bash
npm run preview
# Runs: npm run build && wrangler dev
```

### Useful Commands

```bash
# Generate TypeScript types from Cloudflare bindings
npm run cf-typegen

# View D1 data (local database)
npx wrangler d1 execute DB --command="SELECT * FROM users"

# View D1 data (production database)
npx wrangler d1 execute DB --command="SELECT * FROM users" --remote

# Check deployment status
npx wrangler deployments list
```

## Tech Stack

- **Framework**: Nuxt 4
- **Runtime**: Cloudflare Workers (Edge)
- **Database**: Cloudflare D1 (SQLite)
- **ORM**: Drizzle ORM
- **Auth**: nuxt-auth-utils
- **UI**: Nuxt UI (TailwindCSS)
- **Validation**: Zod
- **TypeScript**: Full type safety

## Resources

- [Nuxt Documentation](https://nuxt.com/docs)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)
- [Cloudflare D1](https://developers.cloudflare.com/d1/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [nuxt-auth-utils](https://github.com/atinux/nuxt-auth-utils)
- [NuxtHub](https://hub.nuxt.com/)
