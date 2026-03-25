import { ref, onMounted } from 'vue'
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from '../services/userService'

export function useUsers() {
  const users = ref([])
  const loading = ref(false)
  const saving = ref(false)
  const deletingId = ref(null)
  const error = ref(null)

  const fetchUsers = async () => {
    loading.value = true
    error.value = null
    try {
      const list = await getUsers()
      users.value = Array.isArray(list) ? list : []
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  }

  const addUser = async (data) => {
    saving.value = true
    error.value = null
    try {
      const newUser = await createUser(data)
      if (newUser) users.value.push(newUser)
    } catch (e) {
      error.value = e
    } finally {
      saving.value = false
    }
  }

  const editUser = async (id, data) => {
    saving.value = true
    error.value = null
    try {
      const updated = await updateUser(id, data)
      const index = users.value.findIndex((u) => u.id === id)
      if (index !== -1 && updated) users.value[index] = updated
    } catch (e) {
      error.value = e
    } finally {
      saving.value = false
    }
  }

  const removeUser = async (id) => {
    deletingId.value = id
    error.value = null
    try {
      await deleteUser(id)
      users.value = users.value.filter((u) => u.id !== id)
    } catch (e) {
      error.value = e
    } finally {
      deletingId.value = null
    }
  }

  onMounted(fetchUsers)

  return {
    users,
    loading,
    saving,
    deletingId,
    error,
    addUser,
    editUser,
    removeUser,
  }
}
