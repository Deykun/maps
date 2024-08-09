import {
    existsSync,
    writeFileSync,
    unlink,
} from "fs";
import { writeFile } from "fs/promises";
import chalk from 'chalk';
import path from 'path';
import ColorThief from 'colorthief';
import nearestColor from 'nearest-color';

import { removeDiacratics } from '../../src/utils/text';

import gminyFromJSON from '../../public/data/heraldyka/gminy.json'
import { colorsByNames, AdministrativeUnit } from '../../src/pages/heraldyka/constants';

const gminy = gminyFromJSON as AdministrativeUnit[]
const total = gminy.length;

const getColorName = nearestColor.from(colorsByNames);

const componentToHex = (color: number) => {
    const hex = color.toString(16);

    return hex.padStart(2, "0");
}
function rgbToHex([r,g,b]: [r: number, g: number, b: number]) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export const download = async (url: string, fileName: string, format: string) => {
    const response = await fetch(url);

    const blob = await response.blob();

    const bos = Buffer.from(await blob.arrayBuffer())
    // const bos = blob.stream();

    await writeFile(`./public/images/heraldyka/gminy/${fileName}.${format}`, bos);
};

console.log(' ');
console.log(chalk.blue(`${total} coats to fetch.`));
console.log(' ');

const contentToSave = {};

(async () => {
    for (let i = 0; i < gminy.length; i++) {
        const gmina = gminy[i];
        // const oldFileName = gmina.title.toLowerCase().replace(/[^\w\s]/gi, '').replaceAll(' ', '-');
        const fileName = removeDiacratics(gmina.title.toLowerCase()).replace(/[^\w\s]/gi, '').replaceAll(' ', '-');

        const format = gmina.image?.source.split('.').at(-1)?.toLowerCase() || 'png';
        if (format !== 'png' && existsSync(`./public/images/heraldyka/gminy/${fileName}.png`)) {
            unlink(`./public/images/heraldyka/gminy/${fileName}.png`, () => {});
            console.log(chalk.red(`Removed ${fileName}.png`));
        }

        // if (oldFileName !== fileName) {
        //   unlink(`./public/images/heraldyka/gminy/${oldFileName}.png`, () => {});
        //   console.log(chalk.red(`${oldFileName}.png was removed, will be replaced with ${fileName}.png`));
        // }

        if (gmina.image?.source) {
            if (!existsSync(`./public/images/heraldyka/gminy/${fileName}.${format}`)) {
                await download(gmina.image?.source, fileName, format)
                console.log(`Fetched ${fileName}.${format}`);

                if (i % 20 === 0) {
                    console.log(' ');
                    console.log(chalk.yellow(`Progress ${(i / total * 100).toFixed(1)}%. ${i} out of ${total}.`))
                    console.log(' ');
                }
            } else {
                console.log(chalk.gray(`Skipping ${fileName}.${format} already exists.`));
            }

            const image = path.resolve(`./public/images/heraldyka/gminy/${fileName}.${format}`);

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

                
                
                if (gmina.title === 'Herb gminy Baranowo') {
                    animals.push('jastrząb')
                } else if (gmina.title === 'Herb gminy Jastków') {
                    animals.push('lampart');
                } else if (['Herb gminy Damasławek'].includes(gmina.title)) {
                    animals.push('orzeł');
                } else if (['Herb gminy Bielice'].includes(gmina.title)) {
                    animals.push('lis');
                } else if (['Herb gminy Pruszcz Gdański'].includes(gmina.title)) {
                    animals.push('gryf');
                } else if (['Herb gminy Władysławów'].includes(gmina.title)) {
                    animals.push('lew');
                } else if (['Herb gminy Siedlce', 'Herb gminy Kościerzyna'].includes(gmina.title)) {
                    animals.push('niedźwiedź')
                } else if (['Herb gminy Białowieża', 'Herb gminy Chojnice'].includes(gmina.title)) {
                    animals.push('byk/tur/żubr');
                } else if (['Herb gminy Zatory', 'Herb Strzeleczek', 'Herb gminy Milejewo', 'Herb gminy Kołobrzeg'].includes(gmina.title)) {
                    // Doesn't have them
                } else {
                    const description = gmina?.description?.toLowerCase() || '';
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
                     
                    if ([' gołębie'].some((animal) => description.includes(animal))) {
                        animals.push('gołąb');
                    }

                    if ([' łabęd'].some((animal) => description.includes(animal))) {
                        animals.push('łabędź');
                    }

                    if (animals.length === 0 && ['ptak', 'ptakiem', ' czyżyka', 'cietrzewia', 'ślepowron', ' szpak ', ' pióro', 'kormorana', ' czajkę ', 'kaczory'].some((animal) => description.includes(animal))) {
                        animals.push('ptak');
                    }

                    if ([' nietoperz'].some((animal) => description.includes(animal))) {
                        animals.push('nietoperz');
                    }

                    if ([' gryfa', ' gryf', 'rybogryfa'].some((animal) => description.includes(animal))) {
                        animals.push('gryf');
                    }

                    if ([' dzik,', 'dzik.', 'dzik ', ' dzika'].some((animal) => description.includes(animal))) {
                        animals.push('dzik');
                    }

                    if (['jeleń', 'jelenia', ' jelenie', 'jelon', ' łania', ' łani ', ' rosochy,'].some((animal) => description.includes(animal))) {
                        animals.push('jeleń');
                    }

                    if (['półlwa', 'półlew', ' lew ', ' lwa ', ' lwa,' , ' lwy ', 'lwy-'].some((animal) => description.includes(animal))) {
                        animals.push('lew');
                    }

                    if ([' lampart ', ' lamparcie ', 'lamparcie.', 'lewarta'].some((animal) => description.includes(animal))) {
                        animals.push('lampart');
                    }

                    if ([' byk', ' tur ', ' tura ', ' tura,', 'żubr', ' ciołka ', 'ciołek ', ' bawoli', ' woła,', 'bawoła', ' wołu '].some((animal) => description.includes(animal))) {
                        animals.push('byk/tur/żubr');
                    }

                    if (['kogut'].some((animal) => description.includes(animal))) {
                        animals.push('kogut');
                    }

                    if (['smok'].some((animal) => description.includes(animal))) {
                        animals.push('smok');
                    }

                    if (['baran', 'muflon', ' owca', ' owczą'].some((animal) => description.includes(animal))) {
                        animals.push('baran');
                    }

                    if (['ryba', 'rybogryfa', ' rybo ', ' rybo,', 'rybę', 'ryby', 'rybą', ' karpia ', ' suma ', 'leszcza '].some((animal) => description.includes(animal))) {
                        animals.push('ryba');
                    }

                    if (['pszczoł'].some((animal) => description.includes(animal))) {
                        animals.push('pszczoła');
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

                    if ([' pies ', ' psa ',  ' psem '].some((animal) => description.includes(animal))) {
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

                    if ([' oślej'].some((animal) => description.includes(animal))) {
                        animals.push('osioł');
                    }

                    if (['amfisbaenę'].some((animal) => description.includes(animal))) {
                        animals.push('amfisbaena');
                    }

                    if (['kozła', 'kozę', ' kóz.', ' kozy,'].some((animal) => description.includes(animal))) {
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
                    ...gmina,
                    colors: {  
                        primary,
                        palette: uniqPalette.filter(({ distance }) => distance < 80),
                    },
                    imageUrl: `images/heraldyka/gminy/${fileName}.${format}`,
                    markers: {
                        animals,
                    }
                }
            } catch {
                console.log(chalk.red('Missng colors for ', gmina.title));
            }
        } else {
            console.log('Missng image for ', gmina.title)
        }
    }

    // console.log(contentToSave);

    writeFileSync(`./public/data/heraldyka/gminy-images.json`, JSON.stringify(contentToSave, null, 4));
    writeFileSync(`./src/pages/heraldyka/gminy-images.json`, JSON.stringify(contentToSave, null, 4));
})();
