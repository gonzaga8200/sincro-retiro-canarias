import { collection, getDocs, orderBy, query } from 'firebase/firestore'

export interface Participante {
  nombre: string
  rol: 'Titular' | 'Reserva'
  año_nacimiento: number
}

export interface Team {
  id: string
  equipo: string
  orden_salida: number
  puntuacion: number
  participantes: Participante[]
}

export function useCompetition(competitionId: string) {
  const { $db } = useNuxtApp()

  const teams = ref<Team[]>([])
  const loading = ref(true)
  const error = ref<string | null>(null)

  async function fetchTeams() {
    loading.value = true
    error.value = null
    try {
      const q = query(
        collection($db, 'competitions', competitionId, 'teams'),
        orderBy('orden_salida', 'asc'),
      )
      const snap = await getDocs(q)
      teams.value = snap.docs.map(d => ({ id: d.id, ...d.data() } as Team))
    }
    catch (e) {
      error.value = 'No se pudieron cargar los datos.'
      console.error(e)
    }
    finally {
      loading.value = false
    }
  }

  const byStartOrder = computed(() =>
    [...teams.value].sort((a, b) => a.orden_salida - b.orden_salida),
  )

  const byScore = computed(() =>
    [...teams.value].sort((a, b) =>
      b.puntuacion !== a.puntuacion
        ? b.puntuacion - a.puntuacion
        : a.orden_salida - b.orden_salida,
    ),
  )

  return { teams, loading, error, fetchTeams, byStartOrder, byScore }
}
