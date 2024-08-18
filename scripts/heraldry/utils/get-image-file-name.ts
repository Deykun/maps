import { removeDiacratics } from '../../../src/utils/text';

export const getImageFileName = (title: string) => {
  let fileName = removeDiacratics(title.toLowerCase()).replace(/[^\w\s]/gi, '').replaceAll(' ', '-');

    // flattening collisions
  if (title === 'Herb gminy Miedźna') {
    /*
      - Herb gminy Miedzna - https://pl.wikipedia.org/wiki/Herb_gminy_Miedzna
      - Herb gminy Miedźna - https://pl.wikipedia.org/wiki/Herb_gminy_Mied%C5%BAna
    */
    fileName += '-with-special-z';
  }

  if (title === 'Õru valla vapp') {
    /*
      - Oru valla vapp - https://et.wikipedia.org/wiki/Oru_valla_vapp
      - Õru valla vapp - https://et.wikipedia.org/wiki/%C3%95ru_valla_vapp
    */
    fileName += '-with-special-o';
  }

  return fileName;
};

export const getCompressedImageSrc = (imageUrl: string, path: string) => {
  const [imageSrcWithoutFormat] = imageUrl.split('.');

  const compressedImageSrcWithoutFormat = imageSrcWithoutFormat.replace(`/${path}/`, `/web-${path}/`);

  const imagesList = [
    { name: '80w', width: '80w' },
    { name: '300w', width: '300w' },
  ].map(({ name, width }) => ({ name, width, path: `${compressedImageSrcWithoutFormat}-${name}.webp` }));
  
  const srcSet = imagesList.map(({ path, width }) => `${path} ${width}`).join(',')

  return {
    srcSet,
    src: imageUrl,
    imagesList,
  }
}