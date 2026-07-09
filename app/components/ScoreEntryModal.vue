<script setup lang="ts">
import type { Resultado, Team } from '~/composables/useCompetition'

const props = defineProps<{
  modelValue: boolean
  teams: Team[]
  modality: string
  presetTeamId?: string | null
  saving?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'save': [payload: { teamId: string, resultado: Resultado, puntuacion: number }]
}>()

const showFiguras = computed(() => props.modality !== 'combo')
const presetTeam = computed(() => props.teams.find(t => t.id === props.presetTeamId) ?? null)

type FieldKey = 'totalElementos' | 'totalImpArtistica' | 'tdd' | 'sincronizacion' | 'totalRutina' | 'totalRutinaFiguras'

const fields = reactive({
  totalElementos: '',
  totalImpArtistica: '',
  tdd: '',
  bm: '',
  sincronizacion: '',
  totalRutina: '',
  totalRutinaFiguras: '',
})
const fieldErrors = reactive<Record<FieldKey, string | null>>({
  totalElementos: null,
  totalImpArtistica: null,
  tdd: null,
  sincronizacion: null,
  totalRutina: null,
  totalRutinaFiguras: null,
})

const teamId = ref('')
const teamSelectError = ref<string | null>(null)

const pasteInput = ref('')
const pasteError = ref<string | null>(null)

function numToStr(n: number | null | undefined): string {
  return n === null || n === undefined ? '' : String(n)
}

function resetForm() {
  fields.totalElementos = ''
  fields.totalImpArtistica = ''
  fields.tdd = ''
  fields.bm = ''
  fields.sincronizacion = ''
  fields.totalRutina = ''
  fields.totalRutinaFiguras = ''
  ;(Object.keys(fieldErrors) as FieldKey[]).forEach(k => (fieldErrors[k] = null))
  teamSelectError.value = null
  pasteInput.value = ''
  pasteError.value = null

  if (presetTeam.value) {
    teamId.value = presetTeam.value.id
    const r = presetTeam.value.resultado
    if (r) {
      fields.totalElementos = numToStr(r.totalElementos)
      fields.totalImpArtistica = numToStr(r.totalImpArtistica)
      fields.tdd = numToStr(r.tdd)
      fields.bm = r.bm ?? ''
      fields.sincronizacion = numToStr(r.sincronizacion)
      fields.totalRutina = numToStr(r.totalRutina)
      fields.totalRutinaFiguras = numToStr(r.totalRutinaFiguras)
    }
  }
  else {
    teamId.value = ''
  }
}

watch(() => props.modelValue, (open) => {
  if (open) resetForm()
})

const NUMBER_RE = /^\d+(\.\d+)?$/

// Pasted values always come as exactly 6 comma-separated fields in this
// order: elementos, imp. artística, tdd, sincronización, BM, total rutina.
// BM is the only optional one (empty, or one/several judge codes joined
// with hyphens) — everything else is a required number.
function applyPaste() {
  const raw = pasteInput.value
  if (!raw.trim()) {
    pasteError.value = null
    return
  }

  const parts = raw.split(',').map(p => p.trim())
  if (parts.length !== 6) {
    pasteError.value = `Se esperaban 6 valores separados por comas, se han recibido ${parts.length}`
    return
  }

  const [elementos, impArtistica, tdd, sincronizacion, bm, rutina] = parts
  const numericParts: [FieldKey, string][] = [
    ['totalElementos', elementos!],
    ['totalImpArtistica', impArtistica!],
    ['tdd', tdd!],
    ['sincronizacion', sincronizacion!],
    ['totalRutina', rutina!],
  ]

  for (const [, value] of numericParts) {
    if (value === '') {
      pasteError.value = 'Todos los valores son obligatorios excepto el BM'
      return
    }
    if (!NUMBER_RE.test(value)) {
      pasteError.value = `Formato incorrecto en "${value}"`
      return
    }
  }

  for (const [key, value] of numericParts) {
    fields[key] = value
    fieldErrors[key] = null
  }
  fields.bm = bm!

  pasteError.value = null
}

function onPasteValues(e: ClipboardEvent) {
  const text = e.clipboardData?.getData('text')
  if (text === undefined) return
  e.preventDefault()
  pasteInput.value = text
  applyPaste()
}

function validateNumberField(key: FieldKey): boolean {
  const val = fields[key].trim()
  if (val === '') {
    fieldErrors[key] = null
    return true
  }
  if (val.includes(',')) {
    fieldErrors[key] = 'Usa "." como separador decimal'
    return false
  }
  if (!NUMBER_RE.test(val)) {
    fieldErrors[key] = 'Formato incorrecto'
    return false
  }
  fieldErrors[key] = null
  return true
}

function parseFloatSafe(v: string): number | null {
  const t = v.trim()
  if (t === '' || !NUMBER_RE.test(t)) return null
  return Number.parseFloat(t)
}

const finalScore = computed(() => {
  const figuras = showFiguras.value ? parseFloatSafe(fields.totalRutinaFiguras) : null
  const rutina = parseFloatSafe(fields.totalRutina)
  return figuras ?? rutina
})

function close() {
  emit('update:modelValue', false)
}

function save() {
  const keys: FieldKey[] = ['totalElementos', 'totalImpArtistica', 'tdd', 'sincronizacion', 'totalRutina']
  if (showFiguras.value) keys.push('totalRutinaFiguras')

  let valid = true
  for (const k of keys) {
    if (!validateNumberField(k)) valid = false
  }

  if (!teamId.value) {
    teamSelectError.value = 'Selecciona un equipo'
    valid = false
  }
  else {
    teamSelectError.value = null
  }

  if (finalScore.value === null) {
    fieldErrors.totalRutina = fieldErrors.totalRutina ?? 'Introduce al menos el Total Rutina'
    valid = false
  }

  if (!valid) return

  const resultado: Resultado = {
    totalElementos: parseFloatSafe(fields.totalElementos),
    totalImpArtistica: parseFloatSafe(fields.totalImpArtistica),
    tdd: parseFloatSafe(fields.tdd),
    bm: fields.bm.trim(),
    sincronizacion: parseFloatSafe(fields.sincronizacion),
    totalRutina: parseFloatSafe(fields.totalRutina),
    totalRutinaFiguras: showFiguras.value ? parseFloatSafe(fields.totalRutinaFiguras) : null,
  }

  emit('save', { teamId: teamId.value, resultado, puntuacion: finalScore.value! })
}
</script>

<template>
  <AppModal :model-value="modelValue" title="Añadir resultado" size="lg" @update:model-value="close">
    <div class="space-y-5">

      <!-- Team select -->
      <div>
        <label class="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">Equipo</label>
        <select
          v-model="teamId"
          :disabled="!!presetTeam"
          class="w-full px-3 py-2.5 border rounded-lg text-sm outline-none transition bg-white disabled:bg-gray-50 disabled:text-gray-500"
          :class="teamSelectError ? 'border-red-300 focus:ring-2 focus:ring-red-400' : 'border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500'"
        >
          <option value="" disabled>Selecciona un equipo…</option>
          <option v-for="t in teams" :key="t.id" :value="t.id">{{ t.orden_salida }}. {{ t.equipo }}</option>
        </select>
        <p v-if="teamSelectError" class="text-xs text-red-500 mt-1">{{ teamSelectError }}</p>
      </div>

      <!-- Paste-all shortcut -->
      <div>
        <label class="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">Pegar resultado completo</label>
        <input
          v-model="pasteInput"
          type="text"
          placeholder="123.34, 89.2323, 4.55, 9.5, E7-E8, 299.382"
          class="w-full px-3 py-2 border rounded-lg text-sm font-mono outline-none transition"
          :class="pasteError ? 'border-red-300 focus:ring-2 focus:ring-red-400' : 'border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500'"
          @paste="onPasteValues"
          @keyup.enter="applyPaste"
          @blur="applyPaste"
        />
        <p class="text-xs text-gray-400 mt-1">Orden: elementos, imp. artística, tdd, sincronización, BM, total rutina — separados por comas. El BM puede ir vacío o con varios códigos unidos por guión.</p>
        <p v-if="pasteError" class="text-xs text-red-500 mt-1">{{ pasteError }}</p>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">Total elementos</label>
          <input
            v-model="fields.totalElementos"
            type="text"
            inputmode="decimal"
            placeholder="0.0000"
            class="w-full px-3 py-2 border rounded-lg text-sm font-mono outline-none transition"
            :class="fieldErrors.totalElementos ? 'border-red-300 focus:ring-2 focus:ring-red-400' : 'border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500'"
            @blur="validateNumberField('totalElementos')"
          />
          <p v-if="fieldErrors.totalElementos" class="text-xs text-red-500 mt-1">{{ fieldErrors.totalElementos }}</p>
        </div>

        <div>
          <label class="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">Total Imp. Artística</label>
          <input
            v-model="fields.totalImpArtistica"
            type="text"
            inputmode="decimal"
            placeholder="0.0000"
            class="w-full px-3 py-2 border rounded-lg text-sm font-mono outline-none transition"
            :class="fieldErrors.totalImpArtistica ? 'border-red-300 focus:ring-2 focus:ring-red-400' : 'border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500'"
            @blur="validateNumberField('totalImpArtistica')"
          />
          <p v-if="fieldErrors.totalImpArtistica" class="text-xs text-red-500 mt-1">{{ fieldErrors.totalImpArtistica }}</p>
        </div>

        <div>
          <label class="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">TDD</label>
          <input
            v-model="fields.tdd"
            type="text"
            inputmode="decimal"
            placeholder="0.0000"
            class="w-full px-3 py-2 border rounded-lg text-sm font-mono outline-none transition"
            :class="fieldErrors.tdd ? 'border-red-300 focus:ring-2 focus:ring-red-400' : 'border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500'"
            @blur="validateNumberField('tdd')"
          />
          <p v-if="fieldErrors.tdd" class="text-xs text-red-500 mt-1">{{ fieldErrors.tdd }}</p>
        </div>

        <div>
          <label class="block text-xs font-semibold uppercase tracking-wide text-red-600 mb-1.5">Sincronización</label>
          <input
            v-model="fields.sincronizacion"
            type="text"
            inputmode="decimal"
            placeholder="0.00"
            class="w-full px-3 py-2 border rounded-lg text-sm font-mono text-red-700 outline-none transition"
            :class="fieldErrors.sincronizacion ? 'border-red-400 focus:ring-2 focus:ring-red-400' : 'border-red-200 focus:ring-2 focus:ring-red-400 focus:border-red-400'"
            @blur="validateNumberField('sincronizacion')"
          />
          <p v-if="fieldErrors.sincronizacion" class="text-xs text-red-500 mt-1">{{ fieldErrors.sincronizacion }}</p>
        </div>

        <div>
          <label class="block text-xs font-semibold uppercase tracking-wide text-red-600 mb-1.5">BM</label>
          <input
            v-model="fields.bm"
            type="text"
            placeholder="Ej: E7-E9"
            class="w-full px-3 py-2 border border-red-200 rounded-lg text-sm text-red-700 outline-none transition focus:ring-2 focus:ring-red-400 focus:border-red-400"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">Total Rutina</label>
          <input
            v-model="fields.totalRutina"
            type="text"
            inputmode="decimal"
            placeholder="0.0000"
            class="w-full px-3 py-2 border rounded-lg text-sm font-mono outline-none transition"
            :class="fieldErrors.totalRutina ? 'border-red-300 focus:ring-2 focus:ring-red-400' : 'border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500'"
            @blur="validateNumberField('totalRutina')"
          />
          <p v-if="fieldErrors.totalRutina" class="text-xs text-red-500 mt-1">{{ fieldErrors.totalRutina }}</p>
        </div>

        <div v-if="showFiguras">
          <label class="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">Total Rutina + Figuras</label>
          <input
            v-model="fields.totalRutinaFiguras"
            type="text"
            inputmode="decimal"
            placeholder="0.0000"
            class="w-full px-3 py-2 border rounded-lg text-sm font-mono outline-none transition"
            :class="fieldErrors.totalRutinaFiguras ? 'border-red-300 focus:ring-2 focus:ring-red-400' : 'border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500'"
            @blur="validateNumberField('totalRutinaFiguras')"
          />
          <p v-if="fieldErrors.totalRutinaFiguras" class="text-xs text-red-500 mt-1">{{ fieldErrors.totalRutinaFiguras }}</p>
        </div>
      </div>

      <div class="flex items-center justify-between px-4 py-3 bg-primary-50 rounded-xl">
        <span class="text-sm font-medium text-primary-700">Puntuación final</span>
        <span class="text-lg font-bold text-primary-700 tabular-nums">{{ finalScore !== null ? finalScore.toFixed(4) : '—' }}</span>
      </div>

      <div class="flex gap-3 pt-1">
        <button
          class="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          @click="close"
        >
          Cancelar
        </button>
        <button
          :disabled="saving"
          class="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-colors"
          :class="saving ? 'bg-primary-300 text-white cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700 text-white'"
          @click="save"
        >
          <svg v-if="saving" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          <span>{{ saving ? 'Guardando…' : 'Guardar' }}</span>
        </button>
      </div>

    </div>
  </AppModal>
</template>
