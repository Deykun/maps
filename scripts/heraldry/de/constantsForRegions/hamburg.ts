import { UserScriptDivisionData } from '../../../../src/topic/Heraldry/types';

export const urls: {
  unitBySource: {
    [source: string]: UserScriptDivisionData[],
  },
} = {
  unitBySource: {},
};

urls.unitBySource['https://de.wikipedia.org/wiki/Landeswappen_Hamburgs'] = [
    
]; 

urls.unitBySource['https://de.wikipedia.org/wiki/Liste_der_Wappen_in_Hamburg'] = [
  {
      locationName: 'Kleines Staatswappen',
      locationUrl: 'https://de.wikipedia.org/wiki/Landeswappen_Hamburgs#Kleines_Staatswappen',
      thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/DEU_Hamburg_COA.svg/86px-DEU_Hamburg_COA.svg.png',
      description: 'Kleines Staatswappen',
      type: ['land'],
      source: 'https://de.wikipedia.org/wiki/Liste_der_Wappen_in_Hamburg',
      sourceTitle: 'Landeswappen',
    }, {
      locationName: 'Mittleres Staatswappen',
      locationUrl: 'https://de.wikipedia.org/wiki/Landeswappen_Hamburgs#Gro%C3%9Fes_Staatswappen_und_Logo',
      thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Middle_Coat_of_arms_of_Hamburg.svg/116px-Middle_Coat_of_arms_of_Hamburg.svg.png',
      description: 'Mittleres Staatswappen',
      type: ['land'],
      source: 'https://de.wikipedia.org/wiki/Liste_der_Wappen_in_Hamburg',
      sourceTitle: 'Landeswappen',
    }, {
      locationName: 'Großes Staatswappen',
      locationUrl: 'https://de.wikipedia.org/wiki/Landeswappen_Hamburgs#Gro%C3%9Fes_Staatswappen_und_Logo',
      thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Wappen_der_Hamburgischen_B%C3%BCrgerschaft.svg/120px-Wappen_der_Hamburgischen_B%C3%BCrgerschaft.svg.png',
      description: 'Großes Staatswappen',
      type: ['land'],
      source: 'https://de.wikipedia.org/wiki/Liste_der_Wappen_in_Hamburg',
      sourceTitle: 'Landeswappen',
    }, {
      locationName: '',
      locationUrl: '',
      thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Wappen-Altona.svg/97px-Wappen-Altona.svg.png',
      description: 'Aktuelles Wappen bzw. Logo',
      type: ['formerBezirke'],
      source: 'https://de.wikipedia.org/wiki/Liste_der_Wappen_in_Hamburg',
      sourceTitle: 'Bezirke (auch historische)',
    }, {
      locationName: '',
      locationUrl: '',
      thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/DEU_Altona_COA.svg/105px-DEU_Altona_COA.svg.png',
      description: 'Wappen bis 1937',
      type: ['formerBezirke'],
      source: 'https://de.wikipedia.org/wiki/Liste_der_Wappen_in_Hamburg',
      sourceTitle: 'Bezirke (auch historische)',
    }, {
      locationName: '',
      locationUrl: '',
      thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Wappen_Hamburg-Altona.png/103px-Wappen_Hamburg-Altona.png',
      description: 'Frühere Variante',
      type: ['formerBezirke'],
      source: 'https://de.wikipedia.org/wiki/Liste_der_Wappen_in_Hamburg',
      sourceTitle: 'Bezirke (auch historische)',
    }, {
      locationName: '',
      locationUrl: '',
      thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Fensterbild_mit_Wappen_von_Hamburg_Altona.jpg/108px-Fensterbild_mit_Wappen_von_Hamburg_Altona.jpg',
      description: 'Wappen als Fensterbild',
      type: ['formerBezirke'],
      source: 'https://de.wikipedia.org/wiki/Liste_der_Wappen_in_Hamburg',
      sourceTitle: 'Bezirke (auch historische)',
    }
]; 
