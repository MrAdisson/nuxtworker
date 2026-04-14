<script setup lang="ts">
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui';
import * as z from 'zod';

const toast = useToast();
const router = useRouter();
const { fetch: fetchUserSession } = useUserSession();

const loading = ref(false);

const fields: AuthFormField[] = [
  {
    name: 'name',
    type: 'text',
    label: 'Nom',
    placeholder: 'Entrez votre nom',
    required: true,
  },
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'Entrez votre email',
    required: true,
  },
  {
    name: 'password',
    type: 'password',
    label: 'Mot de passe',
    placeholder: 'Minimum 8 caractères',
    required: true,
  },
];

const providers = [
  {
    label: "S'inscrire avec GitHub",
    icon: 'i-simple-icons-github',
    onClick: () => {
      navigateTo('/auth/github', { external: true });
    },
  },
];

const schema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.email('Email invalide'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
});

type Schema = z.output<typeof schema>;

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  loading.value = true;

  try {
    await $fetch('/api/auth/register', {
      method: 'POST',
      body: payload.data, // Directement les données validées par Zod !
    });

    await fetchUserSession();

    toast.add({
      title: 'Succès',
      description: 'Compte créé avec succès',
      color: 'success',
    });

    await navigateTo('/');
  } catch (err: any) {
    toast.add({
      title: 'Erreur',
      description: err.data?.message || 'Erreur lors de la création du compte',
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
        :schema="schema"
        :fields="fields"
        :providers="providers"
        title="Créer un compte"
        description="Remplissez le formulaire pour créer votre compte."
        icon="i-lucide-user-plus"
        align="top"
        @submit="onSubmit"
      />
    </UPageCard>

    <div class="text-center text-sm mt-4">
      Vous avez déjà un compte ?
      <UButton to="/login" variant="link" :padded="false"> Se connecter </UButton>
    </div>
  </div>
</template>
