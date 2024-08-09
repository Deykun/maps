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

              const palette = await ColorThief.getPalette(image, 7).then(palette => palette.map(color => {
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

              const animals: string[] = [];

              // TODO: Add 'Trzymacze'

              if (['Herb gminy Baranowo'].includes(unit.title)) {
                animals.push('jastrząb')
                animals.push('ptak');
              } else if (['Herb Zabłudowa', 'Herb gminy Łomża'].includes(unit.title)) {
                animals.push('jeleń');
              } else if (['Herb Bierunia'].includes(unit.title)) {
                animals.push('jeleń');
                animals.push('ptak');
              } else if (['Herb Gdyni'].includes(unit.title)) {
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
              } else if (['Herb gminy Secemin'].includes(unit.title)) {
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
              } else if (['Herb gminy Damasławek', 'Herb Żagania', 'Herb Sułkowic'].includes(unit.title)) {
                animals.push('orzeł');
                animals.push('ptak');
              } else if (['Herb Siedlec'].includes(unit.title)) {
                animals.push('koń');
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
              } else if (['Herb gminy Władysławów', 'Herb Zduńskiej Woli'].includes(unit.title)) {
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
              ].includes(unit.title)) {
                // Doesn't have them
              } else {
                const description = unit?.description?.toLowerCase() || '';
                if (['orzeł', 'orła', 'orłem', 'orłów', ' orle '].some((animal) => description.includes(animal))) {
                    animals.push('orzeł');
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

                if (animals.length > 0 || ['ptak', 'ptakiem', ' czyżyka', 'cietrzewia', 'ślepowron', ' szpak ', ' pióro', 'kormorana', ' czajkę ', 'kaczory', ' mewę', ' wrony,', 'krogulcem'].some((animal) => description.includes(animal))) {
                    animals.push('ptak');
                }

                if ([' wąż '].some((animal) => description.includes(animal))) {
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

                if ([' lampart ', 'lamparta', ' lamparcie ', 'lamparcie.', 'lewarta'].some((animal) => description.includes(animal))) {
                    animals.push('lampart');
                }

                if ([' byk', ' byczka', ' tur ', ' tura ', ' tura,', 'żubr', ' ciołka ', 'ciołek ', ' bawoli', ' woła,', 'bawoła', ' wołu '].some((animal) => description.includes(animal))) {
                    animals.push('byk/tur/żubr');
                }

                if (['smok'].some((animal) => description.includes(animal))) {
                    animals.push('smok');
                }

                if (['baran', 'muflon', ' owcę', ' owca', ' owczą'].some((animal) => description.includes(animal))) {
                    animals.push('baran');
                }

                if (['ryba ', ' ryba.', ' ryb ', 'rybogryfa', ' rybo ', ' rybo,', 'rybę', 'ryby', 'rybą', ' karpia ', 'łososia', ' suma ', 'leszcza ', ' leszcze '].some((animal) => description.includes(animal))) {
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

                if ([' lis ', ' lisa ', ' lisem '].some((animal) => description.includes(animal))) {
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
            
                if ([' konia', ' koń ', ' koniu', ' konie '].some((animal) => description.includes(animal))) {
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

                if (['kozła', 'kozę', ' kóz.', ' kozy,', 'kozłów'].some((animal) => description.includes(animal))) {
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

              contentToSave[fileName] = {
                  ...unit,
                  colors: {  
                      primary,
                      palette: uniqPalette.filter(({ distance }) => distance < 80),
                  },
                  imageUrl: `images/heraldyka/${path}/${fileName}.${format}`,
                  markers: {
                      animals,
                  }
              }
          } catch {
              console.log(chalk.red('Missng colors for ', unit.title));
          }
      } else {
          console.log('Missng image for ', unit.title)
      }
  }

  // console.log(contentToSave);

  writeFileSync(`./public/data/heraldyka/${path}-images.json`, JSON.stringify(contentToSave, null, 4));
  writeFileSync(`./src/pages/heraldyka/${path}-images.json`, JSON.stringify(contentToSave, null, 4));
};
