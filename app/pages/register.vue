<script setup lang="ts">
definePageMeta({
  middleware: 'guest',
});
</script>

<template>
  <UContainer class="py-12">
    <div class="flex flex-col items-center justify-center min-h-[60vh]">
      <div class="mb-8 text-center">
        <h1 class="text-3xl font-bold mb-2">Créer un compte</h1>
        <p class="text-gray-600 dark:text-gray-400">Rejoignez-nous en quelques secondes</p>
      </div>

      <AppAuthRegisterForm />
    </div>
  </UContainer>
</template>
