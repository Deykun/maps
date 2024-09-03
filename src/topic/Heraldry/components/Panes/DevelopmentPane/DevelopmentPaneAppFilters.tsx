import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import clxs from 'clsx';

import { MarkerParams, MarkerParamsWithResult } from '@/topic/Heraldry/types';

import IconSelected from '@/components/Icons/IconSelected';
import IconSelectNew from '@/components/Icons/IconSelectNew';

import Button from '@/components/UI/Button';
import Pane from '@/components/UI/Pane';

import DevelopmentPaneSnippet from './DevelopmentPaneSnippet';

type FetchParmas = {
  country: string,
}

const fetchData = async ({ country }: FetchParmas) => {
  // const response = await fetch(`/maps/data/heraldry/${country}/filters.json`).then((response) => response.json());

  // const {
  //   animals = [] as MarkerParams[],
  //   items = [] as MarkerParams[],
  // } = response || {};
  
  const {
    animals,
    items,
  }: {
    animals: MarkerParams[],
    items: MarkerParams[],
  } = {
    animals: [
      {
        "name": "eagle",
        "phrases": [
         "orle",
         "orła",
         "orłem",
         "orłów",
         "orły",
         "orzeł",
         "połuorła",
         "połuorzeł",
         "półorła",
         "półorzeł"
        ],
        "include": [
          "Herb Nowego Korczyna",
          "Herb gminy Damasławek",
          "Herb powiatu żyrardowskiego",
          "Herb powiatu biłgorajskiego",
        ],
        "exclude": [
          "Herb gminy Grębocice","Herb Kamieńca Ząbkowickiego","Herb gminy Malczyce","Herb Siechnic","Herb gminy Golub-Dobrzyń","Herb gminy Jastków","Herb gminy Łomazy","Herb gminy Baranowo","Herb gminy Baranów (powiat grodziski)","Herb gminy Bulkowo","Herb gminy Kamiennik","Herb gminy Białowieża","Herb gminy Węgierska Górka","Herb gminy Brodnica (powiat śremski)","Herb gminy Skulsk","Herb Kowar","Herb Pieszyc","Herb Polkowic","Herb Sobótki","Herb Świeradowa-Zdroju","Herb Wałbrzycha","Herb Barcina","Herb Cybinki","Herb Jasienia","Herb Słubic","Herb Wschowy","Herb Aleksandrowa Łódzkiego","Herb Bochni","Herb Grybowa","Herb Olkusza","Herb Piwnicznej-Zdroju","Herb Starego Sącza","Herb Wieliczki","Herb Wolbromia","Herb Zatora","Herb Siedlec","Herb Sierpca","Herb Sochaczewa","Herb Moniek","Herb Zabłudowa","Herb Gdyni","Herb Miastka","Herb Imielina","Herb Ogrodzieńca","Herb Rydułtów","Herb Ustronia","Herb Wojkowic","Herb Kielc","Herb Starachowic","Herb Staszowa","Herb Korsz","Herb Wielbarka","Herb Kościana","Herb Trzemeszna","Herb Witkowa","Herb Mieszkowic","Herb Mirosławca","Herb powiatu brzeskiego (małopolskiego)","Herb powiatu grajewskiego","Herb powiatu stargardzkiego"
        ]
      },
      {
        "name": "falcon",
        "phrases": [
         "sokoła",
         "sokół"
        ],
        "exclude": [
         "Herb Sokółki"
        ],
      },
      {
        "name": "heron",
        "phrases": [
         "czapla",
         "czaple",
         "czaplę",
         "czapli"
        ],
        "exclude": [
          "Herb Brzegu Dolnego",
          "Herb Mikołowa"
         ],
       },
       {
        "name": "crane",
        "phrases": [
         "żuraw",
         "żurawia",
         "żurawie"
        ],
        "exclude": [
          "Herb gminy Ostrówek (województwo lubelskie)",
          "Herb gminy Srokowo",
        ]
      },
      {
        "name": "raven",
        "phrases": [
         "kruk",
         "kruka",
         "kruki"
        ],
        "exclude": [
          "Herb Ozorkowa",
          "Herb Częstochowy"
        ]
      },
      {
        "name": "hawk",
        "phrases": [
         "jastrząb",
         "jastrzębia"
        ],
        "exclude": [
          "Herb Jastrzębia"
        ]
      },
      {
        "name": "owl",
        "phrases": [
         "sowa",
         "sowę"
        ],
      },
      {
        "name": "vulture",
        "phrases": [
         "sępie"
        ],
      },
      {
        "name": "pelican",
        "phrases": [
         "pelikan"
        ],
        "exclude": [
          "Herb gminy Radwanice",
          "Herb Muszyny",
          "Herb Kisielic"
        ]
      },
      {
        "name": "stork",
        "phrases": [
         "bocian",
         "bociany"
        ],
        "exclude": [
          "Herb gminy Drużbice",
          "Herb Makowa Mazowieckiego",
          "Herb Gdyni",
          "Herb Drawna"
        ]
      },
      {
        "name": "goose",
        "phrases": [
         "gęsią",
         "gęsie",
         "gęś"
        ],
        "exclude": [
          "Herb gminy Markowa"
        ]
      },
      {
        "name": "pigeon",
        "phrases": [
         "gołąb",
         "gołębia",
         "gołębie",
         "gołębiem"
        ],
      },
      {
        "name": "swan",
        "phrases": [
         "łabędzia",
         "łabędzie",
         "łabędź"
        ],
        "exclude": [
          "Herb Drawna"
        ]
      },
      {
        "name": "rooster",
        "phrases": [
         "kogut",
         "kogutami",
         "kogutem"
        ],
        "exclude": [
          "Herb gminy Zatory",
          "Herb Radoszyc"
        ],
      },
      {
        "name": "snake",
        "phrases": [
         "wąż",
         "weża",
         "weże"
        ],
        "exclude": [
          "Herb gminy Zbrosławice",
          "Herb Ornety"
        ],
        "include": [
          "Herb gminy Dubienka",
          "Herb Otwocka"
        ]
      },
      {
        "name": "rabbit",
        "phrases": [
         "królik",
         "królika",
         "króliki",
         "zając",
         "zająca"
        ],
        "exclude": [
          "Herb Opatówka"
        ]
      },
      {
        "name": "bat",
        "phrases": [
         "nietoperz",
         "nietoperze",
         "nietoperzem"
        ],
      },
      {
        "name": "griffin",
        "phrases": [
         "gryf",
         "gryfa",
         "gryfem",
         "poługryf",
         "połurybogryfa",
         "półgryf",
         "rybogryf",
         "rybogryfa"
        ],
        "include": [
          "Herb powiatu polickiego"
        ],
        "exclude": [
          "Herb gminy Bielice","Herb gminy Kołobrzeg","Herb Bobowej","Herb Mielca","Herb Białegostoku","Herb Bytomia","Herb Częstochowy","Herb Jędrzejowa","Herb Goleniowa","Herb Kołobrzegu","Herb Węgorzyna"
        ]
      },
      {
        "name": "boar",
        "phrases": [
         "dzik",
         "dzika",
         "dziki"
        ],
        "exclude": [
          "Herb gminy Łopiennik Górny","Herb gminy Wizna","Herb Boguszowa-Gorców","Herb Prabut","Herb Nidzicy","Herb Konina",
        ]
      },
      {
        "name": "deer",
        "phrases": [
         "daniela",
         "jelenia",
         "jelenią",
         "jelenie",
         "jelenim",
         "jeleń",
         "jelonek",
         "jelonków",
         "łani",
         "łania",
         "połujelenia",
         "poroże",
         "rosochy"
        ],
        "exclude": [
          "Herb Strzeleczek","Herb Wałbrzycha","Herb Janowa Lubelskiego","Herb Garwolina","Herb Siedlec","Herb Białegostoku","Herb Łazisk Górnych","Herb powiatu stalowowolskiego","Herb powiatu pilskiego"
        ],
        "include": [
          "Herb gminy Kozy","Herb Przysuchy","Herb powiatu mieleckiego","Herb powiatu monieckiego"
        ]
      },
      {
        "name": "moose",
        "phrases": [
         "łosia",
         "łosiem",
         "łoś"
        ],
        "exclude": [
          "Herb Supraśla"
        ]
      },
      {
        "name": "wildcat",
        "phrases": [
         "żbik"
        ],
      },
      {
        "name": "lion",
        "phrases": [
         "lew",
         "lwa",
         "lwami",
         "lwem",
         "lwów",
         "lwy",
         "lwy-",
         "połulew",
         "połulwa",
         "półlew",
         "półlewa",
         "półlwa"
        ],
        "exclude": [
          "Herb gminy Zawonia","Herb gminy Branice","Herb gminy Pruszcz Gdański","Herb gminy Milejewo","Herb Barcina","Herb Gubina","Herb Żagania","Herb Żar","Herb Żychlina","Herb Ciężkowic","Herb Gorlic","Herb Krakowa","Herb Piwnicznej-Zdroju","Herb Przysuchy","Herb Sierpca","Herb Tarczyna","Herb Zawadzkiego","Herb Leska","Herb Sędziszowa Małopolskiego","Herb Gdańska","Herb Tczewa","Herb Koszalina","Herb Szczecina","Herb powiatu prudnickiego"
        ]
      },
      {
        "name": "bullBison",
        "phrases": [
         "bawolą",
         "bawoli",
         "bawolim",
         "bawoła",
         "bawołu",
         "byczka",
         "byk",
         "byka",
         "ciołek",
         "ciołka",
         "połubyk",
         "tur",
         "tura",
         "woła",
         "wołu",
         "żubr",
         "żubra",
         "żubrza",
         "żubrzą"
        ],
        "exclude": ["Herb Grudziądza","Herb Poniatowej","Herb Drzewicy","Herb Przysuchy","Herb Jedlicza","Herb Rudnika nad Sanem","Herb Moniek"],
        "include": [
          "Herb gminy Chojnice","Herb gminy Gołuchów","Herb powiatu mieleckiego",
        ]
      },
      {
        "name": "dragon",
        "phrases": [
         "smok",
         "smoka",
         "smokiem"
        ],
        "exclude": [
          "Herb Tucholi","Herb Gdyni","Herb Tczewa"
        ]
      },
      {
        "name": "fish",
        "phrases": [
         "karp",
         "karpia",
         "karpiami",
         "karpiem",
         "leszcza",
         "leszcze",
         "łososia",
         "łosoś",
         "półryby",
         "ryba",
         "rybami",
         "rybą",
         "rybę",
         "rybo",
         "rybogryfa",
         "rybopodobne",
         "ryby",
         "suma",
         "szczupak"
        ],
        "exclude": [
          "Herb gminy Korzenna", "Herb gminy Baligród", "Herb gminy Kosakowo", "Herb gminy Kościerzyna", "Herb Szklarskiej Poręby", "Herb Sępólna Krajeńskiego", "Herb Chorzel", "Herb Helu", "Herb Elbląga", "Herb powiatu brodnickiego"
        ]
      },
      {
        "name": "bee",
        "phrases": [
          "pszczoła",
          "pszczołami",
          "pszczołę",
          "pszczoły",
          "pszczół"
         ],
        "exclude": [
          "Herb Zduńskiej Woli"
        ]
      },
      {
        "name": "mermaid",
        "phrases": [
          "syrena",
          "syreną",
          "syrenę"
        ],
        "exclude": [
          "Herb Lubniewic",
        ]
      },
      {
        "name": "fox",
        "phrases": [
         "lis",
         "lisa",
         "lisami",
         "lisem"
        ],
        "exclude": [
          "Herb gminy Cieszków","Herb gminy Kodeń","Herb gminy Sosnówka","Herb gminy Łańcut","Herb gminy Nowa Wieś Lęborska","Herb gminy Irządze","Herb gminy Czarnocin (województwo świętokrzyskie)","Herb gminy Radków (województwo świętokrzyskie)","Herb gminy Słupia (powiat jędrzejowski)","Herb Bobowej","Herb Siemiatycz","Herb Jędrzejowa"
        ]
      },
      {
        "name": "lizard",
        "phrases": [
         "jaszczurka",
         "jaszuczurki"
        ],
        "include": [
          "Herb gminy Lisewo","Herb gminy Ryńsk"
        ]
      },
      {
        "name": "dog",
        "phrases": [
         "pies",
         "psa",
         "psy"
        ],
        "exclude": [
          "Herb gminy Sułoszowa","Herb gminy Kulesze Kościelne","Herb Pieszyc","Herb Sycowa","Herb Korfantowa"
        ]
      },
      {
        "name": "crayfish",
        "phrases": [
         "rak",
         "raka",
         "rakiem"
        ],
        "exclude": [
          "Herb Rakoniewic"
        ]
      },
      {
        "name": "horse",
        "phrases": [
         "konia",
         "konie",
         "koniu",
         "koń",
         "końska",
         "rumak",
         "rumaku",
         "starykoń"
        ],
        "include": [
          "Herb gminy Gołuchów"
        ]
      },
      {
        "name": "unicorn",
        "phrases": [
         "jednorożca",
         "jednorożcami",
         "jednorożcem",
         "jednorożec"
        ],
        "include": [
          "Herb gminy Wądroże Wielkie","Herb gminy Lubsza"
        ]
      },
      {
        "name": "goat",
        "phrases": [
         "kosłem",
         "koza",
         "kozę",
         "kozie",
         "koziołek",
         "koziołki",
         "kozła",
         "kozłem",
         "kozłów",
         "kozy",
         "koźłów",
         "kózm kozie"
        ],
        "exclude": [
          "Herb gminy Abramów"
        ]
      },
      {
        "name": "wolf",
        "phrases": [
         "połuwilk",
         "półwilk",
         "wilk",
         "wilka",
         "wilki",
         "wilkiem",
         "wilków"
        ],
        "exclude": [
          "Herb gminy Łomazy",
          "Herb Pabianic",
          "Herb Mrągowa",
          "Herb Węgorzyna"
        ]
      },
      {
        "name": "squirrel",
        "phrases": [
         "wiewiórka",
         "wiewiórkę"
        ],
      },
      {
        "name": "insect",
        "phrases": [
         "konik polny"
        ],
      },
      {
        "name": "amphisbaena",
        "phrases": [
         "amfisbaena",
         "amfisbaenę"
        ],
      },
      {
        "name": "donkey",
        "phrases": [
         "osioł",
         "osła",
         "oślej"
        ],
      },
      {
        "name": "centaur",
        "phrases": [
         "centaur",
         "centaura"
        ],
      },
      {
        "name": "bear",
        "phrases": [
         "niedźwiedzia",
         "niedźwiedziem",
         "niedźwiedziu",
         "niedźwiedź"
        ],
        "include": [
          "Herb gminy Siedlce",
        ],
        "exclude": [
          "Herb Sobótki","Herb Janowa Lubelskiego","Herb Moniek","Herb Szczekocin"
        ]
      },
      {
        "name": "beaver",
        "phrases": [
          "bobra",
          "bobrem",
          "bobry",
          "bóbr"
        ],
        "exclude": [
          "Herb gminy Łomża"
        ],
      },
    ],
    items: [],
  }

  return {
    animals,
    items,
  };
};

type Props = FetchParmas & {
  setCustomFilter: (filter?: MarkerParamsWithResult) => void
};

const DevelopmentPaneAppFilters = ({
  country,
  setCustomFilter,
}: Props) => {
  const [pickedFilter, setPickedFilter] = useState<MarkerParams | undefined>(undefined);
  const { t } = useTranslation();

  const {
    isLoading,
    isError,
    error,
    data,
  } = useQuery({
    queryFn: () => fetchData({ country }),
    queryKey: ['filter', country],
    staleTime: 5 * 60 * 1000,
  });

  const handleClick = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = (event.target.value || '');
    const [type, indexString] = value.split('-');
    const index = Number(indexString);

    if (data && type === 'animal') {
      setPickedFilter(data.animals[index]);
    } else if (data && type === 'item') {
      setPickedFilter(data.items[index]);
    } else {
      setPickedFilter(undefined);
    }
  }, [data]);

  if (isError) {
    console.log('error', error);
  }

  return (
    <Pane className="fixed left-12 mt-3 w-[400px] max-h-[calc(100%_-_1.5rem)] overflow-auto top-0 ml-6">
      <h3 className="flex gap-3 items-center">
        <IconSelected className="size-5" />
        <span>
          App filters
        </span>
      </h3>
      <div className="sans text-[14px] flex flex-col gap-2 text-right">
        <p>
          You can read about the filters
          {' '}
          <a
            href="https://github.com/Deykun/maps/blob/main/docs/FILTERS.md"
            target="_blank"
            className="font-[500] text-[#d2543a]"
          >
            here
          </a>
          {'. '}
        </p>
      </div>
        <select
          disabled={isLoading}
          onChange={handleClick}
          className={clxs('sans w-full p-1 px-2 text-[14px] bg-white border', {
            'rounded-b-[4px]': !pickedFilter
          })}
        >
          <option>Pick filter</option>
          {data && <>
            {data.animals.map(({ name }, index) => (
              <option
                key={name}
                value={`animal-${index}`}
              >
                {t('heraldry.animal.filterTitle')}: {t(`heraldry.animal.${name}`)}
              </option>
            ))}
            {data.items.map(({ name }, index) => (
              <option
                key={name}
                value={`item-${index}`}
              >
                {t('heraldry.item.filterTitle')}: {t(`heraldry.item.${name}`)}
              </option>
            ))}
          </>}
        </select>
        
        <div className="flex gap-2">
          <Button
            onClick={() => pickedFilter ? setCustomFilter(pickedFilter) : {}}
            wrapperClassName="ml-auto"
            isDisabled={!pickedFilter}
          >
            <span>Use</span>
            <IconSelectNew />
          </Button>
      </div>
        {pickedFilter && <DevelopmentPaneSnippet {...pickedFilter} />}
    </Pane>
  );
}

export default DevelopmentPaneAppFilters;
