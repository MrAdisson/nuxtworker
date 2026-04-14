<script setup lang="ts">
definePageMeta({
  layout: 'default',
});

const technologies = [
  {
    name: 'Nuxt 4',
    icon: 'i-simple-icons-nuxtdotjs',
    description: 'The Intuitive Vue Framework',
    link: 'https://nuxt.com',
  },
  {
    name: 'Cloudflare Workers',
    icon: 'i-simple-icons-cloudflare',
    description: 'Serverless execution environment',
    link: 'https://workers.cloudflare.com',
  },
  {
    name: 'Nuxt UI',
    icon: 'i-lucide-palette',
    description: 'Beautiful & Accessible components',
    link: 'https://ui.nuxt.com',
  },
  {
    name: 'TypeScript',
    icon: 'i-simple-icons-typescript',
    description: 'Type-safe development',
    link: 'https://www.typescriptlang.org',
  },
];
</script>

<template>
  <UContainer class="py-12">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold mb-4">About NuxtWorker</h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 mb-6">
          A modern web application showcasing the power of Nuxt 4 and Cloudflare Workers
        </p>
        <div class="flex gap-3 justify-center">
          <AppGithubButton />
          <AppOpenSourceBadge />
        </div>
      </div>

      <!-- What is NuxtWorker - Enhanced Section -->
      <div class="mb-12">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold mb-3">What is NuxtWorker?</h2>
          <div class="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div class="grid gap-6 mb-8">
          <UCard class="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                <UIcon name="i-lucide-rocket" class="w-6 h-6 text-primary" />
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-semibold mb-2">Modern Full-Stack Template</h3>
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                  NuxtWorker is a production-ready web application template that combines the best of frontend and edge
                  computing. Built with Nuxt 4, it leverages Cloudflare Workers to deliver content at lightning speed
                  from the edge, closest to your users.
                </p>
              </div>
            </div>
          </UCard>

          <div class="grid md:grid-cols-2 gap-6">
            <UCard>
              <div class="flex items-start gap-3">
                <UIcon name="i-lucide-zap" class="w-5 h-5 text-primary shrink-0 mt-1" />
                <div>
                  <h4 class="font-semibold mb-2">Edge-First Performance</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Deployed on Cloudflare's global network, your application runs at the edge for minimal latency and
                    maximum speed.
                  </p>
                </div>
              </div>
            </UCard>

            <UCard>
              <div class="flex items-start gap-3">
                <UIcon name="i-lucide-shield-check" class="w-5 h-5 text-primary shrink-0 mt-1" />
                <div>
                  <h4 class="font-semibold mb-2">Authentication Built-In</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Includes dual authentication (credentials + GitHub OAuth) with secure session management out of the
                    box.
                  </p>
                </div>
              </div>
            </UCard>

            <UCard>
              <div class="flex items-start gap-3">
                <UIcon name="i-lucide-database" class="w-5 h-5 text-primary shrink-0 mt-1" />
                <div>
                  <h4 class="font-semibold mb-2">D1 Database Integration</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Seamlessly integrated with Cloudflare D1 (SQLite) and Drizzle ORM for type-safe database operations.
                  </p>
                </div>
              </div>
            </UCard>

            <UCard>
              <div class="flex items-start gap-3">
                <UIcon name="i-lucide-code-2" class="w-5 h-5 text-primary shrink-0 mt-1" />
                <div>
                  <h4 class="font-semibold mb-2">Developer Experience</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Full TypeScript support, hot reload, automatic migrations, and modern tooling for an excellent DX.
                  </p>
                </div>
              </div>
            </UCard>
          </div>
        </div>
      </div>

      <!-- Technologies -->
      <div class="mb-12">
        <h2 class="text-2xl font-bold mb-6 text-center">Built With</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UCard v-for="tech in technologies" :key="tech.name">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <UIcon :name="tech.icon" class="w-6 h-6 text-primary" />
              </div>
              <div class="flex-1">
                <h3 class="font-semibold text-lg mb-1">{{ tech.name }}</h3>
                <p class="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  {{ tech.description }}
                </p>
                <UButton :to="tech.link" target="_blank" size="xs" variant="link" icon="i-lucide-external-link">
                  Learn more
                </UButton>
              </div>
            </div>
          </UCard>
        </div>
      </div>

      <!-- Use Template Section -->
      <div class="mb-12">
        <div class="border border-gray-200 dark:border-gray-800 rounded-lg p-6 text-center">
          <div class="flex items-center justify-center gap-2 mb-3">
            <UIcon name="i-lucide-rocket" class="w-5 h-5 text-primary" />
            <h3 class="text-lg font-semibold">Start Your Own Project</h3>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Clone this template and kickstart your next Nuxt application with authentication, D1, and edge deployment
            ready to go
          </p>
          <div class="flex gap-3 justify-center">
            <UButton
              to="https://github.com/MrAdisson/nuxtworker/archive/refs/heads/master.zip"
              target="_blank"
              variant="outline"
              icon="i-lucide-download"
            >
              Download ZIP
            </UButton>
            <UButton
              to="https://github.com/MrAdisson/nuxtworker/fork"
              target="_blank"
              variant="ghost"
              icon="i-lucide-git-fork"
              size="sm"
            >
              Fork
            </UButton>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="bg-primary/5 rounded-lg p-8 text-center">
        <h2 class="text-2xl font-bold mb-4">Ready to get started?</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6">Create an account to start building amazing things</p>
        <UButton to="/login" color="primary" size="lg" icon="i-lucide-arrow-right" trailing> Go to Login </UButton>
      </div>
    </div>
  </UContainer>
</template>
