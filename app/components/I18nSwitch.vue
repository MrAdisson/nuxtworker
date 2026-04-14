<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui';

const { locale, setLocale } = useI18n();

const items = computed<DropdownMenuItem[]>(() => [
  {
    label: 'English',
    icon: locale.value === 'en' ? 'i-lucide-check' : undefined,
    onSelect: () => setLocale('en'),
  },
  {
    label: 'Français',
    icon: locale.value === 'fr' ? 'i-lucide-check' : undefined,
    onSelect: () => setLocale('fr'),
  },
]);

const currentLang = computed(() => (locale.value === 'en' ? '🇬🇧 EN' : '🇫🇷 FR'));
</script>

<template>
  <UDropdownMenu :items="items" :ui="{ content: 'w-40' }">
    <UButton icon="i-lucide-languages" color="neutral" variant="ghost" size="sm" trailing-icon="i-lucide-chevron-down">
      {{ currentLang }}
    </UButton>
  </UDropdownMenu>
</template>
