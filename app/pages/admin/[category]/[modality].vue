<script setup lang="ts">
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

const { teams, loading, error, fetchTeams, updateScore, resetAllScores, byStartOrder } = useCompetition(competitionId)

onMounted(fetchTeams)

// Per-team input state
const inputs = ref<Record<string, string>>({})
const inputErrors = ref<Record<string, string | null>>({})
const saving = ref<Record<string, boolean>>({})

watch(teams, (list) => {
  list.forEach((team) => {
    if (!(team.id in inputs.value)) {
      inputs.value[team.id] = team.puntuacion > 0 ? String(team.puntuacion) : ''
    }
  })
}, { immediate: true })

const filter = ref('')
const filteredTeams = computed(() =>
  byStartOrder.value.filter(t =>
    t.equipo.toLowerCase().includes(filter.value.toLowerCase()),
  ),
)

function validateInput(id: string): boolean {
  const val = inputs.value[id]?.trim() ?? ''
  if (val === '') {
    inputErrors.value[id] = null
    return true
  }
  if (val.includes(',')) {
    inputErrors.value[id] = 'Usa "." como separador decimal. Ej: 3.14'
    return false
  }
  if (!/^\d+(\.\d+)?$/.test(val)) {
    inputErrors.value[id] = 'Formato incorrecto. Ej: 3.14 o 189.384'
    return false
  }
  inputErrors.value[id] = null
  return true
}

async function save(teamId: string, equipo: string) {
  if (!validateInput(teamId)) return
  const val = inputs.value[teamId]?.trim() ?? ''
  const puntuacion = val === '' ? 0 : parseFloat(val)
  saving.value[teamId] = true
  try {
    await updateScore(teamId, puntuacion)
    showToast(`Puntuación de ${equipo} guardada`, 'success')
  }
  catch {
    showToast('Error al guardar. Inténtalo de nuevo.', 'error')
  }
  finally {
    saving.value[teamId] = false
  }
}

// Reset all
const showResetConfirm = ref(false)
const resetting = ref(false)

async function confirmReset() {
  resetting.value = true
  try {
    await resetAllScores()
    teams.value.forEach(t => (inputs.value[t.id] = ''))
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
            class="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 hover:border-red-300 transition-colors shrink-0"
            @click="showResetConfirm = true"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Resetear todo
          </button>
        </div>

        <!-- Team list -->
        <div class="space-y-2">
          <div
            v-for="team in filteredTeams"
            :key="team.id"
            class="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-4"
          >
            <div class="flex flex-col sm:flex-row sm:items-center gap-3">
              <div class="flex items-center gap-3 flex-1 min-w-0">
                <span class="flex items-center justify-center w-7 h-7 rounded-full bg-primary-50 text-primary-700 text-xs font-bold shrink-0">
                  {{ team.orden_salida }}
                </span>
                <span class="text-sm font-medium text-gray-800 truncate">{{ team.equipo }}</span>
              </div>

              <div class="flex items-start gap-2 sm:shrink-0">
                <div class="flex flex-col gap-1">
                  <input
                    v-model="inputs[team.id]"
                    type="text"
                    inputmode="decimal"
                    placeholder="0.000"
                    class="w-32 px-3 py-2 border rounded-lg text-sm text-right font-mono outline-none transition"
                    :class="inputErrors[team.id]
                      ? 'border-red-300 bg-red-50 focus:ring-2 focus:ring-red-400 focus:border-red-400'
                      : 'border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500'"
                    @blur="validateInput(team.id)"
                    @keyup.enter="save(team.id, team.equipo)"
                  />
                  <p v-if="inputErrors[team.id]" class="text-xs text-red-500 leading-tight w-32">
                    {{ inputErrors[team.id] }}
                  </p>
                </div>

                <button
                  :disabled="saving[team.id] || !!inputErrors[team.id]"
                  class="flex items-center justify-center h-9 px-4 rounded-lg text-sm font-medium transition-all duration-150 shrink-0"
                  :class="saving[team.id] || inputErrors[team.id]
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-primary-600 hover:bg-primary-700 text-white shadow-sm'"
                  @click="save(team.id, team.equipo)"
                >
                  <svg v-if="saving[team.id]" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  <span v-else>Guardar</span>
                </button>
              </div>
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
