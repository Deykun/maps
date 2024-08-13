import { AdministrativeUnit } from '../types';

const getPostionForPlaceET = (unit: AdministrativeUnit) => {
  // https://pl.wikipedia.org/wiki/Geografia_Polski

  const minTop = 0;
  // const maxTop = 54.8;
  const maxTop = 59.97;
  const maxBottom = 57.45;

  const maxLeft = 21.46;
  const maxRight = 28.44;

  const polandWidth = maxRight - maxLeft;

  const longitude = unit?.place?.coordinates?.lon ?? 0;
  const latitude = unit?.place?.coordinates?.lat ?? 0;
  const left = `${((longitude - maxLeft) / polandWidth * 100)}%`;
  const top = `${minTop + ((latitude - maxTop) / (maxBottom - maxTop) * 100)}%`;

  return {
    left,
    top,
  }
};

const getPostionForPlaceFI = (unit: AdministrativeUnit) => {
  // https://pl.wikipedia.org/wiki/Geografia_Polski

  const minTop = 0;
  // const maxTop = 54.8;
  const maxTop = 68.97;
  const maxBottom = 57.45;

  const maxLeft = 21.46;
  const maxRight = 28.44;

  const polandWidth = maxRight - maxLeft;

  const longitude = unit?.place?.coordinates?.lon ?? 0;
  const latitude = unit?.place?.coordinates?.lat ?? 0;
  const left = `${((longitude - maxLeft) / polandWidth * 100)}%`;
  const top = `${minTop + ((latitude - maxTop) / (maxBottom - maxTop) * 100)}%`;

  return {
    left,
    top,
  }
};

const getPostionForPlacePL = (unit: AdministrativeUnit) => {
  // https://pl.wikipedia.org/wiki/Geografia_Polski

  const minTop = 0;
  // const maxTop = 54.8;
  const maxTop = 54.95;
  const maxBottom = 49;

  const maxLeft = 13.98;
  const maxRight = 24.25;

  const polandWidth = maxRight - maxLeft;

  const longitude = unit?.place?.coordinates?.lon ?? 0;
  const latitude = unit?.place?.coordinates?.lat ?? 0;
  const left = `${((longitude - maxLeft) / polandWidth * 100)}%`;
  const top = `${minTop + ((latitude - maxTop) / (maxBottom - maxTop) * 100)}%`;

  return {
    left,
    top,
  }
};

export const getPostionForPlace = (unit: AdministrativeUnit, lang: string) => {
  if (lang === 'pl') {
    return getPostionForPlacePL(unit);
  }

  if (lang === 'fi') {
    return getPostionForPlaceFI(unit);
  }

  return getPostionForPlaceET(unit);
};
