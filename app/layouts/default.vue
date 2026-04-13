<script setup lang="ts">
const route = useRoute();

const links = [
  {
    label: 'Home',
    to: '/',
    icon: 'i-lucide-home',
  },
  {
    label: 'About',
    to: '/about',
    icon: 'i-lucide-info',
  },
  {
    label: 'Login',
    to: '/login',
    icon: 'i-lucide-log-in',
  },
];

watch(
  () => route.path,
  (newPath, oldPath) => {
    console.log('Route changed:', { from: oldPath, to: newPath });
  },
);
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <UHeader>
      <template #left>
        <NuxtLink to="/" class="flex items-center gap-2 font-bold text-xl">
          <UIcon name="i-lucide-zap" class="w-6 h-6" />
          <span>NuxtWorker</span>
        </NuxtLink>
      </template>

      <template #right>
        <nav class="flex items-center gap-4">
          <NuxtLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="flex items-center gap-2 px-3 py-2 rounded-md transition-colors"
            :class="route.path === link.to ? 'bg-primary text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800'"
          >
            <UIcon :name="link.icon" class="w-4 h-4" />
            <span>{{ link.label }}</span>
          </NuxtLink>
        </nav>
      </template>
    </UHeader>

    <main class="flex-1">
      <slot />
    </main>

    <footer class="border-t border-gray-200 dark:border-gray-800 py-6">
      <UContainer>
        <div class="text-center text-sm text-gray-600 dark:text-gray-400">
          &copy; {{ new Date().getFullYear() }} NuxtWorker. All rights reserved.
        </div>
      </UContainer>
    </footer>
  </div>
</template>
