<script setup lang="ts">
const toast = useToast();
const router = useRouter();
const { fetch: fetchUserSession } = useUserSession();

const form = ref({
  name: '',
  email: '',
  password: '',
});

const error = ref('');
const loading = ref(false);

const fields = [
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
    to: '/auth/github',
    external: true,
  },
];

async function onSubmit() {
  error.value = '';
  loading.value = true;

  try {
    await $fetch('/api/auth/register', {
      method: 'POST',
      body: form.value,
    });

    await fetchUserSession();

    toast.add({
      title: 'Succès',
      description: 'Compte créé avec succès',
      color: 'success',
    });

    await navigateTo('/');
  } catch (err: any) {
    error.value = err.data?.message || 'Erreur lors de la création du compte';

    toast.add({
      title: 'Erreur',
      description: error.value,
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
        v-model="form"
        :fields="fields"
        :providers="providers"
        :validate-on="['blur', 'change']"
        title="Créer un compte"
        description="Remplissez le formulaire pour créer votre compte."
        icon="i-lucide-user-plus"
        align="top"
        @submit="onSubmit"
      >
        <template #validation>
          <UAlert v-if="error" color="error" icon="i-heroicons-exclamation-triangle" :title="error" class="mb-4" />
        </template>
      </UAuthForm>
    </UPageCard>

    <div class="text-center text-sm mt-4">
      Vous avez déjà un compte ?
      <UButton to="/login" variant="link" :padded="false"> Se connecter </UButton>
    </div>
  </div>
</template>
