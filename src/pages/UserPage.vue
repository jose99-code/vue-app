<script setup>
import { ref } from 'vue'
import { useUsers } from '../composables/useUsers'
import UserForm from '../components/UserForm.vue'
import UserList from '../components/UserList.vue'
import ConfirmModal from '../components/ConfirmModal.vue'

const {
  users,
  loading,
  saving,
  deletingId,
  error,
  addUser,
  editUser,
  removeUser,
} = useUsers()

const selectedUser = ref(null)
const deleteModalOpen = ref(false)
const idPendingDelete = ref(null)

const handleSubmit = async (data) => {
  if (selectedUser.value) {
    await editUser(selectedUser.value.id, data)
    selectedUser.value = null
  } else {
    await addUser(data)
  }
}

const openDeleteModal = (id) => {
  idPendingDelete.value = id
  deleteModalOpen.value = true
}

const cancelDelete = () => {
  idPendingDelete.value = null
}

const confirmDelete = async () => {
  const id = idPendingDelete.value
  idPendingDelete.value = null
  if (id == null) return
  await removeUser(id)
}
</script>

<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Utilisateurs (CRUD)</h1>

    <p v-if="error" class="text-sm text-red-600 mb-4 p-3 bg-red-50 rounded border border-red-100">
      {{ error?.message || 'Une erreur est survenue.' }}
    </p>

    <UserForm :user="selectedUser" :disabled="saving" @submit="handleSubmit" />

    <div
      v-if="loading"
      class="flex items-center gap-2 text-gray-600 py-8 justify-center"
      aria-live="polite"
    >
      <span
        class="inline-block size-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"
        aria-hidden="true"
      />
      Chargement de la liste…
    </div>

    <UserList
      v-else
      :users="users"
      :deleting-id="deletingId"
      @edit="selectedUser = $event"
      @delete="openDeleteModal"
    />

    <ConfirmModal
      v-model="deleteModalOpen"
      title="Supprimer cet utilisateur ?"
      message="Cette action est définitive. Les données seront retirées de la liste."
      confirm-text="Supprimer"
      cancel-text="Annuler"
      danger
      @cancel="cancelDelete"
      @confirm="confirmDelete"
    />
  </div>
</template>
