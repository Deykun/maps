import { useQuery } from '@tanstack/react-query';
import { MarkerParams } from '@/topic/Heraldry/types';

type FetchParmas = {
  country: string,
}

const fetchData = async ({ country }: FetchParmas) => {
  const response = await fetch(`/maps/data/heraldry/${country}/filters.json`).then((response) => response.json());

  const animals = (response.animals || []) as MarkerParams[];
  const items = (response.items || []) as MarkerParams[];

  return {
    animals,
    items,
  };
};

export default function useQueryFiltersSeeds({ country }: FetchParmas){
  const response = useQuery({
    queryFn: () => fetchData({ country }),
    queryKey: ['filter', country],
    staleTime: 5 * 60 * 1000,
  });

  return response;
};
