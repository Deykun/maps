import { AdministrativeUnit } from '../constants';

// https://pl.wikipedia.org/wiki/Geografia_Polski

const minTop = 0;
// const maxTop = 54.8;
const maxTop = 54.95;
const maxBottom = 48.95;

const maxLeft = 14.07;
const maxRight = 24.25;

const polandWidth = maxRight - maxLeft;

export const getPostionForPlace = (unit: AdministrativeUnit) => {
  const longitude = unit?.place?.coordinates?.lon ?? 0;
  const latitude = unit?.place?.coordinates?.lat ?? 0;
  const left = `${((longitude - maxLeft) / polandWidth * 100)}%`;
  const top = `${minTop + ((latitude - maxTop) / (maxBottom - maxTop) * 100)}%`;

  return {
    left,
    top,
  }
};
