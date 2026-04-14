<script setup lang="ts">
definePageMeta({
  layout: 'default',
});

const features = [
  {
    icon: 'i-lucide-rocket',
    title: 'Fast & Modern',
    description: 'Built with Nuxt 4 and deployed on Cloudflare Workers for blazing fast performance.',
  },
  {
    icon: 'i-lucide-shield',
    title: 'Secure',
    description: 'Enterprise-grade security with built-in authentication and authorization.',
  },
  {
    icon: 'i-lucide-zap',
    title: 'Serverless',
    description: 'Powered by Cloudflare Workers for scalable, edge-first computing.',
  },
  {
    icon: 'i-lucide-palette',
    title: 'Beautiful UI',
    description: 'Stunning design with Nuxt UI components and Tailwind CSS.',
  },
];
</script>

<template>
  <div>
    <!-- Hero Section -->
    <UContainer class="py-16">
      <div class="text-center max-w-3xl mx-auto">
        <h1 class="text-5xl font-bold mb-6">
          Welcome to
          <span class="text-primary">NuxtWorker</span>
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">
          A modern web application powered by Nuxt 4 and Cloudflare Workers. Fast, secure, and scalable by design.
        </p>
        <div class="flex gap-4 justify-center">
          <UButton to="/login" color="primary" size="xl" icon="i-lucide-log-in"> Get Started </UButton>
          <UButton to="/about" size="xl" variant="outline" icon="i-lucide-info"> Learn More </UButton>
        </div>
      </div>
    </UContainer>

    <!-- Features Section -->
    <div class="bg-gray-50 dark:bg-gray-900 py-16">
      <UContainer>
        <h2 class="text-3xl font-bold text-center mb-12">Features</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <UCard v-for="feature in features" :key="feature.title" class="text-center">
            <div class="flex flex-col items-center gap-4">
              <div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <UIcon :name="feature.icon" class="w-6 h-6 text-primary" />
              </div>
              <h3 class="font-semibold text-lg">{{ feature.title }}</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">
                {{ feature.description }}
              </p>
            </div>
          </UCard>
        </div>
      </UContainer>
    </div>

    <!-- Open Source Section -->
    <UContainer class="py-16">
      <div class="max-w-2xl mx-auto text-center">
        <h2 class="text-3xl font-bold mb-4">Built in the Open</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          NuxtWorker is open source and available on GitHub. Explore the code, contribute, or use it as a starting point
          for your next project.
        </p>
        <div class="flex gap-3 justify-center">
          <AppGithubButton size="lg" />
          <AppOpenSourceBadge />
        </div>
      </div>
    </UContainer>
  </div>
</template>
