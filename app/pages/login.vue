<script setup lang="ts">
definePageMeta({
  layout: 'default',
});

const { t } = useI18n();
</script>

<template>
  <UContainer class="py-12">
    <div class="flex flex-col items-center justify-center min-h-[60vh]">
      <div class="mb-8 text-center">
        <h1 class="text-3xl font-bold mb-2">{{ t('auth.login.title') }}</h1>
        <p class="text-gray-600 dark:text-gray-400">{{ t('auth.login.subtitle') }}</p>
      </div>

      <AppAuthLoginForm />
    </div>
  </UContainer>
</template>
