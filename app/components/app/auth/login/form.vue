<script setup lang="ts">
import { loginSchema, type LoginInput } from '@/schemas/auth';
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui';

const toast = useToast();
const router = useRouter();
const { fetch: fetchUserSession } = useUserSession();
const { t } = useI18n();
const localePath = useLocalePath();

const loading = ref(false);
const initialEmail = import.meta.client ? localStorage.getItem('remembered_email') || '' : '';

const fields = computed<AuthFormField[]>(() => [
  {
    name: 'email',
    type: 'email',
    label: t('auth.login.email'),
    placeholder: t('auth.login.emailPlaceholder'),
    required: true,
    defaultValue: initialEmail,
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
    defaultValue: !!initialEmail,
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
      body: payload.data,
    });

    // Gérer le localStorage selon "remember me"
    if (import.meta.client) {
      if (payload.data.remember) {
        localStorage.setItem('remembered_email', payload.data.email);
      } else {
        localStorage.removeItem('remembered_email');
      }
    }

    await fetchUserSession();

    toast.add({
      title: t('auth.login.success'),
      description: t('auth.login.successMessage'),
      color: 'success',
    });

    router.push(localePath('/'));
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
  <div class="w-full">
    <UPageCard class="w-full sm:w-md mx-auto max-w-md">
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
