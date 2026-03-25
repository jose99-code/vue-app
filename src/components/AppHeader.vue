<script setup>
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

const links = [
  { to: '/', label: 'Accueil', name: 'home' },
  { to: '/users', label: 'Utilisateurs', name: 'users' },
  { to: '/about', label: 'À propos', name: 'about' },
]
</script>

<template>
  <header
    class="sticky top-0 z-40 border-b border-gray-200/80 bg-white/90 backdrop-blur-md"
  >
    <div class="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-3">
      <RouterLink
        to="/"
        class="text-lg font-semibold tracking-tight text-gray-900 hover:text-blue-600"
      >
        my-app-vue
      </RouterLink>

      <nav class="flex flex-wrap items-center gap-1 sm:gap-2" aria-label="Principal">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="rounded-lg px-3 py-2 text-sm font-medium transition-colors"
          :class="
            route.name === link.name
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
          "
        >
          {{ link.label }}
        </RouterLink>
      </nav>
    </div>
  </header>
</template>
