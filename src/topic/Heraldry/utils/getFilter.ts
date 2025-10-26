import { CoatOfArmsMapData, CoatOfArmsDetailsData } from '../types';

export type GetFilterResponse = {
  value: string;
  total: number;
}[]

export const getFilter = (
  units: CoatOfArmsMapData[] | CoatOfArmsDetailsData[],
  name: 'animals' | 'items' | 'type' | 'colors'
): GetFilterResponse => {
  const filterByName = units.reduce((stack: {
    [key: string]: number,
  }, unit) => {
    const marker = (
      name === 'type'
      ? (unit as CoatOfArmsMapData).type
      : (
        name === 'colors'
        ? Object.keys((unit as CoatOfArmsDetailsData).colors?.colorsByNames || {})
        : (unit as CoatOfArmsDetailsData)?.markers?.[name]
      )
    ) || [];

    marker.forEach((value: string) => {
      if (stack[value]) {
        stack[value] = stack[value] + 1;
      } else {
        stack[value] = 1;
      }
    })
  
    return stack;
  }, {});
  
  return Object.entries(filterByName).map(
    ([value, total]) => ({ value, total }),
  ).filter(
    ({ total }) => total >= 0,
  ).sort((a, b) => b.total - a.total);
};
