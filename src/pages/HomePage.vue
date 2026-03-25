<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="mx-auto max-w-4xl px-4 py-12">
    <h1 class="text-3xl font-bold text-gray-900">Bienvenue</h1>
    <p class="mt-4 max-w-xl text-gray-600">
      Petite appli Vue : navigation ci-dessus, CRUD utilisateurs et fiche détail par identifiant.
    </p>
    <RouterLink
      to="/users"
      class="mt-8 inline-flex rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
    >
      Voir les utilisateurs
    </RouterLink>
  </div>
</template>
