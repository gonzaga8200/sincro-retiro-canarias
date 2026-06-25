<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const { authUser, logout } = useAuth()
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-primary-700 text-white px-6 py-4 flex items-center justify-between shadow">
      <h1 class="text-xl font-bold">🏊 Sincro Retiro Canarias</h1>
      <div class="flex items-center gap-4 text-sm">
        <span class="opacity-80">{{ authUser }}</span>
        <button class="bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition" @click="logout">
          Cerrar sesión
        </button>
      </div>
    </header>

    <main class="max-w-5xl mx-auto px-6 py-10">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Resultados</h2>
      <p class="text-gray-500">Bienvenida/o. Aquí aparecerán los resultados de natación artística.</p>
    </main>
  </div>
</template>
