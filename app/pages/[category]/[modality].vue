<script setup lang="ts">
import type { Team } from '~/composables/useCompetition'

const { t } = useI18n()
const route = useRoute()

const categorySlug = computed(() => route.params.category as string)
const modalitySlug = computed(() => route.params.modality as string)
const category = computed(() => t(`categories.${categorySlug.value}`))
const modality = computed(() => t(`modalities.${modalitySlug.value.replace('-', '_')}`))

const competitionId = computed(() => `${categorySlug.value}-${modalitySlug.value}`)

const { teams, loading, error, fetchTeams, byStartOrder, byScore } = useCompetition(competitionId.value)

const showParticipants = ref(false)
const showOrder = ref(false)

const showDetail = ref(false)
const detailTeam = ref<Team | null>(null)

function openDetail(team: Team) {
  if (!team.resultado) return
  detailTeam.value = team
  showDetail.value = true
}

interface DetailRow {
  label: string
  value: string
  penalty?: boolean
}

const detailRows = computed<DetailRow[]>(() => {
  const r = detailTeam.value?.resultado
  if (!r) return []
  const rows: DetailRow[] = [
    { label: t('results.totalElementos'), value: r.totalElementos?.toFixed(4) ?? '—' },
  ]
  if (r.sincronizacion !== null && r.sincronizacion !== undefined) {
    rows.push({ label: t('results.sincronizacion'), value: r.sincronizacion.toFixed(2), penalty: true })
  }
  rows.push(
    { label: t('results.totalImpArtistica'), value: r.totalImpArtistica?.toFixed(4) ?? '—' },
    { label: t('results.tdd'), value: r.tdd?.toFixed(4) ?? '—' },
  )
  if (r.bm) rows.push({ label: t('results.bm'), value: r.bm, penalty: true })
  rows.push({ label: t('results.totalRutina'), value: r.totalRutina?.toFixed(4) ?? '—' })
  if (modalitySlug.value !== 'combo' && r.totalRutinaFiguras !== null && r.totalRutinaFiguras !== undefined) {
    rows.push({ label: t('results.totalRutinaFiguras'), value: r.totalRutinaFiguras.toFixed(4) })
  }
  return rows
})

onMounted(() => fetchTeams())
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 py-10">

    <!-- Page header -->
    <div class="mb-8">
      <p class="text-xs font-semibold uppercase tracking-widest text-primary-500 mb-1">{{ category }}</p>
      <h1 class="text-3xl font-bold text-gray-900">{{ modality }}</h1>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex items-center gap-3 text-gray-400 py-8">
      <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
      </svg>
      <span class="text-sm">{{ $t('results.loading') }}</span>
    </div>

    <template v-else-if="!error && teams.length > 0">
        <!-- Action buttons -->
        <div class="flex flex-wrap gap-3 mb-10">
          <button
            class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-gray-200 text-sm font-medium text-gray-700 shadow-sm hover:border-primary-300 hover:text-primary-600 hover:shadow-md transition-all duration-200"
            @click="showParticipants = true"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {{ $t('results.participants') }}
          </button>

          <button
            class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-gray-200 text-sm font-medium text-gray-700 shadow-sm hover:border-primary-300 hover:text-primary-600 hover:shadow-md transition-all duration-200"
            @click="showOrder = true"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            {{ $t('results.startOrder') }}
          </button>
        </div>

        <!-- Results table -->
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-50">
            <h2 class="text-sm font-semibold text-gray-500 uppercase tracking-wide">{{ $t('results.ranking') }}</h2>
          </div>
          <div class="divide-y divide-gray-50">
            <div
              v-for="(team, index) in byScore"
              :key="team.id"
              class="flex items-center gap-4 px-6 py-4"
              :class="team.resultado ? 'cursor-pointer hover:bg-gray-50 transition-colors' : ''"
              @click="openDetail(team)"
            >
              <span
                class="flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold shrink-0"
                :class="index === 0 ? 'bg-yellow-100 text-yellow-700' : index === 1 ? 'bg-gray-100 text-gray-600' : index === 2 ? 'bg-orange-100 text-orange-700' : 'bg-gray-50 text-gray-400'"
              >
                {{ index + 1 }}
              </span>
              <span class="flex-1 text-sm font-medium text-gray-800">{{ team.equipo }}</span>
              <span
                class="text-lg font-bold tabular-nums"
                :class="team.puntuacion > 0 ? 'text-primary-600' : 'text-gray-300'"
              >
                {{ team.puntuacion > 0 ? team.puntuacion.toFixed(3) : '—' }}
              </span>
              <button
                v-if="team.resultado"
                class="flex items-center justify-center w-8 h-8 rounded-full text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition-colors shrink-0"
                :aria-label="$t('results.detail')"
                @click.stop="openDetail(team)"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <span v-else class="w-8 h-8 shrink-0" />
            </div>
          </div>
        </div>
      </template>

      <p v-else-if="error" class="text-red-500 text-sm">{{ error }}</p>
      <p v-else class="text-gray-400 text-sm">{{ $t('results.noData') }}</p>

  </div>

  <!-- Participants modal -->
  <AppModal v-model="showParticipants" :title="$t('results.participants')">
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
              {{ p.rol === 'Reserva' ? $t('results.reserve') : p.año_nacimiento }}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </AppModal>

  <!-- Start order modal -->
  <AppModal v-model="showOrder" :title="$t('results.startOrder')">
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

  <!-- Score detail modal -->
  <AppModal v-model="showDetail" :title="$t('results.detail')">
    <div v-if="detailTeam" class="space-y-4">
      <p class="text-xs font-semibold uppercase tracking-wide text-primary-600">{{ detailTeam.equipo }}</p>
      <TransitionGroup
        tag="div"
        appear
        class="rounded-xl border border-gray-100 divide-y divide-gray-50 overflow-hidden"
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 -translate-x-2"
        enter-to-class="opacity-100 translate-x-0"
      >
        <div
          v-for="(row, i) in detailRows"
          :key="row.label"
          :style="{ transitionDelay: `${i * 60}ms` }"
          class="flex items-center justify-between px-4 py-3 bg-white"
        >
          <span class="text-sm" :class="row.penalty ? 'text-red-600 font-medium' : 'text-gray-500'">{{ row.label }}</span>
          <span class="text-sm font-semibold font-mono tabular-nums" :class="row.penalty ? 'text-red-600' : 'text-gray-800'">{{ row.value }}</span>
        </div>
      </TransitionGroup>
    </div>
  </AppModal>
</template>
