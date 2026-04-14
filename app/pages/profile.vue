<script setup lang="ts">
definePageMeta({
  layout: 'default',
  middleware: 'auth',
});

const { user } = useUserSession();
const { data, error, refresh } = await useFetch('/api/profile');
const { logout } = useLogout();
const { t } = useI18n();

// Statistiques d'exemple
const stats = computed(() => [
  {
    label: t('profile.stats.accountAge'),
    value: data.value?.sessionInfo?.loggedInAt
      ? Math.floor((Date.now() - new Date(data.value.sessionInfo.loggedInAt).getTime()) / (1000 * 60 * 60 * 24)) +
        ' ' +
        t('common.days')
      : t('common.na'),
    icon: 'i-lucide-calendar',
  },
  {
    label: t('profile.stats.provider'),
    value: data.value?.sessionInfo?.provider?.toUpperCase() || t('common.na'),
    icon: 'i-lucide-key',
  },
  {
    label: t('profile.stats.status'),
    value: t('profile.active'),
    icon: 'i-lucide-check-circle',
  },
]);
</script>

<template>
  <UContainer class="py-12">
    <div class="max-w-4xl mx-auto">
      <!-- Header with Avatar -->
      <div class="mb-8">
        <div class="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
          <!-- Avatar -->
          <div class="relative">
            <img
              v-if="user?.avatar"
              :src="user.avatar"
              :alt="user?.name || user?.login || t('common.user')"
              class="w-24 h-24 sm:w-32 sm:h-32 rounded-full ring-4 ring-primary/20"
            />
            <div
              v-else
              class="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-linear-to-br from-primary to-primary-600 flex items-center justify-center ring-4 ring-primary/20"
            >
              <UIcon name="i-lucide-user" class="w-12 h-12 sm:w-16 sm:h-16 text-white" />
            </div>
            <div
              class="absolute bottom-0 right-0 w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full ring-4 ring-white dark:ring-gray-950"
            ></div>
          </div>

          <!-- User Info -->
          <div class="flex-1 text-center sm:text-left">
            <h1 class="text-3xl sm:text-4xl font-bold mb-2">
              {{ user?.name || user?.login || t('common.user') }}
            </h1>
            <p v-if="user?.email" class="text-lg text-gray-600 dark:text-gray-400 mb-4">
              {{ user.email }}
            </p>
            <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
              <UBadge
                v-if="data?.sessionInfo?.provider"
                :color="data.sessionInfo.provider === 'github' ? 'neutral' : 'primary'"
                size="md"
              >
                <UIcon
                  :name="data.sessionInfo.provider === 'github' ? 'i-simple-icons-github' : 'i-lucide-mail'"
                  class="w-4 h-4"
                />
                {{ data.sessionInfo.provider }}
              </UBadge>
              <UBadge v-if="user?.login" color="neutral" size="md">
                <UIcon name="i-lucide-at-sign" class="w-4 h-4" />
                {{ user.login }}
              </UBadge>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex gap-2">
            <UButton icon="i-lucide-refresh-cw" color="neutral" variant="ghost" @click="() => refresh()">
              {{ t('nav.refresh') }}
            </UButton>
            <UButton icon="i-lucide-log-out" color="error" variant="soft" @click="logout">
              {{ t('nav.logout') }}
            </UButton>
          </div>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <UCard v-for="stat in stats" :key="stat.label">
          <div class="flex items-center gap-4">
            <div class="p-3 bg-primary/10 rounded-lg">
              <UIcon :name="stat.icon" class="w-6 h-6 text-primary" />
            </div>
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ stat.label }}</p>
              <p class="text-lg font-semibold">{{ stat.value }}</p>
            </div>
          </div>
        </UCard>
      </div>

      <!-- Account Details -->
      <UCard class="mb-8">
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-user" class="w-5 h-5" />
            <h2 class="text-xl font-semibold">{{ t('profile.accountDetails') }}</h2>
          </div>
        </template>

        <div class="space-y-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">{{ t('profile.userId') }}</p>
              <p class="font-mono text-sm bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded">
                {{ data?.user?.id || t('common.na') }}
              </p>
            </div>

            <div v-if="user?.name">
              <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">{{ t('profile.displayName') }}</p>
              <p class="px-3 py-2">{{ user.name }}</p>
            </div>

            <div v-if="user?.email">
              <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">{{ t('profile.emailAddress') }}</p>
              <p class="px-3 py-2">{{ user.email }}</p>
            </div>

            <div v-if="user?.login">
              <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">{{ t('profile.username') }}</p>
              <p class="px-3 py-2">{{ user.login }}</p>
            </div>

            <div v-if="data?.sessionInfo?.loggedInAt">
              <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">{{ t('profile.lastLogin') }}</p>
              <p class="px-3 py-2">{{ new Date(data.sessionInfo.loggedInAt).toLocaleString() }}</p>
            </div>

            <div v-if="data?.sessionInfo?.provider">
              <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">{{ t('profile.authProvider') }}</p>
              <p class="px-3 py-2 capitalize">{{ data.sessionInfo.provider }}</p>
            </div>
          </div>
        </div>
      </UCard>

      <!-- Security Section -->
      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-shield-check" class="w-5 h-5" />
            <h2 class="text-xl font-semibold">{{ t('profile.security') }}</h2>
          </div>
        </template>

        <div class="space-y-4">
          <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div class="flex items-center gap-3">
              <UIcon name="i-lucide-key" class="w-5 h-5 text-primary" />
              <div>
                <p class="font-medium">{{ t('profile.authMethod') }}</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ t('profile.securedVia', { provider: data?.sessionInfo?.provider }) }}
                </p>
              </div>
            </div>
            <UBadge color="success">{{ t('profile.active') }}</UBadge>
          </div>

          <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div class="flex items-center gap-3">
              <UIcon name="i-lucide-shield" class="w-5 h-5 text-primary" />
              <div>
                <p class="font-medium">{{ t('profile.sessionStatus') }}</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ t('profile.sessionSecure') }}</p>
              </div>
            </div>
            <UBadge color="success">{{ t('profile.protected') }}</UBadge>
          </div>
        </div>
      </UCard>

      <!-- Error State -->
      <UCard v-if="error" color="red" class="mt-8">
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-alert-circle" class="w-5 h-5" />
            <h2 class="text-xl font-semibold">{{ t('profile.error.title') }}</h2>
          </div>
        </template>
        <p>{{ error.message }}</p>
      </UCard>
    </div>
  </UContainer>
</template>
