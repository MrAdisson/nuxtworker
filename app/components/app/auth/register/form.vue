<script setup lang="ts">
import { registerSchema, type RegisterInput } from '@/schemas/auth';
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui';

const toast = useToast();
const router = useRouter();
const { fetch: fetchUserSession } = useUserSession();
const { t } = useI18n();
const localePath = useLocalePath();

const loading = ref(false);

const fields = computed<AuthFormField[]>(() => [
  {
    name: 'name',
    type: 'text',
    label: t('auth.register.name'),
    placeholder: t('auth.register.namePlaceholder'),
    required: true,
  },
  {
    name: 'email',
    type: 'email',
    label: t('auth.register.email'),
    placeholder: t('auth.register.emailPlaceholder'),
    required: true,
  },
  {
    name: 'password',
    type: 'password',
    label: t('auth.register.password'),
    placeholder: t('auth.register.passwordPlaceholder'),
    required: true,
  },
]);

const providers = computed(() => [
  {
    label: t('auth.register.withGithub'),
    icon: 'i-simple-icons-github',
    onClick: () => {
      navigateTo('/auth/github', { external: true });
    },
  },
]);

async function onSubmit(payload: FormSubmitEvent<RegisterInput>) {
  loading.value = true;

  try {
    await $fetch('/api/auth/register', {
      method: 'POST',
      body: payload.data, // Directement les données validées par Zod !
    });

    await fetchUserSession();

    toast.add({
      title: t('auth.register.success'),
      description: t('auth.register.successMessage'),
      color: 'success',
    });

    await navigateTo(localePath('/'));
  } catch (err: any) {
    toast.add({
      title: t('auth.register.error'),
      description: err.data?.message || t('auth.register.errorMessage'),
      color: 'error',
    });
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div>
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        :schema="registerSchema"
        :fields="fields"
        :providers="providers"
        :title="t('auth.register.title')"
        :description="t('auth.register.subtitle')"
        icon="i-lucide-user-plus"
        align="top"
        @submit="onSubmit"
      />
    </UPageCard>

    <div class="text-center text-sm mt-4">
      {{ t('auth.register.hasAccount') }}
      <UButton to="/login" variant="link" :padded="false">
        {{ t('auth.register.signIn') }}
      </UButton>
    </div>
  </div>
</template>
