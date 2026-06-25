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

const categorySlug = computed(() => route.params.category as string)
const modalitySlug = computed(() => route.params.modality as string)
const category = computed(() => categoryLabels[categorySlug.value] ?? categorySlug.value)
const modality = computed(() => modalityLabels[modalitySlug.value] ?? modalitySlug.value)

const competitionId = computed(() => `${categorySlug.value}-${modalitySlug.value}`)
const hasData = computed(() => competitionId.value === 'infantil-combo')

const { teams, loading, error, fetchTeams, byStartOrder, byScore } = useCompetition(competitionId.value)

const showParticipants = ref(false)
const showOrder = ref(false)

onMounted(() => {
  if (hasData.value) fetchTeams()
})
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 py-10">

    <!-- Page header -->
    <div class="mb-8">
      <p class="text-xs font-semibold uppercase tracking-widest text-primary-500 mb-1">{{ category }}</p>
      <h1 class="text-3xl font-bold text-gray-900">{{ modality }}</h1>
    </div>

    <template v-if="hasData">

      <!-- Loading -->
      <div v-if="loading" class="flex items-center gap-3 text-gray-400 py-8">
        <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
        <span class="text-sm">Cargando datos...</span>
      </div>

      <template v-else-if="!error">
        <!-- Action buttons -->
        <div class="flex flex-wrap gap-3 mb-10">
          <button
            class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-gray-200 text-sm font-medium text-gray-700 shadow-sm hover:border-primary-300 hover:text-primary-600 hover:shadow-md transition-all duration-200"
            @click="showParticipants = true"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Lista de participantes
          </button>

          <button
            class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-gray-200 text-sm font-medium text-gray-700 shadow-sm hover:border-primary-300 hover:text-primary-600 hover:shadow-md transition-all duration-200"
            @click="showOrder = true"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Orden de Salida
          </button>
        </div>

        <!-- Results table -->
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-50">
            <h2 class="text-sm font-semibold text-gray-500 uppercase tracking-wide">Clasificación</h2>
          </div>
          <div class="divide-y divide-gray-50">
            <div
              v-for="(team, index) in byScore"
              :key="team.id"
              class="flex items-center gap-4 px-6 py-4"
            >
              <!-- Position -->
              <span
                class="flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold shrink-0"
                :class="index === 0 ? 'bg-yellow-100 text-yellow-700' : index === 1 ? 'bg-gray-100 text-gray-600' : index === 2 ? 'bg-orange-100 text-orange-700' : 'bg-gray-50 text-gray-400'"
              >
                {{ index + 1 }}
              </span>

              <!-- Club name -->
              <span class="flex-1 text-sm font-medium text-gray-800">{{ team.equipo }}</span>

              <!-- Score -->
              <span
                class="text-lg font-bold tabular-nums"
                :class="team.puntuacion > 0 ? 'text-primary-600' : 'text-gray-300'"
              >
                {{ team.puntuacion > 0 ? team.puntuacion.toFixed(3) : '—' }}
              </span>
            </div>
          </div>
        </div>
      </template>

      <p v-else class="text-red-500 text-sm">{{ error }}</p>

    </template>

    <p v-else class="text-gray-400 text-sm">Los resultados de esta categoría y modalidad aparecerán aquí.</p>

  </div>

  <!-- Participants modal -->
  <AppModal v-model="showParticipants" title="Lista de participantes">
    <div class="space-y-4">
      <div
        v-for="team in byStartOrder"
        :key="team.id"
        class="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3"
      >
        <div class="flex items-center gap-2 mb-2">
          <span class="flex items-center justify-center w-5 h-5 rounded-full bg-primary-100 text-primary-700 text-xs font-bold shrink-0">
            {{ team.orden_salida }}
          </span>
          <p class="text-xs font-semibold uppercase tracking-wide text-primary-600">{{ team.equipo }}</p>
        </div>
        <ul class="grid grid-cols-1 gap-0.5">
          <li
            v-for="p in team.participantes"
            :key="p.nombre"
            class="flex items-center justify-between text-sm py-0.5"
          >
            <span class="flex items-center gap-1.5 text-gray-700">
              <span class="w-1 h-1 rounded-full shrink-0" :class="p.rol === 'Titular' ? 'bg-primary-400' : 'bg-gray-300'" />
              {{ p.nombre }}
            </span>
            <span class="text-xs text-gray-400 shrink-0 ml-2" :class="p.rol === 'Reserva' ? 'italic' : ''">
              {{ p.rol === 'Reserva' ? 'Res.' : p.año_nacimiento }}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </AppModal>

  <!-- Order of start modal -->
  <AppModal v-model="showOrder" title="Orden de Salida">
    <ol class="space-y-2">
      <li
        v-for="team in byStartOrder"
        :key="team.id"
        class="flex items-center gap-4 px-4 py-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors"
      >
        <span class="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-700 text-sm font-bold shrink-0">
          {{ team.orden_salida }}
        </span>
        <span class="text-sm font-medium text-gray-800">{{ team.equipo }}</span>
      </li>
    </ol>
  </AppModal>
</template>
