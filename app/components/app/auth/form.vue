<script setup lang="ts">
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui';
import * as z from 'zod';

const toast = useToast();
const router = useRouter();
const { fetch: fetchUserSession } = useUserSession();

const loading = ref(false);

const fields: AuthFormField[] = [
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'demo@example.com',
    required: true,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'password123',
    required: true,
  },
  {
    name: 'remember',
    label: 'Remember me',
    type: 'checkbox',
  },
];

const providers = [
  {
    label: 'GitHub',
    icon: 'i-simple-icons-github',
    onClick: () => {
      // Redirige vers la route OAuth GitHub
      navigateTo('/auth/github', { external: true });
    },
  },
];

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters'),
});

type Schema = z.output<typeof schema>;

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  loading.value = true;

  try {
    const response = await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        email: payload.data.email,
        password: payload.data.password,
      },
    });

    // Recharger la session utilisateur
    await fetchUserSession();

    toast.add({
      title: 'Success',
      description: 'You are now logged in',
      color: 'success',
    });

    // Rediriger vers la page d'accueil
    router.push('/');
  } catch (error: any) {
    toast.add({
      title: 'Error',
      description: error.data?.message || 'Invalid credentials',
      color: 'error',
    });
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <UPageCard class="w-full max-w-md">
    <UAuthForm
      :schema="schema"
      title="Login"
      description="Enter your credentials to access your account."
      icon="i-lucide-user"
      :fields="fields"
      :providers="providers"
      @submit="onSubmit"
    />
  </UPageCard>
</template>
