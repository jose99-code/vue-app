<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: 'Confirmation',
  },
  message: {
    type: String,
    default: '',
  },
  confirmText: {
    type: String,
    default: 'Confirmer',
  },
  cancelText: {
    type: String,
    default: 'Annuler',
  },
  danger: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])

const close = () => emit('update:modelValue', false)

const onBackdrop = () => {
  emit('cancel')
  close()
}

const onCancel = () => {
  emit('cancel')
  close()
}

const onConfirm = () => {
  emit('confirm')
  close()
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="presentation"
    >
      <div
        class="absolute inset-0 bg-black/45 backdrop-blur-[1px]"
        aria-hidden="true"
        @click="onBackdrop"
      />
      <div
        role="dialog"
        aria-modal="true"
        :aria-labelledby="'confirm-modal-title'"
        class="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl ring-1 ring-black/5"
        @click.stop
      >
        <h2 id="confirm-modal-title" class="text-lg font-semibold text-gray-900">
          {{ title }}
        </h2>
        <p v-if="message" class="mt-2 text-sm text-gray-600">
          {{ message }}
        </p>
        <div class="mt-6 flex justify-end gap-3">
          <button
            type="button"
            class="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            @click="onCancel"
          >
            {{ cancelText }}
          </button>
          <button
            type="button"
            class="rounded-lg px-4 py-2 text-sm font-medium text-white"
            :class="
              danger
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-blue-600 hover:bg-blue-700'
            "
            @click="onConfirm"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
