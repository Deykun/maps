import { AdministrativeUnit } from '../../../../src/topic/Heraldry/types';
import { removeDiacratics } from '../../../../src/utils/text';

const getSimpleHashFromString = (text: string) => {
  const intHash = text.split('').reduce((prevHash, currVal) => (((prevHash << 5) - prevHash) + currVal.charCodeAt(0))|0, 0);

  return Math.abs(intHash).toString(16);
}

const commonWordsToRemove = [
  'gemeinde',
  'stadt',
  'landkreis',
  'verbandsgemeinde',
  'valla',
  'vapp',
];

export const getImageHash = (unit: AdministrativeUnit) => {
  const hashSeed = unit.image?.source || unit.place?.name || unit.title;

  return getSimpleHashFromString(hashSeed);
};

export const getImageFileName = (unit: AdministrativeUnit) => {
  const {
    title,
  } = unit;
  let fileName = removeDiacratics(title.toLowerCase())
    .replace(/[^\w\s]/gi, '')
    .replace(/\s/gi, '-')
    .replace(/[^a-z-]+/g, '')
    .split('-').filter((word: string) => !commonWordsToRemove.includes(word)).join('-');

  fileName = `${getImageHash(unit)}-${fileName.slice(0, 24)}`;

  // It trims example-name-of- to example-name-of
  fileName = fileName.replace(/[-]/g, ' ').trim().replace(/ /g, '-');

  return fileName;
};

export const getCompressedImageSrc = (imageUrl: string, path: string) => {
  const [imageSrcWithoutFormat] = imageUrl.split('.');

  const imagesList = [
    { size: '80w', width: '80w' },
    { size: '320w', width: '320w' },
  ].map(({ size, width }) => ({ width, path: `${imageSrcWithoutFormat}-${size}.webp` }));
  
  const srcSet = imagesList.map(({ path, width }) => `${path} ${width}`).join(',')

  return {
    srcSet,
    src: imageUrl,
    imagesList,
  };
};

export const getImageFromThumbnailUrl = (imageUrlToCheck: string) => {
  // https://stackoverflow.com/a/33691240/6743808
  /*
    https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg/200px-Tour_Eiffel_Wikimedia_Commons.jpg

    The first part is always the same: https://upload.wikimedia.org/wikipedia/commons/thumb
    The second part is the first character of the MD5 hash of the file name. In this case, the MD5 hash of Tour_Eiffel_Wikimedia_Commons.jpg is a85d416ee427dfaee44b9248229a9cdd, so we get /a.
    The third part is the first two characters of the MD5 hash from above: /a8.
    The fourth part is the file name: /Tour_Eiffel_Wikimedia_Commons.jpg
    The last part is the desired thumbnail width, and the file name again: /200px-Tour_Eiffel_Wikimedia_Commons.jpg
  */

  if (imageUrlToCheck.includes('/thumb/')) {
    let imageUrl = imageUrlToCheck.replace('/thumb/', '/');

    imageUrl = imageUrl.split('/').slice(0, -1).join('/');
  
    return imageUrl;
  }

  return imageUrlToCheck;
};
