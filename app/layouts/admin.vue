<script setup lang="ts">
const { authUser, logout } = useAuth()
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <header class="bg-primary-800 text-white px-6 py-3 flex items-center justify-between shadow-md shrink-0">
      <div class="flex items-center gap-4">
        <NuxtLink to="/admin" class="flex items-center gap-2 opacity-90 hover:opacity-100 transition-opacity">
          <span class="text-xl leading-none">🏊</span>
          <span class="font-bold text-sm hidden sm:block">Admin · Campeonato de España Natación Artística</span>
          <span class="font-bold text-sm sm:hidden">Admin</span>
        </NuxtLink>
      </div>
      <div class="flex items-center gap-3 text-sm">
        <span class="text-white/60 hidden sm:inline">{{ authUser }}</span>
        <button
          class="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors text-xs font-medium"
          @click="logout"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Salir
        </button>
      </div>
    </header>

    <main class="flex-1">
      <slot />
    </main>

    <AppToast />
  </div>
</template>
