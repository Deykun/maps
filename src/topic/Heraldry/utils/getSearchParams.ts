export type MapsSearchParams = {
  filterOperator: 'or' | 'and',
  shouldReverseFilters: boolean,
  typeFilters: string[],
  colorFilters: string[],
  animalFilters: string[],
  itemFilters: string[],
}

export const getSearchParamFromFilters = ({
  filterOperator, shouldReverseFilters, typeFilters, colorFilters, animalFilters, itemFilters
}: MapsSearchParams) => {
  const searchParts = [];

  if (filterOperator === 'or') {
    searchParts.push('o=or');
  }

  if (shouldReverseFilters) {
    searchParts.push('r=1');
  }

  if (typeFilters.length > 0) {
    searchParts.push(`t=${typeFilters.join(',')}`);
  }

  if (colorFilters.length > 0) {
    searchParts.push(`c=${colorFilters.join(',')}`);
  }

  if (animalFilters.length > 0) {
    searchParts.push(`a=${animalFilters.join(',')}`);
  }

  if (itemFilters.length > 0) {
    searchParts.push(`i=${itemFilters.join(',')}`);
  }

  if (searchParts.length === 0) {
    return '';
  }

  return `?${searchParts.join('&')}`;
}

export const getFiltersFromSearchParams = () => {
  let filters: Partial<MapsSearchParams> = {
    filterOperator: undefined,
    shouldReverseFilters:undefined,
    typeFilters: undefined,
    colorFilters: undefined,
    animalFilters: undefined,
    itemFilters: undefined,
  };

  const searchParams = new URL(location.href).searchParams;

  if (searchParams.get("o") === 'or') {
    filters.filterOperator = 'or';
  }

  if (searchParams.get("r") === '1') {
    filters.shouldReverseFilters = true;
  }

  const types = (searchParams.get("t") || '').split(',').filter(Boolean);
  const colors = (searchParams.get("c") || '').split(',').filter(Boolean);
  const animals = (searchParams.get("a") || '').split(',').filter(Boolean);
  const items = (searchParams.get("i") || '').split(',').filter(Boolean);

  if (types.length > 0) {
    filters.typeFilters = types;
  }

  if (colors.length > 0) {
    filters.colorFilters = colors;
  }

  if (animals.length > 0) {
    filters.animalFilters = animals;
  }

  if (items.length > 0) {
    filters.itemFilters = items;
  }

  return filters;
}