import { getMarker, MarkerParams } from '../../utils/get-marker';

const animalsRules: MarkerParams[] = [{
  name: "bear",
  phrases: ['karhu'],
  exclude: ['Kymin vaakuna', 'Maksamaan vaakuna', 'Vöyri-Maksamaan vaakuna', 'Vöyrin vaakuna', 'Töysän vaakuna', 'Alavuden vaakuna', 'Nurmeksen vaakuna', 'Virtain vaakuna'],
}, {
  name: "beaver",
  phrases: ['majava'],
}, {
  name: "bird",
  phrases: ['leivonen', 'siivitetty', 'silkkiuikun', 'siivet', 'varis', 'naakka', 'soidinmetso', 'teeri', 'palokärki', 'hanhi', 'riekko', 'käki'],
  include: ['Haapajärven vaakuna', 'Kangasalan vaakuna', 'Mietoisten vaakuna', 'Mynämäen vaakuna'],
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
  name: "crayfish",
  phrases: ['rapuja', 'rapupitäjän'],
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
  include: ['Ruoveden vaakuna'],
  exclude: ['Oulunsalon vaakuna', 'Kiimingin vaakuna', 'Satakunnan vaakuna', 'Yli-Iin vaakuna', 'Kemijärven vaakuna', 'Vaalan vaakuna', 'Helsingin vaakuna', 'Suomusjärven vaakuna', 'Hiittisten vaakuna', 'Iniön vaakuna', 'Virolahden vaakuna', 'Sääksmäen vaakuna', 'Haapasaaren vaakuna', 'Haminan vaakuna', 'Kalannin vaakuna', 'Parikkalan vaakuna', 'Tuuloksen vaakuna', 'Vehmersalmen vaakuna', 'Eräjärven vaakuna', 'Tammisaaren vaakuna', 'Vehkalahden vaakuna', 'Raution vaakuna', 'Kalajoen vaakuna', 'Kemijärven maalaiskunnan', 'Himangan vaakuna', 'Kemijärven maalaiskunnan vaakuna', 'Lokalahden vaakuna', 'Itä-Uudenmaan vaakuna', 'Kestilän vaakuna', 'Pulkkilan vaakuna', 'Piippolan vaakuna', 'Rantsilan vaakuna', 'Ruukin vaakuna', 'Siikalatvan vaakuna', 'Itä-Uudenmaan vaakuna', 'Paavolan vaakuna'],
}, {
  name: 'salmon',
  phrases: ['lohi'],
  exclude: ['Himangan vaakuna', 'Lohjan kunnan vaakuna', 'Lohjan vaakuna', 'Vehmaan vaakuna', 'Mikkelin vaakuna', 'Helsingin vaakuna', 'Kalajoen vaakuna', 'Itä-Uudenmaan vaakuna'],
}];

const itemsRules: MarkerParams[] = [{
  name: "anchor",
  phrases: ['-ankkuri', 'ankkuri'],
  exclude: ['Kajaanin vaakuna', 'Karstulan vaakuna'],
}, {
  name: 'earOfGrain',
  phrases: ['tähkää', 'tähkä', 'lyhde', 'röyhy'],
  exclude: ['Savonlinnan vaakuna'],
}, {
  name: "key",
  phrases: ['avain', 'avaimet'],
  exclude: ['Kouvolan vaakuna'],
}, {
  name: "crown",
  phrases: ['kruunu', 'kruunata'],
  include: ['Loviisan vaakuna', 'Raaseporin vaakuna', 'Turun vaakuna', 'Jomalan vaakuna', 'Uudenkaarlepyyn vaakuna', 'Loviisan vaakuna', 'Savonlinnan vaakuna', 'Kristiinankaupungin vaakuna'],
  exclude: ['Porvoon maalaiskunnan vaakuna', 'Alavetelin vaakuna', 'Teerijärven vaakuna', 'Joensuun vaakuna', 'Etelä-Savon vaakuna', 'Hämeen vaakuna', 'Kanta-Hämeen vaakuna', 'Pohjanmaan historiallisen maakunnan vaakuna', 'Pohjois-Pohjanmaan vaakuna', 'Pohjois-Savon vaakuna', 'Päijät-Hämeen vaakuna', 'Savon vaakuna', 'Uudenmaan vaakuna', 'Etelä-Pohjanmaan vaakuna'],
}, {
  name: "arrow",
  phrases: ['nuoli', 'jalkajousi', 'käsijousella', 'käsijousi', 'nuolikotelo'],
  exclude: ['Kokkolan vaakuna', 'Ilmajoen vaakuna'],
  include: ['Pieksämäen vaakuna', 'Jämsän vaakuna', 'Jämsänkosken vaakuna',]
}, {
  name: "boat",
  phrases: ['vene', 'veneitä', 'laiva', 'purjevene', 'lautta', 'lautat', 'tervavene', 'verkkovene', 'kaljaasilla', 'hansalaiva', 'tervahöyry', 'nuottavenettä', 'kirkkoveneillä'],
  include: ['Lauritsalan vaakuna', 'Eurajoen vaakuna', 'Merimaskun vaakuna', 'Ruoveden vaakuna'],
  exclude: ['Varkauden vaakuna', 'Paimion vaakuna', 'Merijärven vaakuna', 'Enonkosken vaakuna', 'Västanfjärdin vaakuna', 'Tammisaaren vaakuna'],
}, {
  name: "tree",
  phrases: ['puu', 'metsä', 'puita', 'haapa', 'kuusi', 'kuusta', 'oksaa', 'tamm', 'tammi', 'lehmuksen', 'honka', 'vaahtera', 'mänty', 'koivunverso', 'koivu', 'havupuun', 'kanto'],
  include: ['Savukosken vaakuna', 'Luumäen vaakuna'],
  exclude: ['Alahärmän vaakuna', 'Alastaron vaakuna', 'Askaisten vaakuna', 'Elimäen vaakuna', 'Enon vaakuna', 'Eräjärven vaakuna', 'Haapasaaren vaakuna', 'Himangan vaakuna', 'Hinnerjoen vaakuna', 'Honkajoen vaakuna', 'Ikaalisten maalaiskunnan vaakuna', 'Jaalan vaakuna', 'Joutsenon vaakuna', 'Juankosken vaakuna', 'Jurvan vaakuna', 'Jämsänkosken vaakuna', 'Karjaan vaakuna', 'Karkun vaakuna', 'Karungin vaakuna', 'Kerimäen vaakuna', 'Kestilän vaakuna', 'Kiikalan vaakuna', 'Kiimingin vaakuna', 'Koivulahden vaakuna', 'Kuhmalahden vaakuna', 'Lauritsalan vaakuna', 'Lavian vaakuna', 'Loimaan kunnan vaakuna', 'Luopioisten vaakuna', 'Luvian vaakuna', 'Muurlan vaakuna', 'Muuruveden vaakuna', 'Pernajan vaakuna', 'Petolahden vaakuna', 'Raippaluodon vaakuna', 'Rantsilan vaakuna', 'Saaren vaakuna', 'Sulvan vaakuna', 'Suodenniemen vaakuna', 'Tarvasjoen vaakuna', 'Tenholan vaakuna', 'Tuupovaaran vaakuna', 'Tyrvännön vaakuna', 'Uukuniemen vaakuna', 'Viljakkalan vaakuna', 'Värtsilän vaakuna', 'Yli-Iin vaakuna', 'Eckerön vaakuna', 'Enontekiön vaakuna', 'Eurajoen vaakuna', 'Getan vaakuna', 'Haapajärven vaakuna', 'Halsuan vaakuna', 'Hangon vaakuna', 'Helsingin vaakuna', 'Hollolan vaakuna', 'Huittisten vaakuna', 'Hyrynsalmen vaakuna', 'Hämeenkyrön vaakuna', 'Ikaalisten vaakuna', 'Ilmajoen vaakuna', 'Inkoon vaakuna', 'Isojoen vaakuna', 'Joensuun vaakuna', 'Joensuun vaakuna', 'Kaarinan vaakuna', 'Kalajoen vaakuna', 'Kangasniemen vaakuna', 'Kannuksen vaakuna', 'Kauhavan vaakuna', 'Keminmaan vaakuna', 'Keravan vaakuna', 'Kihniön vaakuna', 'Kirkkonummen vaakuna', 'Konneveden vaakuna', 'Kontiolahden vaakuna', 'Tl. Kosken vaakuna', 'Kouvolan vaakuna', 'Kurikan vaakuna', 'Laitilan vaakuna', 'Lapinlahden vaakuna', 'Lappeenrannan vaakuna', 'Lestijärven vaakuna', 'Loimaan vaakuna', 'Loviisan vaakuna', 'Maskun vaakuna', 'Mynämäen vaakuna', 'Muonion vaakuna', 'Mustasaaren vaakuna', 'Nivalan vaakuna', 'Pelkosenniemen vaakuna', 'Pellon vaakuna', 'Pielaveden vaakuna', 'Pornaisten vaakuna', 'Posion vaakuna', 'Puumalan vaakuna', 'Pyhäjärven vaakuna', 'Pyhärannan vaakuna', 'Pälkäneen vaakuna', 'Raaseporin vaakuna', 'Ranuan vaakuna', 'Rautalammin vaakuna', 'Rautavaaran vaakuna', 'Rautjärven vaakuna', 'Saarijärven vaakuna', 'Sallan vaakuna', 'Sastamalan vaakuna', 'Sauvon vaakuna', 'Siikalatvan vaakuna', 'Sotkamon vaakuna', 'Tampereen vaakuna', 'Tohmajärven vaakuna', 'Turun vaakuna', 'Tuusniemen vaakuna', 'Vaalan vaakuna', 'Varkauden vaakuna', 'Vesannon vaakuna', 'Vetelin vaakuna', 'Virtain vaakuna', 'Ylöjärven vaakuna', 'Ahvenanmaan vaakuna', 'Hämeen vaakuna', 'Kanta-Hämeen vaakuna', 'Lapin vaakuna', 'Pohjanmaan historiallisen maakunnan vaakuna', 'Pohjois-Pohjanmaan vaakuna', 'Satakunnan vaakuna', 'Uudenmaan vaakuna', 'Etelä-Pohjanmaan vaakuna', 'Jämsän vaakuna'],
}, {
  name: 'shell',
  phrases: ['simpukat'],
}, {
  name: 'lily',
  phrases: ['lilja'],
}, {
  name: 'rose',
  phrases: ['ruusut'],
}, {
  name: 'flower',
  phrases: ['kukka', 'perunankukka', 'lumpeenkukka', 'valkovuokkojen', 'kissankellot'],
  exclude: ['Sotkamon vaakuna', 'Iisalmen vaakuna', 'Kouvolan vaakuna', 'Salon vaakuna']
}, {
  name: 'axeSaw',
  phrases: ['kirvestä', 'kirves', 'saha', 'justeerisaha'],
  exclude: ['Lieksan vaakuna', 'Keski-Pohjanmaan vaakuna', 'Satakunnan vaakuna', 'Nousiaisten vaakuna', 'Uudenmaan vaakuna', 'Ahvenanmaan vaakuna'],
}, {
  name: 'walls',
  phrases: ['muuri', 'tornia', 'linna', 'kivisilta', 'silta', 'linnoitukseen', 'linnoitus', 'harjamuuri', 'tornilla', 'kirkontorni'],
  exclude: ['Keski-Pohjanmaan vaakuna', 'Mustasaaren vaakuna', 'Kurikan vaakuna', 'Karvian vaakuna', 'Teiskon vaakuna', 'Ristiinan vaakuna', 'Parikkalan vaakuna', 'Kanta-Hämeen vaakuna', 'Hämeen vaakuna', 'Tl. Kosken vaakuna', 'Porvoon vaakuna', 'Askolan vaakuna', 'Eurajoen vaakuna', 'Luvian vaakuna']
}, {
  name: 'arm',
  include: ['Etelä-Karjalan vaakuna', 'Pohjois-Karjalan vaakuna', 'Karjalan historiallisen maakunnan vaakuna', 'Nuijamaan vaakuna', 'Karunan vaakuna', 'Anjalan vaakuna'],
}];

export const getMarkers = ({
  text: rawText = '',
  title,
}: {
  text: string,
  title: string,
}) => {
  let animals: string[] = [];
  let items: string[] = [];

  const text = rawText.toLowerCase() || '';

  const data = { title, text };

  animalsRules.forEach(({ name, phrases, exclude = [], include = [] }) => {
    animals = getMarker(animals, name, data, {
      phrases,
      exclude,
      include,
    });
  });

  itemsRules.forEach(({ name, phrases, exclude = [], include = [] }) => {
    items = getMarker(items, name, data, {
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