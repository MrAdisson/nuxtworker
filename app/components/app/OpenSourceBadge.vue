<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div class="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
    <UIcon name="i-lucide-heart" class="w-4 h-4" />
    <span class="text-sm font-semibold">{{ t('components.openSourceBadge.openSource') }}</span>
  </div>
</template>
