import { AdministrativeUnit } from '../constants';

export const getFilter = (units: AdministrativeUnit[], name: 'animals' | 'items' | 'type') => {
  const filterByName = units.reduce((stack: {
    [key: string]: number,
  }, unit) => {
    const marker = (name === 'type' ? unit.type : unit?.markers?.[name]) || [];
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
