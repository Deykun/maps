import { getMarker } from '../../utils/get-marker';

const animalRules: {
  name: string,
  phrases: string[],
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
  name: "wolf",
  phrases: ['susi', 'susiksi'],
}, {
  name: "wolverine",
  phrases: ['ahma'],
}, {
  name: "seal",
  phrases: ['hylje'],
}, {
  name: "mermaid",
  phrases: ['merenneito'],
  include: ['Vöyrin vaakuna', 'Vöyri-Maksamaan vaakuna'],
  exclude: ['Lahden vaakuna'],
}, {
  name: "fish",
  phrases: ['kala', 'kalastaa', 'siika'],
  exclude: ['Kemijärven vaakuna', 'Vaalan vaakuna', 'Helsingin vaakuna', 'Suomusjärven vaakuna', 'Hiittisten vaakuna', 'Iniön vaakuna', 'Virolahden vaakuna', 'Sääksmäen vaakuna', 'Haapasaaren vaakuna', 'Haminan vaakuna', 'Kalannin vaakuna', 'Parikkalan vaakuna', 'Tuuloksen vaakuna', 'Vehmersalmen vaakuna', 'Eräjärven vaakuna', 'Tammisaaren vaakuna', 'Vehkalahden vaakuna', 'Raution vaakuna', 'Kalajoen vaakuna', 'Kemijärven maalaiskunnan', 'Himangan vaakuna', 'Kemijärven maalaiskunnan vaakuna', 'Lokalahden vaakuna', 'Itä-Uudenmaan vaakuna', 'Kestilän vaakuna', 'Pulkkilan vaakuna', 'Piippolan vaakuna', 'Rantsilan vaakuna', 'Ruukin vaakuna', 'Siikalatvan vaakuna', 'Itä-Uudenmaan vaakuna', 'Paavolan vaakuna'],
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