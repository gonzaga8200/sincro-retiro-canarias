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
    id: '01', equipo: 'D.N. PORTUGALETE', orden_salida: 1, puntuacion: 0,
    participantes: [
      { nombre: 'BERA AGUADO DAZA', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'OLAITZ BILBAO MONTIEL', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'EIDER DURANA BILBAO', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'JUNE GARAY LOPEZ', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'ARHANE GILA MARTINEZ', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'LEIZE GOMEZ RODRIGUEZ', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'ANGELA GOMEZ VAZQUEZ', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'CLAUDIA HERNANDEZ VILLAR', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'IRENE SANTAMARIA BAZ', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'LAIA TAJADURA JUSTO', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'EIDER IBÁÑEZ VELASCO', rol: 'Reserva', año_nacimiento: 2012 },
      { nombre: 'HAIZENE SIERRA ITURRIETA', rol: 'Reserva', año_nacimiento: 2012 },
    ],
  },
  {
    id: '02', equipo: 'C.N. ARTISTICA ATLANTIS', orden_salida: 2, puntuacion: 0,
    participantes: [
      { nombre: 'EMMA ARENAS BROUSSE', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'AITANA CASAL BARTUAL', rol: 'Titular', año_nacimiento: 2013 },
      { nombre: 'VALERIA ESCRIHUELA GUERRERO', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'CARMEN GARCIA MARTINEZ', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'CLAUDIA GARCIA MORENO', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'ASIER HERRERO PALANQUES', rol: 'Titular', año_nacimiento: 2013 },
      { nombre: 'NONNA ISHCHENKO', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'THELMA QUINTERO SENDRA', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'CANDELA VICENTE ESQUIU', rol: 'Titular', año_nacimiento: 2013 },
    ],
  },
  {
    id: '03', equipo: 'C.N. AZAHAR SINCRO', orden_salida: 3, puntuacion: 0,
    participantes: [
      { nombre: 'AITANA ANDREU CARRASCO', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'ARIADNA BODI PALLARDO', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'CLARA CUBEDO ORTI', rol: 'Titular', año_nacimiento: 2013 },
      { nombre: 'BALMA GARCIA ANDRES', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'KIRA GONZALEZ CERVERA', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'VALERIA GONZALEZ CERVERA', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'IRIS GULER VIDAL', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'AHINARA HERNANDEZ SUAREZ', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'LUCIA MARINA LEVY ROJAS', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'MINERVA MONDEJAR GARCIA', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'LEIRE BABILONI ANDRES', rol: 'Reserva', año_nacimiento: 2013 },
      { nombre: 'MELEK HACIOGLU', rol: 'Reserva', año_nacimiento: 2013 },
    ],
  },
  {
    id: '04', equipo: 'R. C. N. VIGO', orden_salida: 4, puntuacion: 0,
    participantes: [
      { nombre: 'LIA CARRERA DELTOUR FIERENS', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'INES FERNANDEZ MARTINEZ', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'MAR IGLESIAS ROSENDE', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'IREA PENA PUZA', rol: 'Titular', año_nacimiento: 2013 },
      { nombre: 'GALA PUZA CASTROMIL', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'INDIRA RODRIGUEZ ULLOA', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'SABELA TOME REIGOSA', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'JULIA TOSCANO CID', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'VALERIA VIDAL PRIETO', rol: 'Titular', año_nacimiento: 2013 },
      { nombre: 'ISIS BLANCO ABREU', rol: 'Reserva', año_nacimiento: 2013 },
    ],
  },
  {
    id: '05', equipo: 'C.N. SINCRO SEVILLA', orden_salida: 5, puntuacion: 0,
    participantes: [
      { nombre: 'AITANA AZCONA ORTIZ', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'CLAUDIA BASCON SILES', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'MACARENA BOZA SANCHEZ', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'CARLA FERNANDEZ FERNANDEZ', rol: 'Titular', año_nacimiento: 2013 },
      { nombre: 'MAYA JOS ROMAN', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'CORINE KIMVOUAMA ROIZ', rol: 'Titular', año_nacimiento: 2013 },
      { nombre: 'ABRIL LAZARO REMUJO', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'LEIRE SORIA ABASOLO', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'CARMEN VEGAZO ROMERO', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'AINHOA ZAPATA TERCERO', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'JENNIFER ALEJANDRA NIETO PEREZ', rol: 'Reserva', año_nacimiento: 2011 },
    ],
  },
  {
    id: '06', equipo: 'A.D. SINCRO RETIRO', orden_salida: 6, puntuacion: 0,
    participantes: [
      { nombre: 'AROA CONDE IBARRONDO', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'ANA DOMINGO GUEVARA', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'PALOMA GARCIA COMINS', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'CARLOTA GUTIERREZ SANCHEZ', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'FRANCESCA HURTADO PINO', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'MAELYS MEJIA GOMEZ', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'EMMA OLIVA AREVALO', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'MARA RODRIGUEZ DE GUZMAN BLANCO', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'BERTA SELGAS MORENO', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'ALBA MILEY SORIA CALAMANI', rol: 'Titular', año_nacimiento: 2013 },
      { nombre: 'EMMA FERNANDEZ DURANGO', rol: 'Reserva', año_nacimiento: 2013 },
      { nombre: 'LAIA MORENO TORRES', rol: 'Reserva', año_nacimiento: 2013 },
    ],
  },
  {
    id: '07', equipo: 'REAL CANOE N.C.', orden_salida: 7, puntuacion: 0,
    participantes: [
      { nombre: 'ADRIANA ALVAREZ RODRIGUEZ', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'ALBA PATRICIA ARIAS ZELADA', rol: 'Titular', año_nacimiento: 2013 },
      { nombre: 'CAROLINA BURGOS ANTUNEZ', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'MARIA GABRIELA BUXEDA I ARBOLI', rol: 'Titular', año_nacimiento: 2013 },
      { nombre: 'LUCIA CHIVA RECIO', rol: 'Titular', año_nacimiento: 2013 },
      { nombre: 'MARTINA DIAZ GOMEZ', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'ARA ESTEBAN MESON', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'NOA GARCIA RAMOS', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'SOFIA MARCOS CALVO', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'ISABEL MEDINA MINELLI', rol: 'Titular', año_nacimiento: 2013 },
    ],
  },
  {
    id: '08', equipo: 'C.D. STADIO ALICANTE', orden_salida: 8, puntuacion: 0,
    participantes: [
      { nombre: 'LOLA IVANA APARICIO TRONCHONI', rol: 'Titular', año_nacimiento: 2013 },
      { nombre: 'SOFIA CRESPO ESCODA', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'AMAIA ELMAN MONTERO', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'BIANCA FERRISI LIMA', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'LEIRE LLORENTE BAEZA', rol: 'Titular', año_nacimiento: 2013 },
      { nombre: 'ANNA MARTINEZ SORIANO', rol: 'Titular', año_nacimiento: 2013 },
      { nombre: 'MARTINA PEREZ GAMBIN', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'JULIA RAMON MUÑOZ', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'ALICJA SOKOLNICKA', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'OLIVIA VAILLO ROMERO', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'VALERIA GARCIA MHARZI', rol: 'Reserva', año_nacimiento: 2013 },
      { nombre: 'BERTA NAVARRO ALVAREZ', rol: 'Reserva', año_nacimiento: 2013 },
    ],
  },
  {
    id: '09', equipo: 'C.N. CALELLA', orden_salida: 9, puntuacion: 0,
    participantes: [
      { nombre: 'CARLA ALCOVER BOADAS', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'GALA ALIATA LLAUGER', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'MARIA BARRANCO SALYKINA', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'ALBA CUBER RIBERA', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'IVET ESTANYOL FRADERA', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'VALERIA KUSHYNSKAYA KRAMARENKO', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'DIANA LOPEZ ZILAUT', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'ALIA SAGRERA CORTE', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'IRINA TORRUS LLOVERAS', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'MAR MARIETTE ZURANO VAN MUIJDEN', rol: 'Titular', año_nacimiento: 2013 },
      { nombre: 'SARA DELGADO BATLLE', rol: 'Reserva', año_nacimiento: 2011 },
    ],
  },
  {
    id: '10', equipo: 'C.N. MATARO', orden_salida: 10, puntuacion: 0,
    participantes: [
      { nombre: 'MAR ALONSO COLOME', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'ANNE ARBOS BERRADE', rol: 'Titular', año_nacimiento: 2013 },
      { nombre: 'MAX BORRELL GONZALEZ', rol: 'Titular', año_nacimiento: 2013 },
      { nombre: 'MARTINA DE LA PLAZA JIMENEZ', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'LUA GONZALEZ MASAFRETS', rol: 'Titular', año_nacimiento: 2013 },
      { nombre: 'IRENE ORTIZ GARCIA', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'ALICE QUADRADA PENNELLIER', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'JUDITH RODRIGUEZ BASSAS', rol: 'Titular', año_nacimiento: 2012 },
    ],
  },
  {
    id: '11', equipo: 'C. N. ART. GALAICO PONTEVEDRA', orden_salida: 11, puntuacion: 0,
    participantes: [
      { nombre: 'SOFIA ABAL POSSE', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'DEVA ALONSO PEREIRO', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'MARIÑA CALVO FERNANDEZ', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'IVAN GONZALEZ COSTAS', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'MAIRA PARIENTE PARADA', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'LUANA PARIENTE PARADA', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'CAROLINA PAZOS TABERNERO', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'LUCIA RIVEIRO VAZQUEZ', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'IRIA RIVEIRO VAZQUEZ', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'MARTA GUIANCE PARADA', rol: 'Reserva', año_nacimiento: 2013 },
    ],
  },
  {
    id: '12', equipo: 'REFRICA GROUP C.N. GRANOLLERS', orden_salida: 12, puntuacion: 0,
    participantes: [
      { nombre: 'MAR BORDAS VALENCIA', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'IRENE CARRILLO MARTINEZ', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'CARLOTA FERNANDEZ GANDUXE', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'ABRIL FIGUEREDO GARCIA', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'ARAN JIMENEZ PALMA', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'MARIONA NAVAS JULIAN', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'MARLA PEREZ MERINO', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'VALERIA REDON JIMENEZ', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'ELSA SERRANO EGEA', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'EMMA SOBRINO TALLET', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'EMMA VILAR CARRERAS', rol: 'Reserva', año_nacimiento: 2012 },
    ],
  },
  {
    id: '13', equipo: 'C.N. SABADELL', orden_salida: 13, puntuacion: 0,
    participantes: [
      { nombre: 'ERI AOKI ASCANIO', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'ABRIL CABALLERO GARCIA', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'ARLET CAMPO ALCAÑIZ', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'MARTINA GALLARDO MASA', rol: 'Titular', año_nacimiento: 2013 },
      { nombre: 'AINA GIL GRANDE', rol: 'Titular', año_nacimiento: 2013 },
      { nombre: 'JUDIT GROS MOLINA', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'AINA GUINART ASCON', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'JULIA MARTI TOLDRA', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'MIKEL MERCEDES SEBASTIAN', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'DANIELA RAMIREZ CABRERA', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'YELYZABETA IVANOVA', rol: 'Reserva', año_nacimiento: 2012 },
    ],
  },
  {
    id: '14', equipo: 'C.N. METROPOLE', orden_salida: 14, puntuacion: 0,
    participantes: [
      { nombre: 'VALERIA AVERSANO LUIS', rol: 'Titular', año_nacimiento: 2013 },
      { nombre: 'MARTA CUARENTAL CABRERA', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'MARIA GILES MORELL', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'GABRIELA GONZALEZ BARRAGAN', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'PAULA GONZALEZ MARTIN', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'EMMA GUBBIOLI BILBAO', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'VALERIA HERNANDEZ HERNANDEZ', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'MATILDA MARRERO RIVERO', rol: 'Titular', año_nacimiento: 2013 },
      { nombre: 'LOURDES SANTIAGO BELLO', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'LAIA SANTIAGO DIAZ', rol: 'Titular', año_nacimiento: 2012 },
    ],
  },
  {
    id: '15', equipo: 'C.N. SINCRONIZADA OURENSE', orden_salida: 15, puntuacion: 0,
    participantes: [
      { nombre: 'ENARA ALVAREZ QUINTELA', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'IRENE ALVAREZ SANTOS', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'CANDELA CORROCHANO PEREIRA', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'ADELAIDA ROSARIO GOMEZ PEREIRA', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'VALERIA MACIAS HERRERO', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'SARA MOREIRAS NOGUEIRAS', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'MATILDA NIEVES VAZQUEZ', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'SAUL RODRIGUEZ ANCA', rol: 'Titular', año_nacimiento: 2013 },
      { nombre: 'MARIA SANTOS OUTEIRIÑO', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'LAIA VILACHA SERRA', rol: 'Titular', año_nacimiento: 2011 },
    ],
  },
  {
    id: '16', equipo: 'C.N. KALLIPOLIS', orden_salida: 16, puntuacion: 0,
    participantes: [
      { nombre: 'BERTA CLAVIJO MOYSSET', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'MARIONA GAYAN OLLER', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'LOLA GONZALEZ-ALSINA ROCASALBAS', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'ARAN LLUCIA GUIU', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'CARLA LOPEZ TUSET', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'SOPHIA MILIANI VELASQUEZ', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'SOFIA REY ROBERT', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'MARIA RUBIO PENELLA', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'ELENA SCAROLA', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'MARIA TORNE GONZALEZ', rol: 'Titular', año_nacimiento: 2011 },
    ],
  },
  {
    id: '17', equipo: 'CIRCULO MERCANTIL', orden_salida: 17, puntuacion: 0,
    participantes: [
      { nombre: 'GUINEA EMBALO GARCIA', rol: 'Titular', año_nacimiento: 2013 },
      { nombre: 'LOLA FERNANDEZ PRIETO', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'CARMEN GARCIA SALMORAL', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'JULIA LEON DOMINGUEZ', rol: 'Titular', año_nacimiento: 2013 },
      { nombre: 'SOFIA MARTIN ACOSTA', rol: 'Titular', año_nacimiento: 2013 },
      { nombre: 'INES VICTORIA MARTINEZ MASEGOSA', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'MALENA MEDINA MONTERO', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'MARA PIÑERO HERRERA', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'ELENA ROMERO GUITARD', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'INES VARGAS ARCE', rol: 'Titular', año_nacimiento: 2013 },
    ],
  },
  {
    id: '18', equipo: 'CLUB DEPORTIVO PINGÜINOS DE ARRECIFE', orden_salida: 18, puntuacion: 0,
    participantes: [
      { nombre: 'CHLOE ABLANEDO AMEZCUA', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'ADRIANA DELGADO COSTA', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'PAU HERNANDEZ ALMENARA', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'VEGA JIMENEZ MANZANO', rol: 'Titular', año_nacimiento: 2013 },
      { nombre: 'NAHOMY SOFIA LOPEZ GOMEZ', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'CARLA MARTIN PERERA', rol: 'Titular', año_nacimiento: 2013 },
      { nombre: 'MIGUEL MARTINEZ MORALES', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'SOFIA MENDEZ LOPEZ-SOCAS', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'LUCIA PEREZ FLEITAS', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'MAR SAAVEDRA GONZALEZ', rol: 'Titular', año_nacimiento: 2013 },
      { nombre: 'LUCIO JOSE BETHENCOURT ROMERO', rol: 'Reserva', año_nacimiento: 2012 },
    ],
  },
  {
    id: '19', equipo: 'CLUB MALLORCA SINCRO', orden_salida: 19, puntuacion: 0,
    participantes: [
      { nombre: 'CLARA BERMEJO SANSO', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'JULIETA GARCIA BALAGUER', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'CARLOTTA GOBBI SBERT', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'LUCIA GOMILA FERNANDEZ', rol: 'Titular', año_nacimiento: 2013 },
      { nombre: 'MARTA MIRALLES GILI', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'MARTA PARIS RAMON', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'AINA PORRAS TORRES', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'MARTA ROUX SALOM', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'MARIA VERGER SALVADOR', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'JULIA VILLALONGA LLUCH', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'AMELIE MARIE BALAGUER VASSEN', rol: 'Reserva', año_nacimiento: 2013 },
      { nombre: 'NAGORE SEQUEIRA GARROTE', rol: 'Reserva', año_nacimiento: 2013 },
    ],
  },
  {
    id: '20', equipo: 'C.N.S. FABIONELLI', orden_salida: 20, puntuacion: 0,
    participantes: [
      { nombre: 'AYLA AHUFINGER PALOMO', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'MARIA ARRANZ GARRIDO', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'SARA MARTINEZ DE JULIAN', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'VALERIA MORAN CORREA', rol: 'Titular', año_nacimiento: 2013 },
      { nombre: 'ADRIANA PEREZ CAMAÑO', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'SOFIA POLO MORENO', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'ELA RUIZ GARCIA', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'HELENA SAN JOSE SAN MIGUEL', rol: 'Titular', año_nacimiento: 2012 },
      { nombre: 'PAULA SANCHEZ DOMINGUEZ', rol: 'Titular', año_nacimiento: 2011 },
      { nombre: 'LUNA SANZ SANCHEZ', rol: 'Titular', año_nacimiento: 2011 },
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
  const teamsCol = collection(db, 'competitions', 'infantil-combo', 'teams')
  await clearCollection(teamsCol)

  console.log('Seeding 20 teams for Infantil · Combo...')
  for (const team of teams) {
    const { id, ...data } = team
    await setDoc(doc(db, 'competitions', 'infantil-combo', 'teams', id), data)
    console.log(`  ✓ ${String(data.orden_salida).padStart(2, '0')}. ${data.equipo}`)
  }

  console.log('\nDone — 20 teams seeded.')
  process.exit(0)
}

seed().catch(err => { console.error(err); process.exit(1) })
