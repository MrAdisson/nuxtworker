<script setup lang="ts">
definePageMeta({
  layout: 'default',
});

const { t } = useI18n();
const localePath = useLocalePath();

const features = computed(() => [
  {
    icon: 'i-lucide-rocket',
    title: t('home.features.fast.title'),
    description: t('home.features.fast.description'),
  },
  {
    icon: 'i-lucide-shield',
    title: t('home.features.secure.title'),
    description: t('home.features.secure.description'),
  },
  {
    icon: 'i-lucide-zap',
    title: t('home.features.serverless.title'),
    description: t('home.features.serverless.description'),
  },
  {
    icon: 'i-lucide-palette',
    title: t('home.features.ui.title'),
    description: t('home.features.ui.description'),
  },
]);
</script>

<template>
  <div>
    <!-- Hero Section -->
    <UContainer class="py-16">
      <div class="text-center max-w-3xl mx-auto">
        <h1 class="text-5xl font-bold mb-6">
          {{ t('home.welcome') }}
          <span class="text-primary">{{ t('home.appName') }}</span>
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">
          {{ t('home.subtitle') }}
        </p>
        <div class="flex gap-4 justify-center">
          <UButton :to="localePath('/login')" color="primary" size="xl" icon="i-lucide-log-in">
            {{ t('home.getStarted') }}
          </UButton>
          <UButton :to="localePath('/about')" size="xl" variant="outline" icon="i-lucide-info">
            {{ t('home.learnMore') }}
          </UButton>
        </div>
      </div>
    </UContainer>

    <!-- Features Section -->
    <div class="bg-gray-50 dark:bg-gray-900 py-16">
      <UContainer>
        <h2 class="text-3xl font-bold text-center mb-12">{{ t('home.features.title') }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <UCard v-for="feature in features" :key="feature.title" class="text-center">
            <div class="flex flex-col items-center gap-4">
              <div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <UIcon :name="feature.icon" class="w-6 h-6 text-primary" />
              </div>
              <h3 class="font-semibold text-lg">{{ feature.title }}</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">
                {{ feature.description }}
              </p>
            </div>
          </UCard>
        </div>
      </UContainer>
    </div>

    <!-- Open Source Section -->
    <UContainer class="py-16">
      <div class="max-w-2xl mx-auto text-center">
        <h2 class="text-3xl font-bold mb-4">{{ t('home.openSource.title') }}</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          {{ t('home.openSource.description') }}
        </p>
        <div class="flex gap-3 justify-center">
          <AppGithubButton size="lg" />
          <AppOpenSourceBadge />
        </div>
      </div>
    </UContainer>
  </div>
</template>
