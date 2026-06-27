import { initializeApp } from 'firebase/app'
import { getFirestore, collection, doc, setDoc, getDocs, deleteDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBoLSoYsmOtpobj0r5yzlx1JXscGE6tVd0',
  authDomain: 'clasificacionsincronizada.firebaseapp.com',
  projectId: 'clasificacionsincronizada',
  storageBucket: 'clasificacionsincronizada.firebasestorage.app',
  messagingSenderId: '390565208424',
  appId: '1:390565208424:web:b18df8c99d958644d1b6dd',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const teams = [
  {
    id: '01', equipo: 'R. C. N. VIGO', orden_salida: 1, puntuacion: 0,
    participantes: [
      { nombre: 'ISIS BLANCO ABREU', rol: 'Titular', año_nacimiento: 2013 },
      { nombre: 'ISAAC GARCIA BARREIRA', rol: 'Titular', año_nacimiento: 2012 },
    ],
  },
  {
    id: '02', equipo: 'C.N. AZAHAR SINCRO', orden_salida: 2, puntuacion: 0,
    participantes: [
      { nombre: 'TRISTAN BRIGS GONZALEZ', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'MARINA RIPOLLES GARCIA', rol: 'Titular', año_nacimiento: 2013 },
      { nombre: 'AHINARA HERNANDEZ SUAREZ', rol: 'Reserva', año_nacimiento: 2012 },
    ],
  },
  {
    id: '03', equipo: 'REFRICA GROUP C.N. GRANOLLERS', orden_salida: 3, puntuacion: 0,
    participantes: [
      { nombre: 'ORIOL FERNANDEZ GANDUXE', rol: 'Titular', año_nacimiento: 2013 },
      { nombre: 'EMMA VILAR CARRERAS', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'ABRIL FIGUEREDO GARCIA', rol: 'Reserva', año_nacimiento: 2012 },
    ],
  },
  {
    id: '04', equipo: 'C.N. MATARO', orden_salida: 4, puntuacion: 0,
    participantes: [
      { nombre: 'MAX BORRELL GONZALEZ', rol: 'Titular', año_nacimiento: 2013 },
      { nombre: 'ALICE QUADRADA PENNELLIER', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'LUA GONZALEZ MASAFRETS', rol: 'Reserva', año_nacimiento: 2013 },
    ],
  },
  {
    id: '05', equipo: 'C.N. SINCRONIZADA OURENSE', orden_salida: 5, puntuacion: 0,
    participantes: [
      { nombre: 'SAUL RODRIGUEZ ANCA', rol: 'Titular', año_nacimiento: 2013 },
      { nombre: 'MARIA SANTOS OUTEIRIÑO', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'IRENE ALVAREZ SANTOS', rol: 'Reserva', año_nacimiento: 2011 },
    ],
  },
  {
    id: '06', equipo: 'CLUB DEPORTIVO PINGÜINOS DE ARRECIFE 3', orden_salida: 6, puntuacion: 0,
    participantes: [
      { nombre: 'LUCIO JOSE BETHENCOURT ROMERO', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'MAR SAAVEDRA GONZALEZ', rol: 'Titular', año_nacimiento: 2013 },
      { nombre: 'SOFIA MENDEZ LOPEZ-SOCAS', rol: 'Reserva', año_nacimiento: 2011 },
    ],
  },
  {
    id: '07', equipo: 'C.N. ARTISTICA ATLANTIS', orden_salida: 7, puntuacion: 0,
    participantes: [
      { nombre: 'ASIER HERRERO PALANQUES', rol: 'Titular', año_nacimiento: 2013 },
      { nombre: 'THELMA QUINTERO SENDRA', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'CARMEN GARCIA MARTINEZ', rol: 'Reserva', año_nacimiento: 2012 },
    ],
  },
  {
    id: '08', equipo: 'C.D.N. INACUA MALAGA', orden_salida: 8, puntuacion: 0,
    participantes: [
      { nombre: 'ELENA GARCIA GONZALEZ', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'ROMAN KOVALENKO', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'ESTHER GONZALEZ CAMPOS', rol: 'Reserva', año_nacimiento: 2012 },
    ],
  },
  {
    id: '09', equipo: 'C. N. ART. GALAICO PONTEVEDRA', orden_salida: 9, puntuacion: 0,
    participantes: [
      { nombre: 'MARIÑA CALVO FERNANDEZ', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'IVAN GONZALEZ COSTAS', rol: 'Titular', año_nacimiento: 2011 },
    ],
  },
  {
    id: '10', equipo: 'C.N. METROPOLE', orden_salida: 10, puntuacion: 0,
    participantes: [
      { nombre: 'JORGE SALAZAR ROBLES', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'LOURDES SANTIAGO BELLO', rol: 'Titular', año_nacimiento: 2011 },
    ],
  },
  {
    id: '11', equipo: 'CLUB DEPORTIVO PINGÜINOS DE ARRECIFE 2', orden_salida: 11, puntuacion: 0,
    participantes: [
      { nombre: 'PAU HERNANDEZ ALMENARA', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'NAHOMY SOFIA LOPEZ GOMEZ', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'CHLOE ABLANEDO AMEZCUA', rol: 'Reserva', año_nacimiento: 2012 },
    ],
  },
  {
    id: '12', equipo: 'C.N. SABADELL', orden_salida: 12, puntuacion: 0,
    participantes: [
      { nombre: 'ERI AOKI ASCANIO', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'MIKEL MERCEDES SEBASTIAN', rol: 'Titular', año_nacimiento: 2011 },
    ],
  },
  {
    id: '13', equipo: 'CLUB DEPORTIVO PINGÜINOS DE ARRECIFE', orden_salida: 13, puntuacion: 0,
    participantes: [
      { nombre: 'ADRIANA DELGADO COSTA', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'MIGUEL MARTINEZ MORALES', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'LUCIA PEREZ FLEITAS', rol: 'Reserva', año_nacimiento: 2011 },
    ],
  },
]

async function clearCollection(colRef) {
  const snap = await getDocs(colRef)
  await Promise.all(snap.docs.map(d => deleteDoc(d.ref)))
  console.log(`  Deleted ${snap.size} existing documents`)
}

async function seed() {
  console.log('Clearing existing data...')
  const teamsCol = collection(db, 'competitions', 'infantil-duo-mixto', 'teams')
  await clearCollection(teamsCol)

  console.log('Seeding 13 teams for Infantil · Dúo Mixto...')
  for (const team of teams) {
    const { id, ...data } = team
    await setDoc(doc(db, 'competitions', 'infantil-duo-mixto', 'teams', id), data)
    console.log(`  ✓ ${String(data.orden_salida).padStart(2, '0')}. ${data.equipo}`)
  }

  console.log('\nDone — 13 teams seeded.')
  process.exit(0)
}

seed().catch(err => { console.error(err); process.exit(1) })
