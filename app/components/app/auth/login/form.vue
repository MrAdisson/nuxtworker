<script setup lang="ts">
import { loginSchema, type LoginInput } from '@/schemas/auth';
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui';

const toast = useToast();
const router = useRouter();
const { fetch: fetchUserSession } = useUserSession();

const loading = ref(false);

const fields: AuthFormField[] = [
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'votre@email.com',
    required: true,
  },
  {
    name: 'password',
    label: 'Mot de passe',
    type: 'password',
    placeholder: 'Votre mot de passe',
    required: true,
  },
  {
    name: 'remember',
    label: 'Se souvenir de moi',
    type: 'checkbox',
  },
];

const providers = [
  {
    label: 'Se connecter avec GitHub',
    icon: 'i-simple-icons-github',
    onClick: () => {
      navigateTo('/auth/github', { external: true });
    },
  },
];

async function onSubmit(payload: FormSubmitEvent<LoginInput>) {
  loading.value = true;

  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: payload.data, // Directement les données validées !
    });

    await fetchUserSession();

    toast.add({
      title: 'Succès',
      description: 'Vous êtes maintenant connecté',
      color: 'success',
    });

    router.push('/');
  } catch (error: any) {
    toast.add({
      title: 'Erreur',
      description: error.data?.message || 'Identifiants incorrects',
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
        title="Connexion"
        description="Entrez vos identifiants pour accéder à votre compte."
        icon="i-lucide-user"
        :fields="fields"
        :providers="providers"
        @submit="onSubmit"
      />
    </UPageCard>

    <div class="text-center text-sm mt-4">
      Pas encore de compte ?
      <UButton to="/register" variant="link" :padded="false"> Créer un compte </UButton>
    </div>
  </div>
</template>
