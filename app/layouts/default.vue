<script setup lang="ts">
const route = useRoute();
const { loggedIn, user, clear } = useUserSession();
const router = useRouter();
const toast = useToast();
const isMobileMenuOpen = ref(false);

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
    label: 'Dashboard',
    to: '/dashboard',
    icon: 'i-lucide-layout-dashboard',
    requireAuth: true,
  },
];

const visibleLinks = computed(() => {
  return links.filter((link) => !link.requireAuth || loggedIn.value);
});

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

// Close mobile menu on route change
watch(
  () => route.path,
  () => {
    isMobileMenuOpen.value = false;
  },
);
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Custom Header with unified container -->
    <header class="sticky top-0 z-40 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <UContainer class="py-4">
        <div class="flex items-center justify-between gap-4">
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center gap-2 font-bold text-xl shrink-0">
            <UIcon name="i-lucide-zap" class="w-6 h-6" />
            <span class="hidden sm:inline">NuxtWorker</span>
          </NuxtLink>

          <!-- Desktop Navigation -->
          <nav class="hidden md:flex items-center gap-1 flex-1 justify-center">
            <UButton
              v-for="link in visibleLinks"
              :key="link.to"
              :to="link.to"
              :icon="link.icon"
              :color="route.path === link.to ? 'primary' : 'neutral'"
              :variant="route.path === link.to ? 'soft' : 'ghost'"
              size="sm"
            >
              {{ link.label }}
            </UButton>
          </nav>

          <!-- Desktop Auth State + Mobile Menu Button -->
          <div class="flex items-center gap-2">
            <AuthState>
              <template #default="{ loggedIn }">
                <div v-if="loggedIn" class="hidden md:flex items-center gap-2">
                  <UButton
                    to="/profile"
                    icon="i-lucide-user"
                    color="neutral"
                    variant="ghost"
                    size="sm"
                    class="max-w-37.5 truncate"
                  >
                    {{ user?.name || user?.email || user?.login }}
                  </UButton>
                  <UButton icon="i-lucide-log-out" color="neutral" variant="ghost" size="sm" @click="logout">
                    Logout
                  </UButton>
                </div>
                <UButton
                  v-else
                  to="/login"
                  icon="i-lucide-log-in"
                  :color="route.path === '/login' ? 'primary' : 'neutral'"
                  :variant="route.path === '/login' ? 'soft' : 'ghost'"
                  size="sm"
                  class="hidden md:flex"
                >
                  Login
                </UButton>
              </template>
              <template #placeholder>
                <div class="hidden md:block w-24 h-8 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse"></div>
              </template>
            </AuthState>

            <!-- Mobile Menu Button -->
            <UButton
              :icon="isMobileMenuOpen ? 'i-lucide-x' : 'i-lucide-menu'"
              color="neutral"
              variant="ghost"
              size="sm"
              class="md:hidden"
              @click="isMobileMenuOpen = !isMobileMenuOpen"
            />
          </div>
        </div>
      </UContainer>

      <!-- Mobile Menu -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-1"
      >
        <div
          v-if="isMobileMenuOpen"
          class="md:hidden border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900"
        >
          <UContainer class="py-4">
            <nav class="flex flex-col gap-2">
              <UButton
                v-for="link in visibleLinks"
                :key="link.to"
                :to="link.to"
                :icon="link.icon"
                :color="route.path === link.to ? 'primary' : 'neutral'"
                :variant="route.path === link.to ? 'soft' : 'ghost'"
                size="sm"
                block
              >
                {{ link.label }}
              </UButton>

              <AuthState>
                <template #default="{ loggedIn }">
                  <div
                    v-if="loggedIn"
                    class="flex flex-col gap-2 pt-2 border-t border-gray-200 dark:border-gray-800 mt-2"
                  >
                    <UButton
                      to="/profile"
                      icon="i-lucide-user"
                      color="neutral"
                      variant="ghost"
                      size="sm"
                      block
                      class="truncate"
                    >
                      {{ user?.name || user?.email || user?.login }}
                    </UButton>
                    <UButton icon="i-lucide-log-out" color="neutral" variant="ghost" size="sm" @click="logout" block>
                      Logout
                    </UButton>
                  </div>
                  <UButton
                    v-else
                    to="/login"
                    icon="i-lucide-log-in"
                    :color="route.path === '/login' ? 'primary' : 'neutral'"
                    :variant="route.path === '/login' ? 'soft' : 'ghost'"
                    size="sm"
                    block
                    class="mt-2 border-t border-gray-200 dark:border-gray-800 pt-2"
                  >
                    Login
                  </UButton>
                </template>
                <template #placeholder>
                  <div class="w-full h-8 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse mt-2"></div>
                </template>
              </AuthState>
            </nav>
          </UContainer>
        </div>
      </Transition>
    </header>

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
