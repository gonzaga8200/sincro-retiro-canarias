<script setup lang="ts">
const route = useRoute()

const categoryLabels: Record<string, string> = {
  absoluto: 'Absoluto',
  junior: 'Junior',
  infantil: 'Infantil',
  alevin: 'Alevín',
}

const modalityLabels: Record<string, string> = {
  'duo': 'Dúo',
  'duo-mixto': 'Dúo Mixto',
  'combo': 'Combo',
  'equipo': 'Equipo',
}

const category = computed(() => categoryLabels[route.params.category as string] ?? route.params.category)
const modality = computed(() => modalityLabels[route.params.modality as string] ?? route.params.modality)
</script>

<template>
  <div class="max-w-5xl mx-auto px-6 py-12">
    <h1 class="text-3xl font-bold text-gray-800 mb-1">{{ category }}</h1>
    <p class="text-primary-600 font-medium mb-8">{{ modality }}</p>
    <p class="text-gray-400">Los resultados de esta categoría y modalidad aparecerán aquí.</p>
  </div>
</template>
