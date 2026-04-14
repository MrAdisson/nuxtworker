<script setup lang="ts">
import { loginSchema, type LoginInput } from '@/schemas/auth';
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui';

const toast = useToast();
const router = useRouter();
const { fetch: fetchUserSession } = useUserSession();
const { t } = useI18n();

const loading = ref(false);

const fields = computed<AuthFormField[]>(() => [
  {
    name: 'email',
    type: 'email',
    label: t('auth.login.email'),
    placeholder: t('auth.login.emailPlaceholder'),
    required: true,
  },
  {
    name: 'password',
    label: t('auth.login.password'),
    type: 'password',
    placeholder: t('auth.login.passwordPlaceholder'),
    required: true,
  },
  {
    name: 'remember',
    label: t('auth.login.remember'),
    type: 'checkbox',
  },
]);

const providers = computed(() => [
  {
    label: t('auth.login.withGithub'),
    icon: 'i-simple-icons-github',
    onClick: () => {
      navigateTo('/auth/github', { external: true });
    },
  },
]);

async function onSubmit(payload: FormSubmitEvent<LoginInput>) {
  loading.value = true;

  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: payload.data, // Directement les données validées !
    });

    await fetchUserSession();

    toast.add({
      title: t('auth.login.success'),
      description: t('auth.login.successMessage'),
      color: 'success',
    });

    router.push('/');
  } catch (error: any) {
    toast.add({
      title: t('auth.login.error'),
      description: error.data?.message || t('auth.login.errorMessage'),
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
        :schema="loginSchema"
        :title="t('auth.login.title')"
        :description="t('auth.login.subtitle')"
        icon="i-lucide-user"
        :fields="fields"
        :providers="providers"
        @submit="onSubmit"
      />
    </UPageCard>

    <div class="text-center text-sm mt-4">
      {{ t('auth.login.noAccount') }}
      <UButton to="/register" variant="link" :padded="false">
        {{ t('auth.login.createAccount') }}
      </UButton>
    </div>
  </div>
</template>
