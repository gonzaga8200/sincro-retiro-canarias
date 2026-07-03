type LS = Record<string, string>

export interface ProgramaActividad {
  horario: string
  actividad: LS
  lugar: LS
}

export interface ProgramaDia {
  isoDate: string
  actividades: ProgramaActividad[]
}

// Venue constants
const NONE: LS = { es: '', en: '', fr: '', de: '', it: '', ca: '' }
const ZONA_AB: LS = { es: 'ZONA A y B', en: 'ZONE A & B', fr: 'ZONE A et B', de: 'ZONE A & B', it: 'ZONA A e B', ca: 'ZONA A i B' }
const ZONA_A: LS = { es: 'ZONA A', en: 'ZONE A', fr: 'ZONE A', de: 'ZONE A', it: 'ZONA A', ca: 'ZONA A' }
const ZONA_B: LS = { es: 'ZONA B', en: 'ZONE B', fr: 'ZONE B', de: 'ZONE B', it: 'ZONA B', ca: 'ZONA B' }
const VIDEOCONF: LS = { es: 'Videoconferencia', en: 'Video Conference', fr: 'Vidéoconférence', de: 'Videokonferenz', it: 'Videoconferenza', ca: 'Videoconferència' }

// Repeated activity constants
const REUNION_JUECES: LS = { es: 'Reunión de Jueces', en: "Judges' Meeting", fr: 'Réunion des juges', de: 'Juryversammlung', it: 'Riunione giudici', ca: 'Reunió de jutges' }
const JUECES_PISCINA: LS = { es: 'Jueces en Piscina', en: 'Judges at the Pool', fr: 'Juges en piscine', de: 'Jury am Becken', it: 'Giudici in vasca', ca: 'Jutges a la piscina' }
const PISCINA_CERRADA: LS = { es: 'Piscina cerrada', en: 'Pool Closed', fr: 'Piscine fermée', de: 'Becken geschlossen', it: 'Vasca chiusa', ca: 'Piscina tancada' }

export const programaDias: ProgramaDia[] = [
  // ── DÍA 1 ─────────────────────────────────────────────────────────────────
  {
    isoDate: '2026-06-23',
    actividades: [
      {
        horario: '19:00 – 20:00',
        actividad: { es: 'Reunión de delegados y Sorteos', en: "Delegates' Meeting and Draw", fr: 'Réunion des délégués et Tirage au sort', de: 'Delegiertenversammlung und Auslosung', it: 'Riunione delegati e Sorteggio', ca: 'Reunió de delegats i Sorteig' },
        lugar: VIDEOCONF,
      },
    ],
  },

  // ── DÍA 2 ─────────────────────────────────────────────────────────────────
  {
    isoDate: '2026-06-26',
    actividades: [
      {
        horario: '8:30',
        actividad: { es: 'Apertura Instalación', en: 'Venue Opening', fr: 'Ouverture des installations', de: 'Öffnung der Anlage', it: "Apertura dell'impianto", ca: 'Obertura de les instal·lacions' },
        lugar: NONE,
      },
      {
        horario: '9:00 – 12:00',
        actividad: { es: 'Calentamiento por grupos', en: 'Group Warm-Up', fr: 'Échauffement par groupes', de: 'Aufwärmen in Gruppen', it: 'Riscaldamento a gruppi', ca: 'Escalfament per grups' },
        lugar: ZONA_AB,
      },
      {
        horario: '11:00 – 12:30',
        actividad: { es: 'Formación Jueces', en: "Judges' Training", fr: 'Formation des juges', de: 'Jury-Ausbildung', it: 'Formazione giudici', ca: 'Formació de jutges' },
        lugar: NONE,
      },
      {
        horario: '12:15 – 13:00',
        actividad: PISCINA_CERRADA,
        lugar: NONE,
      },
      {
        horario: '13:00',
        actividad: { es: 'Apertura Instalación Figuras INFANTIL', en: 'Venue Opening – Youth Figures', fr: 'Ouverture des installations – Figures Cadets', de: 'Öffnung der Anlage – Jugend Figuren', it: 'Apertura impianto – Figure Ragazzi', ca: 'Obertura de les instal·lacions – Figures Infantil' },
        lugar: NONE,
      },
      {
        horario: '13:30',
        actividad: REUNION_JUECES,
        lugar: NONE,
      },
      {
        horario: '13:20 – 13:50',
        actividad: { es: 'Calentamiento Figuras INFANTIL', en: 'Warm-Up Youth Figures', fr: 'Échauffement Figures Cadets', de: 'Aufwärmen Jugend Figuren', it: 'Riscaldamento Figure Ragazzi', ca: 'Escalfament Figures Infantil' },
        lugar: ZONA_AB,
      },
      {
        horario: '13:55',
        actividad: { es: 'EXHIBICIÓN EQUIPO NACIONAL ABSOLUTO – EQUIPO LIBRE + SOLO LIBRE', en: 'SENIOR NATIONAL TEAM EXHIBITION – FREE TEAM + FREE SOLO', fr: 'EXHIBITION ÉQUIPE NATIONALE SENIOR – ÉQUIPE LIBRE + SOLO LIBRE', de: 'AUSSTELLUNG NATIONALKADER SENIOREN – FREIES TEAM + FREIES SOLO', it: 'ESIBIZIONE SQUADRA NAZIONALE ASSOLUTO – SQUADRA LIBERA + SOLO LIBERO', ca: 'EXHIBICIÓ EQUIP NACIONAL ABSOLUT – EQUIP LLIURE + SOLO LLIURE' },
        lugar: NONE,
      },
      {
        horario: '14:00',
        actividad: JUECES_PISCINA,
        lugar: NONE,
      },
      {
        horario: '14:15 – 16:30',
        actividad: { es: 'FIGURAS INFANTIL (229)', en: 'YOUTH FIGURES (229)', fr: 'FIGURES CADETS (229)', de: 'JUGEND FIGUREN (229)', it: 'FIGURE RAGAZZI (229)', ca: 'FIGURES INFANTIL (229)' },
        lugar: ZONA_B,
      },
      {
        horario: '16:15',
        actividad: { es: 'Apertura Instalación Dúo Mixto y Dúo Libre ABS', en: 'Venue Opening – Senior Mixed Duet & Free Duet', fr: 'Ouverture des installations – Duo Mixte et Duo Libre Senior', de: 'Öffnung der Anlage – Senioren Mixed Duo & Freies Duo', it: 'Apertura impianto – Duo Misto e Duo Libero Assoluto', ca: 'Obertura de les instal·lacions – Duo Mixt i Duo Lliure ABS' },
        lugar: NONE,
      },
      {
        horario: '16:45',
        actividad: { es: 'EXHIBICIÓN EQUIPO NACIONAL ABSOLUTO – DÚO MIXTO LIBRE', en: 'SENIOR NATIONAL TEAM EXHIBITION – FREE MIXED DUET', fr: 'EXHIBITION ÉQUIPE NATIONALE SENIOR – DUO MIXTE LIBRE', de: 'AUSSTELLUNG NATIONALKADER SENIOREN – FREIES MIXED DUO', it: 'ESIBIZIONE SQUADRA NAZIONALE ASSOLUTO – DUO MISTO LIBERO', ca: 'EXHIBICIÓ EQUIP NACIONAL ABSOLUT – DÚO MIXT LLIURE' },
        lugar: NONE,
      },
      {
        horario: '16:45 – 17:30',
        actividad: { es: "Calentamiento Dúo Libre ABS – Dúo Mixto (Inicio 1' Música 16:55)", en: "Warm-Up Senior Free Duet – Mixed Duet (Start 1' Music 16:55)", fr: "Échauffement Duo Libre Senior – Duo Mixte (Début 1' Musique 16h55)", de: "Aufwärmen Senioren Freies Duo – Mixed Duo (Start 1' Musik 16:55)", it: "Riscaldamento Duo Libero Assoluto – Duo Misto (Inizio 1' Musica 16:55)", ca: "Escalfament Duo Lliure ABS – Duo Mixt (Inici 1' Música 16:55)" },
        lugar: ZONA_AB,
      },
      {
        horario: '17:30',
        actividad: JUECES_PISCINA,
        lugar: NONE,
      },
      {
        horario: '17:45',
        actividad: { es: 'EXHIBICIÓN EQUIPO NACIONAL ABSOLUTO – DÚO TÉCNICO', en: 'SENIOR NATIONAL TEAM EXHIBITION – TECHNICAL DUET', fr: 'EXHIBITION ÉQUIPE NATIONALE SENIOR – DUO TECHNIQUE', de: 'AUSSTELLUNG NATIONALKADER SENIOREN – TECHNISCHES DUO', it: 'ESIBIZIONE SQUADRA NAZIONALE ASSOLUTO – DUO TECNICO', ca: 'EXHIBICIÓ EQUIP NACIONAL ABSOLUT – DÚO TÈCNIC' },
        lugar: NONE,
      },
      {
        horario: '17:55 – 20:45',
        actividad: { es: 'FINAL DÚO LIBRE - DÚO MIXTO LIBRE ABS (25 + 7)', en: 'FREE DUET – FREE MIXED DUET SENIOR FINAL (25 + 7)', fr: 'FINALE DUO LIBRE – DUO MIXTE LIBRE SENIOR (25 + 7)', de: 'FREIES DUO – FREIES MIXED DUO SENIOREN FINAL (25 + 7)', it: 'FINALE DUO LIBERO – DUO MISTO LIBERO ASSOLUTO (25 + 7)', ca: 'FINAL DÚO LLIURE – DÚO MIXT LLIURE ABS (25 + 7)' },
        lugar: ZONA_A,
      },
      {
        horario: 'Posterior a las 20:45',
        actividad: { es: 'Entrega de medallas Dúo Mixto y Dúo Libre ABS', en: 'Medal Ceremony – Senior Mixed Duet & Free Duet', fr: 'Remise des médailles – Duo Mixte et Duo Libre Senior', de: 'Siegerehrung – Senioren Mixed Duo & Freies Duo', it: 'Premiazione – Duo Misto e Duo Libero Assoluto', ca: 'Lliurament de medalles – Duo Mixt i Duo Lliure ABS' },
        lugar: NONE,
      },
      {
        horario: '21:15',
        actividad: PISCINA_CERRADA,
        lugar: NONE,
      },
    ],
  },

  // ── DÍA 3 ─────────────────────────────────────────────────────────────────
  {
    isoDate: '2026-06-27',
    actividades: [
      {
        horario: '7:30',
        actividad: { es: 'Apertura Instalación Dúo Libre Infantil', en: 'Venue Opening – Youth Free Duet', fr: 'Ouverture des installations – Duo Libre Cadets', de: 'Öffnung der Anlage – Jugend Freies Duo', it: 'Apertura impianto – Duo Libero Ragazzi', ca: 'Obertura de les instal·lacions – Duo Lliure Infantil' },
        lugar: NONE,
      },
      {
        horario: '7:45 – 8:45',
        actividad: { es: "Calentamiento Dúo Libre Infantil y Dúo Mixto Infantil (Inicio 1' Música 8:05)", en: "Warm-Up Youth Free Duet & Youth Mixed Duet (Start 1' Music 8:05)", fr: "Échauffement Duo Libre Cadets et Duo Mixte Cadets (Début 1' Musique 8h05)", de: "Aufwärmen Jugend Freies Duo & Jugend Mixed Duo (Start 1' Musik 8:05)", it: "Riscaldamento Duo Libero Ragazzi e Duo Misto Ragazzi (Inizio 1' Musica 8:05)", ca: "Escalfament Duo Lliure Infantil i Duo Mixt Infantil (Inici 1' Música 8:05)" },
        lugar: ZONA_AB,
      },
      {
        horario: '8:00',
        actividad: REUNION_JUECES,
        lugar: NONE,
      },
      {
        horario: '8:30',
        actividad: JUECES_PISCINA,
        lugar: NONE,
      },
      {
        horario: '8:45',
        actividad: { es: 'EXHIBICIÓN EQUIPO NACIONAL ABSOLUTO – DÚO MIXTO TÉCNICO', en: 'SENIOR NATIONAL TEAM EXHIBITION – TECHNICAL MIXED DUET', fr: 'EXHIBITION ÉQUIPE NATIONALE SENIOR – DUO MIXTE TECHNIQUE', de: 'AUSSTELLUNG NATIONALKADER SENIOREN – TECHNISCHES MIXED DUO', it: 'ESIBIZIONE SQUADRA NAZIONALE ASSOLUTO – DUO MISTO TECNICO', ca: 'EXHIBICIÓ EQUIP NACIONAL ABSOLUT – DÚO MIXT TÈCNIC' },
        lugar: NONE,
      },
      {
        horario: '8:50 – 12:15',
        actividad: { es: 'FINAL DÚO LIBRE INFANTIL y DÚO MIXTO LIBRE INFANTIL (1 + 24 + 13)', en: 'YOUTH FREE DUET & YOUTH FREE MIXED DUET FINAL (1 + 24 + 13)', fr: 'FINALE DUO LIBRE CADETS et DUO MIXTE LIBRE CADETS (1 + 24 + 13)', de: 'JUGEND FREIES DUO & JUGEND FREIES MIXED DUO FINAL (1 + 24 + 13)', it: 'FINALE DUO LIBERO RAGAZZI e DUO MISTO LIBERO RAGAZZI (1 + 24 + 13)', ca: 'FINAL DÚO LLIURE INFANTIL i DÚO MIXT LLIURE INFANTIL (1 + 24 + 13)' },
        lugar: ZONA_A,
      },
      {
        horario: '11:30',
        actividad: { es: 'Apertura Instalación R. Acrobática ABS', en: 'Venue Opening – Senior Acrobatic Routine', fr: 'Ouverture des installations – Routine Acrobatique Senior', de: 'Öffnung der Anlage – Senioren Akrobatik Routine', it: 'Apertura impianto – Routine Acrobatica Assoluto', ca: 'Obertura de les instal·lacions – Rutina Acrobàtica ABS' },
        lugar: NONE,
      },
      {
        horario: '12:00 – 12:45',
        actividad: { es: "Calentamiento Rutina Acrobática ABS (Inicio 1' Música 12:30)", en: "Warm-Up Senior Acrobatic Routine (Start 1' Music 12:30)", fr: "Échauffement Routine Acrobatique Senior (Début 1' Musique 12h30)", de: "Aufwärmen Senioren Akrobatik Routine (Start 1' Musik 12:30)", it: "Riscaldamento Routine Acrobatica Assoluto (Inizio 1' Musica 12:30)", ca: "Escalfament Rutina Acrobàtica ABS (Inici 1' Música 12:30)" },
        lugar: ZONA_AB,
      },
      {
        horario: '12:45',
        actividad: JUECES_PISCINA,
        lugar: NONE,
      },
      {
        horario: '13:00 – 14:15',
        actividad: { es: 'FINAL RUTINA ACROBÁTICA ABS (13)', en: 'SENIOR ACROBATIC ROUTINE FINAL (13)', fr: 'FINALE ROUTINE ACROBATIQUE SENIOR (13)', de: 'SENIOREN AKROBATIK ROUTINE FINAL (13)', it: 'FINALE ROUTINE ACROBATICA ASSOLUTO (13)', ca: 'FINAL RUTINA ACROBÀTICA ABS (13)' },
        lugar: ZONA_A,
      },
      {
        horario: '14:15',
        actividad: { es: 'EXHIBICIÓN EQUIPO NACIONAL ABSOLUTO – DÚO LIBRE', en: 'SENIOR NATIONAL TEAM EXHIBITION – FREE DUET', fr: 'EXHIBITION ÉQUIPE NATIONALE SENIOR – DUO LIBRE', de: 'AUSSTELLUNG NATIONALKADER SENIOREN – FREIES DUO', it: 'ESIBIZIONE SQUADRA NAZIONALE ASSOLUTO – DUO LIBERO', ca: 'EXHIBICIÓ EQUIP NACIONAL ABSOLUT – DÚO LLIURE' },
        lugar: NONE,
      },
      {
        horario: 'Posterior a las 14:15',
        actividad: { es: 'Entrega de medallas R. Acrobática ABS', en: 'Medal Ceremony – Senior Acrobatic Routine', fr: 'Remise des médailles – Routine Acrobatique Senior', de: 'Siegerehrung – Senioren Akrobatik Routine', it: 'Premiazione – Routine Acrobatica Assoluto', ca: 'Lliurament de medalles – Rutina Acrobàtica ABS' },
        lugar: NONE,
      },
      {
        horario: '14:45 – 15:45',
        actividad: PISCINA_CERRADA,
        lugar: NONE,
      },
      {
        horario: '15:30',
        actividad: { es: 'Apertura Instalación Equipo Libre Infantil', en: 'Venue Opening – Youth Free Team', fr: 'Ouverture des installations – Équipe Libre Cadets', de: 'Öffnung der Anlage – Jugend Freies Team', it: 'Apertura impianto – Squadra Libera Ragazzi', ca: 'Obertura de les instal·lacions – Equip Lliure Infantil' },
        lugar: NONE,
      },
      {
        horario: '16:00 – 16:45',
        actividad: { es: "Calentamiento Equipo Libre INFANTIL (Inicio 1' Música 16:10)", en: "Warm-Up Youth Free Team (Start 1' Music 16:10)", fr: "Échauffement Équipe Libre CADETS (Début 1' Musique 16h10)", de: "Aufwärmen Jugend Freies Team (Start 1' Musik 16:10)", it: "Riscaldamento Squadra Libera RAGAZZI (Inizio 1' Musica 16:10)", ca: "Escalfament Equip Lliure INFANTIL (Inici 1' Música 16:10)" },
        lugar: ZONA_AB,
      },
      {
        horario: '16:15',
        actividad: REUNION_JUECES,
        lugar: NONE,
      },
      {
        horario: '16:45',
        actividad: JUECES_PISCINA,
        lugar: NONE,
      },
      {
        horario: '17:00 – 19:15',
        actividad: { es: 'EQUIPO LIBRE INFANTIL (1+20)', en: 'YOUTH FREE TEAM (1+20)', fr: 'ÉQUIPE LIBRE CADETS (1+20)', de: 'JUGEND FREIES TEAM (1+20)', it: 'SQUADRA LIBERA RAGAZZI (1+20)', ca: 'EQUIP LLIURE INFANTIL (1+20)' },
        lugar: ZONA_A,
      },
      {
        horario: '19:20',
        actividad: { es: 'EXHIBICIÓN EQUIPO NACIONAL ABSOLUTO – EQUIPO TÉCNICO', en: 'SENIOR NATIONAL TEAM EXHIBITION – TECHNICAL TEAM', fr: 'EXHIBITION ÉQUIPE NATIONALE SENIOR – ÉQUIPE TECHNIQUE', de: 'AUSSTELLUNG NATIONALKADER SENIOREN – TECHNISCHES TEAM', it: 'ESIBIZIONE SQUADRA NAZIONALE ASSOLUTO – SQUADRA TECNICA', ca: 'EXHIBICIÓ EQUIP NACIONAL ABSOLUT – EQUIP TÈCNIC' },
        lugar: NONE,
      },
      {
        horario: 'Posterior a las 19:20',
        actividad: { es: 'Entrega de medallas Figuras, Dúo Mixto, Dúo y Equipo INFANTIL', en: 'Medal Ceremony – Youth Figures, Mixed Duet, Duet & Team', fr: 'Remise des médailles – Figures, Duo Mixte, Duo et Équipe CADETS', de: 'Siegerehrung – Jugend Figuren, Mixed Duo, Duo und Team', it: 'Premiazione – Figure, Duo Misto, Duo e Squadra RAGAZZI', ca: 'Lliurament de medalles – Figures, Duo Mixt, Duo i Equip INFANTIL' },
        lugar: NONE,
      },
      {
        horario: '20:00',
        actividad: PISCINA_CERRADA,
        lugar: NONE,
      },
    ],
  },

  // ── DÍA 4 ─────────────────────────────────────────────────────────────────
  {
    isoDate: '2026-06-28',
    actividades: [
      {
        horario: '8:00',
        actividad: { es: 'Apertura Instalación Equipo Libre ABS', en: 'Venue Opening – Senior Free Team', fr: 'Ouverture des installations – Équipe Libre Senior', de: 'Öffnung der Anlage – Senioren Freies Team', it: 'Apertura impianto – Squadra Libera Assoluto', ca: 'Obertura de les instal·lacions – Equip Lliure ABS' },
        lugar: NONE,
      },
      {
        horario: '8:30',
        actividad: REUNION_JUECES,
        lugar: NONE,
      },
      {
        horario: '8:30 – 9:00',
        actividad: { es: "Calentamiento Equipo Libre ABS (Inicio 1' Música 8:45)", en: "Warm-Up Senior Free Team (Start 1' Music 8:45)", fr: "Échauffement Équipe Libre Senior (Début 1' Musique 8h45)", de: "Aufwärmen Senioren Freies Team (Start 1' Musik 8:45)", it: "Riscaldamento Squadra Libera Assoluto (Inizio 1' Musica 8:45)", ca: "Escalfament Equip Lliure ABS (Inici 1' Música 8:45)" },
        lugar: ZONA_AB,
      },
      {
        horario: '9:00',
        actividad: JUECES_PISCINA,
        lugar: NONE,
      },
      {
        horario: '9:10',
        actividad: { es: 'EXHIBICIÓN EQUIPO NACIONAL ABSOLUTO – SOLO LIBRE MASC', en: 'SENIOR NATIONAL TEAM EXHIBITION – MALE FREE SOLO', fr: 'EXHIBITION ÉQUIPE NATIONALE SENIOR – SOLO LIBRE MASCULIN', de: 'AUSSTELLUNG NATIONALKADER SENIOREN – FREIES SOLO MÄNNER', it: 'ESIBIZIONE SQUADRA NAZIONALE ASSOLUTO – SOLO LIBERO MASC', ca: 'EXHIBICIÓ EQUIP NACIONAL ABSOLUT – SOLO LLIURE MASC' },
        lugar: NONE,
      },
      {
        horario: '9:15 – 10:00',
        actividad: { es: 'Final Equipo Libre ABS (7)', en: 'Senior Free Team Final (7)', fr: 'Finale Équipe Libre Senior (7)', de: 'Senioren Freies Team Final (7)', it: 'Finale Squadra Libera Assoluto (7)', ca: 'Final Equip Lliure ABS (7)' },
        lugar: ZONA_A,
      },
      {
        horario: '9:30',
        actividad: { es: 'Apertura Instalación R. Combinada Infantil', en: 'Venue Opening – Youth Combined Routine', fr: 'Ouverture des installations – Routine Combinée Cadets', de: 'Öffnung der Anlage – Jugend Kombinierte Routine', it: 'Apertura impianto – Routine Combinata Ragazzi', ca: 'Obertura de les instal·lacions – Rutina Combinada Infantil' },
        lugar: NONE,
      },
      {
        horario: '10:05',
        actividad: { es: 'EXHIBICIÓN EQUIPO NACIONAL ABSOLUTO – SOLO TÉCNICO', en: 'SENIOR NATIONAL TEAM EXHIBITION – TECHNICAL SOLO', fr: 'EXHIBITION ÉQUIPE NATIONALE SENIOR – SOLO TECHNIQUE', de: 'AUSSTELLUNG NATIONALKADER SENIOREN – TECHNISCHES SOLO', it: 'ESIBIZIONE SQUADRA NAZIONALE ASSOLUTO – SOLO TECNICO', ca: 'EXHIBICIÓ EQUIP NACIONAL ABSOLUT – SOLO TÈCNIC' },
        lugar: NONE,
      },
      {
        horario: '10:15 – 11:00',
        actividad: { es: "Calentamiento R. Combinada INF (Inicio 1' Música 10:25)", en: "Warm-Up Youth Combined Routine (Start 1' Music 10:25)", fr: "Échauffement Routine Combinée CADETS (Début 1' Musique 10h25)", de: "Aufwärmen Jugend Kombinierte Routine (Start 1' Musik 10:25)", it: "Riscaldamento Routine Combinata RAGAZZI (Inizio 1' Musica 10:25)", ca: "Escalfament R. Combinada INF (Inici 1' Música 10:25)" },
        lugar: ZONA_AB,
      },
      {
        horario: '10:30',
        actividad: REUNION_JUECES,
        lugar: NONE,
      },
      {
        horario: '11:00',
        actividad: JUECES_PISCINA,
        lugar: NONE,
      },
      {
        horario: '11:15 – 13:30',
        actividad: { es: 'Final Rutina Combinada Infantil (20)', en: 'Youth Combined Routine Final (20)', fr: 'Finale Routine Combinée Cadets (20)', de: 'Jugend Kombinierte Routine Final (20)', it: 'Finale Routine Combinata Ragazzi (20)', ca: 'Final Rutina Combinada Infantil (20)' },
        lugar: ZONA_A,
      },
      {
        horario: '13:35',
        actividad: { es: 'EXHIBICIÓN EQUIPO NACIONAL ABSOLUTO – R. ACROBÁTICA', en: 'SENIOR NATIONAL TEAM EXHIBITION – ACROBATIC ROUTINE', fr: 'EXHIBITION ÉQUIPE NATIONALE SENIOR – ROUTINE ACROBATIQUE', de: 'AUSSTELLUNG NATIONALKADER SENIOREN – AKROBATIK ROUTINE', it: 'ESIBIZIONE SQUADRA NAZIONALE ASSOLUTO – ROUTINE ACROBATICA', ca: 'EXHIBICIÓ EQUIP NACIONAL ABSOLUT – R. ACROBÀTICA' },
        lugar: NONE,
      },
      {
        horario: 'Posterior a las 13:35',
        actividad: { es: 'Entrega de medallas Equipo Libre ABS y Rutina Combinada INFANTIL', en: 'Medal Ceremony – Senior Free Team & Youth Combined Routine', fr: 'Remise des médailles – Équipe Libre Senior et Routine Combinée Cadets', de: 'Siegerehrung – Senioren Freies Team und Jugend Kombinierte Routine', it: 'Premiazione – Squadra Libera Assoluto e Routine Combinata Ragazzi', ca: 'Lliurament de medalles – Equip Lliure ABS i Rutina Combinada Infantil' },
        lugar: NONE,
      },
      {
        horario: '14:30',
        actividad: PISCINA_CERRADA,
        lugar: NONE,
      },
    ],
  },
]
