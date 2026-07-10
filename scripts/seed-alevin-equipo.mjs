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
      { nombre: 'MAR ALONSO PEREIRO', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'ROI CALVO FERNANDEZ', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'CANDELA CARBALLIDO GOMEZ', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'ALMA FIGUEIRA CASTRO', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'ALDA MARIÑO DOPICO', rol: 'Titular', año_nacimiento: 2016 },
      { nombre: 'LOLA PANSERA SEARA', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'ELISA PRIETO REFOJO', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'VALERIA RODRIGUEZ PONTES', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'ISABELLA RAMIREZ MORALES', rol: 'Reserva', año_nacimiento: 2014 },
    ],
  },
  {
    id: '02', equipo: 'ACQUA SINCRO ARTISTICA EL PUIG', orden_salida: 2, puntuacion: 0,
    participantes: [
      { nombre: 'DAMELI AIASHEVA', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'ITAYETZI DEU LANDA', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'ADRIANA ESCRIBANO CASTAÑEDA', rol: 'Titular', año_nacimiento: 2016 },
      { nombre: 'YOEL FERNANDEZ SANCHEZ', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'OKSANA GAVRILOVA', rol: 'Titular', año_nacimiento: 2016 },
      { nombre: 'ROCIO GRACIA MARTIN', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'NAILA HASSANE', rol: 'Titular', año_nacimiento: 2015 },
    ],
  },
  {
    id: '03', equipo: 'C.N. SINCRONIZADA OURENSE', orden_salida: 3, puntuacion: 0,
    participantes: [
      { nombre: 'AINHOA ARAGON ORTIZ', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'ALBA BLANCO PEREZ', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'ANTIA CAMINO RODRIGUEZ', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'SARA LORENZO GANDARA', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'HELENA MARQUINA FERNANDEZ', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'CANDELA RODRIGUEZ RODRIGUEZ', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'KAYLA SOSA RIVERA', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'XIANA VISPO MARTINEZ', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'OLIVIA ROMERO CABARCOS', rol: 'Reserva', año_nacimiento: 2015 },
      { nombre: 'VALENTINA TORRES GONZALEZ', rol: 'Reserva', año_nacimiento: 2014 },
    ],
  },
  {
    id: '04', equipo: 'CIRCULO MERCANTIL', orden_salida: 4, puntuacion: 0,
    participantes: [
      { nombre: 'MARGARITA ADRIAENSENS SANCHEZ', rol: 'Titular', año_nacimiento: 2016 },
      { nombre: 'TRIANA ARELLANO FERNANDEZ', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'SARA ASENSI PEREZ', rol: 'Titular', año_nacimiento: 2016 },
      { nombre: 'JULIA GARRIDO VAYA', rol: 'Titular', año_nacimiento: 2016 },
      { nombre: 'JIMENA GARRIDO VAYA', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'CARLOS VARELA BORJAS', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'MARIA VENUS MACIAS', rol: 'Titular', año_nacimiento: 2016 },
    ],
  },
  {
    id: '05', equipo: 'C.N. AZAHAR SINCRO', orden_salida: 5, puntuacion: 0,
    participantes: [
      { nombre: 'VIRGINIA ALBALAT MARTINEZ', rol: 'Titular', año_nacimiento: 2017 },
      { nombre: 'ERIC BABILONI ANDRES', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'ELEA DEL ROSAL KERVAREC', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'CRISTINA FONT MIRALLES', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'THIAGO GONZALEZ CERVERA', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'LARA HACIOGLU FTOUHI', rol: 'Titular', año_nacimiento: 2017 },
      { nombre: 'ANAIS HERRERA SALES', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'MARTA MIRAVET GARCIA', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'FLAVIA ELENA LUDOVIC CARRASCO', rol: 'Reserva', año_nacimiento: 2016 },
      { nombre: 'JULIA TORRES FULLEDA', rol: 'Reserva', año_nacimiento: 2017 },
    ],
  },
  {
    id: '06', equipo: 'C.N. METROPOLE', orden_salida: 6, puntuacion: 0,
    participantes: [
      { nombre: 'ISABEL BARRAGAN GONZALEZ', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'GARA FRANCES GONZALEZ', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'ICO ISABEL LOPEZ SANTANA', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'SOFIA MARRERO JIMENEZ', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'PAULA REYES ZARAGOZA', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'CARMEN RICO MACHADO', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'CAROLINA RODRIGUEZ PRIETO', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'EVA SANTANA ARTILES', rol: 'Titular', año_nacimiento: 2014 },
    ],
  },
  {
    id: '07', equipo: 'REAL CANOE N.C.', orden_salida: 7, puntuacion: 0,
    participantes: [
      { nombre: 'ICIAR BEJERANO MORANDEIRA', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'CANDELA CONDE ALYOU', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'DINA MATILDE FASOLO RAVAZZINI', rol: 'Titular', año_nacimiento: 2017 },
      { nombre: 'EMMA MARZO BOBILLO', rol: 'Titular', año_nacimiento: 2016 },
      { nombre: 'AMAYA RUESGA BAZA', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'JIMENA SANZ SARDINA', rol: 'Titular', año_nacimiento: 2016 },
      { nombre: 'MICAELA SHEMI MARINAS', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'ANA URIA CARRILLO', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'SOFIA CASLA SANCHEZ-MONTAÑES', rol: 'Reserva', año_nacimiento: 2015 },
    ],
  },
  {
    id: '08', equipo: 'C.N.S. FABIONELLI', orden_salida: 8, puntuacion: 0,
    participantes: [
      { nombre: 'AUDREY ACOSTA HERNANDEZ', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'MARTINA ARANDA GRANDA', rol: 'Titular', año_nacimiento: 2016 },
      { nombre: 'AINARA BERNARDO PEREZ', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'SOFIA DE LA FUENTE ANTUNEZ', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'INES DE LA FUENTE MARTIN', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'LARA GARZON MEDINA', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'MIA LORENZO PEREZ', rol: 'Titular', año_nacimiento: 2016 },
      { nombre: 'EMMA RUIZ GARCIA', rol: 'Titular', año_nacimiento: 2016 },
      { nombre: 'EMILI KOLONTAYEVSKA', rol: 'Reserva', año_nacimiento: 2014 },
    ],
  },
  {
    id: '09', equipo: 'C.N. ARTISTICA PSWATER BENIDORM', orden_salida: 9, puntuacion: 0,
    participantes: [
      { nombre: 'LUCIA AHUIR LORENTE', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'EMMA CASTIBLANQUE GUERRA', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'GEMA MARIN MACHO', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'NIA MORA DI MENNA', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'MICHELE PADIAL RODRIGUEZ', rol: 'Titular', año_nacimiento: 2016 },
      { nombre: 'ALBA ROMERO NIETO', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'CARLA RUFO RUS', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'MARINA LUCIA SERBANA', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'SARA BLAHA', rol: 'Reserva', año_nacimiento: 2015 },
      { nombre: 'EUGENIA RINCON VIZOVSKAYA', rol: 'Reserva', año_nacimiento: 2015 },
      { nombre: 'ELENA ANDREEA TRIFAN', rol: 'Reserva', año_nacimiento: 2015 },
    ],
  },
  {
    id: '10', equipo: 'CLUB AQUAMADSINCRO', orden_salida: 10, puntuacion: 0,
    participantes: [
      { nombre: 'ROCIO AMUTXASTEGI AGUDO', rol: 'Titular', año_nacimiento: 2017 },
      { nombre: 'VALENTINA ANGELILLO MAGUREGI', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'ROSANNA DE FRANCISCO CUESTA', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'VALENTINA DE FRANCISCO CUESTA', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'MARIA MATEI', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'LEAH PLAZA SANCHEZ', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'ANA SEGOVIA PAINO', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'LUCIA SOLER LOPEZ', rol: 'Titular', año_nacimiento: 2016 },
      { nombre: 'GEMA MILLAN FELIX', rol: 'Reserva', año_nacimiento: 2016 },
      { nombre: 'DANIELA VILLALTA GOCHEZ', rol: 'Reserva', año_nacimiento: 2017 },
    ],
  },
  {
    id: '11', equipo: 'SPORTING CLUB CASINO', orden_salida: 11, puntuacion: 0,
    participantes: [
      { nombre: 'PAULA ANUNCIACION GARCIA AMORIN', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'SALETA GRAÑA GUERREIRO', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'MONICA LOPEZ TIJERINA', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'LUCIA MARTINEZ LAGO', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'MARIA MONTERO ANDON', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'CARLA RAMIL GARCIA', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'REBECA VIDAL CALLEJA', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'CAYETANA FERNANDEZ-MAYORALAS SALA', rol: 'Reserva', año_nacimiento: 2014 },
      { nombre: 'ELENA PARDO DE VERA VAZQUEZ', rol: 'Reserva', año_nacimiento: 2014 },
    ],
  },
  {
    id: '12', equipo: 'C.N. SABADELL', orden_salida: 12, puntuacion: 0,
    participantes: [
      { nombre: 'ISNER ALEJANDRO ALBAN GONZALEZ', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'ARAN CABALLERO GARCIA', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'DANIELA DE LA RUBIA JIMENEZ', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'ARLET GONZALEZ PI', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'ONA LLONCH MURILLO', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'ALMA MACIAS GALLARDO', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'ABRIL NICOLAS SAMPIETRO', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'HELENA RUIZ GASSOL', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'DUNA CONEJERO PAÑOS', rol: 'Reserva', año_nacimiento: 2015 },
      { nombre: 'SOFIA MARQUEZ FLORES', rol: 'Reserva', año_nacimiento: 2014 },
    ],
  },
  {
    id: '13', equipo: 'CLUB DEPORTIVO PINGÜINOS DE ARRECIFE', orden_salida: 13, puntuacion: 0,
    participantes: [
      { nombre: 'AVRIL BETHENCOURT ROMERO', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'ALBA DE EUSEBIO FONTES', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'MARTYNA GOLAWSKA REGUILON', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'CARLOTA MARTIN BARREIRO', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'NATALIA MARTINEZ ALAYON', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'ALBA MENDEZ LOPEZ-SOCAS', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'EVA PENICHET FERNANDEZ', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'MARIA TINOCO CERRUDO', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'AITANA ACUÑA RODRÍGUEZ', rol: 'Reserva', año_nacimiento: 2015 },
      { nombre: 'MIRANDA MORALES PRAHM', rol: 'Reserva', año_nacimiento: 2014 },
    ],
  },
  {
    id: '14', equipo: 'C.N. KALLIPOLIS', orden_salida: 14, puntuacion: 0,
    participantes: [
      { nombre: 'SOFIA DEL CAMPO ALVAREZ', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'JANA JIMENEZ PLANAS', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'MARTA LLIBRE VILADOT', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'QUERALT MULET PADROS', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'ICIAR RODRIGUEZ GENOVA', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'HELENA SANTACANA SOLA', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'SARA SUSO GARCIA', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'CLOE VIVES JULIA', rol: 'Titular', año_nacimiento: 2016 },
      { nombre: 'OLIVIA LOTINA MESALLES', rol: 'Reserva', año_nacimiento: 2015 },
      { nombre: 'ARLET SALA SOLA', rol: 'Reserva', año_nacimiento: 2015 },
    ],
  },
  {
    id: '15', equipo: 'CLUB NOU GODELLA NATACIÓN', orden_salida: 15, puntuacion: 0,
    participantes: [
      { nombre: 'VEGA COCA CHILLARON', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'EMMA CORONADO RUIZ', rol: 'Titular', año_nacimiento: 2016 },
      { nombre: 'VEGA GIL GARCIA', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'CELESTE MEJIA CORREA', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'JULIA PEÑO MONTERO', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'ANDRA POP MARITA', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'ANE SANJUAN RUIZ', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'VERA SENDRA RODRIGUEZ', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'MIREIA CODINA MARTINEZ', rol: 'Reserva', año_nacimiento: 2015 },
      { nombre: 'JULIA GOMIS VELA', rol: 'Reserva', año_nacimiento: 2016 },
    ],
  },
  {
    id: '16', equipo: 'C.N. SINCRO SEVILLA', orden_salida: 16, puntuacion: 0,
    participantes: [
      { nombre: 'ALISA BOCHKOVA', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'MARTA DOMINGUEZ VILLAFRANCA', rol: 'Titular', año_nacimiento: 2016 },
      { nombre: 'MARIA GONZALEZ PAREJA', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'VERA LAZARO REMUJO', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'ARIADNA MARTIN GOMEZ', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'MANUELA PALOMINO RIVERA', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'MAIA SORIA ABASOLO', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'SUSANA STACHOWICZ DIAZ', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'TERESA ERCE TRIAN', rol: 'Reserva', año_nacimiento: 2016 },
      { nombre: 'MYRIAM PEDRERA WAGNER', rol: 'Reserva', año_nacimiento: 2016 },
    ],
  },
  {
    id: '17', equipo: 'REFRICA GROUP C.N. GRANOLLERS', orden_salida: 17, puntuacion: 0,
    participantes: [
      { nombre: 'PAULA ALCAIDE ROSELL', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'ELENA CARRILLO MARTINEZ', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'CHLOE DOMINGO RODRIGUEZ', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'NORA FIGUEREDO GARCIA', rol: 'Titular', año_nacimiento: 2016 },
      { nombre: 'CLAUDIA GARCIA JIMENEZ', rol: 'Titular', año_nacimiento: 2017 },
      { nombre: 'MARTA MESTRES MARTIN', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'LOLA RIONEGRO LEON', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'SIRA SANCHEZ BRIHUEGA', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'CHLOE VEGA MONCLUS', rol: 'Reserva', año_nacimiento: 2015 },
      { nombre: 'LUCIA VIDAL JIMENEZ', rol: 'Reserva', año_nacimiento: 2017 },
    ],
  },
  {
    id: '18', equipo: 'C.D. STADIO ALICANTE', orden_salida: 18, puntuacion: 0,
    participantes: [
      { nombre: 'ADRIANA ALBERO GONZALVEZ', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'VICTORIA AMORA VELASCO', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'CELIA CABALLERO DELGADO', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'ANDREA CAROLINA CAMACHO PULIDO', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'LARA ELMAN MONTERO', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'LEIA GOMEZ SERRANO', rol: 'Titular', año_nacimiento: 2016 },
      { nombre: 'VALERIA LOPEZ-MITJAVILA PUENTE', rol: 'Titular', año_nacimiento: 2017 },
      { nombre: 'ROCIO OTS PAREDES', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'JOAN ALBERO GONZALVEZ', rol: 'Reserva', año_nacimiento: 2016 },
    ],
  },
  {
    id: '19', equipo: 'A.D. SINCRO RETIRO', orden_salida: 19, puntuacion: 0,
    participantes: [
      { nombre: 'VALERIA BARRERA AMEZQUITA', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'CLARA BERNAL GABALDON', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'ANDREA FERNANDEZ DURANGO', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'GADEA MARTINEZ-ACITORES BRAGADO', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'VERA OLIVA AREVALO', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'CATALINA SANCHEZ BRETOS', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'ZOE VASSEUR', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'JULIETA VELASCO BELLONI', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'AROHA PRADA MUÑOZ', rol: 'Reserva', año_nacimiento: 2015 },
    ],
  },
  {
    id: '20', equipo: 'C.N. ARTISTICA ATLANTIS', orden_salida: 20, puntuacion: 0,
    participantes: [
      { nombre: 'LUCIA COY GONZALEZ', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'DANIELA TATIANA DE BRUIN TROFIMOVA', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'OLIVIA ESCRIHUELA GUERRERO', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'MARIA ESTEVE RAMON', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'AITANA FERNANDEZ LOPEZ', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'MARINA LEGORI CHITARRONI', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'DANIELA MARTIN PINZON', rol: 'Titular', año_nacimiento: 2015 },
      { nombre: 'HELENA SANFIZ VALLES', rol: 'Titular', año_nacimiento: 2014 },
      { nombre: 'NATALIA BADAL VERDEGUER', rol: 'Reserva', año_nacimiento: 2014 },
      { nombre: 'IDOIA LUNA VALLE', rol: 'Reserva', año_nacimiento: 2015 },
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
  const teamsCol = collection(db, 'competitions', 'alevin-equipo', 'teams')
  await clearCollection(teamsCol)

  console.log('Seeding 20 teams for Alevín · Equipo...')
  for (const team of teams) {
    const { id, ...data } = team
    await setDoc(doc(db, 'competitions', 'alevin-equipo', 'teams', id), data)
    console.log(`  ✓ ${String(data.orden_salida).padStart(2, '0')}. ${data.equipo}`)
  }

  console.log('\nDone — 20 teams seeded.')
  process.exit(0)
}

seed().catch(err => { console.error(err); process.exit(1) })
