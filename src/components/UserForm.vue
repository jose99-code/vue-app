<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  user: Object,
  disabled: Boolean,
})

const emit = defineEmits(['submit'])

const emptyForm = () => ({
  name: '',
  email: '',
  age: null,
  active: false,
})

const form = ref(emptyForm())
const emailError = ref('')

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const isValidEmail = (email) => emailPattern.test(String(email).trim())

watch(
  () => props.user,
  (newUser) => {
    emailError.value = ''
    if (newUser) {
      form.value = {
        name: newUser.name ?? '',
        email: newUser.email ?? '',
        age: Number.isFinite(Number(newUser.age)) ? Number(newUser.age) : null,
        active: Boolean(newUser.active),
      }
    } else {
      form.value = emptyForm()
    }
  },
  { immediate: true },
)

const handleSubmit = () => {
  emailError.value = ''
  if (!isValidEmail(form.value.email)) {
    emailError.value = 'Entrez une adresse e-mail valide.'
    return
  }
  if (!String(form.value.name).trim()) {
    return
  }
  if (form.value.age === null || Number(form.value.age) < 0) {
    return
  }
  emit('submit', {
    name: String(form.value.name).trim(),
    email: String(form.value.email).trim(),
    age: Number(form.value.age),
    active: form.value.active,
  })
  if (!props.user) {
    form.value = emptyForm()
  }
}
</script>

<template>
  <div class="bg-white p-4 rounded shadow mb-4">
    <input
      type="text"
      v-model="form.name"
      class="border p-2 w-full mb-2 rounded"
      placeholder="Nom"
      :disabled="disabled"
    />
    <input
      type="email"
      v-model="form.email"
      class="border p-2 w-full mb-2 rounded"
      :class="emailError ? 'border-red-500' : ''"
      placeholder="E-mail"
      :disabled="disabled"
    />
    <input
      type="number"
      v-model.number="form.age"
      class="border p-2 w-full mb-2 rounded"
      placeholder="Age"
      min="0"
      :disabled="disabled"
    />
    <p v-if="emailError" class="text-sm text-red-600 mb-2">{{ emailError }}</p>

    <label class="flex items-center gap-2 mb-4 cursor-pointer select-none">
      <input
        type="checkbox"
        v-model="form.active"
        class="size-4 rounded border-gray-300"
        :disabled="disabled"
      />
      <span class="text-sm text-gray-700">Compte actif</span>
    </label>

    <button
      type="button"
      @click="handleSubmit"
      class="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      :disabled="disabled"
    >
      {{ disabled ? 'Enregistrement…' : user ? 'Mettre à jour' : 'Créer' }}
    </button>
  </div>
</template>
