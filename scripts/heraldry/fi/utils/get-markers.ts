import { getMarker } from '../../utils/get-marker';

const animalRules: {
  name: string,
  phrases?: string[],
  exclude?: string[],
  include?: string[],
}[] = [{
  name: "bear",
  phrases: ['karhu'],
  exclude: ['Kymin vaakuna', 'Maksamaan vaakuna', 'Vöyri-Maksamaan vaakuna', 'Vöyrin vaakuna', 'Töysän vaakuna', 'Alavuden vaakuna', 'Nurmeksen vaakuna', 'Virtain vaakuna'],
}, {
  name: "beaver",
  phrases: ['majava'],
}, {
  name: "bird",
  phrases: ['leivonen', 'siivitetty', 'silkkiuikun', 'siivet', 'varis', 'naakka', 'soidinmetso', 'teeri', 'palokärki', 'hanhi', 'riekko', 'käki'],
  include: ['Haapajärven vaakuna', 'Kangasalan vaakuna'],
  exclude: [ 'Sulvan vaakuna', 'Kemijärven vaakuna', 'Kemijärven maalaiskunnan vaakuna', 'Teerijärven vaakuna', 'Kruunupyyn vaakuna', 'Savonlinnan vaakuna', 'Päijät-Hämeen vaakuna'],
}, {
  name: "eagle",
  phrases: ['kotkanpää'],
}, {
  name: "bullBison",
  phrases: ['vetohärkäparillaan', 'härkä'],
  include: ['Joroisten vaakuna'],
}, {
  name: "ram",
  phrases: ['oinaan'],
}, {
  name: "ant",
  phrases: ['muurahainen'],
}, {
  name: "wolf",
  phrases: ['susi', 'susiksi'],
}, {
  name: "wolverine",
  phrases: ['ahma'],
}, {
  name: "lion",
  phrases: ['leijona'],
  exclude: ['Helsingin vaakuna', 'Maarianhaminan vaakuna'],
}, {
  name: "lynx",
  phrases: ['ilves', 'ilveksen'],
  include: ['Kanta-Hämeen vaakuna'],
}, {
  name: 'squirrel',
  phrases: ['orava'],
  exclude: ['Kiihtelysvaaran vaakuna', 'Maksamaan vaakuna', 'Vöyri-Maksamaan vaakuna', 'Vöyrin vaakuna', 'Oravaisten vaakuna']
}, {
  name: "moose",
  phrases: ['hirvi', 'hirvenpää'],
  exclude: ['Kurikan vaakuna'],
}, {
  name: "reindeer",
  phrases: ['poro'],
}, {
  name: "goat",
  phrases: ['vuohi', 'pukki'],
}, {
  name: "duck",
  phrases: ['sorsa'],
}, {
  name: "rooster",
  phrases: ['kukko'],
}, {
  name: "swan",
  phrases: ['joutsen', 'joutsenet'],
  exclude: ['Salon vaakuna', 'Halikon vaakuna'],
}, {
  name: "raven",
  phrases: ['korppi'],
}, {
  name: "gull",
  phrases: ['lokki'],
}, {
  name: "crane",
  phrases: ['kurki'],
}, {
  name: "butterfly",
  phrases: ['perhonen'],
}, {
  name: "boar",
  phrases: ['karjunpää'],
}, {  
  name: "goat",
  phrases: ['kauris'],
}, {  
  name: "horse",
  phrases: ['hevonen', 'ratsuhevonen', 'hevosen', 'ori'],
  exclude: ['Längelmäen vaakuna', 'Espoon vaakuna', 'Eräjärven vaakuna', 'Artjärven vaakuna'],
}, {
  name: 'weasel',
  phrases: ['näätä', 'kärppä'],
}, {
  name: "seal",
  phrases: ['hylje'],
}, {
  name: "mermaid",
  phrases: ['merenneito'],
  include: ['Vöyrin vaakuna', 'Vöyri-Maksamaan vaakuna', 'Maksamaan vaakuna', 'Päijät-Hämeen vaakuna'],
  exclude: ['Lahden vaakuna'],
}, {
  name: "fish",
  phrases: ['kala', 'kalastaa', 'siika', 'kuha', 'hauki', 'muikkua'],
  exclude: ['Oulunsalon vaakuna', 'Kiimingin vaakuna', 'Satakunnan vaakuna', 'Yli-Iin vaakuna', 'Kemijärven vaakuna', 'Vaalan vaakuna', 'Helsingin vaakuna', 'Suomusjärven vaakuna', 'Hiittisten vaakuna', 'Iniön vaakuna', 'Virolahden vaakuna', 'Sääksmäen vaakuna', 'Haapasaaren vaakuna', 'Haminan vaakuna', 'Kalannin vaakuna', 'Parikkalan vaakuna', 'Tuuloksen vaakuna', 'Vehmersalmen vaakuna', 'Eräjärven vaakuna', 'Tammisaaren vaakuna', 'Vehkalahden vaakuna', 'Raution vaakuna', 'Kalajoen vaakuna', 'Kemijärven maalaiskunnan', 'Himangan vaakuna', 'Kemijärven maalaiskunnan vaakuna', 'Lokalahden vaakuna', 'Itä-Uudenmaan vaakuna', 'Kestilän vaakuna', 'Pulkkilan vaakuna', 'Piippolan vaakuna', 'Rantsilan vaakuna', 'Ruukin vaakuna', 'Siikalatvan vaakuna', 'Itä-Uudenmaan vaakuna', 'Paavolan vaakuna'],
}, {
  name: 'salmon',
  phrases: ['lohi'],
  exclude: ['Himangan vaakuna', 'Lohjan kunnan vaakuna', 'Lohjan vaakuna', 'Vehmaan vaakuna', 'Mikkelin vaakuna', 'Helsingin vaakuna', 'Kalajoen vaakuna', 'Itä-Uudenmaan vaakuna'],
}]

export const getMarkers = ({
  text: rawText = '',
  title,
}: {
  text: string,
  title: string,
}) => {
  let animals: string[] = [];
  const items: string[] = [];

  const text = rawText.toLowerCase() || '';

  const data = { title, text };

  animalRules.forEach(({ name, phrases, exclude = [], include = [] }) => {
    animals = getMarker(animals, name, data, {
      phrases,
      exclude,
      include,
    });
  });

  return {
    animals,
    items,
  }
}