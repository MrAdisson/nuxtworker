<script setup lang="ts">
definePageMeta({
  layout: 'default',
});

const { t } = useI18n();
const localePath = useLocalePath();

const technologies = computed(() => [
  {
    name: t('about.technologies.nuxt.name'),
    icon: 'i-simple-icons-nuxtdotjs',
    description: t('about.technologies.nuxt.description'),
    link: 'https://nuxt.com',
  },
  {
    name: t('about.technologies.cloudflare.name'),
    icon: 'i-simple-icons-cloudflare',
    description: t('about.technologies.cloudflare.description'),
    link: 'https://workers.cloudflare.com',
  },
  {
    name: t('about.technologies.ui.name'),
    icon: 'i-lucide-palette',
    description: t('about.technologies.ui.description'),
    link: 'https://ui.nuxt.com',
  },
  {
    name: t('about.technologies.typescript.name'),
    icon: 'i-simple-icons-typescript',
    description: t('about.technologies.typescript.description'),
    link: 'https://www.typescriptlang.org',
  },
]);
</script>

<template>
  <UContainer class="py-12">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold mb-4">{{ t('about.title') }}</h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 mb-6">
          {{ t('about.subtitle') }}
        </p>
        <div class="flex gap-3 justify-center">
          <AppGithubButton />
          <AppOpenSourceBadge />
        </div>
      </div>

      <!-- What is NuxtWorker - Enhanced Section -->
      <div class="mb-12">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold mb-3">{{ t('about.whatIs.title') }}</h2>
          <div class="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div class="grid gap-6 mb-8">
          <UCard class="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                <UIcon name="i-lucide-rocket" class="w-6 h-6 text-primary" />
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-semibold mb-2">{{ t('about.whatIs.template.title') }}</h3>
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {{ t('about.whatIs.template.description') }}
                </p>
              </div>
            </div>
          </UCard>

          <div class="grid md:grid-cols-2 gap-6">
            <UCard>
              <div class="flex items-start gap-3">
                <UIcon name="i-lucide-zap" class="w-5 h-5 text-primary shrink-0 mt-1" />
                <div>
                  <h4 class="font-semibold mb-2">{{ t('about.whatIs.edgePerformance.title') }}</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    {{ t('about.whatIs.edgePerformance.description') }}
                  </p>
                </div>
              </div>
            </UCard>

            <UCard>
              <div class="flex items-start gap-3">
                <UIcon name="i-lucide-shield-check" class="w-5 h-5 text-primary shrink-0 mt-1" />
                <div>
                  <h4 class="font-semibold mb-2">{{ t('about.whatIs.authBuiltIn.title') }}</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    {{ t('about.whatIs.authBuiltIn.description') }}
                  </p>
                </div>
              </div>
            </UCard>

            <UCard>
              <div class="flex items-start gap-3">
                <UIcon name="i-lucide-database" class="w-5 h-5 text-primary shrink-0 mt-1" />
                <div>
                  <h4 class="font-semibold mb-2">{{ t('about.whatIs.d1Database.title') }}</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    {{ t('about.whatIs.d1Database.description') }}
                  </p>
                </div>
              </div>
            </UCard>

            <UCard>
              <div class="flex items-start gap-3">
                <UIcon name="i-lucide-code-2" class="w-5 h-5 text-primary shrink-0 mt-1" />
                <div>
                  <h4 class="font-semibold mb-2">{{ t('about.whatIs.devExperience.title') }}</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    {{ t('about.whatIs.devExperience.description') }}
                  </p>
                </div>
              </div>
            </UCard>
          </div>
        </div>
      </div>

      <!-- Technologies -->
      <div class="mb-12">
        <h2 class="text-2xl font-bold mb-6 text-center">{{ t('about.builtWith') }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UCard v-for="tech in technologies" :key="tech.name">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <UIcon :name="tech.icon" class="w-6 h-6 text-primary" />
              </div>
              <div class="flex-1">
                <h3 class="font-semibold text-lg mb-1">{{ tech.name }}</h3>
                <p class="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  {{ tech.description }}
                </p>
                <UButton :to="tech.link" target="_blank" size="xs" variant="link" icon="i-lucide-external-link">
                  {{ t('about.technologies.learnMore') }}
                </UButton>
              </div>
            </div>
          </UCard>
        </div>
      </div>

      <!-- Use Template Section -->
      <div class="mb-12">
        <div class="border border-gray-200 dark:border-gray-800 rounded-lg p-6 text-center">
          <div class="flex items-center justify-center gap-2 mb-3">
            <UIcon name="i-lucide-rocket" class="w-5 h-5 text-primary" />
            <h3 class="text-lg font-semibold">{{ t('about.startProject.title') }}</h3>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {{ t('about.startProject.description') }}
          </p>
          <div class="flex gap-3 justify-center">
            <UButton
              to="https://github.com/MrAdisson/nuxtworker/archive/refs/heads/master.zip"
              target="_blank"
              variant="outline"
              icon="i-lucide-download"
            >
              {{ t('about.startProject.downloadZip') }}
            </UButton>
            <UButton
              to="https://github.com/MrAdisson/nuxtworker/fork"
              target="_blank"
              variant="ghost"
              icon="i-lucide-git-fork"
              size="sm"
            >
              {{ t('about.startProject.fork') }}
            </UButton>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="bg-primary/5 rounded-lg p-8 text-center">
        <h2 class="text-2xl font-bold mb-4">{{ t('about.cta.title') }}</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6">{{ t('about.cta.description') }}</p>
        <UButton :to="localePath('/login')" color="primary" size="lg" icon="i-lucide-arrow-right" trailing>
          {{ t('about.cta.goToLogin') }}
        </UButton>
      </div>
    </div>
  </UContainer>
</template>
