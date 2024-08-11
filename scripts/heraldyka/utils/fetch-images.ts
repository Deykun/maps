import {
  existsSync,
  writeFileSync,
  unlink,
} from "fs";
import { writeFile } from "fs/promises";
import chalk from 'chalk';
import { resolve } from 'path';
import ColorThief from 'colorthief';
import nearestColor from 'nearest-color';

import { removeDiacratics } from '../../../src/utils/text';

import { colorsByNames, AdministrativeUnit } from '../../../src/pages/heraldyka/constants';

const getColorName = nearestColor.from(colorsByNames);

const getCompressedImageSrc = (imageUrl: string) => {
  const [imageSrcWithoutFormat] = imageUrl.split('.');

  const compressedImageSrcWithoutFormat = imageSrcWithoutFormat
    .replace('/miasta/', '/web-miasta/')
    .replace('/gminy/', '/web-gminy/');

  const srcSet = [
    { name: 'x1', width: '100w' },
    { name: 'x2', width: '200w' },
    { name: 'x3', width: '300w' },
    { name: 'x4', width: '400w' },
  ].map(({ name, width }) => `${compressedImageSrcWithoutFormat}-${name}.webp ${width}`).join(',')

  return {
    srcSet,
    src: imageUrl
  }
}

const componentToHex = (color: number) => {
  const hex = color.toString(16);

  return hex.padStart(2, "0");
}
function rgbToHex([r,g,b]: [r: number, g: number, b: number]) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export const download = async (url: string, fileName: string, format: string, path: string) => {
  const response = await fetch(url);

  const blob = await response.blob();

  const bos = Buffer.from(await blob.arrayBuffer())
  // const bos = blob.stream();

  await writeFile(`./public/images/heraldyka/${path}/${fileName}.${format}`, bos);
};

const contentToSave = {};

export const fetchImages = async ({
  administrativeDivisions,
  path,
}: {
  administrativeDivisions: AdministrativeUnit[]
  path: string,
}) => {
  console.log(path);
  const total = administrativeDivisions.length;

  console.log(' ');
  console.log(chalk.blue(`${total} coats to fetch.`));
  console.log(' ');

  for (let i = 0; i < administrativeDivisions.length; i++) {
      const unit = administrativeDivisions[i];
      // const oldFileName = unit.title.toLowerCase().replace(/[^\w\s]/gi, '').replaceAll(' ', '-');
      const fileName = removeDiacratics(unit.title.toLowerCase()).replace(/[^\w\s]/gi, '').replaceAll(' ', '-');

      const format = unit.image?.source.split('.').at(-1)?.toLowerCase() || 'png';
      if (format !== 'png' && existsSync(`./public/images/heraldyka/${path}/${fileName}.png`)) {
          unlink(`./public/images/heraldyka/${path}/${fileName}.png`, () => {});
          console.log(chalk.red(`Removed ${fileName}.png`));
      }

      // if (oldFileName !== fileName) {
      //   unlink(`./public/images/heraldyka/units/${oldFileName}.png`, () => {});
      //   console.log(chalk.red(`${oldFileName}.png was removed, will be replaced with ${fileName}.png`));
      // }

      if (unit.image?.source) {
          if (!existsSync(`./public/images/heraldyka/${path}/${fileName}.${format}`)) {
            if (unit.image?.source) {
              await download(unit.image?.source, fileName, format, path)
              console.log(`Fetched ${fileName}.${format}`);

              if (i % 20 === 0) {
                  console.log(' ');
                  console.log(chalk.yellow(`Progress ${(i / total * 100).toFixed(1)}%. ${i} out of ${total}.`))
                  console.log(' ');
              }
            } else {
              console.log(chalk.red(`Missing ${fileName}.${format}.`));
            }
          } else {
              console.log(chalk.gray(`Skipping ${fileName}.${format} already exists.`));
          }

          const image = resolve(`./public/images/heraldyka/${path}/${fileName}.${format}`);

          try {
              const primary = await ColorThief.getColor(image).then(color => {
                  const hexColor = rgbToHex(color);
                  const near = getColorName(hexColor);
                  const distance = typeof near === 'string' ? 255 : (near?.distance || 255) as number;

                  return {
                      color: hexColor,
                      name: typeof near === 'string' ? near : near?.name,
                      distance,
                  };
              });

              const palette = await ColorThief.getPalette(image, 3).then(palette => palette.map(color => {
                  const hexColor = rgbToHex(color);
                  const near = getColorName(hexColor);
                  const distance = typeof near === 'string' ? 255 : (near?.distance || 255) as number;

                  return {
                      color: hexColor,
                      name: typeof near === 'string' ? near : near?.name,
                      distance,
                  };
              }));

              const uniqPalette: {
                color: string,
                name: string,
                distance: number,
              }[] = Object.values(palette.reduce((stack: {
                [name: string]: {
                  color: string,
                  name: string,
                  distance: number,
                },
              }, color: {
                color: string,
                name: string,
                distance: number,
              }) => {
                  if (!stack[color.name]) {
                      stack[color.name] = color;
                  } else if (stack[color.name].distance > color.distance) {
                      stack[color.name] = color;
                  }

                  return stack;
              }, {
                  [primary.name]: primary,
              }));

              const description = unit?.description?.toLowerCase() || '';

              const animals: string[] = [];

              // TODO: replace the logic
              if (['Herb gminy Baranowo'].includes(unit.title)) {
                animals.push('jastrząb')
                animals.push('ptak');
              } else if (['Herb Zabłudowa', 'Herb gminy Łomża', 'Herb Pionek'].includes(unit.title)) {
                animals.push('jeleń');
              } else if (['Herb Bierunia'].includes(unit.title)) {
                animals.push('jeleń');
                animals.push('ptak');
              } else if (['Herb Gdyni', 'Herb Rudnika nad Sanem'].includes(unit.title)) {
                animals.push('ryba');
              } else if (['Herb gminy Srokowo'].includes(unit.title)) {
                animals.push('bóbr');
              } else if (['Herb Mirosławca'].includes(unit.title)) {
                animals.push('koza');
              } else if (['Herb Mielca'].includes(unit.title)) {
                animals.push('byk/tur/żubr');
                animals.push('jeleń');
              } else if (['Herb gminy Gołuchów'].includes(unit.title)) {
                animals.push('byk/tur/żubr');
                animals.push('koń');
              } else if (['Herb Jabłonkowa'].includes(unit.title)) {
                animals.push('orzeł');
                animals.push('ptak');
                animals.push('baran');
              } else if (['Herb gminy Secemin', 'Herb Białegostoku'].includes(unit.title)) {
                animals.push('orzeł');
                animals.push('ptak');
                animals.push('koń');
              } else if (['Herb Piwnicznej-Zdroju'].includes(unit.title)) {
                animals.push('baran');
              } else if (['Herb gminy Jastków', 'Herb gminy Baranów (powiat puławski)'].includes(unit.title)) {
                animals.push('lampart');
              } else if (['Herb Drawna'].includes(unit.title)) {
                animals.push('żuraw');
                animals.push('ptak');
              } else if (['Herb Kołobrzegu'].includes(unit.title)) {
                animals.push('łabędź');
                animals.push('ptak');
              } else if (['Herb Tucholi'].includes(unit.title)) {
                animals.push('gołąb');
                animals.push('ptak');
              } else if (['Herb Słubic'].includes(unit.title)) {
                animals.push('kogut');
                animals.push('ptak');
              } else if (['Herb gminy Drużbice'].includes(unit.title)) {
                animals.push('gęś');
                animals.push('ptak');
              } else if (['Herb Górowa Iławeckiego'].includes(unit.title)) {
                animals.push('lis');
                animals.push('gęś');
                animals.push('ptak');
              } else if (['Herb gminy Damasławek', 'Herb Żagania', 'Herb Sułkowic', 'Herb Kisielic', 'Herb Krakowa', 'Herb Zawadzkiego', 'Herb Bytomia'].includes(unit.title)) {
                animals.push('orzeł');
                animals.push('ptak');
              } else if (['Herb Siedlec', 'Herb Kowar'].includes(unit.title)) {
                animals.push('koń');   
              } else if (['Herb Warszawy'].includes(unit.title)) {
                animals.push('syrena');
              } else if (['Herb gminy Bielice'].includes(unit.title)) {
                animals.push('lis');
              } else if (['Herb gminy Pruszcz Gdański', 'Herb Ciężkowic', 'Herb Gorlic', 'Herb Tczewa'].includes(unit.title)) {
                animals.push('gryf');
              } else if (['Herb Koszalina'].includes(unit.title)) {
                animals.push('gryf');
                animals.push('koń');
                animals.push('orzeł');
                animals.push('ptak');
              } else if (['Herb Częstochowy'].includes(unit.title)) {
                animals.push('lew');
                animals.push('orzeł');
                animals.push('ptak');
              } else if (['Herb gminy Władysławów', 'Herb Zduńskiej Woli', 'Herb Staszowa'].includes(unit.title)) {
                animals.push('lew');
              } else if ([
                'Herb gminy Siedlce',
                'Herb gminy Kościerzyna',
                'Herb Przysuchy',
                'Herb Mrągowa',
                'Herb Mieszkowic',
              ].includes(unit.title)) {
                animals.push('niedźwiedź')
              } else if (['Herb gminy Białowieża', 'Herb gminy Chojnice', 'Herb Głuska', 'Herb Sokółki'].includes(unit.title)) {
                animals.push('byk/tur/żubr');
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
              ].includes(unit.title)) {
                // Doesn't have them
              } else {
                const orzel = ['orzeł', 'orła', 'orłem', 'orłów', ' orle ', ' orły '];
                const orzelFilter = [
                  'Herb Trzemeszna',
                  'Herb Starego Sącza',
                ]; 
                if (orzel.some((animal) => description.includes(animal))) {
                  if (!orzelFilter.includes(unit.title)) {
                    animals.push('orzeł');
                  }
                }

                if (['sokół', 'sokoła'].some((animal) => description.includes(animal))) {
                    animals.push('sokół');
                }

                if (['czapla', 'czaple', 'czaplę', ' czapli '].some((animal) => description.includes(animal))) {
                    animals.push('czapla');
                }

                if (['żurw', 'żurawia', 'żurawie'].some((animal) => description.includes(animal))) {
                    animals.push('żuraw');
                }

                if ([' kruk ', ' kruka '].some((animal) => description.includes(animal))) {
                    animals.push('kruk');
                }

                if (['jastrzą', 'jastrzębia'].some((animal) => description.includes(animal))) {
                    animals.push('jastrząb');
                }
            
                if ([' sowę', ' sowa'].some((animal) => description.includes(animal))) {
                    animals.push('sowa');
                }

                if ([' sępie '].some((animal) => description.includes(animal))) {
                    animals.push('sęp');
                }

                if ([' pelikan'].some((animal) => description.includes(animal))) {
                    animals.push('pelikan');
                }

                if ([' bocian'].some((animal) => description.includes(animal))) {
                    animals.push('bocian');
                }

                if ([' gęsią ', 'gęś', ' gęsie'].some((animal) => description.includes(animal))) {
                    animals.push('gęś');
                }
                  
                if ([' gołębie', 'gołębia'].some((animal) => description.includes(animal))) {
                    animals.push('gołąb');
                }

                if ([' łabęd'].some((animal) => description.includes(animal))) {
                    animals.push('łabędź');
                }

                if (['kogut'].some((animal) => description.includes(animal))) {
                    animals.push('kogut');
                }

                if (animals.length > 0 || [...orzel, 'ptak', 'ptakiem', ' czyżyka', 'cietrzewia', 'ślepowron', ' szpak ', ' pióro', 'kormorana', ' czajkę ', 'kaczory', ' mewę', ' wrony,', 'krogulcem', ' puszczyk '].some((animal) => description.includes(animal))) {
                  if (!orzelFilter.includes(unit.title)) {
                    animals.push('ptak');
                  }
                }

                if ([' wąż ', ' węże.'].some((animal) => description.includes(animal))) {
                    animals.push('wąż');
                }

                if ([' zając ', ' zająca,'].some((animal) => description.includes(animal))) {
                  animals.push('zając');
                }

                if ([' nietoperz'].some((animal) => description.includes(animal))) {
                    animals.push('nietoperz');
                }

                if ([' gryfa', ' gryf', 'rybogryfa', 'półgryf'].some((animal) => description.includes(animal))) {
                    animals.push('gryf');
                }

                if ([' dzik,', 'dzik.', 'dzik ', ' dzika'].some((animal) => description.includes(animal))) {
                    animals.push('dzik');
                }

                if (['jeleń', 'jelenia', 'jelenią', ' jelenie', 'jelon', ' łania', ' łani ', ' rosochy,'].some((animal) => description.includes(animal))) {
                    animals.push('jeleń');
                }

                if (['łosia'].some((animal) => description.includes(animal))) {
                  animals.push('łoś');
                }

                if (['żbika'].some((animal) => description.includes(animal))) {
                  animals.push('żbik');
                }

                if (['półlwa', 'półlew', ' lew ', ' lwem ', ' lwa ', ' lwa,' , ' lwy ', 'lwy-', ' lwami'].some((animal) => description.includes(animal))) {
                    animals.push('lew');
                }

                if ([' lampart ', 'lamparta', ' lamparcie ', 'lamparcie.', 'lewart'].some((animal) => description.includes(animal))) {
                    animals.push('lampart');
                }

                if ([' byk', ' byczka', ' tur ', ' tura ', ' tura,', 'żubr', ' ciołka ', 'ciołek ', ' bawoli', ' woła,', 'bawoła', 'bawołu ', ' wołu '].some((animal) => description.includes(animal))) {
                    animals.push('byk/tur/żubr');
                }

                if (['smok'].some((animal) => description.includes(animal))) {
                    animals.push('smok');
                }

                if (['baran', 'muflon', ' owcę', ' owca', ' owczą'].some((animal) => description.includes(animal))) {
                    animals.push('baran');
                }

                if (['ryba ', ' ryba.', ' ryb ', 'rybogryfa', 'rybopodobne', ' rybo ', ' rybo,', 'rybę', 'ryby', 'rybą', ' karpia ', 'łososia', ' suma ', 'łosoś', 'leszcza ', ' leszcze '].some((animal) => description.includes(animal))) {
                    animals.push('ryba');
                }

                if (['pszczoł'].some((animal) => description.includes(animal))) {
                    animals.push('pszczoła');
                }

                if (['syrenę', ' syrena '].some((animal) => description.includes(animal))) {
                  animals.push('syrena');
                }

                if (['bóbr', ' bobra'].some((animal) => description.includes(animal))) {
                    animals.push('bóbr');
                }

                if ([' lis ', ' lisa ', ' lisem ', ' lisa,'].some((animal) => description.includes(animal))) {
                    animals.push('lis');
                }

                if (['jaszczurk'].some((animal) => description.includes(animal))) {
                    animals.push('jaszczurka');
                }

                if ([' pies ', ' psa ', ' psa,', ' psem '].some((animal) => description.includes(animal))) {
                    animals.push('pies');
                }

                if ([' niedźwiedz'].some((animal) => description.includes(animal))) {
                    animals.push('niedźwiedź');
                }

                if ([' rak ', ' raka ', ' raka,', 'raka.'].some((animal) => description.includes(animal))) {
                    animals.push('rak');
                }
            
                if ([' konia', ' koń ', ' koń,', ' koniu', ' konie '].some((animal) => description.includes(animal))) {
                    animals.push('koń');
                }

                if (['jednoroż'].some((animal) => description.includes(animal))) {
                    animals.push('jednorożec');
                }

                if (['centaur'].some((animal) => description.includes(animal))) {
                    animals.push('centaur');
                }

                if ([' oślej', ' osła'].some((animal) => description.includes(animal))) {
                    animals.push('osioł');
                }

                if (['amfisbaenę'].some((animal) => description.includes(animal))) {
                    animals.push('amfisbaena');
                }

                if (['kozła', 'kozę', ' kóz.', ' kozy,', ' kozie ', 'kozłów', 'koziołki'].some((animal) => description.includes(animal))) {
                    animals.push('koza');
                }

                if ([' wilk'].some((animal) => description.includes(animal))) {
                    animals.push('wilk');
                }

                if (['wiewiórka'].some((animal) => description.includes(animal))) {
                    animals.push('wiewiórka');
                }

                if ([' konik polny'].some((animal) => description.includes(animal))) {
                    animals.push('owad');
                }
              }

              const items: string[] = [];

              if (['podkowa', 'podkowę', ' podkowie'].some((item) => description.includes(item))) {
                if (![
                  'Herb Bobowej',
                  'Herb Izbicy',
                ].includes(unit.title)) {
                  items.push('podkowa');
                }
              }
              
              if (['klucz'].some((item) => description.includes(item))) {
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
                ].includes(unit.title)) {
                  items.push('klucz');
                }
              }

              if (['miecz', ' nóż ', ' szabla '].some((item) => description.includes(item))) {
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
                ].includes(unit.title)) {
                  items.push('miecz');
                }
              }

              if (['strzał'].some((item) => description.includes(item))) {
                if (![
                  'Herb gminy Nadarzyn',
                  'Herb gminy Ożarowice',
                  'Herb Głowna',
                  'Herb Izbicy',
                ].includes(unit.title)) {
                  items.push('strzała');
                }
              }

              if ([' kłos', ' kłosem', ' snop ', ' snopy '].some((item) => description.includes(item))) {
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
                ].includes(unit.title)) {
                  items.push('kłos');
                }
              }

              if (['topór', 'toporami', 'toporem', ' tasaki', 'toporek', 'topory', ' siekierę', ' siekiery', ' siekiera', 'młot', 'herb górniczy', ' oskard', ' kilof'].some((item) => description.includes(item))) {
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
                ].includes(unit.title)) {
                  items.push('topór/młot/kilof');
                }
              }

              if (['drzewo', ' drzew', 'drzewa', 'dąb', ' dęby ', ' dębu', ' jodła', ' jodły', ' świerk', ' ostrzew', 'lasu.'].some((item) => description.includes(item))) {
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
                ].includes(unit.title)) {
                  items.push('drzewo');
                }
              }

              const lilia = [' lilie', ' lilia', ' lilię', ' lilii '];
              const liliaFilter = [
                'Herb Birczy',
                'Herb Starogardu Gdańskiego',
              ];

              if ([' lilie', ' lilia'].some((item) => description.includes(item))) {
                if (!liliaFilter.includes(unit.title)) {
                  items.push('lilia');
                }
              }

              const roza = [' róża ', ' róż ', ' róże ', ' różę '];
              const rozaFilter = [
                'Herb Łabiszyna',
                'Herb Starogardu Gdańskiego',
                'Herb Elbląga',
              ];

              if (roza.some((item) => description.includes(item))) {
                if (!rozaFilter.includes(unit.title)) {
                  items.push('róża');
                }
              }

              if (['kwiat', ...roza, ...lilia].some((item) => description.includes(item))) {
                if (![
                  ...liliaFilter,
                  ...rozaFilter,
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
                ].includes(unit.title)) {
                  items.push('kwiat');
                }
              }

              if (['wieża', ' wieże', ' wieżę', ' wieżą', ' wieży ', ' muru ', ' mur ', 'baszt', ' bramę ', 'bramę.', ' bramą.', 'bramą,', ' bramną ', ' bramie ', 'corona muralis', ' kolumny ', ' kolumna '].some((item) => description.includes(item))) {
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
                ].includes(unit.title)) {
                  items.push('wieża/mury');
                }
              }

              if (['łódka', 'łódź', 'statek', ' łodzi'].some((item) => description.includes(item))) {
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
                ].includes(unit.title)) {
                  items.push('łódź');
                }
              }

              if ([' muszla', ' muszlę', ' muszle', ' muszelk'].some((item) => description.includes(item))) {
                if (![
                  'empty',
                ].includes(unit.title)) {
                  items.push('muszla');
                }
              }

              if ([' anioł'].some((item) => description.includes(item))) {
                if (![
                  'Herb Bierutowa',
                  'Herb Murowanej Gośliny',
                  'Herb Łowicza',
                  'Herb Skoczowa',
                ].includes(unit.title)) {
                  items.push('anioł');
                }
              }

              if ([' korona', ' koronę', ' koroną', ' korony ', ' korony', 'herb opola', 'mitra książęca'].some((item) => description.includes(item))) {
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
                ].includes(unit.title)) {
                  items.push('korona');
                }
              }

              if ([' święty', ' świetego', ' św.', ' święta ', ' świętą ', 'matki bożej', ' floriana', 'jana chrciciela', 'matki boskiej', 'madonny', ' madonnę', 'chrystus', 'błogosławiona salomea', 'bł. władysława', 'marii panny', 'herb lubawy', 'matkę boską'].some((item) => description.includes(item))) {
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
                ].includes(unit.title)) {
                  items.push('postać świętego');
                }
              }

              contentToSave[fileName] = {
                ...unit,
                description: '', // not needed
                colors: {
                  primary,
                  palette: uniqPalette.filter(({ name, distance }) => {
                    if (name === 'blue') {
                      return distance < 200;
                    }

                    if (name === 'green') {
                      return distance < 180;
                    }

                    return distance < 110;
                  }),
                },
                imageUrl: `images/heraldyka/${path}/${fileName}.${format}`,
                imageSrcSet: getCompressedImageSrc(`images/heraldyka/${path}/${fileName}.${format}`).srcSet,
                shortTitle: unit.title.replace('Herb gminy', 'Herb').replace('Herb miasta', 'Herb').replace(/\((.*)\)/g, ''),
                markers: {
                  animals,
                  items,
                }
              }
          } catch {
              console.log(chalk.red('Missing colors for ', unit.title));
          }
      } else {
          console.log('Missng image for ', unit.title)
      }
  }

  writeFileSync(`./src/pages/heraldyka/${path}-images.json`, JSON.stringify(contentToSave, null, 4));
};
