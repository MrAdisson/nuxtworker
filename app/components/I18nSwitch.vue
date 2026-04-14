<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui';

const { locale, setLocale, t } = useI18n();

const items = computed<DropdownMenuItem[][]>(() => [
  [
    {
      label: t('common.settings.language'),
      icon: 'i-lucide-languages',
      type: 'label',
    },
  ],
  [
    {
      label: 'English',
      onSelect: () => setLocale('en'),
      class: locale.value === 'en' ? 'bg-primary/5' : '',
    },
    {
      label: 'Français',
      onSelect: () => setLocale('fr'),
      class: locale.value === 'fr' ? 'bg-primary/5' : '',
    },
  ],
]);
</script>

<template>
  <UDropdownMenu :items="items" :ui="{ content: 'w-44' }">
    <UButton icon="i-lucide-settings" color="neutral" variant="ghost" size="sm" square />
  </UDropdownMenu>
</template>
