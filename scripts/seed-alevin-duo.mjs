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
      { nombre: 'CANDELA CARBALLIDO GOMEZ', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'ELISA PRIETO REFOJO', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'ALMA FIGUEIRA CASTRO', rol: 'Reserva', año_nacimiento: 2014 },
    ],
  },
  {
    id: '02', equipo: 'ACQUA SINCRO ARTISTICA EL PUIG', orden_salida: 2, puntuacion: 0,
    participantes: [
      { nombre: 'DAMELI AIASHEVA', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'ITAYETZI DEU LANDA', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'ROCIO GRACIA MARTIN', rol: 'Reserva', año_nacimiento: 2014 },
    ],
  },
  {
    id: '03', equipo: 'C.N. SINCRONIZADA OURENSE', orden_salida: 3, puntuacion: 0,
    participantes: [
      { nombre: 'ALBA BLANCO PEREZ', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'CANDELA RODRIGUEZ RODRIGUEZ', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'KAYLA SOSA RIVERA', rol: 'Reserva', año_nacimiento: 2014 },
    ],
  },
  {
    id: '04', equipo: 'CIRCULO MERCANTIL', orden_salida: 4, puntuacion: 0,
    participantes: [
      { nombre: 'TRIANA ARELLANO FERNANDEZ', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'JIMENA GARRIDO VAYA', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'JULIA GARRIDO VAYA', rol: 'Reserva', año_nacimiento: 2016 },
    ],
  },
  {
    id: '05', equipo: 'REAL CANOE N.C.', orden_salida: 5, puntuacion: 0,
    participantes: [
      { nombre: 'ICIAR BEJERANO MORANDEIRA', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'CANDELA CONDE ALYOU', rol: 'Titular', año_nacimiento: 2015 },
    ],
  },
  {
    id: '06', equipo: 'C.N. AZAHAR SINCRO', orden_salida: 6, puntuacion: 0,
    participantes: [
      { nombre: 'ERIC BABILONI ANDRES', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'THIAGO GONZALEZ CERVERA', rol: 'Titular', año_nacimiento: 2015 },
    ],
  },
  {
    id: '07', equipo: 'C.N. METROPOLE', orden_salida: 7, puntuacion: 0,
    participantes: [
      { nombre: 'SOFIA MARRERO JIMENEZ', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'CAROLINA RODRIGUEZ PRIETO', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'ICO ISABEL LOPEZ SANTANA', rol: 'Reserva', año_nacimiento: 2014 },
    ],
  },
  {
    id: '08', equipo: 'C.N. SABADELL 2', orden_salida: 8, puntuacion: 0,
    participantes: [
      { nombre: 'ONA LLONCH MURILLO', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'ABRIL NICOLAS SAMPIETRO', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'ALMA MACIAS GALLARDO', rol: 'Reserva', año_nacimiento: 2014 },
    ],
  },
  {
    id: '09', equipo: 'C.N. SINCRO SEVILLA 2', orden_salida: 9, puntuacion: 0,
    participantes: [
      { nombre: 'MARIA GONZALEZ PAREJA', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'ARIADNA MARTIN GOMEZ', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'MANUELA PALOMINO RIVERA', rol: 'Reserva', año_nacimiento: 2015 },
    ],
  },
  {
    id: '10', equipo: 'CLUB AQUAMADSINCRO', orden_salida: 10, puntuacion: 0,
    participantes: [
      { nombre: 'ANA SEGOVIA PAINO', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'LUCIA SOLER LOPEZ', rol: 'Titular', año_nacimiento: 2016 },
      { nombre: 'ROCIO AMUTXASTEGI AGUDO', rol: 'Reserva', año_nacimiento: 2017 },
    ],
  },
  {
    id: '11', equipo: 'C.N. ARTISTICA PSWATER BENIDORM', orden_salida: 11, puntuacion: 0,
    participantes: [
      { nombre: 'LUCIA AHUIR LORENTE', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'EMMA CASTIBLANQUE GUERRA', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'MICHELE PADIAL RODRIGUEZ', rol: 'Reserva', año_nacimiento: 2016 },
    ],
  },
  {
    id: '12', equipo: 'C.D. STADIO ALICANTE 2', orden_salida: 12, puntuacion: 0,
    participantes: [
      { nombre: 'CELIA CABALLERO DELGADO', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'LARA ELMAN MONTERO', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'ANDREA CAROLINA CAMACHO PULIDO', rol: 'Reserva', año_nacimiento: 2014 },
    ],
  },
  {
    id: '13', equipo: 'SPORTING CLUB CASINO', orden_salida: 13, puntuacion: 0,
    participantes: [
      { nombre: 'PAULA ANUNCIACION GARCIA AMORIN', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'MONICA LOPEZ TIJERINA', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'MARIA MONTERO ANDON', rol: 'Reserva', año_nacimiento: 2014 },
    ],
  },
  {
    id: '14', equipo: 'C.N. KALLIPOLIS', orden_salida: 14, puntuacion: 0,
    participantes: [
      { nombre: 'ICIAR RODRIGUEZ GENOVA', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'HELENA SANTACANA SOLA', rol: 'Titular', año_nacimiento: 2014 },
    ],
  },
  {
    id: '15', equipo: 'C.N.S. FABIONELLI', orden_salida: 15, puntuacion: 0,
    participantes: [
      { nombre: 'AUDREY ACOSTA HERNANDEZ', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'INES DE LA FUENTE MARTIN', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'SOFIA DE LA FUENTE ANTUNEZ', rol: 'Reserva', año_nacimiento: 2015 },
    ],
  },
  {
    id: '16', equipo: 'A.D. SINCRO RETIRO 2', orden_salida: 16, puntuacion: 0,
    participantes: [
      { nombre: 'CLARA BERNAL GABALDON', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'VERA OLIVA AREVALO', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'ZOE VASSEUR', rol: 'Reserva', año_nacimiento: 2014 },
    ],
  },
  {
    id: '17', equipo: 'CLUB NOU GODELLA NATACIÓN', orden_salida: 17, puntuacion: 0,
    participantes: [
      { nombre: 'VEGA COCA CHILLARON', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'ANE SANJUAN RUIZ', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'ANDRA POP MARITA', rol: 'Reserva', año_nacimiento: 2014 },
    ],
  },
  {
    id: '18', equipo: 'C.N. ARTISTICA ATLANTIS 2', orden_salida: 18, puntuacion: 0,
    participantes: [
      { nombre: 'LUCIA COY GONZALEZ', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'DANIELA MARTIN PINZON', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'OLIVIA ESCRIHUELA GUERRERO', rol: 'Reserva', año_nacimiento: 2015 },
    ],
  },
  {
    id: '19', equipo: 'C.N. SINCRO SEVILLA', orden_salida: 19, puntuacion: 0,
    participantes: [
      { nombre: 'ALISA BOCHKOVA', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'MAIA SORIA ABASOLO', rol: 'Titular', año_nacimiento: 2014 },
    ],
  },
  {
    id: '20', equipo: 'CLUB DEPORTIVO PINGÜINOS DE ARRECIFE', orden_salida: 20, puntuacion: 0,
    participantes: [
      { nombre: 'AVRIL BETHENCOURT ROMERO', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'ALBA DE EUSEBIO FONTES', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'EVA PENICHET FERNANDEZ', rol: 'Reserva', año_nacimiento: 2014 },
    ],
  },
  {
    id: '21', equipo: 'C.N. ARTISTICA ATLANTIS', orden_salida: 21, puntuacion: 0,
    participantes: [
      { nombre: 'MARIA ESTEVE RAMON', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'AITANA FERNANDEZ LOPEZ', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'MARINA LEGORI CHITARRONI', rol: 'Reserva', año_nacimiento: 2014 },
    ],
  },
  {
    id: '22', equipo: 'C.D. STADIO ALICANTE', orden_salida: 22, puntuacion: 0,
    participantes: [
      { nombre: 'ADRIANA ALBERO GONZALVEZ', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'ROCIO OTS PAREDES', rol: 'Titular', año_nacimiento: 2014 },
    ],
  },
  {
    id: '23', equipo: 'A.D. SINCRO RETIRO', orden_salida: 23, puntuacion: 0,
    participantes: [
      { nombre: 'GADEA MARTINEZ-ACITORES BRAGADO', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'JULIETA VELASCO BELLONI', rol: 'Titular', año_nacimiento: 2014 },
    ],
  },
  {
    id: '24', equipo: 'REFRICA GROUP C.N. GRANOLLERS', orden_salida: 24, puntuacion: 0,
    participantes: [
      { nombre: 'CHLOE DOMINGO RODRIGUEZ', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'MARTA MESTRES MARTIN', rol: 'Titular', año_nacimiento: 2014 },
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
  const teamsCol = collection(db, 'competitions', 'alevin-duo', 'teams')
  await clearCollection(teamsCol)

  console.log('Seeding 24 teams for Alevín · Dúo...')
  for (const team of teams) {
    const { id, ...data } = team
    await setDoc(doc(db, 'competitions', 'alevin-duo', 'teams', id), data)
    console.log(`  ✓ ${String(data.orden_salida).padStart(2, '0')}. ${data.equipo}`)
  }

  console.log('\nDone — 24 teams seeded.')
  process.exit(0)
}

seed().catch(err => { console.error(err); process.exit(1) })
