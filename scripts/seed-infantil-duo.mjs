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
    id: '01', equipo: 'C.N. MATARO', orden_salida: 1, puntuacion: 0,
    participantes: [
      { nombre: 'MAR ALONSO COLOME', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'IRENE ORTIZ GARCIA', rol: 'Titular', año_nacimiento: 2011 },
    ],
  },
  {
    id: '02', equipo: 'C. N. ART. GALAICO PONTEVEDRA', orden_salida: 2, puntuacion: 0,
    participantes: [
      { nombre: 'DEVA ALONSO PEREIRO', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'LUANA PARIENTE PARADA', rol: 'Titular', año_nacimiento: 2011 },
    ],
  },
  {
    id: '03', equipo: 'R. C. N. VIGO', orden_salida: 3, puntuacion: 0,
    participantes: [
      { nombre: 'MAR IGLESIAS ROSENDE', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'JULIA TOSCANO CID', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'GALA PUZA CASTROMIL', rol: 'Reserva', año_nacimiento: 2012 },
    ],
  },
  {
    id: '04', equipo: 'C.N.S. FABIONELLI', orden_salida: 4, puntuacion: 0,
    participantes: [
      { nombre: 'MARIA ARRANZ GARRIDO', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'ELA RUIZ GARCIA', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'SARA MARTINEZ DE JULIAN', rol: 'Reserva', año_nacimiento: 2012 },
    ],
  },
  {
    id: '05', equipo: 'C.N. SINCRONIZADA OURENSE', orden_salida: 5, puntuacion: 0,
    participantes: [
      { nombre: 'ENARA ALVAREZ QUINTELA', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'CANDELA CORROCHANO PEREIRA', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'MARIA SANTOS OUTEIRIÑO', rol: 'Reserva', año_nacimiento: 2012 },
    ],
  },
  {
    id: '06', equipo: 'C.N. CALELLA', orden_salida: 6, puntuacion: 0,
    participantes: [
      { nombre: 'CARLA ALCOVER BOADAS', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'MARIA BARRANCO SALYKINA', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'ALIA SAGRERA CORTE', rol: 'Reserva', año_nacimiento: 2011 },
    ],
  },
  {
    id: '07', equipo: 'C.N. ARTISTICA ATLANTIS', orden_salida: 7, puntuacion: 0,
    participantes: [
      { nombre: 'EMMA ARENAS BROUSSE', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'VALERIA ESCRIHUELA GUERRERO', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'CLAUDIA GARCIA MORENO', rol: 'Reserva', año_nacimiento: 2011 },
    ],
  },
  {
    id: '08', equipo: 'A.D. SINCRO RETIRO 2', orden_salida: 8, puntuacion: 0,
    participantes: [
      { nombre: 'MAELYS MEJIA GOMEZ', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'EMMA OLIVA AREVALO', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'AROA CONDE IBARRONDO', rol: 'Reserva', año_nacimiento: 2012 },
    ],
  },
  {
    id: '09', equipo: 'CLUB DEPORTIVO PINGÜINOS DE ARRECIFE', orden_salida: 9, puntuacion: 0,
    participantes: [
      { nombre: 'ADRIANA DELGADO COSTA', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'LUCIA PEREZ FLEITAS', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'NAHOMY SOFIA LOPEZ GOMEZ', rol: 'Reserva', año_nacimiento: 2011 },
    ],
  },
  {
    id: '10', equipo: 'C.N. SINCRO SEVILLA 2', orden_salida: 10, puntuacion: 0,
    participantes: [
      { nombre: 'AITANA AZCONA ORTIZ', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'MAYA JOS ROMAN', rol: 'Titular', año_nacimiento: 2011 },
    ],
  },
  {
    id: '11', equipo: 'C.N. KALLIPOLIS', orden_salida: 11, puntuacion: 0,
    participantes: [
      { nombre: 'LOLA GONZALEZ-ALSINA ROCASALBAS', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'MARIA TORNE GONZALEZ', rol: 'Titular', año_nacimiento: 2011 },
    ],
  },
  {
    id: '12', equipo: 'C.N. METROPOLE', orden_salida: 12, puntuacion: 0,
    participantes: [
      { nombre: 'MARTA CUARENTAL CABRERA', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'VALERIA HERNANDEZ HERNANDEZ', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'GABRIELA GONZALEZ BARRAGAN', rol: 'Reserva', año_nacimiento: 2011 },
    ],
  },
  {
    id: '13', equipo: 'REFRICA GROUP C.N. GRANOLLERS', orden_salida: 13, puntuacion: 0,
    participantes: [
      { nombre: 'IRENE CARRILLO MARTINEZ', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'EMMA SOBRINO TALLET', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'ARAN JIMENEZ PALMA', rol: 'Reserva', año_nacimiento: 2011 },
    ],
  },
  {
    id: '14', equipo: 'C.D. STADIO ALICANTE', orden_salida: 14, puntuacion: 0,
    participantes: [
      { nombre: 'LOLA IVANA APARICIO TRONCHONI', rol: 'Titular', año_nacimiento: 2013 },
      { nombre: 'AMAIA ELMAN MONTERO', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'SOFIA CRESPO ESCODA', rol: 'Reserva', año_nacimiento: 2012 },
    ],
  },
  {
    id: '15', equipo: 'D.N. PORTUGALETE', orden_salida: 15, puntuacion: 0,
    participantes: [
      { nombre: 'EIDER DURANA BILBAO', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'LAIA TAJADURA JUSTO', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'OLAITZ BILBAO MONTIEL', rol: 'Reserva', año_nacimiento: 2011 },
    ],
  },
  {
    id: '16', equipo: 'C.N. AZAHAR SINCRO 2', orden_salida: 16, puntuacion: 0,
    participantes: [
      { nombre: 'KIRA GONZALEZ CERVERA', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'MINERVA MONDEJAR GARCIA', rol: 'Titular', año_nacimiento: 2011 },
    ],
  },
  {
    id: '17', equipo: 'REFRICA GROUP C.N. GRANOLLERS 2', orden_salida: 17, puntuacion: 0,
    participantes: [
      { nombre: 'CARLOTA FERNANDEZ GANDUXE', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'MARIONA NAVAS JULIAN', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'MAR BORDAS VALENCIA', rol: 'Reserva', año_nacimiento: 2012 },
    ],
  },
  {
    id: '18', equipo: 'REAL CANOE N.C.', orden_salida: 18, puntuacion: 0,
    participantes: [
      { nombre: 'SOFIA MARCOS CALVO', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'ISABEL MEDINA MINELLI', rol: 'Titular', año_nacimiento: 2013 },
      { nombre: 'ALBA PATRICIA ARIAS ZELADA', rol: 'Reserva', año_nacimiento: 2013 },
    ],
  },
  {
    id: '19', equipo: 'A.D. SINCRO RETIRO', orden_salida: 19, puntuacion: 0,
    participantes: [
      { nombre: 'ANA DOMINGO GUEVARA', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'FRANCESCA HURTADO PINO', rol: 'Titular', año_nacimiento: 2012 },
    ],
  },
  {
    id: '20', equipo: 'C.N. SINCRO SEVILLA', orden_salida: 20, puntuacion: 0,
    participantes: [
      { nombre: 'CARLA FERNANDEZ FERNANDEZ', rol: 'Titular', año_nacimiento: 2013 },
      { nombre: 'LEIRE SORIA ABASOLO', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'CLAUDIA BASCON SILES', rol: 'Reserva', año_nacimiento: 2012 },
    ],
  },
  {
    id: '21', equipo: 'CIRCULO MERCANTIL', orden_salida: 21, puntuacion: 0,
    participantes: [
      { nombre: 'MARA PIÑERO HERRERA', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'INES VARGAS ARCE', rol: 'Titular', año_nacimiento: 2013 },
    ],
  },
  {
    id: '22', equipo: 'CLUB MALLORCA SINCRO', orden_salida: 22, puntuacion: 0,
    participantes: [
      { nombre: 'MARTA ROUX SALOM', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'JULIA VILLALONGA LLUCH', rol: 'Titular', año_nacimiento: 2011 },
    ],
  },
  {
    id: '23', equipo: 'C.N. SABADELL', orden_salida: 23, puntuacion: 0,
    participantes: [
      { nombre: 'ABRIL CABALLERO GARCIA', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'JUDIT GROS MOLINA', rol: 'Titular', año_nacimiento: 2011 },
    ],
  },
  {
    id: '24', equipo: 'C.N. AZAHAR SINCRO', orden_salida: 24, puntuacion: 0,
    participantes: [
      { nombre: 'BALMA GARCIA ANDRES', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'VALERIA GONZALEZ CERVERA', rol: 'Titular', año_nacimiento: 2012 },
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
  const teamsCol = collection(db, 'competitions', 'infantil-duo', 'teams')
  await clearCollection(teamsCol)

  console.log('Seeding 24 teams for Infantil · Dúo...')
  for (const team of teams) {
    const { id, ...data } = team
    await setDoc(doc(db, 'competitions', 'infantil-duo', 'teams', id), data)
    console.log(`  ✓ ${String(data.orden_salida).padStart(2, '0')}. ${data.equipo}`)
  }

  console.log('\nDone — 24 teams seeded.')
  process.exit(0)
}

seed().catch(err => { console.error(err); process.exit(1) })
