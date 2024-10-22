type SortedItem = {
  value: string,
  total: number,
}

type GetSorterParams = {
  sortBy: 'value' | 'name',
  tBase: string,
  t: (text: string) => void,
}

export const getSorter = ({
  sortBy,
  tBase,
  t,
}: GetSorterParams) => {
  if (sortBy === 'name') {
    return (a: SortedItem, b: SortedItem) => `${t(tBase + a.value)}`.localeCompare(`${t(tBase + b.value)}`);
  }

  return (a: SortedItem, b: SortedItem) => b.total - a.total;
}
