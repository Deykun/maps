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
    // TODO: replace the logic
    if (['Herb gminy Baranowo'].includes(title)) {
      animals.push('hawk')
      animals.push('bird');
    } else if (['Herb Zabłudowa', 'Herb gminy Łomża', 'Herb Pionek'].includes(title)) {
      animals.push('deer');
    } else if (['Herb Bierunia'].includes(title)) {
      animals.push('deer');
      animals.push('bird');
    } else if (['Herb Gdyni', 'Herb Rudnika nad Sanem'].includes(title)) {
      animals.push('fish');
    } else if (['Herb gminy Srokowo'].includes(title)) {
      animals.push('beaver');
    } else if (['Herb Mirosławca'].includes(title)) {
      animals.push('goat');
    } else if (['Herb Mielca'].includes(title)) {
      animals.push('bullBison');
      animals.push('deer');
    } else if (['Herb gminy Gołuchów'].includes(title)) {
      animals.push('bullBison');
      animals.push('horse');
    } else if (['Herb Jabłonkowa'].includes(title)) {
      animals.push('eagle');
      animals.push('bird');
      animals.push('ram');
    } else if (['Herb gminy Secemin', 'Herb Białegostoku'].includes(title)) {
      animals.push('eagle');
      animals.push('bird');
      animals.push('horse');
    } else if (['Herb Piwnicznej-Zdroju'].includes(title)) {
      animals.push('ram');
    } else if (['Herb gminy Jastków', 'Herb gminy Baranów (powiat puławski)'].includes(title)) {
      animals.push('leopard');
    } else if (['Herb Drawna'].includes(title)) {
      animals.push('crane');
      animals.push('bird');
    } else if (['Herb Kołobrzegu'].includes(title)) {
      animals.push('swan');
      animals.push('bird');
    } else if (['Herb Tucholi'].includes(title)) {
      animals.push('pigeon');
      animals.push('bird');
    } else if (['Herb Słubic'].includes(title)) {
      animals.push('rooster');
      animals.push('bird');
    } else if (['Herb gminy Drużbice'].includes(title)) {
      animals.push('goose');
      animals.push('bird');
    } else if (['Herb Górowa Iławeckiego'].includes(title)) {
      animals.push('fox');
      animals.push('goose');
      animals.push('bird');
    } else if (['Herb gminy Damasławek', 'Herb Żagania', 'Herb Sułkowic', 'Herb Kisielic', 'Herb Krakowa', 'Herb Zawadzkiego', 'Herb Bytomia'].includes(title)) {
      animals.push('eagle');
      animals.push('bird');
    } else if (['Herb Siedlec', 'Herb Kowar'].includes(title)) {
      animals.push('horse');   
    } else if (['Herb Warszawy'].includes(title)) {
      animals.push('mermaid');
    } else if (['Herb gminy Bielice'].includes(title)) {
      animals.push('fox');
    } else if (['Herb gminy Pruszcz Gdański', 'Herb Ciężkowic', 'Herb Gorlic', 'Herb Tczewa'].includes(title)) {
      animals.push('griffin');
    } else if (['Herb Koszalina'].includes(title)) {
      animals.push('griffin');
      animals.push('horse');
      animals.push('eagle');
      animals.push('bird');
    } else if (['Herb Częstochowy'].includes(title)) {
      animals.push('lion');
      animals.push('eagle');
      animals.push('bird');
    } else if (['Herb gminy Władysławów', 'Herb Zduńskiej Woli', 'Herb Staszowa'].includes(title)) {
      animals.push('lion');
    } else if ([
      'Herb gminy Siedlce',
      'Herb gminy Kościerzyna',
      'Herb Przysuchy',
      'Herb Mrągowa',
      'Herb Mieszkowic',
    ].includes(title)) {
      animals.push('bear')
    } else if (['Herb gminy Białowieża', 'Herb gminy Chojnice', 'Herb Głuska', 'Herb Sokółki'].includes(title)) {
      animals.push('bullBison');
    } else if ([
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
    ].includes(title)) {
      // Doesn't have them
    } else {
      const orzel = ['orzeł', 'orła', 'orłem', 'orłów', ' orle ', ' orły '];
      const orzelFilter = [
        'Herb Trzemeszna',
        'Herb Starego Sącza',
      ]; 
      if (orzel.some((animal) => text.includes(animal))) {
        if (!orzelFilter.includes(title)) {
          animals.push('eagle');
        }
      }

      if (['sokół', 'sokoła'].some((animal) => text.includes(animal))) {
          animals.push('falcon');
      }

      if (['czapla', 'czaple', 'czaplę', ' czapli '].some((animal) => text.includes(animal))) {
          animals.push('heron');
      }

      if (['żurw', 'żurawia', 'żurawie'].some((animal) => text.includes(animal))) {
          animals.push('crane');
      }

      if ([' kruk ', ' kruka '].some((animal) => text.includes(animal))) {
          animals.push('raven');
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
          animals.push('pelican');
      }

      if ([' bocian'].some((animal) => text.includes(animal))) {
          animals.push('stork');
      }

      if ([' gęsią ', 'gęś', ' gęsie'].some((animal) => text.includes(animal))) {
          animals.push('goose');
      }
        
      if ([' gołębie', 'gołębia'].some((animal) => text.includes(animal))) {
          animals.push('pigeon');
      }

      if ([' łabęd'].some((animal) => text.includes(animal))) {
          animals.push('swan');
      }

      if (['kogut'].some((animal) => text.includes(animal))) {
          animals.push('rooster');
      }

      if (animals.length > 0 || [...orzel, 'ptak', 'ptakiem', ' czyżyka', 'cietrzewia', 'ślepowron', ' szpak ', ' pióro', 'kormorana', ' czajkę ', 'kaczory', ' mewę', ' wrony,', 'krogulcem', ' puszczyk '].some((animal) => text.includes(animal))) {
        if (!orzelFilter.includes(title)) {
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
          animals.push('griffin');
      }

      if ([' dzik,', 'dzik.', 'dzik ', ' dzika'].some((animal) => text.includes(animal))) {
          animals.push('boar');
      }

      if (['jeleń', 'jelenia', 'jelenią', ' jelenie', 'jelon', ' łania', ' łani ', ' rosochy,'].some((animal) => text.includes(animal))) {
          animals.push('deer');
      }

      if (['łosia'].some((animal) => text.includes(animal))) {
        animals.push('moose');
      }

      if (['żbika'].some((animal) => text.includes(animal))) {
        animals.push('wildcat');
      }

      if (['półlwa', 'półlew', ' lew ', ' lwem ', ' lwa ', ' lwa,' , ' lwy ', 'lwy-', ' lwami'].some((animal) => text.includes(animal))) {
          animals.push('lion');
      }

      if ([' lampart ', 'lamparta', ' lamparcie ', 'lamparcie.', 'lewart'].some((animal) => text.includes(animal))) {
          animals.push('leopard');
      }

      if ([' byk', ' byczka', ' tur ', ' tura ', ' tura,', 'żubr', ' ciołka ', 'ciołek ', ' bawoli', ' woła,', 'bawoła', 'bawołu ', ' wołu '].some((animal) => text.includes(animal))) {
          animals.push('bullBison');
      }

      if (['smok'].some((animal) => text.includes(animal))) {
          animals.push('dragon');
      }

      if (['baran', 'muflon', ' owcę', ' owca', ' owczą'].some((animal) => text.includes(animal))) {
          animals.push('ram');
      }

      if (['ryba ', ' ryba.', ' ryb ', 'rybogryfa', 'rybopodobne', ' rybo ', ' rybo,', 'rybę', 'ryby', 'rybą', ' karpia ', 'łososia', ' suma ', 'łosoś', 'leszcza ', ' leszcze '].some((animal) => text.includes(animal))) {
          animals.push('fish');
      }

      if (['pszczoł'].some((animal) => text.includes(animal))) {
          animals.push('bee');
      }

      if (['syrenę', ' syrena '].some((animal) => text.includes(animal))) {
        animals.push('mermaid');
      }

      if (['bóbr', ' bobra'].some((animal) => text.includes(animal))) {
          animals.push('beaver');
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

      if ([' niedźwiedz'].some((animal) => text.includes(animal))) {
          animals.push('bear');
      }

      if ([' rak ', ' raka ', ' raka,', 'raka.'].some((animal) => text.includes(animal))) {
          animals.push('crayfish');
      }

      if ([' konia', ' koń ', ' koń,', ' koniu', ' konie '].some((animal) => text.includes(animal))) {
          animals.push('horse');
      }

      if (['jednoroż'].some((animal) => text.includes(animal))) {
          animals.push('unicorn');
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
          animals.push('wolf');
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

    if (['miecz', ' nóż ', ' szabla ', ' szable '].some((item) => text.includes(item))) {
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
      ].includes(title)) {
        items.push('earOfGrain');
      }
    }

    if (['topór', 'toporami', 'toporem', ' tasaki', 'toporek', 'topory', ' siekierę', ' siekiery', ' siekiera', 'młot', 'herb górniczy', ' oskard', ' kilof'].some((item) => text.includes(item))) {
      if (![
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
      ].includes(title)) {
        items.push('axeHammerPickaxe');
      }
    }

    if (['drzewo', ' drzew', 'drzewa', 'dąb', ' dęby ', ' dębu', ' jodła', ' jodły', ' świerk', ' ostrzew', 'lasu.', ' pniaczek'].some((item) => text.includes(item))) {
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
      ].includes(title)) {
        items.push('flower');
      }
    }

    if (['wieża', ' wieże', ' wieżę', ' wieżą', ' wieży ', ' muru ', ' mur ', ' murów ', 'baszt', ' bramę ', 'bramę.', ' bramą.', 'bramą,', ' bramną ', ' bramie ', 'corona muralis', ' kolumny ', ' kolumna '].some((item) => text.includes(item))) {
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
        'Herb Staszowa',
        'Herb Mikołajek',
        'Herb Środy Wielkopolskiej',
        'Herb Łomży',
      ].includes(title)) {
        items.push('boat');
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

    if ([' korona', ' koronę', ' koroną', ' korony ', ' korony', 'herb opola', 'mitra książęca'].some((item) => text.includes(item))) {
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
      ].includes(title)) {
        items.push('crown');
      }
    }

    if ([' święty', ' świetego', ' świętego', ' św.', ' święta ', ' świętą ', 'matki bożej', ' floriana', 'jana chrciciela', 'matki boskiej', 'madonny', ' madonnę', 'chrystus', 'błogosławiona salomea', 'bł. władysława', 'marii panny', 'herb lubawy', 'matkę boską'].some((item) => text.includes(item))) {
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