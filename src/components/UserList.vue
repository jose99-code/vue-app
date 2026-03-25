<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  users: Array,
  deletingId: {
    type: [Number, String],
    default: null,
  },
})

const emit = defineEmits(['edit', 'delete'])
</script>

<template>
  <div class="grid md:grid-cols-2 gap-4">
    <div
      v-for="user in users"
      :key="user.id"
      class="bg-white p-4 rounded shadow flex justify-between gap-4"
    >
      <div>
        <div class="flex flex-wrap items-center gap-2 mb-1">
          <p class="font-bold">{{ user.name }}</p>
          <span
            class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
            :class="
              user.active
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-gray-100 text-gray-600'
            "
          >
            {{ user.active ? 'Actif' : 'Inactif' }}
          </span>
        </div>
        <p class="text-sm text-gray-500">{{ user.email }}</p>
        <p class="text-xs text-gray-600 mt-1">Age: {{ user.age ?? '-' }}</p>
      </div>

      <div class="flex flex-wrap gap-2 items-start shrink-0 justify-end">
        <RouterLink
          :to="{ name: 'user-detail', params: { id: user.id } }"
          class="rounded bg-blue-500 px-2 py-1 text-sm text-white hover:bg-blue-600"
        >
          Fiche
        </RouterLink>
        <button
          type="button"
          @click="emit('edit', user)"
          class="bg-yellow-400 px-2 py-1 rounded text-sm disabled:opacity-50"
          :disabled="deletingId != null"
        >
          Modifier
        </button>
        <button
          type="button"
          @click="emit('delete', user.id)"
          class="bg-red-500 text-white px-2 py-1 rounded text-sm disabled:opacity-50 min-w-[5.5rem]"
          :disabled="deletingId != null"
        >
          {{ deletingId === user.id ? 'Suppression…' : 'Supprimer' }}
        </button>
      </div>
    </div>
  </div>
</template>
