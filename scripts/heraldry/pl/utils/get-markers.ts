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

  if ([
    'Herb Wschowy',
    'Herb gminy Zatory',
    'Herb Strzeleczek',
    'Herb gminy Milejewo',
    'Herb gminy Kołobrzeg',
    'Herb gminy Zbrosławice',
    'Herb Grybowa',
    'Herb Muszyny',
    'Herb Wieliczki',
    'Herb Józefowa (powiat otwocki)',
    'Herb Tarczyna',
    'Herb Korfantowa',
    'Herb Leska', // there is an alternative version with animals
    'Herb Moniek',
    'Herb Gdańska',
    'Herb Imielina',
    'Herb Mikołowa',
    'Herb Ogrodzieńca',
    'Herb Radoszyc',
    'Herb Korsz',
    'Herb Wielbarka',
    'Herb Kościana',
    'Herb Tuczna',
    'Herb Węgorzyna',
    'Herb gminy Abramów',
    'Herb Barcina',
    'Herb gminy Grębocice',
    'Herb gminy Malczyce',
    'Herb gminy Radwanice',
    'Herb gminy Łomazy',
    'Herb gminy Werbkowice',
    'Herb gminy Markowa',
    'Herb gminy Rutki',
    'Herb gminy Janów (powiat częstochowski)',
    'Herb gminy Brodnica (powiat śremski)',
    'Herb Siechnic',
    'Herb Wałbrzycha',
    'Herb Świeradowa-Zdroju',
    'Herb gminy Ostrowice',
    'Herb Jędrzejowa',
    'Herb Goleniowa',
    'Herb gminy Branice',
    'Herb Nysy',
    'Herb Piekar Śląskich',
    'Herb gminy Bieliny',
    'Herb gminy Osie',
    'Herb Bobowej',
    'Herb gminy Chorkówka',
    'Herb Cybinki',
    'Herb Szczekocin',
    'Herb Janowa Lubelskiego',
    'Herb Żychlina',
    'Herb Zatora',
    'Herb Jastrzębia',
    'Herb Ustronia',
    'Herb Witkowa',
    'Herb Zabrza',
    'Herb Łazisk Górnych',
    'Herb Starachowic',
    'Herb Drzewicy',
    'Herb gminy Domaniewice',
    'Herb Sobótki',
  ].includes(title)) {
    // Doesn't have them
  } else {
    const orzel = ['orzeł', 'orła', 'orłem', 'orłów', ' orle ', ' orły ', ' godła polski', 'herb powiatu radomskiego', 'herb powiatu żyrardowskiego'];
    const orzelFilter = [
      'Herb Trzemeszna',
      'Herb Starego Sącza',
      'Herb powiatu grajewskiego',
      'Herb powiatu pyrzyckiego',
      'Herb powiatu stargardzkiego',
    ]; 

    if (orzel.some((animal) => text.includes(animal))) {
      if (![
        ...orzelFilter,
        'Herb gminy Baranowo',
        'Herb Zabłudowa',
        'Herb Gdyni',
        'Herb Mirosław',
        'Herb Piwnicznej-Zdroju',
        'Herb Pieszy',
        'Herb gminy Jastków',
        'Herb Słubic',
        'Herb Siedlec',
        'Herb Kowar',
        'Herb Staszowa',
        'Herb Mieszkowic',
        'Herb gminy Białowieża',
        'Herb Kamieńca Ząbkowickiego',
        'Herb gminy Golub-Dobrzyń',
        'Herb gminy Baranów (powiat grodziski)',
        'Herb gminy Bulkowo',
        'Herb gminy Kamiennik',
        'Herb gminy Węgierska Górka',
        'Herb gminy Skulsk',
        'Herb Pieszyc',
        'Herb Polkowic',
        'Herb Jasienia',
        'Herb Aleksandrowa Łódzkiego',
        'Herb Bochni',
        'Herb Olkusza',
        'Herb Wolbromia',
        'Herb Sierpca',
        'Herb Sochaczewa',
        'Herb Miastka',
        'Herb Rydułtów',
        'Herb Wojkowic',
        'Herb Kielc',
        'Herb Mirosławca',
        'Herb powiatu strzelecko-drezdeneckiego',
        'Herb powiatu pajęczańskiego',
        'Herb powiatu brzeskiego (małopolskiego)',
      ].includes(title)) {
        animals.push('eagle');
      }
    }

    if (['sokół', 'sokoła'].some((animal) => text.includes(animal))) {
      if (![
        'Herb Sokółki',
      ].includes(title)) {
        animals.push('falcon');
      }
    }

    if (['czapla', 'czaple', 'czaplę', ' czapli '].some((animal) => text.includes(animal))) {
      if (![
        'empty',
      ].includes(title)) {
        animals.push('heron');
      }
    }

    if (['żurw', 'żurawia', 'żurawie'].some((animal) => text.includes(animal))) {
      if (![
        'Herb gminy Srokowo',
      ].includes(title)) {
        animals.push('crane');
      }
    }

    if ([' kruk ', ' kruka '].some((animal) => text.includes(animal))) {
      if (![
        'Herb Częstochowy'
      ].includes(title)) {
        animals.push('raven');
      }
    }

    if (['jastrzą', 'jastrzębia'].some((animal) => text.includes(animal))) {
        animals.push('hawk');
    }

    if ([' sowę', ' sowa'].some((animal) => text.includes(animal))) {
        animals.push('owl');
    }

    if ([' sępie '].some((animal) => text.includes(animal))) {
        animals.push('vulture');
    }

    if ([' pelikan'].some((animal) => text.includes(animal))) {
      if (![
        'Herb Kisielic',
      ].includes(title)) {
        animals.push('pelican');
      }
    }

    if ([' bocian'].some((animal) => text.includes(animal))) {
      if (![
        'Herb Gdyni',
        'Herb Drawna',
        'Herb gminy Drużbice',
        'Herb Makowa Mazowieckiego',
      ].includes(title)) {
        animals.push('stork');
      }
    }

    if ([' gęsią ', 'gęś', ' gęsie'].some((animal) => text.includes(animal))) {
        animals.push('goose');
    }
      
    if ([' gołębie', 'gołębia', ' gołąb'].some((animal) => text.includes(animal))) {
        animals.push('pigeon');
    }

    if ([' łabęd'].some((animal) => text.includes(animal))) {
      if (![
        'Herb Drawna',
      ].includes(title)) {
        animals.push('swan');
      }
    }

    if (['kogut'].some((animal) => text.includes(animal))) {
        animals.push('rooster');
    }

    if (animals.length > 0 || [...orzel, 'ptak', 'ptakiem', ' czyżyka', 'cietrzewia', 'ślepowron', ' szpak ', ' pióro', 'kormorana', ' czajkę ', 'kaczory', ' mewę', ' wrony,', 'krogulcem', ' puszczyk ', ' kraskę'].some((animal) => text.includes(animal))) {
      if (![
        ...orzelFilter,
        'Herb Zabłudowa',
        'Herb Gdyni',
        'Herb gminy Srokowo',
        'Herb Mirosław',
        'Herb Piwnicznej-Zdroju',
        'Herb Pieszy',
        'Herb gminy Jastków',
        'Herb Drawna',
        'Herb Siedlec',
        'Herb Kowar',
        'Herb Warszawy',
        'Herb Tczewa',
        'Herb Staszowa',
        'Herb Mieszkowic',
        'Herb gminy Białowieża',
        'Herb Makowa Mazowieckiego',
        'Herb Kamieńca Ząbkowickiego',
        'Herb gminy Golub-Dobrzyń',
        'Herb gminy Baranów (powiat grodziski)',
        'Herb gminy Bulkowo',
        'Herb gminy Kamiennik',
        'Herb gminy Węgierska Górka',
        'Herb gminy Skulsk',
        'Herb Pieszyc',
        'Herb Polkowic',
        'Herb Jasienia',
        'Herb Aleksandrowa Łódzkiego',
        'Herb Bochni',
        'Herb Olkusza',
        'Herb Wolbromia',
        'Herb Sierpca',
        'Herb Sochaczewa',
        'Herb Miastka',
        'Herb Rydułtów',
        'Herb Wojkowic',
        'Herb Kielc',
        'Herb Mirosławca',
        'Herb powiatu strzelecko-drezdeneckiego',
        'Herb powiatu pajęczańskiego',
        'Herb powiatu brzeskiego (małopolskiego)',
      ].includes(title)) {
        animals.push('bird');
      }
    }

    if ([' wąż ', ' węże.', ' węża,'].some((animal) => text.includes(animal))) {
        animals.push('snake');
    }

    if ([' zając ', ' zająca,'].some((animal) => text.includes(animal))) {
      animals.push('rabbit');
    }

    if ([' nietoperz'].some((animal) => text.includes(animal))) {
        animals.push('bat');
    }

    if ([' gryfa', ' gryf', 'rybogryfa', 'rybogryf', 'półgryf', 'poługryf', 'Herb powiatu polickiego'].some((animal) => text.includes(animal.toLowerCase()))) {
      if (![
        'Herb Mielca',
        'Herb Białegostoku',
        'Herb Kołobrzegu',
        'Herb Bytomia',
        'Herb gminy Bielice',
        'Herb Częstochowy',
      ].includes(title)) {
        animals.push('griffin');
      }
    }

    if ([' dzik,', 'dzik.', 'dzik ', ' dzika'].some((animal) => text.includes(animal))) {
        animals.push('boar');
    }

    if (['jeleń', 'jelenia', 'jelenią', ' jelenim', ' jelenie', 'jelon', ' łania', ' łani ', ' łani,', ' poroże', ' rosochy,', ' daniela', 'herb powiatu karkonoskiego', 'herb powiatu mieleckiego'].some((animal) => text.includes(animal))) {
      if (![
        'Herb Jabłonkowa',
        'Herb Białegostoku',
        'Herb Siedlec',
        'Herb Kowar',
        'Herb powiatu stalowowolskiego',
        'Herb powiatu pilskiego',
      ].includes(title)) {
        animals.push('deer');
      }
    }

    if (['łosia', ' łoś '].some((animal) => text.includes(animal))) {
      animals.push('moose');
    }

    if (['żbika'].some((animal) => text.includes(animal))) {
      animals.push('wildcat');
    }

    if (['półlwa', 'półlew', ' połulwa', '(połulew', ' połulew', '(lew ', ' lew ', ' lew.', ' lwem ', ' lwem,', ' lwa ', ' lwa,' , ' lwy ', 'lwy-', ' lwami', ' lwów '].some((animal) => text.includes(animal))) {
      if (![
        'Herb Piwnicznej-Zdroju',
        'Herb Żagania',
        'Herb Krakowa',
        'Herb Zawadzkiego',
        'Herb gminy Pruszcz Gdański',
        'Herb Ciężkowic',
        'Herb Gorlic',
        'Herb Koszalina',
        'Herb Przysuchy',
        'Herb Sierpca',
        'Herb gminy Zawonia',
        'Herb Żar',
        'Herb Szczecina',
        'Herb powiatu prudnickiego',
      ].includes(title)) {
        animals.push('lion');
      }
    }

    if ([' lampart ', 'lamparta', ' lamparcie', 'lewart', ' połulampart'].some((animal) => text.includes(animal))) {
        animals.push('leopard');
    }

    if ([' byk', ' byczka', ' połubyk', ' tur ', ' tura ', ' tura,', 'żubr', ' ciołka ', 'ciołek ', ' bawoli', ' wołu.', ' woła,', 'bawoła', 'bawołu ', ' woła ', ' wołu ', 'gminy gołuchów', 'herbu chojnic', 'herb powiatu mieleckiego'].some((animal) => text.includes(animal))) {
      if (![
        'Herb Rudnika nad Sanem',
        'Herb Przysuchy',
        'Herb Grudziądza',
      ].includes(title)) {
        animals.push('bullBison');
      }
    }

    if (['smok'].some((animal) => text.includes(animal))) {
      if (![
        'Herb Gdyni',
        'Herb Tucholi',
        'Herb Tczewa',
      ].includes(title)) {
        animals.push('dragon');
      }
    }

    if (['baran', 'muflon', ' owcę', ' owca', ' owczą', ' runo '].some((animal) => text.includes(animal))) {
      if (![
        'Herb gminy Baranowo',
        'Herb gminy Baranów (powiat puławski)',
        'Herb Głuska',
      ].includes(title)) {
        animals.push('ram');
      }
    }

    if (['ryba ', ' ryba.', ' ryb ', ' rybami ', 'rybogryfa', 'rybopodobne', ' rybo ', ' rybo,', 'rybę', 'ryby', 'rybą', ' karp ', ' karpia ', 'karpiami.', ' karpiem', 'łososia', ' suma ', 'łosoś', 'leszcza ', ' leszcze ', 'Herb powiatu polickiego'].some((animal) => text.includes(animal.toLowerCase()))) {
      if (![
        'Herb Warszawy',
        'Herb gminy Kościerzyna',
        'Herb powiatu brodnickiego',
      ].includes(title)) {
        animals.push('fish');
      }
    }

    if (['pszczoł'].some((animal) => text.includes(animal))) {
      if (![
        'Herb Zduńskiej Woli',
        'Herb Ostrowi Mazowieckiej',
      ].includes(title)) {
        animals.push('bee');
      }
    }

    if (['syrenę', ' syrena '].some((animal) => text.includes(animal))) {
      animals.push('mermaid');
    }

    if (['bóbr', ' bobra', ' bobry'].some((animal) => text.includes(animal))) {
      if (![
        'Herb gminy Łomża',
      ].includes(title)) {
        animals.push('beaver');
      }
    }

    if ([' lis ', ' lisa ', ' lisem ', ' lisa,'].some((animal) => text.includes(animal))) {
        animals.push('fox');
    }

    if (['jaszczurk'].some((animal) => text.includes(animal))) {
        animals.push('lizard');
    }

    if ([' pies ', ' psa ', ' psa,', ' psem ', ' psy '].some((animal) => text.includes(animal))) {
        animals.push('dog');
    }

    if ([' niedźwiedz', ' niedźwiedź', 'herbu rawicz'].some((animal) => text.includes(animal))) {
        animals.push('bear');
    }

    if ([' rak ', ' raka ', ' raka,', 'raka.'].some((animal) => text.includes(animal))) {
        animals.push('crayfish');
    }

    if ([' konia', ' koń ', ' koń,', ' końska', ' rumaku', ' koniu', ' konie ', 'starykoń', 'gminy gołuchów'].some((animal) => text.includes(animal))) {
      if (![
        'Herb Sułkowic',
        'Herb Tczewa',
      ].includes(title)) {
        animals.push('horse');
      }
    }

    if (['jednoroż'].some((animal) => text.includes(animal))) {
      if (![
        'Herb Zabłudowa',
      ].includes(title)) {
        animals.push('unicorn');
      }
    }

    if (['centaur'].some((animal) => text.includes(animal))) {
        animals.push('centaur');
    }

    if ([' oślej', ' osła'].some((animal) => text.includes(animal))) {
        animals.push('donkey');
    }

    if (['amfisbaenę'].some((animal) => text.includes(animal))) {
        animals.push('amphisbaena');
    }

    if (['kozła', 'kozę', ' kóz.', ' kozy,', ' kozie ', 'kozłów', ' kozłem', 'koziołki'].some((animal) => text.includes(animal))) {
        animals.push('goat');
    }

    if ([' wilk', 'połuwilk'].some((animal) => text.includes(animal))) {
      if (![
        'Herb Górowa Iławeckiego',
        'Herb Mrągowa',
        'Herb Pabianic',
      ].includes(title)) {
        animals.push('wolf');
      }
    }

    if (['wiewiórka'].some((animal) => text.includes(animal))) {
        animals.push('squirrel');
    }

    if ([' konik polny'].some((animal) => text.includes(animal))) {
        animals.push('insect');
    }
  }

  if (['podkowa', 'podkowę', ' podkowie', 'herb powiatu brzezińskiego'].some((item) => text.includes(item))) {
    if (![
      'Herb Bobowej',
      'Herb Izbicy',
    ].includes(title)) {
      items.push('horseshoe');
    }
  }
  
  if (['klucz'].some((item) => text.includes(item))) {
    if (![
      'Herb gminy Łabowa',
      'Herb gminy Nawojowa',
      'Herb gminy Baranów (powiat grodziski)',
      'Herb gminy Goworowo',
      'Herb gminy Koszęcin',
      'Herb Olkusza',
      'Herb Chorzel',
      'Herb Karczewa',
      'Herb Kluczborka',
      'Herb Ślesina',
      'Herb Człopy',
      'Herb Mogilna',
      'Herb Kłecka',
      'Herb Kamionki',
      'Herb Radomia',
      'Herb powiatu kluczborskiego',
    ].includes(title)) {
      items.push('key');
    }
  }

  if (['miecz', ' nóż ', ' szabla ', ' szablach', ' szable ', ' szable.', 'herb powiatu opoczyńskiego'].some((item) => text.includes(item))) {
    if (![
      'Herb Siechnic',
      'Herb gminy Golub-Dobrzyń',
      'Herb gminy Rojewo',
      'Herb gminy Brzeźnica (powiat żagański)',
      'Herb gminy Rząśnia',
      'Herb gminy Czerwonka',
      'Herb gminy Nadarzyn',
      'Herb gminy Juchnowiec Kościelny',
      'Herb Legnicy',
      'Herb Bochni',
      'Herb Grybowa',
      'Herb Iłży',
      'Herb Ostrowi Mazowieckiej',
      'Herb Przysuchy',
      'Herb Kańczugi',
      'Herb Rzeszowa',
      'Herb Pszczyny',
      'Herb Sandomierza',
      'Herb Mogilna',
      'Herb Łomianek',
      'Herb Kowalewa Pomorskiego',
      'Herb Brodnicy',
      'Herb Prusic',
      'Herb Aleksandrowa Łódzkiego',
      'Herb gminy Batorz',
      'Herb Łabiszyna',
    ].includes(title)) {
      items.push('sword');
    }
  }

  if (['strzał', ' rogacina ', ' rogacina,', 'herb powiatu brzezińskiego'].some((item) => text.includes(item))) {
    if (![
      'Herb gminy Nadarzyn',
      'Herb gminy Ożarowice',
      'Herb Głowna',
      'Herb Izbicy',
    ].includes(title)) {
      items.push('arrow');
    }
  }

  if ([' serce',].some((item) => text.includes(item))) {
    if (![
      'empty',
    ].includes(title)) {
      items.push('heart');
    }
  }

  // You can use it to find potential arms
  // if ([' dłoń', ' ramię', ' rękę', 'ręka'].some((item) => text.includes(item))) {
  if ([
    'Herb gminy Brodnica (powiat brodnicki)',
    'Herb Książa Wielkiego',
    'Herb gminy Spytkowice (powiat nowotarski)',
    'Herb Świerzawy',
    'Herb Brodnicy',
    'Herb Łabiszyna',
    'Herb Kolbuszowej',
    'Herb Osieka',
  ].some((item) => text.includes(item.toLowerCase()))) {
    if (![
      'empty',
    ].includes(title)) {
      items.push('hand');
    }
  }

  if ([
    'Herb gminy Stolno',
    'Herb gminy Hanna',
    'Herb gminy Bystra-Sidzina',
    'Herb gminy Gdów',
    'Herb gminy Niebylec',
    'Herb gminy Brańsk',
    'Herb gminy Giby',
    'Herb gminy Krasnopol',
    'Herb gminy Ujsoły',
    'Herb Wągrowca',
    'Herb Sosnowca',
    'Herb powiatu chełmińskiego',
    'Herb powiatu świeckiego',
    'Herb powiatu toruńskiego',
    'Herb powiatu tucholskiego',
    'Herb powiatu wąbrzeskiego',
    'Herb powiatu malborskiego',
  ].some((item) => text.includes(item.toLowerCase()))) {
    if (![
      'empty',
    ].includes(title)) {
      items.push('arm');
    }
  }

  if ([' kłos', ' kłosem', ' snop ', ' snopy '].some((item) => text.includes(item))) {
    if (![
      'Herb gminy Gaworzyce',
      'Herb gminy Kondratowice',
      'Herb gminy Łagiewniki',
      'Herb gminy Deszczno',
      'Herb gminy Regimin',
      'Herb gminy Czarna Dąbrówka',
      'Herb gminy Koszęcin',
      'Herb Człuchowa',
      'Herb Olsztyna',
      'Herb Brzezin',
      'Herb Czechowic-Dziedzic',
      'Herb gminy Dolice',
      'Herb Łochowa',
      'Herb gminy Sędziejowice',
      'Herb gminy Bielice',
      'Herb Pieszyc',
      'Herb Świątnik Górnych',
      'Herb Skarżyska-Kamiennej',
      'Herb powiatu brodnickiego',
      'Herb powiatu zawierciańskiego',
    ].includes(title)) {
      items.push('earOfGrain');
    }
  }

  const oldAxePickFilter = [
    'Herb Zaklikowa',
    'Herb Iwanisk',
    'Herb gminy Krasocin',
    'Herb Szubina',
    'Herb Głowna',
    'Herb Sułkowic',
    'Herb Świątnik Górnych',
    'Herb Chrzanowa',
    'Herb Katowic',
    'Herb Zabrza',
    'Herb Staszowa',
    'Herb gminy Kostomłoty',
    'Herb Łazisk Górnych',
  ];

  if (['topór', 'toporami', 'toporem', ' tasaki', 'toporek', 'topory', ' siekierę', ' siekiery', ' siekiera'].some((item) => text.includes(item))) {
    if (![
      ...oldAxePickFilter,
    ].includes(title)) {
      items.push('axe');
    }
  }

  if (['jabłko', 'jabłoni', 'jabłkiem', 'jabłka', 'jabuszkiem', 'jabłek', "jabłoń"].some((item) => text.includes(item))) {
    if (![
      'Herb gminy Wąsewo',
      'Herb gminy Ochotnica Dolna',
      'Herb gminy Zbrosławice',
    ].includes(title)) {
      items.push('apple');
    }
  }

  if (['młot', 'herb górniczy', 'pyrlika', 'herb powiatu złotoryjskiego'].some((item) => text.includes(item))) {
    if (![
      ...oldAxePickFilter,
      'Herb Skarżyska-Kamiennej',
      'Herb Ustronia',
      'Herb Krzeszowic',
    ].includes(title)) {
      items.push('hammer');
    }
  }

  if (['oskard', 'herb górniczy', 'kilof'].some((item) => text.includes(item))) {
    if (![
      ...oldAxePickFilter,
      'Herb Krzeszowic',
      'Herb Piekar Śląskich',
    ].includes(title)) {
      items.push('pickaxe');
    }
  }

  if (['drzewo', ' drzew', 'drzewa', ' kłoda', 'dąb', ' dęby ', ' dębowe', ' dębu', ' dębami', 'lipą ', ' bukiem', ' jodła', 'sosną', ' sosny ', ' sosnę', ' jabłoń', ' jodły', ' świerk', ' ostrzew', '(ostrzew', 'gałąź', ' gałęzi ', ' gałązka', ' gałązką', 'lasu.', ' pniaczek', ' pień ', ' buk ', ' brzozę', ' brzozową ', ' lipy', 'Herb powiatu sztumskiego', 'Herb powiatu polickiego'].some((item) => text.includes(item.toLowerCase()))) {
    if (![
      'Herb Węgorzyna',
      'Herb Bobowej',
      'Herb Opatówka',
      'Herb gminy Wizna',
      'Herb Głuska',
      'Herb gminy Białowieża',
      'Herb Drzewicy',
      'Herb gminy Malczyce',
      'Herb gminy Czerwonka',
      'Herb gminy Stryszawa',
      'Herb Latowicza',
      'Herb Nowego Miasta (powiat płoński)',
      'Herb Koprzywnicy',
      'Herb Latowicza',
      'Herb Rychtala',
      'Herb gminy Płoniawy-Bramura',
      'Herb gminy Rybno (województwo mazowieckie)',
      'Herb gminy Bukowsko',
      'Herb Rychtala',
      'Herb gminy Frysztak',
      'Herb gminy Jarosław',
      'Herb gminy Łomża',
      'Herb gminy Ujsoły',
      'Herb gminy Dąbrówno',
      'Herb Sulęcina',
      'Herb Cybinki',
      'Herb Lubniewic',
      'Herb Dąbrowic',
      'Herb Dąbrowy Tarnowskiej',
      'Herb Kalwarii Zebrzydowskiej',
      'Herb Sulejówka',
      'Herb Siedlec',
      'Herb Pułtuska',
      'Herb Tłuszcza',
      'Herb Wołomina',
      'Herb Zakroczymia',
      'Herb Nowej Sarzyny',
      'Herb Rudnika nad Sanem',
      'Herb Częstochowy',
      'Herb Piekar Śląskich',
      'Herb Kisielic',
      'Herb Mrągowa',
      'Herb Rydzyny',
      'Herb Bobolic',
      'Herb Goleniowa',
      'Herb Janowa Lubelskiego',
      'Herb Nowego Sącza',
      'Herb Zakopanego',
      'Herb Radomia',
      'Herb Boguchwały',
      'Herb Ustronia',
      'Herb Nowogardu',
      'Herb gminy Sędziejowice',
      'Herb Urzędowa',
      'Herb Brzozowa',
      'Herb Narola',
      'Herb Grodziska Wielkopolskiego',
      'Herb Ozorkowa',
      'Herb gminy Laskowa',
      'Herb gminy Jastków',
      'Herb gminy Aleksandrów (województwo łódzkie)',
      'Herb powiatu wieluńskiego',
      'Herb powiatu proszowickiego',
      'Herb powiatu zwoleńskiego',
      'Herb powiatu mieleckiego',
      'Herb powiatu tarnogórskiego',
      'Herb powiatu buskiego',
      'Herb powiatu międzychodzkiego',
      'Herb powiatu pilskiego',
      'Herb powiatu lidzbarskiego',
    ].includes(title)) {
      items.push('tree');
    }
  }

  const lily = [' lilie', ' lilia', ' lilię', ' lilii ', ' lilijkę'];
  const lilyFilter = [
    'Herb Birczy',
    'Herb Starogardu Gdańskiego',
    'Herb Brzostku',
    'Herb gminy Srokowo',
  ];

  if (lily.some((item) => text.includes(item))) {
    if (!lilyFilter.includes(title)) {
      items.push('lily');
    }
  }

  const rose = [' róża ', ' róż ', ' róże ', ' różę ', ' różami '];
  const roseFilter = [
    'Herb Łabiszyna',
    'Herb Starogardu Gdańskiego',
    'Herb Elbląga',
    'Herb powiatu prudnickiego',
  ];

  if (rose.some((item) => text.includes(item))) {
    if (!roseFilter.includes(title)) {
      items.push('rose');
    }
  }

  if (['kwiat', ' maku.', ' maki', ' tulipan', ' kwiecie',  ...rose, ...lily].some((item) => text.includes(item))) {
    if (![
      ...lilyFilter,
      ...roseFilter,
      'Herb gminy Bytoń',
      'Herb gminy Wodzierady',
      'Herb gminy Krościenko nad Dunajcem',
      'Herb gminy Lelis',
      'Herb Birczy',
      'Herb Mogilna',
      'Herb Drzewicy',
      'Herb Kielc',
      'Herb Bojanowa',
      'Herb Dobrej (powiat łobeski)',
      'Herb Węgorzyna',
      'Herb Rogoźna',
      'Herb Starogardu Gdańskiego',
      'Herb Krakowa',
      'Herb Obornik',
      'Herb Świętochłowic',
      'Herb powiatu pyrzyckiego',
    ].includes(title)) {
      items.push('flower');
    }
  }

  if (['wieża', ' wieże', ' wieżę', ' wieżą', ' wieży ', ' muru ', ' mur ', ' murów ', ' murem ', ' murze ', 'baszt', ' bramę ', 'bramę.', ' bramą.', 'bramą,', ' bramną ', ' bramie ', ' brama ', ' bramy ', 'corona muralis', ' kolumny ', ' kolumna ', 'gminy gołuchów', 'herb powiatu średzkiego (dolnośląskiego)', 'herb powiatu zgierskiego', 'herb powiatu żyrardowskiego', 'Herb powiatu myszkowskiego', 'Herb powiatu jarocińskiego', 'Herb Zduńskiej Woli'].some((item) => text.includes(item.toLowerCase()))) {
    if (![
      'Herb gminy Gaworzyce',
      'Herb Oleśnicy',
      'Herb Jasienia',
      'Herb Grybowa',
      'Herb Otwocka',
      'Herb Przysuchy',
      'Herb Ogrodzieńca',
      'Herb Pszczyny',
      'Herb Sandomierza',
      'Herb Korsz',
      'Herb Zdun',
      'Herb Choszczna',
      'Herb Koszalina',
      'Herb Legnicy',
      'Herb Prusic',
      'Herb Brodnicy',
      'Herb Kowalewa Pomorskiego',
      'Herb Łabiszyna',
      'Herb Mogilna',
      'Herb Krasnobrodu',
      'Herb Aleksandrowa Łódzkiego',
      'Herb Nysy',
      'Herb Olsztyna',
      'Herb Lubina',
      'Herb Izbicy',
      'Herb Nowego Sącza',
      'Herb Skaryszewa',
      'Herb Ujazdu (województwo opolskie)',
      'Herb Piły',
      'Herb Witkowa',
      'Herb Zagórowa',
      'Herb Stargardu',
      'Herb gminy Bielice',
      'Herb Opatowca',
      'Herb Ostrzeszowa',
      'Herb powiatu radomszczańskiego',
      'Herb powiatu poznańskiego',
    ].includes(title)) {
      items.push('walls');
    }
  }

  if (['łódka', 'łódź', 'statek', ' łodzi', ' korab', ' koga '].some((item) => text.includes(item))) {
    if (![
      'Herb Głowna',
      'Herb Aleksandrowa Łódzkiego',
      'Herb Koluszek',
      'Herb Gogolina',
      'Herb Gdańska',
      'Herb Czempinia',
      'Herb Goleniowa',
      'Herb Świątnik Górnych',
      'Herb Pucka',
      'Herb Mikołajek',
      'Herb Środy Wielkopolskiej',
      'Herb Łomży',
      'Herb powiatu przysuskiego',
    ].includes(title)) {
      items.push('boat');
    }
  }

  if ([' krzyż', ' krzyżem', ' kościół', 'krzyżem ', ' połukrzyżem', ' połukrzyż', ' kościołem', ' kościoła', ' klasztoru', 'gminy brzeźnica (powiat wadowicki)', 'herb gminy dynów', 'herb powiatu zduńskowolskiego', 'herb powiatu tatrzańskiego', 'herb powiatu mławskiego', 'Herb powiatu elbląskiego'].some((item) => text.includes(item.toLowerCase()))) {
    if (![
      'Herb gminy Świdnica (powiat świdnicki)',
      'Herb gminy Gruta',
      'Herb gminy Łysomice',
      'Herb gminy Rogóźno',
      'Herb gminy Stolno',
      'Herb gminy Unisław',
      'Herb Czemiernik',
      'Herb gminy Hrubieszów',
      'Herb gminy Radzyń Podlaski',
      'Herb gminy Serokomla',
      'Herb gminy Tuplice',
      'Herb gminy Wymiarki',
      'Herb gminy Żary',
      'Herb gminy Dobroń',
      'Herb gminy Zduńska Wola',
      'Herb gminy Ręczno',
      'Herb gminy Strzelce',
      'Herb gminy Gdów',
      'Herb gminy Gołcza',
      'Herb gminy Augustów',
      'Herb gminy Mały Płock',
      'Herb gminy Perlejewo',
      'Herb gminy Luzino',
      'Herb gminy Miłoradz',
      'Herb gminy Stary Targ',
      'Herb gminy Dąbrowa Zielona',
      'Herb gminy Łękawica',
      'Herb gminy Łodygowice',
      'Herb gminy Węgierska Górka',
      'Herb gminy Oksa',
      'Herb Margonina',
      'Herb Bolkowa',
      'Herb Głogowa',
      'Herb Kudowy-Zdroju',
      'Herb Lubania',
      'Herb Oleśnicy',
      'Herb Polanicy-Zdroju',
      'Herb Szczytnej',
      'Herb Świdnicy',
      'Herb Trzebnicy',
      'Herb Złotego Stoku',
      'Herb Chełmży',
      'Herb Grudziądza',
      'Herb Kowalewa Pomorskiego',
      'Herb Nowego',
      'Herb Torunia',
      'Herb Babimostu',
      'Herb Żagania',
      'Herb Żar',
      'Herb Poddębic',
      'Herb Wieruszowa',
      'Herb Wieliczki',
      'Herb Iłży',
      'Herb Radzymina',
      'Herb Dobrodzienia',
      'Herb Namysłowa',
      'Herb Krosna',
      'Herb Łomży',
      'Herb Chojnic',
      'Herb Człuchowa',
      'Herb Lęborka',
      'Herb Bielska-Białej',
      'Herb Gliwic',
      'Herb Łazisk Górnych',
      'Herb Świętochłowic',
      'Herb Tychów',
      'Herb Kunowa',
      'Herb Radoszyc',
      'Herb Jezioran',
      'Herb Korsz',
      'Herb Morąga',
      'Herb Nidzicy',
      'Herb Ostródy',
      'Herb Pasłęka',
      'Herb Rynu',
      'Herb Czempinia',
      'Herb Dąbia',
      'Herb Leszna',
      'Herb Zagórowa',
      'Herb Gryfic',
      'Herb gminy Werbkowice',
      'Herb gminy Lubrza (województwo lubuskie)',
      'Herb gminy Skąpe',
      'Herb gminy Czarnocin (województwo łódzkie)',
      'Herb gminy Drużbice',
      'Herb gminy Łanięta',
      'Herb gminy Oporów',
      'Herb gminy Sławno (województwo łódzkie)',
      'Herb gminy Sędziejowice',
      'Herb gminy Zapolice',
      'Herb gminy Bolesław (powiat olkuski)',
      'Herb gminy Gnojnik',
      'Herb gminy Gromnik',
      'Herb gminy Liszki',
      'Herb gminy Moszczenica (województwo małopolskie)',
      'Herb gminy Pałecznica',
      'Herb gminy Słaboszów',
      'Herb gminy Bielsk',
      'Herb Bodzanowa',
      'Herb Cegłowa',
      'Herb gminy Pomiechówek',
      'Herb gminy Radziejowice',
      'Herb gminy Rzekuń',
      'Herb Sochocina',
      'Herb gminy Stara Błotnica',
      'Herb gminy Stromiec',
      'Herb gminy Szelków',
      'Herb gminy Tczów',
      'Herb gminy Kamiennik',
      'Herb gminy Bojszowy',
      'Herb gminy Poczesna',
      'Herb gminy Górno',
      'Herb gminy Ślemień',
      'Herb Łagowa',
      'Herb gminy Łączna',
      'Herb Mieściska',
      'Herb gminy Olszówka',
      'Herb gminy Bielice',
      'Herb gminy Rewal',
      'Herb Góry',
      'Herb Sobótki',
      'Herb Strzegomia',
      'Herb Brześcia Kujawskiego',
      'Herb Bydgoszczy',
      'Herb Błaszek',
      'Herb Dobczyc',
      'Herb Jordanowa',
      'Herb Ryglic',
      'Herb Wojnicza',
      'Herb Baborowa',
      'Herb Głogówka',
      'Herb Nysy',
      'Herb Jedlicza',
      'Herb Kołaczyc',
      'Herb Radomyśla Wielkiego',
      'Herb Orzesza',
      'Herb Wilamowic',
      'Herb Toszka',
      'Herb Wodzisławia Śląskiego',
      'Herb Opatowca',
      'Herb Skalbmierza',
      'Herb Wiślicy',
      'Herb Miłomłyna',
      'Herb Olsztynka',
      'Herb Ornety',
      'Herb Pasymia',
      'Herb Pieniężna',
      'Herb Dolska',
      'Herb Kórnika',
      'Herb Ostrzeszowa',
      'Herb Zdun',
      'Herb powiatu brodnickiego',
      'Herb powiatu golubsko-dobrzyńskiego',
      'Herb powiatu hrubieszowskiego',
      'Herb powiatu bocheńskiego',
      'Herb powiatu płońskiego',
      'Herb powiatu przasnyskiego',
      'Herb powiatu siedleckiego',
      'Herb powiatu warszawskiego zachodniego',
      'Herb powiatu myszkowskiego',
      'Herb powiatu raciborskiego',
      'Herb powiatu opatowskiego',
      'Herb powiatu iławskiego',
      'Herb powiatu mrągowskiego',
    ].includes(title)) {
      items.push('cross');
    }
  }

  if ([' muszla', ' muszlę', ' muszle', ' muszelk'].some((item) => text.includes(item))) {
    if (![
      'empty',
    ].includes(title)) {
      items.push('shell');
    }
  }

  if ([' anioł', 'herb białej podlaskiej', 'herb powiatu łańcuckiego'].some((item) => text.includes(item))) {
    if (![
      'Herb Bierutowa',
      'Herb Murowanej Gośliny',
      'Herb Łowicza',
      'Herb Skoczowa',
    ].includes(title)) {
      items.push('angel');
    }
  }

  if ([' pastorał', 'laskę biskupi', 'laskę biskupią', 'jerzmanowice-przeginia'].some((item) => text.includes(item))) {
    if (![
      'Herb gminy Łąck',
      'Herb gminy Rewal',
      'Herb Iłży',
      'Herb Nysy',
      'Herb Koszalina',
      'Herb Tuchowa',
    ].includes(title)) {
      items.push('crozier');
    }
  }

  if ([' koło ', ' koło.', ' koła '].some((item) => text.includes(item))) {
    if (![
      'Herb gminy Miłkowice',
      'Herb Siechnic',
      'Herb gminy Stanin',
      'Herb gminy Tomaszów Lubelski',
      'Herb Nowego Miasta (powiat płoński)',
      'Herb gminy Przodkowo',
      'Herb Bierutowa',
      'Herb Jedliny-Zdroju',
      'Herb Wrocławia',
      'Herb Chełmna',
      'Herb Działoszyna',
      'Herb Łodzi',
      'Herb Sułkowic',
      'Herb Zakliczyna',
      'Herb Łochowa',
      'Herb Marek',
      'Herb Milanówka',
      'Herb Wołomina',
      'Herb Nowej Dęby',
      'Herb Kartuz',
      'Herb Pucka',
      'Herb Czechowic-Dziedzic',
      'Herb Rudy Śląskiej',
      'Herb Szczyrku',
      'Herb Działdowa',
      'Herb Zawiercia',
      'Herb Koźmina Wielkopolskiego',
      'Herb Recza',
      'Herb Kobyłki',
      'Herb Pieszyc',
      'Herb powiatu wołowskiego',
      'Herb powiatu chrzanowskiego',
      'Herb powiatu zawierciańskiego',
    ].includes(title)) {
      items.push('wheel');
    }
  }

  if ([' korona', ' koronę', ' koroną', ' korony ', ' koronie', ' korony', 'ukoronowanego', 'ukoronowanym', 'ukoronowane', 'ukoronowany', 'herb opola', 'mitra książęca', 'herb powiatu polkowickiego', 'herb powiatu krakowskiego', 'herb powiatu suskiego', 'herb powiatu tatrzańskiego', 'herb powiatu leżajskiego', 'Herb powiatu przemyskiego', 'Herb powiatu przeworskiego', 'Herb powiatu suwalskiego', 'Herb powiatu wejherowskiego', 'Herb powiatu będzińskiego', 'Herb powiatu cieszyńskiego', 'Herb powiatu jędrzejowskiego', 'Herb powiatu szczycieńskiego', 'Herb powiatu kaliskiego', 'Herb powiatu białogardzkiego', 'Herb powiatu goleniowskiego'].some((item) => text.includes(item.toLowerCase()))) {
    if (![
      'Herb gminy Krasocin',
      'Herb Jaworzyny Śląskiej',
      'Herb Brodnicy',
      'Herb Lubrańca',
      'Herb Siedliszcza',
      'Herb Wschowy',
      'Herb Olkusza',
      'Herb Konstancina-Jeziorny',
      'Herb Cieszanowa',
      'Herb Dębicy',
      'Herb Jedlicza',
      'Herb Leska',
      'Herb Mielca',
      'Herb Tykocina',
      'Herb Gdyni',
      'Herb Bielska-Białej',
      'Herb Pszczyny',
      'Herb Sosnowca',
      'Herb Żywca',
      'Herb Nidzicy',
      'Herb gminy Długołęka',
      'Herb gminy Głowno',
      'Herb gminy Bralin',
      'Herb Kowar',
      'Herb Legnicy',
      'Herb Polkowic',
      'Herb Wlenia',
      'Herb Lipna',
      'Herb Rypina',
      'Herb Tyszowiec',
      'Herb Żagania',
      'Herb Błaszek',
      'Herb Piotrkowa Trybunalskiego',
      'Herb Piwnicznej-Zdroju',
      'Herb Garwolina',
      'Herb Siedlec',
      'Herb Sierpca',
      'Herb Kolonowskiego',
      'Herb Imielina',
      'Herb Jaworzna',
      'Herb Myszkowa',
      'Herb Nowego Korczyna',
      'Herb Osieka',
      'Herb Korsz',
      'Herb Ostródy',
      'Herb Bojanowa',
      'Herb Kłecka',
      'Herb Koźmina Wielkopolskiego',
      'Herb Pobiedzisk',
      'Herb Lipian',
      'Herb Drawska Pomorskiego',
      'Herb Świnoujścia',
      'Herb Węgorzyna',
      'Herb Janikowa',
      'Herb Lublina',
      'Herb Płocka',
      'Herb Helu',
      'Herb Chorzowa',
      'Herb Rudy Śląskiej',
      'Herb Wodzisławia Śląskiego',
      'Herb Czeskiego Cieszyna',
      'Herb Leszna',
      'Herb Piły',
      'Herb Zagórowa',
      'Herb Opola Lubelskiego',
      'Herb Skwierzyny',
      'Herb Słubic',
      'Herb Bytomia',
      'Herb Raciborza',
      'Herb Wielbarka',
      'Herb powiatu warszawskiego zachodniego',
      'Herb powiatu stalowowolskiego',
      'Herb powiatu kazimierskiego',
      'Herb powiatu międzychodzkiego',
      'Herb powiatu obornickiego',
      'Herb powiatu wągrowieckiego',
      'Herb powiatu myśliborskiego',
    ].includes(title)) {
      items.push('crown');
    }
  }

  if ([' święty', ' świetego', ' świętego', ' św.', ' święta ', ' świętej ', ' świętą ', 'matki bożej', ' floriana', 'jana chrciciela', 'matki boskiej', 'madonny', ' madonnę', 'chrystus', 'błogosławiona salomea', 'bł. władysława', 'marii panny', 'maryi panny', 'herb lubawy', 'matkę boską', 'najświętsza maria panna', 'jana chrzciciela', 'szymona gorliwego', 'herb powiatu wołomińskiego', 'Herb powiatu polickiego'].some((item) => text.includes(item.toLowerCase()))) {
    if (![
      'Herb gminy Sadki',
      'Herb gminy Leśna Podlaska',
      'Herb gminy Uścimów',
      'Herb gminy Szczerców',
      'Herb gminy Trzciana',
      'Herb gminy Hyżne',
      'Herb gminy Perlejewo',
      'Herb gminy Somonino',
      'Herb gminy Bieliny',
      'Herb Nowej Słupi',
      'Herb gminy Świętajno (powiat szczycieński)',
      'Herb Dąbrowy Tarnowskiej',
      'Herb Nysy',
      'Herb Czyżewa',
      'Herb Tczewa',
      'Herb Nowej Słupi',
      'Herb Koszalina',
      'Herb gminy Grębocice',
      'Herb Siechnic',
      'Herb gminy Zgorzelec',
      'Herb gminy Choceń',
      'Herb gminy Chrostkowo',
      'Herb gminy Waganiec',
      'Herb gminy Miączyn',
      'Herb gminy Michów',
      'Herb gminy Nielisz',
      'Herb gminy Nowodwór',
      'Herb gminy Puławy',
      'Herb gminy Aleksandrów (województwo łódzkie)',
      'Herb gminy Burzenin',
      'Herb gminy Gorzkowice',
      'Herb gminy Zduńska Wola',
      'Herb gminy Ręczno',
      'Herb gminy Wodzierady',
      'Herb gminy Gromnik',
      'Herb gminy Liszki',
      'Herb gminy Łososina Dolna',
      'Herb gminy Łużna',
      'Herb gminy Moszczenica (województwo małopolskie)',
      'Herb gminy Żegocina',
      'Herb gminy Czerwonka',
      'Herb Jaraczewa',
      'Herb gminy Radziejowice',
      'Herb gminy Pionki',
      'Herb gminy Rusinów',
      'Herb gminy Rybno (województwo mazowieckie)',
      'Herb gminy Teresin',
      'Herb Jaraczewa',
      'Herb gminy Rzekuń',
      'Herb gminy Stromiec',
      'Herb gminy Czermin (województwo podkarpackie)',
      'Herb gminy Domaradz',
      'Herb gminy Grębów',
      'Herb gminy Skołyszyn',
      'Herb gminy Łomża',
      'Herb gminy Poświętne (powiat białostocki)',
      'Herb gminy Rutki',
      'Herb gminy Stary Targ',
      'Herb gminy Zblewo',
      'Herb gminy Dąbrowa Zielona',
      'Herb gminy Mykanów',
      'Herb gminy Przystajń',
      'Herb gminy Rędziny',
      'Herb gminy Górno',
      'Herb gminy Mniów',
      'Herb gminy Sobków',
      'Herb gminy Wilczyce',
      'Herb gminy Biskupiec (powiat nowomiejski)',
      'Herb gminy Rychliki',
      'Herb gminy Kamieniec',
      'Herb gminy Karnice',
      'Herb gminy Świerzno',
      'Herb Bierutowa',
      'Herb Legnicy',
      'Herb Barcina',
      'Herb Mogilna',
      'Herb Biłgoraja',
      'Herb Stoczka Łukowskiego',
      'Herb Babimostu',
      'Herb Opoczna',
      'Herb Nowego Wiśnicza',
      'Herb Radłowa',
      'Herb Ryglic',
      'Herb Skawiny',
      'Herb Świątnik Górnych',
      'Herb Góry Kalwarii',
      'Herb Kobyłki',
      'Herb Łaskarzewa',
      'Herb Tarczyna',
      'Herb Namysłowa',
      'Herb Opola',
      'Herb Paczkowa',
      'Herb Prudnika',
      'Herb Jedlicza',
      'Herb Suchowoli',
      'Herb Bielska-Białej',
      'Herb Lędzin',
      'Herb Sławkowa',
      'Herb Świętochłowic',
      'Herb Toszka',
      'Herb Buska-Zdroju',
      'Herb Stopnicy',
      'Herb Kisielic',
      'Herb Pieniężna',
      'Herb Koźmina Wielkopolskiego',
      'Herb Słupcy',
      'Herb Śremu',
      'Herb Trzebiatowa',
      'Herb Bolkowa',
      'Herb Torunia',
      'Herb Kamionki',
      'Herb Lublina',
      'Herb Poddębic',
      'Herb Chrzanowa',
      'Herb Krakowa',
      'Herb Radomia',
      'Herb Helu',
      'Herb Wejherowa',
      'Herb Zawiercia',
      'Herb Kamieńca Ząbkowickiego',
      'Herb gminy Goworowo',
      'Herb gminy Huszlew',
      'Herb Międzyborza',
      'Herb Sobótki',
      'Herb Kwidzyna',
      'Herb Zagórowa',
      'Herb gminy Sławno (województwo łódzkie)',
      'Herb gminy Herby',
      'Herb Ornety',
      'Herb gminy Łanięta',
      'Herb Wschowy',
      'Herb Imielina',
      'Herb Wodzisławia Śląskiego',
      'Herb gminy Siepraw',
      'Herb gminy Chrzypsko Wielkie',
      'Herb gminy Szydłowo (województwo wielkopolskie)',
      'Herb Ciechanowca',
      'Herb Grybowa',
      'Herb Brzostku',
      'Herb gminy Chłopice',
      'Herb gminy Dubienka',
      'Herb gminy Paradyż',
      'Herb gminy Baboszewo',
      'Herb Bodzanowa',
      'Herb gminy Wąpielsk',
      'Herb gminy Warlubie',
      'Herb Gryfic',
      'Herb gminy Przytoczna',
      'Herb gminy Branice',
      'Herb Oleśnicy',
      'Herb gminy Lądek',
      'Herb gminy Zabrodzie',
      'Herb Tuchowa',
      'Herb Olkusza',
      'Herb Krotoszyna',
      'Herb gminy Nowe Piekuty',
      'Herb gminy Sieradz',
      'Herb Kutna',
      'Herb gminy Łukowa',
      'Herb gminy Stara Błotnica',
      'Herb Dobrodzienia',
      'Herb powiatu oleśnickiego',
      'Herb powiatu nowotarskiego',
      'Herb powiatu prudnickiego',
      'Herb powiatu brzozowskiego',
      'Herb powiatu jarosławskiego',
      'Herb powiatu kwidzyńskiego',
      'Herb powiatu częstochowskiego',
      'Herb powiatu wodzisławskiego',
      'Herb powiatu buskiego',
      'Herb powiatu kieleckiego',
      'Herb powiatu gostyńskiego',
      'Herb powiatu gnieźnieńskiego',
      'Herb powiatu krotoszyńskiego',
      'Herb powiatu pyrzyckiego',
      'Herb powiatu myśliborskiego',
    ].includes(title)) {
      items.push('saint');
    }
  }

  return {
    animals,
    items,
  }
}