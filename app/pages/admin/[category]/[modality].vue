<script setup lang="ts">
import type { Resultado } from '~/composables/useCompetition'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const route = useRoute()
const { show: showToast } = useToast()

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

const categorySlug = route.params.category as string
const modalitySlug = route.params.modality as string
const categoryLabel = categoryLabels[categorySlug] ?? categorySlug
const modalityLabel = modalityLabels[modalitySlug] ?? modalitySlug
const competitionId = `${categorySlug}-${modalitySlug}`

const { teams, loading, error, fetchTeams, updateResultado, resetAllScores, byStartOrder } = useCompetition(competitionId)

onMounted(fetchTeams)

const filter = ref('')
const filteredTeams = computed(() =>
  byStartOrder.value.filter(t =>
    t.equipo.toLowerCase().includes(filter.value.toLowerCase()),
  ),
)

// Score entry modal (photo-assisted or manual)
const showEntryModal = ref(false)
const entryPresetTeamId = ref<string | null>(null)
const savingEntry = ref(false)

function openGlobalEntry() {
  entryPresetTeamId.value = null
  showEntryModal.value = true
}

function openEditEntry(teamId: string) {
  entryPresetTeamId.value = teamId
  showEntryModal.value = true
}

async function handleSaveEntry(payload: { teamId: string, resultado: Resultado, puntuacion: number }) {
  const team = teams.value.find(t => t.id === payload.teamId)
  savingEntry.value = true
  try {
    await updateResultado(payload.teamId, payload.resultado, payload.puntuacion)
    showToast(`Resultado de ${team?.equipo ?? 'equipo'} guardado`, 'success')
    showEntryModal.value = false
  }
  catch {
    showToast('Error al guardar. Inténtalo de nuevo.', 'error')
  }
  finally {
    savingEntry.value = false
  }
}

// Reset all
const showResetConfirm = ref(false)
const resetting = ref(false)

async function confirmReset() {
  resetting.value = true
  try {
    await resetAllScores()
    showResetConfirm.value = false
    showToast('Todas las puntuaciones han sido puestas a 0', 'success')
  }
  catch {
    showToast('Error al resetear. Inténtalo de nuevo.', 'error')
  }
  finally {
    resetting.value = false
  }
}
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 py-8">

    <!-- Header -->
    <div class="flex items-center gap-3 mb-8">
      <NuxtLink
        to="/admin"
        class="flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </NuxtLink>
      <div>
        <p class="text-xs font-semibold uppercase tracking-widest text-primary-500">{{ categoryLabel }}</p>
        <h1 class="text-2xl font-bold text-gray-900 leading-tight">{{ modalityLabel }}</h1>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex items-center gap-3 text-gray-400 py-12 justify-center">
      <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
      </svg>
      <span class="text-sm">Cargando equipos…</span>
    </div>

    <template v-else-if="!error">

      <div v-if="teams.length === 0" class="text-center py-16 text-gray-400">
        <p class="text-sm">No hay equipos registrados para esta categoría y modalidad.</p>
      </div>

      <template v-else>

        <!-- Toolbar -->
        <div class="flex items-center gap-3 mb-5">
          <div class="relative flex-1">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
            </svg>
            <input
              v-model="filter"
              type="text"
              placeholder="Filtrar por nombre de club…"
              class="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition bg-white"
            />
          </div>

          <button
            class="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium shadow-sm transition-colors shrink-0"
            @click="openGlobalEntry"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span class="hidden sm:inline">Añadir resultado desde foto</span>
            <span class="sm:hidden">Añadir</span>
          </button>

          <button
            class="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 hover:border-red-300 transition-colors shrink-0"
            @click="showResetConfirm = true"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span class="hidden sm:inline">Resetear todo</span>
          </button>
        </div>

        <!-- Team list -->
        <div class="space-y-2">
          <div
            v-for="team in filteredTeams"
            :key="team.id"
            class="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-4"
          >
            <div class="flex items-center gap-3">
              <div class="flex items-center gap-3 flex-1 min-w-0">
                <span class="flex items-center justify-center w-7 h-7 rounded-full bg-primary-50 text-primary-700 text-xs font-bold shrink-0">
                  {{ team.orden_salida }}
                </span>
                <span class="text-sm font-medium text-gray-800 truncate">{{ team.equipo }}</span>
              </div>

              <span
                class="text-sm font-mono font-semibold tabular-nums shrink-0"
                :class="team.puntuacion > 0 ? 'text-gray-800' : 'text-gray-300'"
              >
                {{ team.puntuacion > 0 ? team.puntuacion.toFixed(4) : '—' }}
              </span>

              <button
                class="flex items-center justify-center w-9 h-9 rounded-lg text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition-colors shrink-0"
                aria-label="Editar resultado"
                @click="openEditEntry(team.id)"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            </div>
          </div>

          <p v-if="filteredTeams.length === 0 && filter" class="text-center text-sm text-gray-400 py-6">
            Sin resultados para "{{ filter }}"
          </p>
        </div>

      </template>
    </template>

    <p v-else class="text-red-500 text-sm text-center py-12">{{ error }}</p>

  </div>

  <!-- Score entry modal (photo-assisted or manual) -->
  <ScoreEntryModal
    v-model="showEntryModal"
    :teams="teams"
    :modality="modalitySlug"
    :preset-team-id="entryPresetTeamId"
    :saving="savingEntry"
    @save="handleSaveEntry"
  />

  <!-- Reset confirmation modal -->
  <AppModal v-model="showResetConfirm" title="Resetear puntuaciones">
    <div class="space-y-4">
      <div class="flex gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
        <svg class="w-5 h-5 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        </svg>
        <div class="text-sm text-amber-800 space-y-1">
          <p class="font-semibold">Esta acción no se puede deshacer</p>
          <p>Se pondrá a <span class="font-bold">0</span> la puntuación de los <span class="font-bold">{{ teams.length }} equipos</span> de esta categoría y modalidad. Cualquier puntuación introducida hasta ahora se perderá permanentemente.</p>
        </div>
      </div>

      <p class="text-sm text-gray-500">¿Estás seguro de que quieres continuar?</p>

      <div class="flex gap-3 pt-1">
        <button
          class="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          @click="showResetConfirm = false"
        >
          Cancelar
        </button>
        <button
          :disabled="resetting"
          class="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-colors"
          :class="resetting ? 'bg-red-300 text-white cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 text-white'"
          @click="confirmReset"
        >
          <svg v-if="resetting" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          <span>{{ resetting ? 'Reseteando…' : 'Sí, resetear todo' }}</span>
        </button>
      </div>
    </div>
  </AppModal>
</template>
