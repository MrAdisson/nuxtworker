<script setup lang="ts">
definePageMeta({
  layout: 'default',
});

const { loggedIn } = useUserSession();
const { data, error, refresh } = await useFetch('/api/protected');

// Rediriger vers login si non connecté
watchEffect(() => {
  if (!loggedIn.value) {
    navigateTo('/login');
  }
});
</script>

<template>
  <UContainer class="py-12">
    <div class="max-w-2xl mx-auto">
      <div class="mb-8">
        <h1 class="text-3xl font-bold mb-2">Protected Page</h1>
        <p class="text-gray-600 dark:text-gray-400">This page is only accessible when logged in</p>
      </div>

      <UCard v-if="data">
        <template #header>
          <h2 class="text-xl font-semibold">Session Information</h2>
        </template>

        <div class="space-y-4">
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">User ID</p>
            <p class="font-mono">{{ data.user.id }}</p>
          </div>

          <div v-if="data.user.email">
            <p class="text-sm text-gray-500 dark:text-gray-400">Email</p>
            <p>{{ data.user.email }}</p>
          </div>

          <div v-if="data.user.name">
            <p class="text-sm text-gray-500 dark:text-gray-400">Name</p>
            <p>{{ data.user.name }}</p>
          </div>

          <div v-if="data.user.login">
            <p class="text-sm text-gray-500 dark:text-gray-400">GitHub Login</p>
            <p>{{ data.user.login }}</p>
          </div>

          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Login Provider</p>
            <UBadge :color="data.sessionInfo.provider === 'github' ? 'info' : 'success'">
              {{ data.sessionInfo.provider }}
            </UBadge>
          </div>

          <div v-if="data.sessionInfo.loggedInAt">
            <p class="text-sm text-gray-500 dark:text-gray-400">Logged In At</p>
            <p>{{ new Date(data.sessionInfo.loggedInAt).toLocaleString() }}</p>
          </div>
        </div>

        <template #footer>
          <UButton @click="() => refresh()" icon="i-lucide-refresh-cw">Refresh Data</UButton>
        </template>
      </UCard>

      <UCard v-else-if="error" color="red">
        <template #header>
          <h2 class="text-xl font-semibold">Error</h2>
        </template>
        <p>{{ error.message }}</p>
      </UCard>
    </div>
  </UContainer>
</template>
