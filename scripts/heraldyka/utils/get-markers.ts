export const getMarkers = ({
  text: rawText = '',
  title,
  lang,
}: {
  text: string,
  title: string,
  lang: 'pl',
}) => {
  const animals: string[] = [];
  const items: string[] = [];

  const text = rawText.toLowerCase() || '';

  if (lang === 'pl') {
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
      const orzel = ['orzeł', 'orła', 'orłem', 'orłów', ' orle ', ' orły ', ' godła polski'];
      const orzelFilter = [
        'Herb Trzemeszna',
        'Herb Starego Sącza',
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
        
      if ([' gołębie', 'gołębia'].some((animal) => text.includes(animal))) {
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

      if (animals.length > 0 || [...orzel, 'ptak', 'ptakiem', ' czyżyka', 'cietrzewia', 'ślepowron', ' szpak ', ' pióro', 'kormorana', ' czajkę ', 'kaczory', ' mewę', ' wrony,', 'krogulcem', ' puszczyk '].some((animal) => text.includes(animal))) {
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
        ].includes(title)) {
          animals.push('bird');
        }
      }

      if ([' wąż ', ' węże.'].some((animal) => text.includes(animal))) {
          animals.push('snake');
      }

      if ([' zając ', ' zająca,'].some((animal) => text.includes(animal))) {
        animals.push('rabbit');
      }

      if ([' nietoperz'].some((animal) => text.includes(animal))) {
          animals.push('bat');
      }

      if ([' gryfa', ' gryf', 'rybogryfa', 'półgryf'].some((animal) => text.includes(animal))) {
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

      if (['jeleń', 'jelenia', 'jelenią', ' jelenie', 'jelon', ' łania', ' łani ', ' łani,', ' rosochy,', ' daniela'].some((animal) => text.includes(animal))) {
        if (![
          'Herb Jabłonkowa',
          'Herb Białegostoku',
          'Herb Siedlec',
          'Herb Kowar',
        ].includes(title)) {
          animals.push('deer');
        }
      }

      if (['łosia'].some((animal) => text.includes(animal))) {
        animals.push('moose');
      }

      if (['żbika'].some((animal) => text.includes(animal))) {
        animals.push('wildcat');
      }

      if (['półlwa', 'półlew', '(lew ', ' lew ', ' lwem ', ' lwem,', ' lwa ', ' lwa,' , ' lwy ', 'lwy-', ' lwami', ' lwów '].some((animal) => text.includes(animal))) {
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
        ].includes(title)) {
          animals.push('lion');
        }
      }

      if ([' lampart ', 'lamparta', ' lamparcie', 'lewart'].some((animal) => text.includes(animal))) {
          animals.push('leopard');
      }

      if ([' byk', ' byczka', ' tur ', ' tura ', ' tura,', 'żubr', ' ciołka ', 'ciołek ', ' bawoli', ' woła,', 'bawoła', 'bawołu ', ' wołu ', 'gminy gołuchów', 'herbu chojnic'].some((animal) => text.includes(animal))) {
        if (![
          'Herb Rudnika nad Sanem',
          'Herb Przysuchy',
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

      if (['ryba ', ' ryba.', ' ryb ', 'rybogryfa', 'rybopodobne', ' rybo ', ' rybo,', 'rybę', 'ryby', 'rybą', ' karp ', ' karpia ', 'łososia', ' suma ', 'łosoś', 'leszcza ', ' leszcze '].some((animal) => text.includes(animal))) {
        if (![
          'Herb Warszawy',
          'Herb gminy Kościerzyna',
        ].includes(title)) {
          animals.push('fish');
        }
      }

      if (['pszczoł'].some((animal) => text.includes(animal))) {
        if (![
          'Herb Zduńskiej Woli'
        ].includes(title)) {
          animals.push('bee');
        }
      }

      if (['syrenę', ' syrena '].some((animal) => text.includes(animal))) {
        animals.push('mermaid');
      }

      if (['bóbr', ' bobra'].some((animal) => text.includes(animal))) {
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

      if ([' pies ', ' psa ', ' psa,', ' psem '].some((animal) => text.includes(animal))) {
          animals.push('dog');
      }

      if ([' niedźwiedz', 'herbu rawicz'].some((animal) => text.includes(animal))) {
          animals.push('bear');
      }

      if ([' rak ', ' raka ', ' raka,', 'raka.'].some((animal) => text.includes(animal))) {
          animals.push('crayfish');
      }

      if ([' konia', ' koń ', ' koń,', ' rumaku', ' koniu', ' konie ', 'starykoń', 'gminy gołuchów'].some((animal) => text.includes(animal))) {
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

      if ([' wilk'].some((animal) => text.includes(animal))) {
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

    if (['podkowa', 'podkowę', ' podkowie'].some((item) => text.includes(item))) {
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
      ].includes(title)) {
        items.push('key');
      }
    }

    if (['miecz', ' nóż ', ' szabla ', ' szable ', ' szable.'].some((item) => text.includes(item))) {
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
      ].includes(title)) {
        items.push('sword');
      }
    }

    if (['strzał'].some((item) => text.includes(item))) {
      if (![
        'Herb gminy Nadarzyn',
        'Herb gminy Ożarowice',
        'Herb Głowna',
        'Herb Izbicy',
      ].includes(title)) {
        items.push('arrow');
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

    if (['młot', 'herb górniczy', 'pyrlika'].some((item) => text.includes(item))) {
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

    if (['drzewo', ' drzew', 'drzewa', ' kłoda', 'dąb', ' dęby ', ' dębowe', ' dębu', 'lipą ', ' bukiem', ' jodła', ' sosny ', ' sosnę', ' jabłoń', ' jodły', ' świerk', ' ostrzew', 'gałąź', ' gałęzi ', 'lasu.', ' pniaczek', ' pień ', ' buk ', ' brzozową '].some((item) => text.includes(item))) {
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
      ].includes(title)) {
        items.push('tree');
      }
    }

    const lily = [' lilie', ' lilia', ' lilię', ' lilii '];
    const lilyFilter = [
      'Herb Birczy',
      'Herb Starogardu Gdańskiego',
    ];

    if ([' lilie', ' lilia'].some((item) => text.includes(item))) {
      if (!lilyFilter.includes(title)) {
        items.push('lily');
      }
    }

    const rose = [' róża ', ' róż ', ' róże ', ' różę '];
    const roseFilter = [
      'Herb Łabiszyna',
      'Herb Starogardu Gdańskiego',
      'Herb Elbląga',
    ];

    if (rose.some((item) => text.includes(item))) {
      if (!roseFilter.includes(title)) {
        items.push('rose');
      }
    }

    if (['kwiat', ...rose, ...lily].some((item) => text.includes(item))) {
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
        'Herb Krotoszyna',
        'Herb Dobrej (powiat łobeski)',
        'Herb Węgorzyna',
        'Herb Rogoźna',
        'Herb Starogardu Gdańskiego',
        'Herb Krakowa',
        'Herb Obornik',
        'Herb Świętochłowic',
      ].includes(title)) {
        items.push('flower');
      }
    }

    if (['wieża', ' wieże', ' wieżę', ' wieżą', ' wieży ', ' muru ', ' mur ', ' murów ', 'baszt', ' bramę ', 'bramę.', ' bramą.', 'bramą,', ' bramną ', ' bramie ', 'corona muralis', ' kolumny ', ' kolumna ', 'gminy gołuchów'].some((item) => text.includes(item))) {
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
      ].includes(title)) {
        items.push('walls');
      }
    }

    if (['łódka', 'łódź', 'statek', ' łodzi'].some((item) => text.includes(item))) {
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
      ].includes(title)) {
        items.push('boat');
      }
    }

    if ([' krzyż', ' krzyżem', ' kościół', ' kościołem'].some((item) => text.includes(item))) {
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

    if ([' anioł'].some((item) => text.includes(item))) {
      if (![
        'Herb Bierutowa',
        'Herb Murowanej Gośliny',
        'Herb Łowicza',
        'Herb Skoczowa',
      ].includes(title)) {
        items.push('angel');
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
      ].includes(title)) {
        items.push('wheel');
      }
    }

    if ([' korona', ' koronę', ' koroną', ' korony ', ' korony', 'koronie,', 'ukoronowanego', 'herb opola', 'mitra książęca'].some((item) => text.includes(item))) {
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
      ].includes(title)) {
        items.push('crown');
      }
    }

    if ([' święty', ' świetego', ' świętego', ' św.', ' święta ', ' świętej ', ' świętą ', 'matki bożej', ' floriana', 'jana chrciciela', 'matki boskiej', 'madonny', ' madonnę', 'chrystus', 'błogosławiona salomea', 'bł. władysława', 'marii panny', 'herb lubawy', 'matkę boską', 'jana chrzciciela'].some((item) => text.includes(item))) {
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
      ].includes(title)) {
        items.push('saint');
      }
    }

    return {
      animals,
      items,
    }
  }

  return {
    animals,
    items,
  }
}