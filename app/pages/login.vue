<script setup lang="ts">
definePageMeta({
  layout: 'default',
});
</script>

<template>
  <UContainer class="py-12">
    <div class="flex flex-col items-center justify-center min-h-[60vh]">
      <div class="mb-8 text-center">
        <h1 class="text-3xl font-bold mb-2">Welcome Back</h1>
        <p class="text-gray-600 dark:text-gray-400">Sign in to your account to continue</p>
      </div>

      <AppAuthForm />
    </div>
  </UContainer>
</template>
