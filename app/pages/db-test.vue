<template>
  <div class="container mx-auto p-8">
    <h1 class="text-3xl font-bold mb-6">Test de connexion à D1</h1>

    <UCard v-if="pending" class="mb-4">
      <div class="flex items-center gap-2">
        <UIcon name="i-heroicons-arrow-path" class="animate-spin" />
        <span>Connexion à la base de données...</span>
      </div>
    </UCard>

    <UCard v-else-if="error" class="mb-4">
      <div class="text-red-600">
        <h2 class="text-xl font-semibold mb-2">Erreur de connexion</h2>
        <p>{{ error.message }}</p>
      </div>
    </UCard>

    <div v-else-if="data">
      <UCard class="mb-4" :class="data.success ? 'border-green-500' : 'border-red-500'">
        <div class="flex items-center gap-2 mb-4">
          <UIcon
            :name="data.success ? 'i-heroicons-check-circle' : 'i-heroicons-x-circle'"
            :class="data.success ? 'text-green-600' : 'text-red-600'"
            class="w-6 h-6"
          />
          <h2 class="text-xl font-semibold">{{ data.message }}</h2>
        </div>

        <div v-if="data.error" class="text-red-600 mb-4">
          <p class="font-mono text-sm">{{ data.error }}</p>
        </div>

        <div v-if="data.success">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-semibold">Utilisateurs trouvés : {{ data.count }}</h3>
            <UButton @click="createUser" color="primary" icon="i-heroicons-plus" :loading="creating">
              Créer un utilisateur test
            </UButton>
          </div>

          <div v-if="data.users && data.users.length > 0" class="space-y-2">
            <UCard v-for="user in data.users" :key="user.id" class="bg-gray-50">
              <div class="flex items-center gap-4">
                <img v-if="user.avatar" :src="user.avatar" :alt="user.name || ''" class="w-12 h-12 rounded-full" />
                <div class="flex-1">
                  <p class="font-semibold">{{ user.name || 'Sans nom' }}</p>
                  <p class="text-sm text-gray-600">{{ user.email }}</p>
                  <div class="flex gap-2 text-xs text-gray-500 mt-1">
                    <span v-if="user.githubLogin">GitHub: @{{ user.githubLogin }}</span>
                    <span>ID: {{ user.id }}</span>
                  </div>
                </div>
                <UButton
                  @click="deleteUser(user.id)"
                  color="red"
                  variant="soft"
                  icon="i-heroicons-trash"
                  size="sm"
                  :loading="deletingId === user.id"
                >
                  Supprimer
                </UButton>
              </div>
            </UCard>
          </div>
          <div v-else class="text-gray-500 text-center py-8">Aucun utilisateur. Créez-en un pour tester !</div>
        </div>
      </UCard>

      <div class="flex gap-4">
        <UButton @click="refresh" color="primary" icon="i-heroicons-arrow-path"> Rafraîchir </UButton>
        <UButton to="/" variant="outline"> Retour à l'accueil </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data, pending, error, refresh } = await useFetch('/api/db-test');

const creating = ref(false);
const deletingId = ref<number | null>(null);

async function createUser() {
  creating.value = true;
  try {
    await $fetch('/api/db-test', { method: 'POST' });
    await refresh();
  } catch (err) {
    console.error('Failed to create user:', err);
  } finally {
    creating.value = false;
  }
}

async function deleteUser(id: number) {
  deletingId.value = id;
  try {
    await $fetch(`/api/db-test?id=${id}`, { method: 'DELETE' });
    await refresh();
  } catch (err) {
    console.error('Failed to delete user:', err);
  } finally {
    deletingId.value = null;
  }
}
</script>
