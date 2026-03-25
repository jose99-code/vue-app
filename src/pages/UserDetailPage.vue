<script setup>
import { ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { getUser } from '../services/userService'

const route = useRoute()

const user = ref(null)
const loading = ref(true)
const error = ref(null)

async function load(id) {
  loading.value = true
  error.value = null
  user.value = null
  try {
    user.value = await getUser(id)
    if (!user.value) {
      error.value = new Error('Utilisateur introuvable.')
    }
  } catch (e) {
    error.value = e
  } finally {
    loading.value = false
  }
}

watch(
  () => route.params.id,
  (id) => {
    if (id != null) load(id)
  },
  { immediate: true },
)
</script>

<template>
  <div class="mx-auto max-w-4xl px-4 py-8">
    <RouterLink
      to="/users"
      class="mb-6 inline-flex text-sm font-medium text-blue-600 hover:text-blue-800"
    >
      ← Retour à la liste
    </RouterLink>

    <div
      v-if="loading"
      class="flex items-center gap-2 text-gray-600 py-12 justify-center"
    >
      <span
        class="inline-block size-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"
        aria-hidden="true"
      />
      Chargement…
    </div>

    <p
      v-else-if="error"
      class="rounded-lg border border-red-100 bg-red-50 p-4 text-sm text-red-700"
    >
      {{ error?.message || 'Erreur inconnue.' }}
    </p>

    <div
      v-else-if="user"
      class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <p class="text-xs font-medium uppercase tracking-wide text-gray-500">
        Utilisateur #{{ user.id }}
      </p>
      <h1 class="mt-1 text-2xl font-bold text-gray-900">{{ user.name }}</h1>
      <p class="mt-2 text-gray-600">{{ user.email }}</p>
      <div class="mt-4 flex flex-wrap gap-2 text-sm">
        <span
          class="inline-flex rounded-full px-2 py-0.5 text-xs font-medium"
          :class="
            user.active
              ? 'bg-emerald-100 text-emerald-800'
              : 'bg-gray-100 text-gray-600'
          "
        >
          {{ user.active ? 'Actif' : 'Inactif' }}
        </span>
        <span
          v-if="user.age != null"
          class="inline-flex rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-800"
        >
          Âge {{ user.age }}
        </span>
      </div>
    </div>
  </div>
</template>
