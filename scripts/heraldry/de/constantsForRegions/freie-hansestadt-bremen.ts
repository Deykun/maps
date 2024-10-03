import { UserScriptDivisionData } from '../../../../src/topic/Heraldry/types';

export const urls: {
  unitBySource: {
    [source: string]: UserScriptDivisionData[],
  },
} = {
  unitBySource: {},
};

urls.unitBySource['https://de.wikipedia.org/wiki/Liste_der_Wappen_in_Bremen'] = [
  {
      locationName: '',
      locationUrl: '',
      thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Deutschland_Lage_von_Bremen.svg/89px-Deutschland_Lage_von_Bremen.svg.png',
      description: 'Karte Bremen, Deutschland',
      type: ['land'],
      source: 'https://de.wikipedia.org/wiki/Liste_der_Wappen_in_Bremen',
      sourceTitle: 'Liste der Wappen in Bremen | Landeswappen',
    }, {
      locationName: '',
      locationUrl: '',
      thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Bremen_Wappen%28Klein%29.svg/105px-Bremen_Wappen%28Klein%29.svg.png',
      description: 'Bremer Schlüssel',
      type: ['land'],
      source: 'https://de.wikipedia.org/wiki/Liste_der_Wappen_in_Bremen',
      sourceTitle: 'Liste der Wappen in Bremen | Landeswappen',
    }, {
      locationName: 'Freie Hansestadt Bremen',
      locationUrl: 'https://de.wikipedia.org/wiki/Freie_Hansestadt_Bremen',
      thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Bremen_Wappen%28Mittel%29.svg/82px-Bremen_Wappen%28Mittel%29.svg.png',
      description: 'Mittleres Landeswappen Freie Hansestadt Bremen',
      type: ['city','land'],
      source: 'https://de.wikipedia.org/wiki/Liste_der_Wappen_in_Bremen',
      sourceTitle: 'Liste der Wappen in Bremen | Landeswappen',
    }, {
      locationName: 'Freie Hansestadt Bremen',
      locationUrl: 'https://de.wikipedia.org/wiki/Freie_Hansestadt_Bremen',
      thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Bremen_greater_coat_of_arms.svg/120px-Bremen_greater_coat_of_arms.svg.png',
      description: 'Großes Landeswappen Freie Hansestadt Bremen',
      type: ['city','land'],
      source: 'https://de.wikipedia.org/wiki/Liste_der_Wappen_in_Bremen',
      sourceTitle: 'Liste der Wappen in Bremen | Landeswappen',
    }
]; 
