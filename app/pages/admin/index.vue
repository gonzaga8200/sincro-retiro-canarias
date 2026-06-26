<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })

const { categories, modalities } = useNavItems()

const selectedCategory = ref('')
const selectedModality = ref('')
const canNavigate = computed(() => selectedCategory.value && selectedModality.value)

function go() {
  if (canNavigate.value) {
    navigateTo(`/admin/${selectedCategory.value}/${selectedModality.value}`)
  }
}
</script>

<template>
  <div class="min-h-[calc(100vh-56px)] flex items-center justify-center p-6">
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 w-full max-w-sm p-8">
      <h1 class="text-xl font-bold text-gray-800 mb-1">Editar puntuaciones</h1>
      <p class="text-sm text-gray-400 mb-8">Selecciona la categoría y modalidad</p>

      <div class="space-y-4 mb-8">
        <div>
          <label class="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">
            Categoría
          </label>
          <select
            v-model="selectedCategory"
            class="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
          >
            <option value="" disabled>Selecciona…</option>
            <option v-for="cat in categories" :key="cat.slug" :value="cat.slug">
              {{ cat.label }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">
            Modalidad
          </label>
          <select
            v-model="selectedModality"
            class="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
          >
            <option value="" disabled>Selecciona…</option>
            <option v-for="mod in modalities" :key="mod.slug" :value="mod.slug">
              {{ mod.label }}
            </option>
          </select>
        </div>
      </div>

      <button
        :disabled="!canNavigate"
        class="w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
        :class="canNavigate
          ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-sm'
          : 'bg-gray-100 text-gray-400 cursor-not-allowed'"
        @click="go"
      >
        Ver puntuaciones
      </button>
    </div>
  </div>
</template>
