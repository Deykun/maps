import { AdministrativeUnit } from '../types';

const getPostionForPlaceET = (unit: AdministrativeUnit) => {
  const minTop = 0;
  const maxTop = 59.97;
  const maxBottom = 57.45;

  const maxLeft = 21.46;
  const maxRight = 28.44;

  const mapWidth = maxRight - maxLeft;

  const longitude = unit?.place?.coordinates?.lon ?? 0;
  const latitude = unit?.place?.coordinates?.lat ?? 0;
  const left = `${((longitude - maxLeft) / mapWidth * 100)}%`;
  const top = `${minTop + ((latitude - maxTop) / (maxBottom - maxTop) * 100)}%`;

  return {
    left,
    top,
  }
};

const getPostionForPlaceFI = (unit: AdministrativeUnit) => {
  const minTop = 0;
  const maxTop = 71.099;
  const maxBottom = 60.053;

  const maxLeft = 27.085;
  const maxRight = 30.585;

  const mapWidth = maxRight - maxLeft + 8.2;
  const mapHeight = maxBottom - maxTop - 0.2;

  const longitude = unit?.place?.coordinates?.lon ?? 0;
  const latitude = unit?.place?.coordinates?.lat ?? 0;
  const left = `${64.5 + ((longitude - maxLeft) / mapWidth * 100)}%`;
  const top = `${minTop + ((latitude - maxTop) / mapHeight * 100)}%`;

  return {
    left,
    top,
  }
};

const getPostionForPlacePL = (unit: AdministrativeUnit) => {
  const minTop = 0;
  const maxTop = 54.95;
  const maxBottom = 49;

  const maxLeft = 13.98;
  const maxRight = 24.25;

  const mapWidth = maxRight - maxLeft;

  const longitude = unit?.place?.coordinates?.lon ?? 0;
  const latitude = unit?.place?.coordinates?.lat ?? 0;
  const left = `${((longitude - maxLeft) / mapWidth * 100)}%`;
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
