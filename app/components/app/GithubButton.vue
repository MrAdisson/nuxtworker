<script setup lang="ts">
interface Props {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'solid' | 'outline' | 'soft' | 'ghost' | 'link';
  showExternalIcon?: boolean;
}

withDefaults(defineProps<Props>(), {
  size: 'lg',
  variant: 'outline',
  showExternalIcon: true,
});

const githubUrl = 'https://github.com/MrAdisson/nuxtworker';
</script>

<template>
  <UButton
    :to="githubUrl"
    target="_blank"
    color="neutral"
    :size="size"
    :variant="variant"
    icon="i-simple-icons-github"
    :trailing-icon="showExternalIcon ? 'i-lucide-external-link' : undefined"
  >
    <slot>View on GitHub</slot>
  </UButton>
</template>
