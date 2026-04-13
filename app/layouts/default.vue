<script setup lang="ts">
const route = useRoute();
const { loggedIn, user, clear } = useUserSession();
const router = useRouter();
const toast = useToast();

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
    label: 'Protected',
    to: '/protected',
    icon: 'i-lucide-shield',
    requireAuth: true,
  },
];

async function logout() {
  try {
    await $fetch('/api/auth/logout', { method: 'POST' });
    await clear();
    toast.add({
      title: 'Success',
      description: 'You have been logged out',
      color: 'success',
    });
    router.push('/');
  } catch (error) {
    toast.add({
      title: 'Error',
      description: 'Failed to logout',
      color: 'error',
    });
  }
}

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
          <template v-for="link in links" :key="link.to">
            <NuxtLink
              v-if="!link.requireAuth || loggedIn"
              :to="link.to"
              class="flex items-center gap-2 px-3 py-2 rounded-md transition-colors"
              :class="route.path === link.to ? 'bg-primary text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800'"
            >
              <UIcon :name="link.icon" class="w-4 h-4" />
              <span>{{ link.label }}</span>
            </NuxtLink>
          </template>

          <AuthState>
            <template #default="{ loggedIn }">
              <div v-if="loggedIn" class="flex items-center gap-3">
                <div class="flex items-center gap-2 px-3 py-2">
                  <UIcon name="i-lucide-user" class="w-4 h-4" />
                  <span class="text-sm">{{ user?.name || user?.email || user?.login }}</span>
                </div>
                <UButton icon="i-lucide-log-out" color="neutral" variant="ghost" @click="logout"> Logout </UButton>
              </div>
              <NuxtLink
                v-else
                to="/login"
                class="flex items-center gap-2 px-3 py-2 rounded-md transition-colors"
                :class="route.path === '/login' ? 'bg-primary text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800'"
              >
                <UIcon name="i-lucide-log-in" class="w-4 h-4" />
                <span>Login</span>
              </NuxtLink>
            </template>
            <template #placeholder>
              <div class="w-24 h-10 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse"></div>
            </template>
          </AuthState>
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
