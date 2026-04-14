<script setup lang="ts">
const { locale, locales, setLocale } = useI18n();

const availableLocales = computed(() => {
  return (locales.value as any[]).filter((l) => l.code !== locale.value);
});

const currentLocale = computed(() => {
  return (locales.value as any[]).find((l) => l.code === locale.value);
});

const items = computed(() => [
  (locales.value as any[]).map((loc) => ({
    label: loc.name,
    icon: 'i-lucide-globe',
    disabled: loc.code === locale.value,
    click: () => setLocale(loc.code),
  })),
]);
</script>

<template>
  <UDropdown :items="items">
    <UButton
      icon="i-lucide-languages"
      color="neutral"
      variant="ghost"
      size="sm"
      trailing-icon="i-lucide-chevron-down"
    >
      {{ currentLocale?.name }}
    </UButton>
  </UDropdown>
</template>
