<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { locale } = useI18n()

const localeBcp47: Record<string, string> = {
  es: 'es-ES', en: 'en-GB', fr: 'fr-FR', de: 'de-DE', it: 'it-IT', ca: 'ca-ES',
}

const activeDay = ref(1)
const direction = ref<'next' | 'prev'>('next')
const transitionName = computed(() => `slide-${direction.value}`)

function selectDay(i: number) {
  if (i === activeDay.value) return
  direction.value = i > activeDay.value ? 'next' : 'prev'
  activeDay.value = i
}

function fmtDate(isoDate: string, opts: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat(localeBcp47[locale.value] ?? 'es-ES', opts)
    .format(new Date(`${isoDate}T12:00:00`))
}

function getHorario(h: string): string {
  const m = h.match(/^Posterior a las (\d+:\d+)$/)
  if (!m) return h
  const t = m[1]
  const map: Record<string, string> = {
    es: `Posterior a las ${t}`,
    en: `After ${t}`,
    fr: `Après ${t.replace(':', 'h')}`,
    de: `Nach ${t} Uhr`,
    it: `Dopo le ${t}`,
    ca: `Posterior a les ${t}`,
  }
  return map[locale.value] ?? h
}

type ActivityType = 'competition' | 'exhibition' | 'ceremony' | 'warmup' | 'admin' | 'default'

function activityType(actividad: Record<string, string>): ActivityType {
  const u = (actividad.es ?? '').toUpperCase()
  if (u.includes('EXHIBICIÓN')) return 'exhibition'
  if (/^(FINAL |FIGURAS |EQUIPO LIBRE |RUTINA )/.test(u)) return 'competition'
  if (u.includes('ENTREGA DE MEDALLAS')) return 'ceremony'
  if (u.includes('CALENTAMIENTO')) return 'warmup'
  if (u.includes('REUNIÓN') || /^JUECES EN/.test(u) || u.includes('FORMACIÓN JUECES')) return 'admin'
  return 'default'
}

const ROW: Record<ActivityType, string> = {
  competition: 'bg-primary-50/80 hover:bg-primary-50 rounded-xl',
  exhibition: 'hover:bg-gray-50/60 rounded-lg',
  ceremony: 'bg-amber-50/80 hover:bg-amber-50 rounded-xl',
  warmup: 'hover:bg-sky-50/50 rounded-lg',
  admin: 'hover:bg-gray-50/40 rounded-lg',
  default: 'hover:bg-gray-50 rounded-lg',
}

const TIME: Record<ActivityType, string> = {
  competition: 'text-primary-500 font-semibold',
  exhibition: 'text-gray-300',
  ceremony: 'text-amber-500',
  warmup: 'text-sky-500',
  admin: 'text-gray-300',
  default: 'text-gray-400',
}

const DOT: Record<ActivityType, string> = {
  competition: 'bg-primary-500',
  exhibition: 'bg-gray-200 ring-1 ring-gray-300',
  ceremony: 'bg-amber-400',
  warmup: 'bg-sky-400',
  admin: 'bg-gray-200',
  default: 'bg-gray-200',
}

const TEXT: Record<ActivityType, string> = {
  competition: 'text-primary-700 font-bold',
  exhibition: 'text-gray-400 italic',
  ceremony: 'text-amber-700 font-semibold',
  warmup: 'text-sky-700',
  admin: 'text-gray-400 text-xs',
  default: 'text-gray-600',
}

const VENUE: Record<ActivityType, string> = {
  competition: 'bg-primary-100 text-primary-600',
  exhibition: 'bg-gray-100 text-gray-400',
  ceremony: 'bg-amber-100 text-amber-700',
  warmup: 'bg-sky-100 text-sky-600',
  admin: 'bg-gray-100 text-gray-400',
  default: 'bg-gray-100 text-gray-500',
}
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 py-10">

    <!-- Header card -->
    <div class="relative overflow-hidden bg-slate-900 rounded-2xl px-6 sm:px-10 py-8 mb-8">
      <div class="relative z-10">
        <p class="text-primary-400 text-[10px] font-bold uppercase tracking-[0.25em] mb-2">
          Real Federación Española de Natación
        </p>
        <h1 class="text-white text-xl sm:text-2xl font-extrabold leading-snug mb-4">
          {{ $t('programa.title') }}
        </h1>
        <div class="flex flex-wrap gap-x-5 gap-y-1 text-sm text-white/50">
          <span class="flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Canarias
          </span>
          <span class="flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            26–28 junio 2026
          </span>
        </div>
      </div>
      <div class="absolute inset-0 bg-gradient-to-br from-primary-800/20 to-transparent pointer-events-none" />
    </div>

    <!-- Day tabs -->
    <div class="flex gap-2 overflow-x-auto pb-2 mb-8 -mx-1 px-1 scrollbar-hide">
      <button
        v-for="(dia, i) in programaDias"
        :key="i"
        class="flex-shrink-0 flex flex-col items-center px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
        :class="activeDay === i
          ? 'bg-primary-600 text-white shadow-md shadow-primary-200'
          : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700'"
        @click="selectDay(i)"
      >
        <span class="text-[10px] font-bold uppercase tracking-wider opacity-75 capitalize">
          {{ fmtDate(dia.isoDate, { weekday: 'short' }) }}
        </span>
        <span class="text-sm font-bold mt-0.5">
          {{ fmtDate(dia.isoDate, { day: 'numeric', month: 'short' }) }}
        </span>
      </button>
    </div>

    <!-- Slide transition between days -->
    <Transition :name="transitionName" mode="out-in">
      <div :key="activeDay">

        <!-- Day heading -->
        <p class="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-5 capitalize">
          {{ fmtDate(programaDias[activeDay].isoDate, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) }}
        </p>

        <!-- Activity rows -->
        <div class="space-y-0.5">
          <div
            v-for="(act, j) in programaDias[activeDay].actividades"
            :key="j"
            class="flex gap-3 sm:gap-4 items-start py-2.5 px-3 transition-colors"
            :class="ROW[activityType(act.actividad)]"
          >
            <!-- Time -->
            <span
              class="w-[7.5rem] sm:w-36 shrink-0 text-right font-mono text-[11px] leading-[1.4] pt-0.5"
              :class="TIME[activityType(act.actividad)]"
            >
              {{ getHorario(act.horario) }}
            </span>

            <!-- Dot -->
            <span
              class="mt-[5px] w-1.5 h-1.5 rounded-full shrink-0"
              :class="DOT[activityType(act.actividad)]"
            />

            <!-- Content -->
            <div class="flex-1 min-w-0">
              <p
                class="text-sm leading-snug"
                :class="TEXT[activityType(act.actividad)]"
              >
                {{ act.actividad[locale.value] ?? act.actividad.es }}
              </p>
              <span
                v-if="act.lugar[locale.value] ?? act.lugar.es"
                class="inline-block mt-1 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full"
                :class="VENUE[activityType(act.actividad)]"
              >
                {{ act.lugar[locale.value] ?? act.lugar.es }}
              </span>
            </div>
          </div>
        </div>

      </div>
    </Transition>
  </div>
</template>

<style scoped>
.slide-next-enter-active,
.slide-next-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: opacity 0.2s ease, transform 0.25s ease;
}
.slide-next-enter-from { opacity: 0; transform: translateX(24px); }
.slide-next-leave-to  { opacity: 0; transform: translateX(-24px); }
.slide-prev-enter-from { opacity: 0; transform: translateX(-24px); }
.slide-prev-leave-to  { opacity: 0; transform: translateX(24px); }

.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>
