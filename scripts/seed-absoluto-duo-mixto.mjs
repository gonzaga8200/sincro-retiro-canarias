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
    id: '01', equipo: 'A.D. SINCRO RETIRO', orden_salida: 1, puntuacion: 214.1375,
    participantes: [
      { nombre: 'XANDRO DE MANUEL RODRIGUEZ', rol: 'Titular', año_nacimiento: 2007 },
      { nombre: 'LAURA SARMIENTO FIGUEREDO', rol: 'Titular', año_nacimiento: 2010 },
      { nombre: 'ALEJANDRA DEL ARCO BONET', rol: 'Reserva', año_nacimiento: 2009 },
    ],
  },
  {
    id: '02', equipo: 'CLUB DEPORTIVO PINGÜINOS DE ARRECIFE', orden_salida: 2, puntuacion: 183.0617,
    participantes: [
      { nombre: 'CIARA RODRIGUEZ HERNANDEZ', rol: 'Titular', año_nacimiento: 2008 },
      { nombre: 'RAKOTOMALALA VALIRINA QUENTIN', rol: 'Titular', año_nacimiento: 2003 },
    ],
  },
  {
    id: '03', equipo: 'CLUB DEPORTIVO PINGÜINOS DE ARRECIFE 2', orden_salida: 3, puntuacion: 165.6808,
    participantes: [
      { nombre: 'SERGIO CASTELLANO RAMIREZ', rol: 'Titular', año_nacimiento: 2006 },
      { nombre: 'ELIZABETH RODRIGUEZ HERNANDEZ', rol: 'Titular', año_nacimiento: 2008 },
    ],
  },
  {
    id: '04', equipo: 'C. N. ART. GALAICO PONTEVEDRA', orden_salida: 4, puntuacion: 154.3817,
    participantes: [
      { nombre: 'REYES GOMEZ SANCHEZ', rol: 'Titular', año_nacimiento: 2000 },
      { nombre: 'JUAN DAVID HERNANDEZ NIÑO', rol: 'Titular', año_nacimiento: 1999 },
    ],
  },
  {
    id: '05', equipo: 'C.N. METROPOLE', orden_salida: 5, puntuacion: 151.7200,
    participantes: [
      { nombre: 'ENRIQUE BETHENCOURT PERAZA', rol: 'Titular', año_nacimiento: 2008 },
      { nombre: 'MARTINA MEDINA MONDEJAR', rol: 'Titular', año_nacimiento: 2009 },
      { nombre: 'MARTA CUARENTAL CABRERA', rol: 'Reserva', año_nacimiento: 2011 },
    ],
  },
  {
    id: '06', equipo: 'A.D. SINCRO RETIRO 2', orden_salida: 6, puntuacion: 145.9983,
    participantes: [
      { nombre: 'MONTSERRAT MARTORELL COLL', rol: 'Titular', año_nacimiento: 2001 },
      { nombre: 'ALICIA VIVES SANTAMARIA', rol: 'Titular', año_nacimiento: 2007 },
    ],
  },
  {
    id: '07', equipo: 'C.N. SINCRO SEVILLA', orden_salida: 7, puntuacion: 144.1167,
    participantes: [
      { nombre: 'IBON GARCIA GALLEGO', rol: 'Titular', año_nacimiento: 1991 },
      { nombre: 'PATRICIA VELAZQUEZ RUIZ', rol: 'Titular', año_nacimiento: 2008 },
      { nombre: 'SANDRA BARBA RUDA', rol: 'Reserva', año_nacimiento: 1993 },
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
  const teamsCol = collection(db, 'competitions', 'absoluto-duo-mixto', 'teams')
  await clearCollection(teamsCol)

  console.log('Seeding 7 teams for Absoluto · Dúo Mixto...')
  for (const team of teams) {
    const { id, ...data } = team
    await setDoc(doc(db, 'competitions', 'absoluto-duo-mixto', 'teams', id), data)
    console.log(`  ✓ ${String(data.orden_salida).padStart(2, '0')}. ${data.equipo} — ${data.puntuacion}`)
  }

  console.log('\nDone — 7 teams seeded.')
  process.exit(0)
}

seed().catch(err => { console.error(err); process.exit(1) })
