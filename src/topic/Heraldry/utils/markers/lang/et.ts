export const getMarkers = ({
  text: rawText = '',
  title,
}: {
  text: string,
  title: string,
}) => {
  const animals: string[] = [];
  const items: string[] = [];

  const text = rawText.toLowerCase() || '';

  if ([' jäälind.', ' pääsuke.', 'Tähtvere valla vapp'].some((item) => text.includes(item.toLowerCase()))) {
    if (![
      'empty',
    ].includes(title)) {
      animals.push('bird');
    }
  }

  if ([' ronk.'].some((item) => text.includes(item.toLowerCase()))) {
    if (![
      'empty',
    ].includes(title)) {
      animals.push('raven');
    }
  }


  if ([' lynxefiguur'].some((item) => text.includes(item.toLowerCase()))) {
    if (![
      'empty',
    ].includes(title)) {
      animals.push('lynx');
    }
  }

  if ([' hane.', ' hanesulega'].some((item) => text.includes(item.toLowerCase()))) {
    if (![
      'empty',
    ].includes(title)) {
      animals.push('goose');
    }
  }

  if ([' kiil,'].some((item) => text.includes(item.toLowerCase()))) {
    if (![
      'empty',
    ].includes(title)) {
      animals.push('dragonfly');
    }
  }

  if ([' kajakas'].some((item) => text.includes(item.toLowerCase()))) {
    if (![
      'empty',
    ].includes(title)) {
      animals.push('gull');
    }
  }
  
  

  if ([' kala', 'Avinurme valla vapp'].some((item) => text.includes(item.toLowerCase()))) {
    if (![
      'Lohusuu valla vapp',
      'Salme valla vapp',
      'Tõstamaa valla vapp',
      'Lüganuse valla vapp',
      'Kanepi valla vapp',
      'Loksa vapp',
    ].includes(title)) {
      animals.push('fish');
    }
  }

  if ([' lõhepea'].some((item) => text.includes(item.toLowerCase()))) {
    if (![
      'empty',
    ].includes(title)) {
      animals.push('salmon');
    }
  }
  
  if ([' hüljes'].some((item) => text.includes(item.toLowerCase()))) {
    if (![
      'empty',
    ].includes(title)) {
      animals.push('seal');
    }
  }

  if ([' toonekurg'].some((item) => text.includes(item.toLowerCase()))) {
    if (![
      'empty',
    ].includes(title)) {
      animals.push('stork');
    }
  }

  if ([' karupea', ' karu'].some((item) => text.includes(item.toLowerCase()))) {
    if (![
      'Karula valla vapp',
    ].includes(title)) {
      animals.push('bear');
    }
  }

  if ([' kimalast'].some((item) => text.includes(item.toLowerCase()))) {
    if (![
      'empty',
    ].includes(title)) {
      animals.push('bee');
    }
  }

  if ([' sipelgas'].some((item) => text.includes(item.toLowerCase()))) {
    if (![
      'empty',
    ].includes(title)) {
      animals.push('ant');
    }
  }

  if ([' orav'].some((item) => text.includes(item.toLowerCase()))) {
    if (![
      'Võru valla vapp',
    ].includes(title)) {
      animals.push('squirrel');
    }
  }

  if ([' sookurg', ' sookure', 'Kõlleste valla vapp'].some((item) => text.includes(item.toLowerCase()))) {
    if (![
      'Kuressaare valla vapp',
    ].includes(title)) {
      animals.push('crane');
    }
  }

  if ([' kobrast'].some((item) => text.includes(item.toLowerCase()))) {
    if (![
      'empty',
    ].includes(title)) {
      animals.push('beaver');
    }
  }

  if ([' lõvi'].some((item) => text.includes(item.toLowerCase()))) {
    if (![
      'empty',
    ].includes(title)) {
      animals.push('lion');
    }
  }

  if (['Põlva vapp'].some((item) => text.includes(item.toLowerCase()))) {
    if (![
      'empty',
    ].includes(title)) {
      animals.push('rooster');
    }
  }

  if ([' luik'].some((item) => text.includes(item.toLowerCase()))) {
    if (![
      'empty',
    ].includes(title)) {
      animals.push('swan');
    }
  }

  if ([' öökull'].some((item) => text.includes(item.toLowerCase()))) {
    if (![
      'empty',
    ].includes(title)) {
      animals.push('owl');
    }
  }

  if ([' metskits', ' hirv', 'Puka valla vapp'].some((item) => text.includes(item.toLowerCase()))) {
    if (![
      'empty',
    ].includes(title)) {
      animals.push('deer');
    }
  }

  if ([' koer'].some((item) => text.includes(item.toLowerCase()))) {
    if (![
      'empty',
    ].includes(title)) {
      animals.push('dog');
    }
  }

  if ([' vähk'].some((item) => text.includes(item.toLowerCase()))) {
    if (![
      'empty',
    ].includes(title)) {
      animals.push('crayfish');
    }
  }

  
  if ([' kull.'].some((item) => text.includes(item.toLowerCase()))) {
    if (![
      'empty',
    ].includes(title)) {
      animals.push('hawk');
    }
  }

  if ([' kotkas', ' kotkapea'].some((item) => text.includes(item.toLowerCase()))) {
    if (![
      'empty',
    ].includes(title)) {
      animals.push('eagle');
    }
  }

  if ([' hobuse '].some((item) => text.includes(item.toLowerCase()))) {
    if (![
      'empty'
    ].includes(title)) {
      animals.push('horse');
    }
  }

  if ([' põdrapea'].some((item) => text.includes(item.toLowerCase()))) {
    if (![
      'empty',
    ].includes(title)) {
      animals.push('moose');
    }
  }

  if ([' hunt'].some((item) => text.includes(item.toLowerCase()))) {
    if (![
      'empty',
    ].includes(title)) {
      animals.push('wolf');
    }
  }

  if ([' härjapea'].some((item) => text.includes(item.toLowerCase()))) {
    if (![
      'empty',
    ].includes(title)) {
      animals.push('ox');
    }
  }

  if ([' tarva '].some((item) => text.includes(item.toLowerCase()))) {
    if (![
      'empty',
    ].includes(title)) {
      animals.push('bullBison');
    }
  }


  if ([' liilia', ' linaõis'].some((item) => text.includes(item.toLowerCase()))) {
    if (![
      'empty',
    ].includes(title)) {
      items.push('lily');
    }
  }

  if ([' roos'].some((item) => text.includes(item.toLowerCase()))) {
    if (![
      'Kohtla-Nõmme valla vapp',
      'Kohtla-Nõmme vapp',
      'Narva vapp',
    ].includes(title)) {
      items.push('rose');
    }
  }

  if ([' õis', ' linaõit', ' nartsissiõit', ' rukkilill', ' rukkililleõis',
  'Lääne-Nigula valla vapp', 'Veriora valla vapp',
  'Jõgeva valla vapp', 'Ambla valla vapp', 'Saarepeedi valla vapp', 'Räpina vapp'].some((item) => text.includes(item.toLowerCase()))) {
    if (![
      'empty',
    ].includes(title)) {
      items.push('flower');
    }
  }

  if ([' laev', ' paat', ' purjekas', ' muinaslaev', ' kaljas'].some((item) => text.includes(item.toLowerCase()))) {
    if (![
      'Laeva valla vapp',
      'Mustvee vapp',
      'Viimsi valla vapp',
      'Kihnu valla vapp',
      'Tõstamaa valla vapp',
    ].includes(title)) {
      items.push('boat');
    }
  }

  if ([' võti'].some((item) => text.includes(item.toLowerCase()))) {
    if (![
      'empty',
    ].includes(title)) {
      items.push('key');
    }
  }

  if ([' kelluke', ' kirikukella', ' kellatorn', 'Võnnu valla vapp'].some((item) => text.includes(item.toLowerCase()))) {
    if (![
      'empty',
    ].includes(title)) {
      items.push('bell');
    }
  }

  if ([' ratas', ' rool', ' vankriratas', 'Kehra vapp'].some((item) => text.includes(item.toLowerCase()))) {
    if (![
      'empty',
    ].includes(title)) {
      items.push('wheel');
    }
  }


  if ([' loss', ' linnusetorn', ' torn', ' müüritud', 'Kõo valla vapp',
  'Tõlliste valla vapp', 'Vasalemma valla vapp', 'Häädemeeste valla vapp', 'Sindi vapp',
  'Märjamaa alevi vapp', 'Peipsiääre valla vapp'].some((item) => text.includes(item.toLowerCase()))) {
    if (![
      'Loodna valla vapp',
      'Kasepää valla vapp',
      'Kanepi valla vapp',
      'Rapla valla vapp',
    ].includes(title)) {
      items.push('walls');
    }
  }

  if ([
    ' puu', ' mänd', ' tamme', ' vapitüvi', ' kadakas', ' kuusk ',
    ' kuuske', ' kuusk,', ' männikäbi', ' metspähklit',
    'Palupera valla vapp', 'Kohtla-Nõmme valla vapp', 'Rägavere valla vapp',
    'Räpina valla vapp', 'Räpina vapp', 'Vändra vapp', 'Vändra valla vapp',
    'Türi vapp',
    'Püssi vapp'].some((item) => text.includes(item.toLowerCase()))) {
    if (![
      'Martna valla vapp',
      'Rõngu valla vapp',
      'Tudulinna valla vapp',
      'Maardu vapp',
      'Hiiumaa valla vapp',
      'Maidla valla vapp',
      'Muhu valla vapp',
      'Valgamaa vapp',
      'Audru valla vapp',
      'Rakvere valla vapp',
      'Varbla valla vapp',
      'Mikitamäe valla vapp',
      'Oisu valla vapp',
      'Ambla valla vapp',
      'Kernu valla vapp',
      'Kohtla valla vapp',
      'Kihelkonna valla vapp',
      'Laeva valla vapp',
      'Meeksi valla vapp',
      'Mäksa valla vapp',
      'Varstu valla vapp',
      'Võsu vapp',
      'Kuusalu valla vapp',
      'Luunja valla vapp',
      'Lümanda valla vapp',
    ].includes(title)) {
      items.push('tree');
    }
  }

  if ([' hobuseraud'].some((item) => text.includes(item.toLowerCase()))) {
    if (![
      'empty',
    ].includes(title)) {
      items.push('horseshoe');
    }
  }

  if ([' aadlikroon', ' kroon', 'Õru valla vapp'].some((item) => text.includes(item.toLowerCase()))) {
    if (![
      'Abja valla vapp',
      'Järva-Jaani valla vapp',
      'Rakke valla vapp',
      'Narva vapp',
      'Jõgeva valla vapp',
      'Risti valla vapp',
      'Taebla valla vapp',
      'Mulgi valla vapp',
      'Paistu valla vapp',
    ].includes(title)) {
      items.push('crown');
    }
  }

  if ([' mõõk.', ' mõõka.', ' mõõka ', ' mõõk ' , ' mõõga'].some((item) => text.includes(item.toLowerCase()))) {
    if (![
      'Valgamaa vapp',
    ].includes(title)) {
      items.push('sword');
    }
  }

  if ([' vasarat', ' haamer'].some((item) => text.includes(item.toLowerCase()))) {
    if (![
      'empty',
    ].includes(title)) {
      items.push('hammer');
    }
  }

  
  if ([' viljapea', 'Luunja valla vapp', 'Pärsti valla vapp', 'Õru valla vapp'].some((item) => text.includes(item.toLowerCase()))) {
    if (![
      'Põltsamaa vapp',
    ].includes(title)) {
      items.push('earOfGrain');
    }
  }

  if ([' ankur', 'Maardu vapp'].some((item) => text.includes(item.toLowerCase()))) {
    if (![
      'empty',
    ].includes(title)) {
      items.push('anchor');
    }
  }

  if ([' rist ', ' krutsifiks', ' rõngasrist', ' pügalrist', ' harkrist', 'Kõrgessaare valla vapp', 'Kadrina valla vapp', 'Viru-Nigula valla vapp'].some((item) => text.includes(item.toLowerCase()))) {
    if (![
      'Ambla valla vapp',
      'Are valla vapp',
      'Peipsiääre valla vapp',
      'Türi valla vapp',
      'Kehtna valla vapp',
      'Harku valla vapp',
      'Kõo valla vapp',
    ].includes(title)) {
      items.push('cross');
    }
  }
  
  if ([' tuletorn', ' majakas'].some((item) => text.includes(item.toLowerCase()))) {
    if (![
      'empty',
    ].includes(title)) {
      items.push('lighthouse');
    }
  }

  if ([
    'Valga vapp',
  ].some((item) => text.includes(item.toLowerCase()))) {
    if (![
      'empty',
    ].includes(title)) {
      items.push('arm');
    }
  }

  return {
    animals,
    items,
  }
};
