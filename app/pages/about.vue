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
        <p class="text-xl text-gray-600 dark:text-gray-400">
          A modern web application showcasing the power of Nuxt 4 and Cloudflare Workers
        </p>
      </div>

      <!-- Description -->
      <UCard class="mb-12">
        <div class="prose dark:prose-invert max-w-none">
          <h2>What is NuxtWorker?</h2>
          <p>
            NuxtWorker is a modern web application template that combines the best of frontend and edge computing. Built
            with Nuxt 4, it leverages Cloudflare Workers to deliver content at lightning speed from the edge, closest to
            your users.
          </p>
          <p>
            This project demonstrates how to build scalable, performant applications using cutting-edge technologies
            while maintaining an excellent developer experience.
          </p>
        </div>
      </UCard>

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

      <!-- CTA -->
      <div class="bg-primary/5 rounded-lg p-8 text-center">
        <h2 class="text-2xl font-bold mb-4">Ready to get started?</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6">Create an account to start building amazing things</p>
        <UButton to="/login" color="primary" size="lg" icon="i-lucide-arrow-right" trailing> Go to Login </UButton>
      </div>
    </div>
  </UContainer>
</template>
