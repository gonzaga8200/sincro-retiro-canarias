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
    id: '01', equipo: 'C.N. SINCRO SEVILLA', orden_salida: 1, puntuacion: 249.1692,
    participantes: [
      { nombre: 'POLINA BLAGODARNAYA BLAGODARNAYA', rol: 'Titular', año_nacimiento: 2010 },
      { nombre: 'JIMENA DEL REY ROMERO', rol: 'Titular', año_nacimiento: 2010 },
    ],
  },
  {
    id: '02', equipo: 'A.D. SINCRO RETIRO 2', orden_salida: 2, puntuacion: 242.5667,
    participantes: [
      { nombre: 'ALEJANDRA DEL ARCO BONET', rol: 'Titular', año_nacimiento: 2009 },
      { nombre: 'LAURA SARMIENTO FIGUEREDO', rol: 'Titular', año_nacimiento: 2010 },
    ],
  },
  {
    id: '03', equipo: 'C.N. METROPOLE', orden_salida: 3, puntuacion: 211.4692,
    participantes: [
      { nombre: 'MARTA CUARENTAL CABRERA', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'MARTINA MEDINA MONDEJAR', rol: 'Titular', año_nacimiento: 2009 },
    ],
  },
  {
    id: '04', equipo: 'CLUB DEPORTIVO PINGÜINOS DE ARRECIFE 2', orden_salida: 4, puntuacion: 209.5646,
    participantes: [
      { nombre: 'ELIZABETH RODRIGUEZ HERNANDEZ', rol: 'Titular', año_nacimiento: 2008 },
      { nombre: 'CIARA RODRIGUEZ HERNANDEZ', rol: 'Titular', año_nacimiento: 2008 },
    ],
  },
  {
    id: '05', equipo: 'CLUB MALLORCA SINCRO', orden_salida: 5, puntuacion: 206.2246,
    participantes: [
      { nombre: 'ISABEL BOIXO ROCA', rol: 'Titular', año_nacimiento: 2010 },
      { nombre: 'MARIA VICTORIA RUIZ KOSTROVA', rol: 'Titular', año_nacimiento: 2008 },
    ],
  },
  {
    id: '06', equipo: 'REFRICA GROUP C.N. GRANOLLERS', orden_salida: 6, puntuacion: 196.6204,
    participantes: [
      { nombre: 'REGINA CASINO AROCA', rol: 'Titular', año_nacimiento: 2004 },
      { nombre: 'AITANA NAVARRO PARRA', rol: 'Titular', año_nacimiento: 2007 },
      { nombre: 'ERICA BOSCH MAYNOU', rol: 'Reserva', año_nacimiento: 2007 },
    ],
  },
  {
    id: '07', equipo: 'C.N. SINCRO SEVILLA 2', orden_salida: 7, puntuacion: 189.5871,
    participantes: [
      { nombre: 'NOA ALCALA MARTINEZ', rol: 'Titular', año_nacimiento: 2009 },
      { nombre: 'PAULA GONZALEZ ROMERO', rol: 'Titular', año_nacimiento: 2010 },
    ],
  },
  {
    id: '08', equipo: 'C.N.S. FABIONELLI', orden_salida: 8, puntuacion: 186.2117,
    participantes: [
      { nombre: 'MIRIAM DOMINGUEZ RAMOS', rol: 'Titular', año_nacimiento: 2009 },
      { nombre: 'LAURA MIGUEL VILLAR', rol: 'Titular', año_nacimiento: 2009 },
    ],
  },
  {
    id: '09', equipo: 'REFRICA GROUP C.N. GRANOLLERS 2', orden_salida: 9, puntuacion: 181.7271,
    participantes: [
      { nombre: 'IRENE GARRIDO BENET', rol: 'Titular', año_nacimiento: 2005 },
      { nombre: 'MIREIA GONZALEZ SAGUILLO', rol: 'Titular', año_nacimiento: 2005 },
    ],
  },
  {
    id: '10', equipo: 'A.D. SINCRO RETIRO', orden_salida: 10, puntuacion: 175.9771,
    participantes: [
      { nombre: 'CHIARA LEE GOMEZ ALVAREZ', rol: 'Titular', año_nacimiento: 2006 },
      { nombre: 'MARINA SARMIENTO FIGUEREDO', rol: 'Titular', año_nacimiento: 2007 },
    ],
  },
  {
    id: '11', equipo: 'C.N.S. FABIONELLI 2', orden_salida: 11, puntuacion: 175.5625,
    participantes: [
      { nombre: 'TERESA GARCIA CUELLO', rol: 'Titular', año_nacimiento: 2010 },
      { nombre: 'GINEBRA LORENZO PEREZ', rol: 'Titular', año_nacimiento: 2010 },
    ],
  },
  {
    id: '12', equipo: 'CLUB DEPORTIVO PINGÜINOS DE ARRECIFE', orden_salida: 12, puntuacion: 170.0746,
    participantes: [
      { nombre: 'ADRIANA CABRERA PEREZ', rol: 'Titular', año_nacimiento: 2009 },
      { nombre: 'VEGA MARTINEZ MORALES', rol: 'Titular', año_nacimiento: 2009 },
      { nombre: 'VICTORIA ROMERO MARTIN', rol: 'Reserva', año_nacimiento: 2010 },
    ],
  },
  {
    id: '13', equipo: 'C.D. STADIO ALICANTE', orden_salida: 13, puntuacion: 169.2804,
    participantes: [
      { nombre: 'NATALIE BAKER', rol: 'Titular', año_nacimiento: 2006 },
      { nombre: 'NATASHA SERVER BOYS', rol: 'Titular', año_nacimiento: 2007 },
    ],
  },
  {
    id: '14', equipo: 'C.D. PEDRO MENENDEZ', orden_salida: 14, puntuacion: 167.4692,
    participantes: [
      { nombre: 'MARTA MENDEZ GARCIA', rol: 'Titular', año_nacimiento: 2005 },
      { nombre: 'MARTA UBACH FERNANDEZ', rol: 'Titular', año_nacimiento: 2002 },
    ],
  },
  {
    id: '15', equipo: 'C.N. SINCROVIEDO', orden_salida: 15, puntuacion: 159.5221,
    participantes: [
      { nombre: 'EVA ESPERANZA FERNANDEZ MARTIN', rol: 'Titular', año_nacimiento: 2005 },
      { nombre: 'ESTELA UÑA GARCÍA', rol: 'Titular', año_nacimiento: 2006 },
    ],
  },
  {
    id: '16', equipo: 'STADIUM VENECIA', orden_salida: 16, puntuacion: 157.7967,
    participantes: [
      { nombre: 'AMAYA JIA ALFONSO LOPEZ', rol: 'Titular', año_nacimiento: 2007 },
      { nombre: 'LUCIA BLAZQUEZ ANDRES', rol: 'Titular', año_nacimiento: 2006 },
    ],
  },
  {
    id: '17', equipo: 'CLUB NOU GODELLA NATACIÓN', orden_salida: 17, puntuacion: 154.5446,
    participantes: [
      { nombre: 'ANNA GARCES BARBETA', rol: 'Titular', año_nacimiento: 2003 },
      { nombre: 'MAIA SENA IBAÑEZ', rol: 'Titular', año_nacimiento: 2004 },
    ],
  },
  {
    id: '18', equipo: 'D.N. PORTUGALETE 2', orden_salida: 18, puntuacion: 150.2996,
    participantes: [
      { nombre: 'UXUE MASO IBARROLA', rol: 'Titular', año_nacimiento: 2007 },
      { nombre: 'MARA SALAICES HERNANDEZ', rol: 'Titular', año_nacimiento: 2007 },
    ],
  },
  {
    id: '19', equipo: 'D.N. PORTUGALETE', orden_salida: 19, puntuacion: 140.5300,
    participantes: [
      { nombre: 'EUNATE ANGUIANO URIA', rol: 'Titular', año_nacimiento: 2005 },
      { nombre: 'AITANA SANTAMARIA BAZ', rol: 'Titular', año_nacimiento: 2006 },
    ],
  },
  {
    id: '20', equipo: 'C.N. AZAHAR SINCRO', orden_salida: 20, puntuacion: 139.2742,
    participantes: [
      { nombre: 'LARA GHULAM AYARD', rol: 'Titular', año_nacimiento: 2007 },
      { nombre: 'MIREIA PORTOLES VARAS', rol: 'Titular', año_nacimiento: 2007 },
      { nombre: 'INES ORTIZ SOS', rol: 'Reserva', año_nacimiento: 2006 },
    ],
  },
  {
    id: '21', equipo: 'C.N. AZAHAR SINCRO 2', orden_salida: 21, puntuacion: 136.5100,
    participantes: [
      { nombre: 'ARIADNA BODI PALLARDO', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'IRIS GULER VIDAL', rol: 'Titular', año_nacimiento: 2011 },
    ],
  },
  {
    id: '22', equipo: 'SPORTING CLUB CASINO', orden_salida: 22, puntuacion: 118.3008,
    participantes: [
      { nombre: 'MARINA DE APRAIZ SANCHEZ', rol: 'Titular', año_nacimiento: 2010 },
      { nombre: 'IRIA GUEVARA PLATERO', rol: 'Titular', año_nacimiento: 2002 },
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
  const teamsCol = collection(db, 'competitions', 'absoluto-duo', 'teams')
  await clearCollection(teamsCol)

  console.log('Seeding 22 teams for Absoluto · Dúo...')
  for (const team of teams) {
    const { id, ...data } = team
    await setDoc(doc(db, 'competitions', 'absoluto-duo', 'teams', id), data)
    console.log(`  ✓ ${String(data.orden_salida).padStart(2, '0')}. ${data.equipo} — ${data.puntuacion}`)
  }

  console.log('\nDone — 22 teams seeded.')
  process.exit(0)
}

seed().catch(err => { console.error(err); process.exit(1) })
