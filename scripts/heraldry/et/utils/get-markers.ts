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


  if ([' ilvesefiguur'].some((item) => text.includes(item.toLowerCase()))) {
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
  
  

  if ([' kala', ' lõhepea', 'Avinurme valla vapp'].some((item) => text.includes(item.toLowerCase()))) {
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
      animals.push('aurochs');
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

  if ([' puu', ' mänd', ' tamme'].some((item) => text.includes(item.toLowerCase()))) {
    if (![
      'Martna valla vapp',
      'Rõngu valla vapp',
      'Tudulinna valla vapp',
      'Maardu vapp',
      'Hiiumaa valla vapp',
      'Maidla valla vapp',
      'Muhu valla vapp',
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

  if ([' aadlikroon', ' kroon', 'Oru valla vapp'].some((item) => text.includes(item.toLowerCase()))) {
    if (![
      'empty',
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
}