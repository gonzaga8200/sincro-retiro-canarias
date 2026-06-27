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
    id: '01', equipo: 'REAL CANOE N.C.', orden_salida: 1, puntuacion: 0,
    participantes: [
      { nombre: 'DANIELA ALDANA LOPEZ', rol: 'Titular', año_nacimiento: 2006 },
      { nombre: 'CLAUDIA CAÑAS DAVILA', rol: 'Titular', año_nacimiento: 2002 },
      { nombre: 'DIANA CORDON ROMERO', rol: 'Titular', año_nacimiento: 2002 },
      { nombre: 'ANA NUÑO GARCIA', rol: 'Titular', año_nacimiento: 2002 },
      { nombre: 'SOFIA PEREZ URIARTE', rol: 'Titular', año_nacimiento: 2005 },
      { nombre: 'CARLOTA SANCHEZ FERNANDEZ', rol: 'Titular', año_nacimiento: 2003 },
      { nombre: 'ROCIO SANTOS MIGUEL', rol: 'Titular', año_nacimiento: 2006 },
      { nombre: 'SARA SIMON CARRILLO', rol: 'Titular', año_nacimiento: 2007 },
      { nombre: 'VALERIA GAMALLO PALOMARES', rol: 'Reserva', año_nacimiento: 2002 },
    ],
  },
  {
    id: '02', equipo: 'C.N. SINCRO SEVILLA', orden_salida: 2, puntuacion: 0,
    participantes: [
      { nombre: 'NOA ALCALA MARTINEZ', rol: 'Titular', año_nacimiento: 2009 },
      { nombre: 'POLINA BLAGODARNAYA BLAGODARNAYA', rol: 'Titular', año_nacimiento: 2010 },
      { nombre: 'MACARENA BOZA SANCHEZ', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'JIMENA DEL REY ROMERO', rol: 'Titular', año_nacimiento: 2010 },
      { nombre: 'PAULA GONZALEZ ROMERO', rol: 'Titular', año_nacimiento: 2010 },
      { nombre: 'MAYA JOS ROMAN', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'PATRICIA VELAZQUEZ RUIZ', rol: 'Titular', año_nacimiento: 2008 },
      { nombre: 'AINHOA ZAPATA TERCERO', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'ELENA VAZQUEZ COELLO', rol: 'Reserva', año_nacimiento: 2006 },
    ],
  },
  {
    id: '03', equipo: 'STADIUM VENECIA', orden_salida: 3, puntuacion: 0,
    participantes: [
      { nombre: 'ISABEL BARRABES MARTINEZ', rol: 'Titular', año_nacimiento: 2007 },
      { nombre: 'LUCIA BLAZQUEZ ANDRES', rol: 'Titular', año_nacimiento: 2006 },
      { nombre: 'MARTINA CAPAPE VELA', rol: 'Titular', año_nacimiento: 2010 },
      { nombre: 'SARA CASABIEL MATEO', rol: 'Titular', año_nacimiento: 2007 },
      { nombre: 'IRENE COMPAINS GARCIA', rol: 'Titular', año_nacimiento: 2008 },
      { nombre: 'INES GALAY TORRIJO', rol: 'Titular', año_nacimiento: 2007 },
    ],
  },
  {
    id: '04', equipo: 'C.N. METROPOLE', orden_salida: 4, puntuacion: 0,
    participantes: [
      { nombre: 'TAYRI CAZORLA SOSA', rol: 'Titular', año_nacimiento: 2008 },
      { nombre: 'GABRIELA GONZALEZ BARRAGAN', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'VALERIA HERNANDEZ HERNANDEZ', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'BIANCA MARTINEZ SORIA', rol: 'Titular', año_nacimiento: 2010 },
      { nombre: 'MARTINA MEDINA MONDEJAR', rol: 'Titular', año_nacimiento: 2009 },
      { nombre: 'LOURDES SANTIAGO BELLO', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'ADRIANA SUAREZ DIAZ', rol: 'Titular', año_nacimiento: 2010 },
      { nombre: 'MARIA TERRE PAJUELO', rol: 'Titular', año_nacimiento: 2010 },
    ],
  },
  {
    id: '05', equipo: 'C.N.S. FABIONELLI', orden_salida: 5, puntuacion: 0,
    participantes: [
      { nombre: 'CARLA ANDRES ZATARAIN', rol: 'Titular', año_nacimiento: 2010 },
      { nombre: 'MARIA ARRANZ GARRIDO', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'MIRIAM DOMINGUEZ RAMOS', rol: 'Titular', año_nacimiento: 2009 },
      { nombre: 'TERESA GARCIA CUELLO', rol: 'Titular', año_nacimiento: 2010 },
      { nombre: 'GINEBRA LORENZO PEREZ', rol: 'Titular', año_nacimiento: 2010 },
      { nombre: 'LAURA MIGUEL VILLAR', rol: 'Titular', año_nacimiento: 2009 },
      { nombre: 'PAULA SANCHEZ DOMINGUEZ', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'LUNA SANZ SANCHEZ', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'SOFIA RODRIGUEZ GRAÑEDA', rol: 'Reserva', año_nacimiento: 2010 },
    ],
  },
  {
    id: '06', equipo: 'A.D. SINCRO RETIRO', orden_salida: 6, puntuacion: 0,
    participantes: [
      { nombre: 'CRISTINA ALCOBENDAS PAREJO', rol: 'Titular', año_nacimiento: 2005 },
      { nombre: 'PAULA BALLESTEROS FERNANDEZ', rol: 'Titular', año_nacimiento: 2004 },
      { nombre: 'INES BLASCO MARTIN', rol: 'Titular', año_nacimiento: 2007 },
      { nombre: 'MERCEDES DIAZ CERVERA', rol: 'Titular', año_nacimiento: 2004 },
      { nombre: 'CHIARA LEE GOMEZ ALVAREZ', rol: 'Titular', año_nacimiento: 2006 },
      { nombre: 'BLANCA GOMEZ GOMEZ', rol: 'Titular', año_nacimiento: 1999 },
      { nombre: 'JULIA REINA BORIA', rol: 'Titular', año_nacimiento: 2004 },
      { nombre: 'MARINA SARMIENTO FIGUEREDO', rol: 'Titular', año_nacimiento: 2007 },
    ],
  },
  {
    id: '07', equipo: 'CLUB DEPORTIVO PINGÜINOS DE ARRECIFE', orden_salida: 7, puntuacion: 0,
    participantes: [
      { nombre: 'ADRIANA CABRERA PEREZ', rol: 'Titular', año_nacimiento: 2009 },
      { nombre: 'LAIA HERNANDEZ ALMENARA', rol: 'Titular', año_nacimiento: 2008 },
      { nombre: 'NAHOMY SOFIA LOPEZ GOMEZ', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'VEGA MARTINEZ MORALES', rol: 'Titular', año_nacimiento: 2009 },
      { nombre: 'LUCIA PEREZ FLEITAS', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'CIARA RODRIGUEZ HERNANDEZ', rol: 'Titular', año_nacimiento: 2008 },
      { nombre: 'ELIZABETH RODRIGUEZ HERNANDEZ', rol: 'Titular', año_nacimiento: 2008 },
      { nombre: 'VICTORIA ROMERO MARTIN', rol: 'Titular', año_nacimiento: 2010 },
      { nombre: 'LAURA ALEMAN SALVAGO', rol: 'Reserva', año_nacimiento: 2009 },
      { nombre: 'DANIELA BRITO ESPINO', rol: 'Reserva', año_nacimiento: 2010 },
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
  const teamsCol = collection(db, 'competitions', 'absoluto-equipo', 'teams')
  await clearCollection(teamsCol)

  console.log('Seeding 7 teams for Absoluto · Equipo...')
  for (const team of teams) {
    const { id, ...data } = team
    await setDoc(doc(db, 'competitions', 'absoluto-equipo', 'teams', id), data)
    console.log(`  ✓ ${String(data.orden_salida).padStart(2, '0')}. ${data.equipo}`)
  }

  console.log('\nDone — 7 teams seeded.')
  process.exit(0)
}

seed().catch(err => { console.error(err); process.exit(1) })
