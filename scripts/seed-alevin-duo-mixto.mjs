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
    id: '01', equipo: 'C. N. ART. GALAICO PONTEVEDRA', orden_salida: 1, puntuacion: 0,
    participantes: [
      { nombre: 'ROI CALVO FERNANDEZ', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'ALDA MARIÑO DOPICO', rol: 'Titular', año_nacimiento: 2016 },
      { nombre: 'MAR ALONSO PEREIRO', rol: 'Reserva', año_nacimiento: 2015 },
    ],
  },
  {
    id: '02', equipo: 'C.N. SINCRO SEVILLA', orden_salida: 2, puntuacion: 0,
    participantes: [
      { nombre: 'EVA OZHOGINA OZHOGIN', rol: 'Titular', año_nacimiento: 2017 },
      { nombre: 'LUCAS SORIA DE ABASOLO', rol: 'Titular', año_nacimiento: 2017 },
    ],
  },
  {
    id: '03', equipo: 'A.D. SINCRO RETIRO', orden_salida: 3, puntuacion: 0,
    participantes: [
      { nombre: 'NATALIA BARRERA AMEZQUITA', rol: 'Titular', año_nacimiento: 2016 },
      { nombre: 'NAIM LIGERO AMIEIRO', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'SASHA SORIANO PAVLYUCHENKO', rol: 'Reserva', año_nacimiento: 2015 },
    ],
  },
  {
    id: '04', equipo: 'C.D. STADIO ALICANTE', orden_salida: 4, puntuacion: 0,
    participantes: [
      { nombre: 'JOAN ALBERO GONZALVEZ', rol: 'Titular', año_nacimiento: 2016 },
      { nombre: 'ANDREA CAROLINA CAMACHO PULIDO', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'LARA ELMAN MONTERO', rol: 'Reserva', año_nacimiento: 2015 },
    ],
  },
  {
    id: '05', equipo: 'C.N. AZAHAR SINCRO 2', orden_salida: 5, puntuacion: 0,
    participantes: [
      { nombre: 'ELEA DEL ROSAL KERVAREC', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'THIAGO GONZALEZ CERVERA', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'ANAIS HERRERA SALES', rol: 'Reserva', año_nacimiento: 2015 },
    ],
  },
  {
    id: '06', equipo: 'ACQUA SINCRO ARTISTICA EL PUIG', orden_salida: 6, puntuacion: 0,
    participantes: [
      { nombre: 'YOEL FERNANDEZ SANCHEZ', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'OKSANA GAVRILOVA', rol: 'Titular', año_nacimiento: 2016 },
      { nombre: 'DAMELI AIASHEVA', rol: 'Reserva', año_nacimiento: 2015 },
    ],
  },
  {
    id: '07', equipo: 'CIRCULO MERCANTIL', orden_salida: 7, puntuacion: 0,
    participantes: [
      { nombre: 'JIMENA GARRIDO VAYA', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'CARLOS VARELA BORJAS', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'TRIANA ARELLANO FERNANDEZ', rol: 'Reserva', año_nacimiento: 2014 },
    ],
  },
  {
    id: '08', equipo: 'C.N. SABADELL 2', orden_salida: 8, puntuacion: 0,
    participantes: [
      { nombre: 'ARAN CABALLERO GARCIA', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'HELENA RUIZ GASSOL', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'SOFIA MARQUEZ FLORES', rol: 'Reserva', año_nacimiento: 2014 },
    ],
  },
  {
    id: '09', equipo: 'C.N. AZAHAR SINCRO', orden_salida: 9, puntuacion: 0,
    participantes: [
      { nombre: 'VIRGINIA ALBALAT MARTINEZ', rol: 'Titular', año_nacimiento: 2017 },
      { nombre: 'ERIC BABILONI ANDRES', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'CRISTINA FONT MIRALLES', rol: 'Reserva', año_nacimiento: 2015 },
    ],
  },
  {
    id: '10', equipo: 'C.N. SABADELL', orden_salida: 10, puntuacion: 0,
    participantes: [
      { nombre: 'ISNER ALEJANDRO ALBAN GONZALEZ', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'ALMA MACIAS GALLARDO', rol: 'Titular', año_nacimiento: 2014 },
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
  const teamsCol = collection(db, 'competitions', 'alevin-duo-mixto', 'teams')
  await clearCollection(teamsCol)

  console.log('Seeding 10 teams for Alevín · Dúo Mixto...')
  for (const team of teams) {
    const { id, ...data } = team
    await setDoc(doc(db, 'competitions', 'alevin-duo-mixto', 'teams', id), data)
    console.log(`  ✓ ${String(data.orden_salida).padStart(2, '0')}. ${data.equipo}`)
  }

  console.log('\nDone — 10 teams seeded.')
  process.exit(0)
}

seed().catch(err => { console.error(err); process.exit(1) })
