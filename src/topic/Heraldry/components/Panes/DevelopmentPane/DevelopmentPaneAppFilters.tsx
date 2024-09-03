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
         "godła polski",
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
        "exclude": [
         "Herb gminy Grębocice",
         "Herb Kamieńca Ząbkowickiego",
         "Herb gminy Malczyce",
         "Herb Siechnic",
         "Herb gminy Golub-Dobrzyń",
         "Herb gminy Jastków",
         "Herb gminy Łomazy",
         "Herb gminy Baranowo",
         "Herb gminy Baranów (powiat grodziski)",
         "Herb gminy Bulkowo",
         "Herb gminy Kamiennik",
         "Herb gminy Białowieża",
         "Herb gminy Węgierska Górka",
         "Herb gminy Brodnica (powiat śremski)",
         "Herb gminy Skulsk",
         "Herb Kowar",
         "Herb Pieszyc",
         "Herb Polkowic",
         "Herb Sobótki",
         "Herb Świeradowa-Zdroju",
         "Herb Wałbrzycha",
         "Herb Barcina",
         "Herb Cybinki",
         "Herb Jasienia",
         "Herb Słubic",
         "Herb Wschowy",
         "Herb Aleksandrowa Łódzkiego",
         "Herb Bochni",
         "Herb Grybowa",
         "Herb Olkusza",
         "Herb Piwnicznej-Zdroju",
         "Herb Starego Sącza",
         "Herb Wieliczki",
         "Herb Wolbromia",
         "Herb Zatora",
         "Herb Siedlec",
         "Herb Sierpca",
         "Herb Sochaczewa",
         "Herb Moniek",
         "Herb Zabłudowa",
         "Herb Gdyni",
         "Herb Miastka",
         "Herb Imielina",
         "Herb Ogrodzieńca",
         "Herb Rydułtów",
         "Herb Ustronia",
         "Herb Wojkowic",
         "Herb Kielc",
         "Herb Starachowic",
         "Herb Staszowa",
         "Herb Korsz",
         "Herb Wielbarka",
         "Herb Kościana",
         "Herb Trzemeszna",
         "Herb Witkowa",
         "Herb Mieszkowic",
         "Herb Mirosławca",
         "Herb powiatu strzelecko-drezdeneckiego",
         "Herb powiatu brzeskiego (małopolskiego)",
         "Herb powiatu grajewskiego",
         "Herb powiatu pyrzyckiego",
         "Herb powiatu stargardzkiego"
        ],
        "include": [
         "Herb powiatu żyrardowskiego"
        ],
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
         "łani",
         "łania",
         "poroże",
         "rosochy"
        ],
        "include": [
          "Herb gminy Miłkowice","Herb powiatu kraśnickiego","Herb powiatu mieleckiego" 
        ],
        "exclude": [
          "Herb gminy Łanięta","Herb Strzeleczek","Herb Kowar","Herb Wałbrzycha","Herb Janowa Lubelskiego","Herb Garwolina","Herb Siedlec","Herb Białegostoku","Herb Łazisk Górnych","Herb Jabłonkowa","Herb powiatu stalowowolskiego","Herb powiatu pilskiego"
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
         "lwami",
         "lwem",
         "lwów",
         "lwy",
         "lwy-",
         "połulew",
         "połulwa",
         "półlew",
         "półlwa"
        ],
        "exclude": [
          "Herb gminy Bolesławiec (województwo dolnośląskie)","Herb gminy Chojnów","Herb gminy Czernica","Herb gminy Domaniów","Herb gminy Dzierżoniów","Herb gminy Głogów","Herb gminy Kamienna Góra","Herb gminy Kobierzyce","Herb gminy Kondratowice","Herb gminy Kostomłoty","Herb gminy Krośnice","Herb gminy Kunice","Herb gminy Lewin Kłodzki","Herb gminy Lubin","Herb gminy Malczyce","Herb gminy Marciszów","Herb gminy Mietków","Herb Miękini","Herb gminy Miłkowice","Herb gminy Osiecznica","Herb gminy Sulików","Herb gminy Pęcław","Herb gminy Rudna","Herb gminy Walim","Herb gminy Zagrodno","Herb gminy Zawonia","Herb gminy Bartniczka","Herb gminy Baruchowo","Herb gminy Białe Błota","Herb gminy Brodnica (powiat brodnicki)","Herb gminy Choceń","Herb gminy Czernikowo","Herb gminy Dębowa Łąka","Herb gminy Dobrcz","Herb gminy Grudziądz","Herb gminy Gruta","Herb gminy Koneck","Herb gminy Kowal","Herb gminy Lubicz","Herb gminy Lubiewo","Herb gminy Łubianka","Herb gminy Łysomice","Herb gminy Osielsko","Herb gminy Rogóźno","Herb gminy Śliwice","Herb gminy Waganiec","Herb gminy Wielgie","Herb gminy Zakrzewo (powiat aleksandrowski)","Herb gminy Zbiczno","Herb gminy Adamów (powiat łukowski)","Herb gminy Baranów (powiat puławski)","Herb gminy Bełżec","Herb gminy Dorohusk","Herb gminy Gorzków","Herb gminy Gościeradów","Herb gminy Hanna","Herb gminy Jastków","Herb gminy Jeziorzany","Herb gminy Karczmiska","Herb gminy Leśna Podlaska","Herb gminy Lubartów","Herb gminy Łaziska","Herb gminy Łomazy","Herb gminy Markuszów","Herb gminy Mełgiew","Herb gminy Międzyrzec Podlaski","Herb gminy Milejów","Herb gminy Mircze","Herb gminy Niedrzwica Duża","Herb gminy Ostrówek (województwo lubelskie)","Herb gminy Potok Wielki","Herb gminy Puchaczów","Herb gminy Puławy","Herb gminy Rejowiec Fabryczny","Herb gminy Sitno","Herb gminy Sosnowica","Herb gminy Sosnówka","Herb gminy Stanin","Herb gminy Szastarka","Herb gminy Telatyn","Herb gminy Terespol","Herb gminy Tereszpol","Herb gminy Trawniki","Herb gminy Wojsławice","Herb gminy Zakrzówek","Herb gminy Żyrzyn","Herb gminy Bobrowice","Herb gminy Brzeźnica (powiat żagański)","Herb gminy Bytnica","Herb gminy Dąbie (województwo lubuskie)","Herb gminy Deszczno","Herb gminy Krzeszyce","Herb gminy Lipinki Łużyckie","Herb gminy Lubiszyn","Herb gminy Lubrza (województwo lubuskie)","Herb gminy Nowa Sól","Herb gminy Zwierzyn","Herb gminy Żagań","Herb gminy Aleksandrów (województwo łódzkie)","Herb Bolesławca (województwo łódzkie)","Herb gminy Brojce","Herb gminy Brzeźnio","Herb gminy Czerniewice","Herb gminy Dłutów","Herb gminy Dmosin","Herb gminy Dobroń","Herb gminy Drużbice","Herb gminy Góra Świętej Małgorzaty","Herb gminy Kleszczów","Herb gminy Kluki","Herb gminy Kobiele Wielkie","Herb gminy Kocierzew Południowy","Herb gminy Lipce Reymontowskie","Herb Lututowa","Herb gminy Nowosolna","Herb Parzęczewa","Herb gminy Rawa Mazowiecka","Herb gminy Rokiciny","Herb gminy Rząśnia","Herb gminy Rzeczyca","Herb gminy Słupia (województwo łódzkie)","Herb gminy Szczerców","Herb gminy Wróblew","Herb gminy Biały Dunajec","Herb gminy Biskupice","Herb gminy Bochnia","Herb gminy Chełmiec","Herb gminy Kamionka Wielka","Herb Koszyc (województwo małopolskie)","Herb gminy Krościenko nad Dunajcem","Herb gminy Laskowa","Herb gminy Lipnica Wielka","Herb gminy Łapanów","Herb gminy Łącko","Herb gminy Łużna","Herb gminy Mędrzechów","Herb gminy Mszana Dolna","Herb gminy Mucharz","Herb gminy Nowy Targ","Herb gminy Pałecznica","Herb gminy Rzepiennik Strzyżewski","Herb gminy Słaboszów","Herb gminy Spytkowice (powiat wadowicki)","Herb gminy Stryszów","Herb gminy Szaflary","Herb gminy Szczurowa","Herb gminy Tarnów","Herb gminy Wielka Wieś","Herb gminy Wiśniowa (województwo małopolskie)","Herb gminy Zabierzów","Herb gminy Zawoja","Herb gminy Zembrzyce","Herb gminy Żegocina","Herb gminy Andrzejewo","Herb gminy Belsk Duży","Herb gminy Bielsk","Herb gminy Brańszczyk","Herb gminy Chlewiska","Herb gminy Chynów","Herb gminy Czarnia","Herb gminy Czernice Borowe","Herb gminy Długosiodło","Herb gminy Garbatka-Letnisko","Herb Gielniowa","Herb Glinojecka","Herb gminy Grudusk","Herb gminy Jabłonna (województwo mazowieckie)","Herb gminy Jakubów","Herb gminy Klembów","Herb gminy Krasnosielc","Herb gminy Krzynowłoga Mała","Herb gminy Lesznowola","Herb gminy Liw","Herb gminy Łąck","Herb gminy Mirów","Herb gminy Mochowo","Herb Mrozów","Herb Mszczonowa","Herb gminy Nowa Sucha","Herb Nowego Miasta (powiat płoński)","Herb gminy Nowy Duninów","Herb gminy Orońsko","Herb gminy Pacyna","Herb gminy Pionki","Herb gminy Potworów","Herb gminy Przyłęk","Herb gminy Raszyn","Herb gminy Rościszewo","Herb gminy Rząśnik","Herb gminy Sadowne","Herb Sienna","Herb gminy Słubice (województwo mazowieckie)","Herb gminy Słupno","Herb gminy Stary Lubotyń","Herb gminy Sterdyń","Herb gminy Szulborze Wielkie","Herb gminy Troszyn","Herb gminy Wieniawa","Herb gminy Wolanów","Herb gminy Zabrodzie","Herb gminy Zakrzew (województwo mazowieckie)","Herb gminy Bierawa","Herb gminy Branice","Herb gminy Dobrzeń Wielki","Herb gminy Domaszowice","Herb gminy Izbicko","Herb gminy Jemielnica","Herb gminy Kamiennik","Herb Kolonowskiego","Herb gminy Komprachcice","Herb gminy Lubrza (województwo opolskie)","Herb gminy Łambinowice","Herb gminy Łubniany","Herb gminy Pakosławice","Herb gminy Pokój","Herb gminy Polska Cerekiew","Herb gminy Świerczów","Herb gminy Walce","Herb gminy Białobrzegi (województwo podkarpackie)","Herb gminy Cmolas","Herb gminy Czermin (województwo podkarpackie)","Herb Dubiecka","Herb gminy Dydnia","Herb gminy Gać","Herb gminy Harasiuki","Herb gminy Jarosław","Herb gminy Jodłowa","Herb gminy Osiek Jasielski","Herb gminy Pysznica","Herb gminy Sanok","Herb gminy Skołyszyn","Herb gminy Tryńcza","Herb gminy Trzebownisko","Herb gminy Wiśniowa (województwo podkarpackie)","Herb gminy Zarzecze","Herb gminy Białowieża","Herb gminy Czyże","Herb gminy Dubicze Cerkiewne","Herb gminy Dziadkowice","Herb gminy Giby","Herb gminy Grajewo","Herb gminy Gródek","Herb gminy Kulesze Kościelne","Herb gminy Łomża","Herb gminy Nowe Piekuty","Herb gminy Sztabin","Herb gminy Szumowo","Herb gminy Wizna","Herb gminy Wiżajny","Herb gminy Bobowo","Herb gminy Cedry Wielkie","Herb gminy Chojnice","Herb gminy Czarna Dąbrówka","Herb gminy Kobylnica","Herb gminy Koczała","Herb gminy Kościerzyna","Herb gminy Lichnowy","Herb gminy Luzino","Herb gminy Łęczyce","Herb gminy Mikołajki Pomorskie","Herb gminy Pruszcz Gdański","Herb gminy Przodkowo","Herb gminy Ryjewo","Herb gminy Subkowy","Herb gminy Szemud","Herb gminy Tuchomie","Herb gminy Wejherowo","Herb gminy Bobrowniki (województwo śląskie)","Herb gminy Bojszowy","Herb gminy Dąbrowa Zielona","Herb gminy Gierałtowice","Herb gminy Goczałkowice-Zdrój","Herb gminy Herby","Herb gminy Irządze","Herb gminy Kornowac","Herb gminy Koszęcin","Herb gminy Miedźna","Herb gminy Miedźno","Herb gminy Mykanów","Herb gminy Nędza","Herb gminy Opatów (powiat kłobucki)","Herb gminy Ornontowice","Herb gminy Pilchowice","Herb gminy Przystajń","Herb gminy Psary","Herb gminy Rudnik (województwo śląskie)","Herb gminy Rudziniec","Herb gminy Świerklaniec","Herb gminy Węgierska Górka","Herb Włodowic","Herb gminy Zbrosławice","Herb gminy Zebrzydowice","Herb gminy Bejsce","Herb gminy Imielno","Herb gminy Łączna","Herb Łopuszna","Herb gminy Masłów","Herb gminy Miedziana Góra","Herb gminy Mirzec","Herb Morawicy","Herb gminy Nowiny","Herb Oleśnicy (województwo świętokrzyskie)","Herb gminy Słupia (powiat jędrzejowski)","Herb gminy Strawczyn","Herb gminy Tuczępy","Herb gminy Złota","Herb gminy Jedwabno","Herb gminy Jonkowo","Herb gminy Płoskinia","Herb gminy Prostki","Herb gminy Rychliki","Herb gminy Srokowo","Herb gminy Świętajno (powiat olecki)","Herb gminy Świętajno (powiat szczycieński)","Herb gminy Kętrzyn","Herb gminy Blizanów","Herb gminy Bralin","Herb gminy Brzeziny (województwo wielkopolskie)","Herb Czerniejewa","Herb gminy Damasławek","Herb gminy Dominowo","Herb gminy Gniezno","Herb gminy Granowo","Herb Kaczor","Herb gminy Komorniki","Herb gminy Krzemieniewo","Herb gminy Lipno (powiat leszczyński)","Herb Miasteczka Krajeńskiego","Herb gminy Mieleszyn","Herb Mieściska","Herb Opatówka","Herb gminy Orchowo","Herb gminy Ostrów Wielkopolski","Herb gminy Perzów","Herb gminy Pępowo","Herb gminy Przygodzice","Herb gminy Rokietnica (województwo wielkopolskie)","Herb gminy Rozdrażew","Herb Rychtala","Herb gminy Białośliwie","Herb gminy Strzałkowo","Herb gminy Szczytniki","Herb gminy Święciechowa","Herb gminy Wągrowiec","Herb gminy Wierzbinek","Herb gminy Zakrzewo (powiat złotowski)","Herb gminy Złotów","Herb gminy Banie","Herb gminy Białogard","Herb gminy Bielice","Herb gminy Dolice","Herb gminy Dygowo","Herb gminy Kołbaskowo","Herb gminy Krzęcin","Herb Mielna","Herb gminy Osina","Herb gminy Przelewice","Herb gminy Przybiernów","Herb gminy Rąbino","Herb gminy Sławno (województwo zachodniopomorskie)","Herb gminy Stara Dąbrowa","Herb Stepnicy","Herb gminy Szczecinek","Herb gminy Świeszyno","Herb Barda","Herb Bogatyni","Herb Boguszowa-Gorców","Herb Bolkowa","Herb Brzegu Dolnego","Herb Chojnowa","Herb Dusznik-Zdroju","Herb Góry","Herb Jawora","Herb Kamiennej Góry","Herb Karpacza","Herb Kowar","Herb Lubomierza","Herb Milicza","Herb Nowogrodźca","Herb Olszyny","Herb Oławy","Herb Piechowic","Herb Pieńska","Herb Pieszyc","Herb Piławy Górnej","Herb Polkowic","Herb Prochowic","Herb Prusic","Herb Srebrnej Góry","Herb Strzegomia","Herb Strzelina","Herb Szklarskiej Poręby","Herb Środy Śląskiej","Herb Świebodzic","Herb Świeradowa-Zdroju","Herb Twardogóry","Herb Wałbrzycha","Herb Wąsosza","Herb Wojcieszowa","Herb Zawidowa","Herb Zgorzelca","Herb Ziębic","Herb Złotego Stoku","Herb Żarowa","Herb Żmigrodu","Herb Barcina","Herb Dobrzynia nad Wisłą","Herb Golubia-Dobrzynia","Herb Grudziądza","Herb Janikowa","Herb Janowca Wielkopolskiego","Herb Kcyni","Herb Kowala","Herb Kruszwicy","Herb Pakości","Herb Piotrkowa Kujawskiego","Herb Solca Kujawskiego","Herb Torunia","Herb Tucholi","Herb Włocławka","Herb Annopola","Herb Białej Podlaskiej","Herb Biłgoraja","Herb Józefowa (powiat biłgorajski)","Herb Krasnegostawu","Herb Lubartowa","Herb Międzyrzeca Podlaskiego","Herb Nałęczowa","Herb Poniatowej","Herb Radzynia Podlaskiego","Herb Tyszowiec","Herb Włodawy","Herb Zamościa","Herb Bytomia Odrzańskiego","Herb Cybinki","Herb Gubina","Herb Iłowej","Herb Kostrzyna nad Odrą","Herb Krosna Odrzańskiego","Herb Łęknicy","Herb Nowej Soli","Herb Rzepina","Herb Słubic","Herb Strzelec Krajeńskich","Herb Sulęcina","Herb Witnicy","Herb Zbąszynka","Herb Zielonej Góry","Herb Żagania","Herb Żar","Herb Bełchatowa","Herb Koluszek","Herb Łęczycy","Herb Ozorkowa","Herb Radomska","Herb Wolborza","Herb Zelowa","Herb Żychlina","Herb Andrychowa","Herb Biecza","Herb Bochni","Herb Chrzanowa","Herb Ciężkowic","Herb Kęt","Herb Libiąża","Herb Limanowej","Herb Miechowa","Herb Muszyny","Herb Myślenic","Herb Nowego Sącza","Herb Nowego Targu","Herb Piwnicznej-Zdroju","Herb Rabki-Zdroju","Herb Słomnik","Herb Wadowic","Herb Wieliczki","Herb Chorzel","Herb Ciechanowa","Herb Garwolina","Herb Halinowa","Herb Józefowa (powiat otwocki)","Herb Karczewa","Herb Lipska (województwo mazowieckie)","Herb Milanówka","Herb Mławy","Herb Mogielnicy","Herb Nowego Miasta nad Pilicą","Herb Ostrowi Mazowieckiej","Herb Otwocka","Herb Ożarowa Mazowieckiego","Herb Przysuchy","Herb Pułtuska","Herb Radomia","Herb Serocka","Herb Siedlec","Herb Sierpca","Herb Sulejówka","Herb Szydłowca","Herb Tarczyna","Herb Tłuszcza","Herb Warszawy","Herb Węgrowa","Herb Wołomina","Herb Ząbek","Herb Zwolenia (powiat zwoleński)","Herb Baborowa","Herb Białej","Herb Dobrodzienia","Herb Namysłowa","Herb Niemodlina","Herb Nysy","Herb Olesna","Herb Opola","Herb Ozimka","Herb Prószkowa","Herb Strzelec Opolskich","Herb Zawadzkiego","Herb Błażowej","Herb Dębicy","Herb Jedlicza","Herb Leska","Herb Mielca","Herb Narola","Herb Rudnika nad Sanem","Herb Sanoka","Herb Stalowej Woli","Herb Strzyżowa","Herb Tyczyna","Herb Augustowa","Herb Białegostoku","Herb Choroszczy","Herb Czarnej Białostockiej","Herb Drohiczyna (Polska)","Herb Hajnówki","Herb Kleszczel","Herb Łap","Herb Michałowa","Herb Sejn","Herb Siemiatycz","Herb Supraśla","Herb Suwałk","Herb Zabłudowa","Herb Czarnego","Herb Człuchowa","Herb Debrzna","Herb Dzierzgonia","Herb Gdańska","Herb Kościerzyny","Herb Kwidzyna","Herb Redy","Herb Rumi","Herb Sztumu","Herb Skórcza","Herb Tczewa","Herb Ustki","Herb Bielska-Białej","Herb Bierunia","Herb Blachowni","Herb Bytomia","Herb Chorzowa","Herb Czerwionki-Leszczyn","Herb Dąbrowy Górniczej","Herb Gliwic","Herb Jaworzna","Herb Kalet","Herb Katowic","Herb Koniecpola","Herb Krzepic","Herb Kuźni Raciborskiej","Herb Mikołowa","Herb Ogrodzieńca","Herb Olsztyna (województwo śląskie)","Herb Piekar Śląskich","Herb Pszczyny","Herb Pszowa","Herb Raciborza","Herb Radzionkowa","Herb Rudy Śląskiej","Herb Siemianowic Śląskich","Herb Siewierza","Herb Sławkowa","Herb Sosnowca","Herb Świętochłowic","Herb Tarnowskich Gór","Herb Toszka","Herb Ustronia","Herb Wisły","Herb Wodzisławia Śląskiego","Herb Wojkowic","Herb Woźnik","Herb Zawiercia","Herb Żor","Herb Jabłonkowa","Herb Opatowca","Herb Osieka","Herb Pacanowa","Herb Sandomierza","Herb Skarżyska-Kamiennej","Herb Stąporkowa","Herb Starachowic","Herb Wiślicy","Herb Włoszczowy","Herb Braniewa","Herb Dobrego Miasta","Herb Działdowa","Herb Elbląga","Herb Ełku","Herb Gołdapi","Herb Górowa Iławeckiego","Herb Lubawy","Herb Morąga","Herb Mrągowa","Herb Nidzicy","Herb Olecka","Herb Olsztyna","Herb Olsztynka","Herb Pasłęka","Herb Pasymia","Herb Pisza","Herb Sępopola","Herb Susza","Herb Szczytna","Herb Czempinia","Herb Goliny","Herb Grodziska Wielkopolskiego","Herb Konina","Herb Kostrzyna","Herb Krajenki","Herb Krobi","Herb Krotoszyna","Herb Leszna","Herb Lubonia","Herb Murowanej Gośliny","Herb Pobiedzisk","Herb Ponieca","Herb Poznania","Herb Przedcza","Herb Raszkowa","Herb Rogoźna","Herb Rychwała","Herb Sompolna","Herb Stawiszyna","Herb Ślesina","Herb Trzemeszna","Herb Wielenia","Herb Wielichowa","Herb Wolsztyna","Herb Wronek","Herb Wyrzyska","Herb Złotowa","Herb Barwic","Herb Bobolic","Herb Cedyni","Herb Czaplinka","Herb Drawna","Herb Kołobrzegu","Herb Koszalina","Herb Lipian","Herb Międzyzdrojów","Herb Morynia","Herb Nowego Warpna","Herb Połczyna-Zdroju","Herb Sławna","Herb Stargardu","Herb Świdwina","Herb Szczecina","Herb Tuczna","Herb Tychowa","Herb Wolina","Herb powiatu bolesławieckiego","Herb powiatu dzierżoniowskiego","Herb powiatu jaworskiego","Herb powiatu kamiennogórskiego","Herb powiatu kłodzkiego","Herb powiatu karkonoskiego","Herb powiatu legnickiego","Herb powiatu lubańskiego","Herb powiatu oleśnickiego","Herb powiatu polkowickiego","Herb powiatu strzelińskiego","Herb powiatu średzkiego (dolnośląskiego)","Herb powiatu wołowskiego","Herb powiatu zgorzeleckiego","Herb powiatu ząbkowickiego","Herb powiatu złotoryjskiego","Herb powiatu nakielskiego","Herb powiatu tucholskiego","Herb powiatu bialskiego","Herb powiatu lubartowskiego","Herb powiatu parczewskiego","Herb powiatu puławskiego","Herb powiatu włodawskiego","Herb powiatu krośnieńskiego (województwo lubuskie)","Herb powiatu nowosolskiego","Herb powiatu słubickiego","Herb powiatu strzelecko-drezdeneckiego","Herb powiatu wschowskiego","Herb powiatu zielonogórskiego","Herb powiatu żagańskiego","Herb powiatu żarskiego","Herb powiatu łowickiego","Herb powiatu opoczyńskiego","Herb powiatu wieluńskiego","Herb powiatu zduńskowolskiego","Herb powiatu bocheńskiego","Herb powiatu chrzanowskiego","Herb powiatu miechowskiego","Herb powiatu nowosądeckiego","Herb powiatu nowotarskiego","Herb powiatu proszowickiego","Herb powiatu białobrzeskiego","Herb powiatu grodziskiego (mazowieckiego)","Herb powiatu gostynińskiego","Herb powiatu legionowskiego","Herb powiatu łosickiego","Herb powiatu mińskiego","Herb powiatu mławskiego","Herb powiatu otwockiego","Herb powiatu płockiego","Herb powiatu pruszkowskiego","Herb powiatu przasnyskiego","Herb powiatu przysuskiego","Herb powiatu sochaczewskiego","Herb powiatu szydłowieckiego","Herb powiatu wołomińskiego","Herb powiatu węgrowskiego","Herb powiatu zwoleńskiego","Herb powiatu żuromińskiego","Herb powiatu żyrardowskiego","Herb powiatu nyskiego","Herb powiatu oleskiego","Herb powiatu opolskiego (opolskiego)","Herb powiatu prudnickiego","Herb powiatu strzeleckiego","Herb powiatu kolbuszowskiego","Herb powiatu leżajskiego","Herb powiatu niżańskiego","Herb powiatu ropczycko-sędziszowskiego","Herb powiatu stalowowolskiego","Herb powiatu augustowskiego","Herb powiatu białostockiego","Herb powiatu grajewskiego","Herb powiatu łomżyńskiego","Herb powiatu monieckiego","Herb powiatu siemiatyckiego","Herb powiatu sokólskiego","Herb powiatu zambrowskiego","Herb powiatu człuchowskiego","Herb powiatu kościerskiego","Herb powiatu nowodworskiego (pomorskiego)","Herb powiatu słupskiego","Herb powiatu tczewskiego","Herb powiatu bielskiego (województwo śląskie)","Herb powiatu bieruńsko-lędzińskiego","Herb powiatu myszkowskiego","Herb powiatu raciborskiego","Herb powiatu wodzisławskiego","Herb powiatu zawierciańskiego","Herb powiatu żywieckiego","Herb powiatu kazimierskiego","Herb powiatu włoszczowskiego","Herb powiatu braniewskiego","Herb powiatu kętrzyńskiego","Herb powiatu ostródzkiego","Herb powiatu szczycieńskiego","Herb powiatu czarnkowsko-trzcianeckiego","Herb powiatu kościańskiego","Herb powiatu konińskiego","Herb powiatu nowotomyskiego","Herb powiatu poznańskiego","Herb powiatu szamotulskiego","Herb powiatu śremskiego","Herb powiatu tureckiego","Herb powiatu wągrowieckiego","Herb powiatu wolsztyńskiego","Herb powiatu złotowskiego","Herb powiatu drawskiego","Herb powiatu goleniowskiego","Herb powiatu gryfickiego","Herb powiatu gryfińskiego","Herb powiatu kołobrzeskiego","Herb powiatu łobeskiego","Herb powiatu myśliborskiego","Herb powiatu pyrzyckiego","Herb powiatu stargardzkiego","Herb powiatu świdwińskiego","Herb województwa lubuskiego","Herb województwa podlaskiego","Herb województwa pomorskiego"
        ],
        "include": [
          "Herb gminy Bądkowo","Herb gminy Włocławek","Herb gminy Garbów","Herb gminy Trzeszczany","Herb gminy Wierzbica (powiat chełmski)","Herb gminy Żytno","Herb gminy Brzeźnica (powiat wadowicki)","Herb gminy Gorlice","Herb gminy Pcim","Herb gminy Iłów","Herb gminy Parysów","Herb gminy Przasnysz","Herb gminy Radzanowo","Herb gminy Szczawin Kościelny","Herb gminy Zaręby Kościelne","Herb gminy Krościenko Wyżne","Herb gminy Nowy Dwór","Herb gminy Przerośl","Herb gminy Puck","Herb gminy Marklowice","Herb gminy Władysławów","Herb Polanicy-Zdroju","Herb Łaszczowa","Herb Jasienia","Herb Radłowa","Herb Nasielska","Herb Kietrza","Herb Krosna","Herb Radomyśla Wielkiego","Herb Działoszyc","Herb Pogorzeli","Herb Dębna","Herb powiatu kutnowskiego","Herb powiatu gorlickiego","Herb powiatu bieszczadzkiego"
        ]
      },
      {
        "name": "bullBisson",
        "phrases": [
         "bawoli",
         "byczka",
         "byk",
         "ciołek",
         "ciołka",
         "połubyk",
         "tur",
         "tura",
         "woła",
         "wołu",
         "żubr"
        ],
        "exclude": [
          "Herb gminy Ciepłowody","Herb Kamieńca Ząbkowickiego","Herb gminy Kłodzko","Herb gminy Aleksandrów Kujawski","Herb gminy Zakrzewo (powiat aleksandrowski)","Herb gminy Głusk","Herb gminy Jeziorzany","Herb Turobina","Herb gminy Wojcieszków","Herb gminy Brzeźnica (powiat żagański)","Herb gminy Świdnica (województwo lubuskie)","Herb gminy Zwierzyn","Herb gminy Bedlno","Herb gminy Sokolniki","Herb gminy Lipnica Wielka","Herb gminy Chynów","Herb gminy Jaktorów","Herb gminy Nieporęt","Herb gminy Przyłęk","Herb gminy Stary Lubotyń","Herb Wiskitek","Herb gminy Rudniki","Herb gminy Turawa","Herb gminy Krasiczyn","Herb gminy Solina","Herb gminy Białowieża","Herb gminy Bielsk Podlaski","Herb gminy Dobrzyniewo Duże","Herb gminy Hajnówka","Herb gminy Narewka","Herb gminy Turośl","Herb gminy Turośń Kościelna","Herb gminy Wizna","Herb gminy Zambrów","Herb gminy Człuchów","Herb gminy Linia","Herb gminy Ustka","Herb gminy Zblewo","Herb gminy Mykanów","Herb gminy Popów","Herb gminy Bałtów","Herb gminy Płoskinia","Herb gminy Kętrzyn","Herb gminy Blizanów","Herb gminy Czermin (województwo wielkopolskie)","Herb gminy Kościan","Herb gminy Orchowo","Herb gminy Przygodzice","Herb gminy Ryczywół","Herb gminy Szczytniki","Herb gminy Turek","Herb gminy Będzino","Herb Mielna","Herb Bogatyni","Herb Głogowa","Herb Kowar","Herb Stronia Śląskiego","Herb Wołowa","Herb Brodnicy","Herb Grudziądza","Herb Głuska","Herb Poniatowej","Herb Ryk","Herb Żagania","Herb Drzewicy","Herb Garwolina","Herb Kosowa Lackiego","Herb Przysuchy","Herb Dynowa","Herb Jedlicza","Herb Mielca","Herb Rudnika nad Sanem","Herb Sanoka","Herb Bielska Podlaskiego","Herb Choroszczy","Herb Drohiczyna (Polska)","Herb Knyszyna","Herb Moniek","Herb Sejn","Herb Sokółki","Herb Tykocina","Herb Zambrowa","Herb Chojnic","Herb Człuchowa","Herb Mikołowa","Herb Pszczyny","Herb Tarnowskich Gór","Herb Żywca","Herb Kazimierzy Wielkiej","Herb Skarżyska-Kamiennej","Herb Rucianego-Nidy","Herb Leszna","Herb Stęszewa","Herb Trzcianki","Herb Turku","Herb Wielichowa","Herb Człopy","Herb powiatu wołowskiego","Herb powiatu nakielskiego","Herb powiatu krośnieńskiego (województwo lubuskie)","Herb powiatu międzyrzeckiego","Herb powiatu bielskiego (województwo podlaskie)","Herb powiatu hajnowskiego","Herb powiatu sejneńskiego","Herb powiatu zambrowskiego","Herb powiatu człuchowskiego","Herb powiatu chojnickiego","Herb powiatu kościerskiego","Herb powiatu wodzisławskiego","Herb powiatu żywieckiego","Herb powiatu kazimierskiego","Herb powiatu czarnkowsko-trzcianeckiego","Herb powiatu kaliskiego","Herb powiatu krotoszyńskiego","Herb powiatu leszczyńskiego","Herb powiatu tureckiego","Herb województwa łódzkiego"
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
          "Herb gminy Cieszków","Herb gminy Malczyce","Herb gminy Oleśnica (województwo dolnośląskie)","Herb gminy Pęcław","Herb Siechnic","Herb gminy Świdnica (powiat świdnicki)","Herb gminy Białe Błota","Herb gminy Brodnica (powiat brodnicki)","Herb gminy Gruta","Herb gminy Koneck","Herb gminy Lisewo","Herb gminy Sadki","Herb gminy Waganiec","Herb gminy Warlubie","Herb gminy Zbiczno","Herb gminy Godziszów","Herb gminy Kąkolewnica","Herb gminy Kodeń","Herb gminy Nowodwór","Herb gminy Obsza","Herb gminy Sosnówka","Herb gminy Szastarka","Herb gminy Telatyn","Herb Turobina","Herb gminy Wilkołaz","Herb gminy Wilków (województwo lubelskie)","Herb gminy Wisznice","Herb gminy Zielona Góra","Herb gminy Brojce","Herb gminy Budziszewice","Herb gminy Burzenin","Herb gminy Dłutów","Herb gminy Gidle","Herb gminy Głowno","Herb gminy Kleszczów","Herb gminy Kluki","Herb gminy Kobiele Wielkie","Herb gminy Kutno","Herb gminy Maków","Herb gminy Nowe Ostrowy","Herb gminy Pabianice","Herb gminy Ręczno","Herb gminy Rusiec","Herb gminy Wierzchlas","Herb gminy Bolesław (powiat olkuski)","Herb gminy Chełmiec","Herb gminy Gdów","Herb gminy Kamionka Wielka","Herb gminy Kozłów","Herb gminy Krościenko nad Dunajcem","Herb gminy Lipinki","Herb gminy Liszki","Herb gminy Olesno (województwo małopolskie)","Herb gminy Poronin","Herb gminy Racławice","Herb gminy Wieprz","Herb gminy Bielany","Herb gminy Czerwonka","Herb gminy Klembów","Herb gminy Lelis","Herb gminy Nowy Duninów","Herb gminy Pomiechówek","Herb gminy Rusinów","Herb gminy Rzekuń","Herb Sochocina","Herb gminy Stanisławów","Herb gminy Stara Biała","Herb gminy Stara Błotnica","Herb gminy Szczutowo","Herb gminy Szydłowo (województwo mazowieckie)","Herb gminy Domaszowice","Herb gminy Baligród","Herb gminy Chłopice","Herb gminy Dębowiec (powiat jasielski)","Herb gminy Gorzyce (województwo podkarpackie)","Herb gminy Haczów","Herb gminy Kamień (województwo podkarpackie)","Herb gminy Łańcut","Herb gminy Markowa","Herb gminy Skołyszyn","Herb gminy Białowieża","Herb gminy Juchnowiec Kościelny","Herb gminy Skórzec","Herb gminy Szypliszki","Herb gminy Borzytuchom","Herb gminy Chojnice","Herb gminy Gniewino","Herb gminy Miłoradz","Herb gminy Nowa Wieś Lęborska","Herb gminy Pruszcz Gdański","Herb gminy Sztutowo","Herb gminy Dąbrowa Zielona","Herb gminy Irządze","Herb gminy Kornowac","Herb gminy Kruszyna","Herb gminy Lipie","Herb gminy Lipowa","Herb gminy Panki","Herb gminy Przystajń","Herb gminy Wielowieś","Herb gminy Wyry","Herb gminy Bałtów","Herb gminy Bodzechów","Herb gminy Czarnocin (województwo świętokrzyskie)","Herb Pierzchnicy","Herb gminy Radków (województwo świętokrzyskie)","Herb gminy Samborzec","Herb gminy Słupia (powiat jędrzejowski)","Herb Czerniejewa","Herb gminy Kuślin","Herb gminy Przykona","Herb gminy Rozdrażew","Herb gminy Władysławów","Herb gminy Bierzwnik","Herb gminy Marianowo","Herb Mielna","Herb gminy Osina","Herb gminy Rąbino","Herb gminy Stargard","Herb Jeleniej Góry","Herb Barcina","Herb Gniewkowa","Herb Grudziądza","Herb Piotrkowa Kujawskiego","Herb Lubartowa","Herb Łukowa","Herb Dobiegniewa","Herb Aleksandrowa Łódzkiego","Herb Pabianic","Herb Przedborza","Herb Wolborza","Herb Bobowej","Herb Tuchowa","Herb Błonia","Herb Pionek","Herb Płońska","Herb Radomia","Herb Różana","Herb Siedlec","Herb Szydłowca","Herb Warszawy","Herb Węgrowa","Herb Dobrodzienia","Herb Głubczyc","Herb Olesna","Herb Strzelec Opolskich","Herb Pruchnika","Herb Sokołowa Małopolskiego","Herb Tyczyna","Herb Krynek","Herb Moniek","Herb Siemiatycz","Herb Suraża","Herb Szepietowa","Herb Chojnic","Herb Kościerzyny","Herb Słupska","Herb Czeladzi","Herb Gliwic","Herb Radlina","Herb Wodzisławia Śląskiego","Herb Zawiercia","Herb Jędrzejowa","Herb Braniewa","Herb Nowego Miasta Lubawskiego","Herb Buku","Herb Krotoszyna","Herb Piły","Herb Wrześni","Herb Zagórowa","Herb Dobrzan","Herb powiatu oleśnickiego","Herb powiatu rypińskiego","Herb powiatu puławskiego","Herb powiatu strzelecko-drezdeneckiego","Herb powiatu łaskiego","Herb powiatu opoczyńskiego","Herb powiatu zgierskiego","Herb powiatu brzeskiego (małopolskiego)","Herb powiatu myślenickiego","Herb powiatu miechowskiego","Herb powiatu oświęcimskiego","Herb powiatu grójeckiego","Herb powiatu siedleckiego","Herb powiatu prudnickiego","Herb powiatu strzeleckiego","Herb powiatu monieckiego","Herb powiatu sokólskiego","Herb powiatu tczewskiego","Herb powiatu myszkowskiego","Herb powiatu wodzisławskiego","Herb powiatu kazimierskiego","Herb powiatu starachowickiego","Herb powiatu włoszczowskiego","Herb powiatu iławskiego","Herb powiatu ostródzkiego","Herb powiatu krotoszyńskiego","Herb powiatu wrzesińskiego"
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
