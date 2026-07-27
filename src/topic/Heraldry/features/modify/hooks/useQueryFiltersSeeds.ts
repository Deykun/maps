import { useQuery } from "@tanstack/react-query";
import { MarkerParams } from "@/topic/Heraldry/types";

type FetchParams = {
  country: string;
};

const fetchData = async ({ country }: FetchParams) => {
  const response = await fetch(
    `/maps/data/heraldry/${country}/filters.json`
  ).then((response) => response.json());

  const types = (response.types || []) as MarkerParams[];
  const animals = (response.animals || []) as MarkerParams[];
  const items = (response.items || []) as MarkerParams[];

  return {
    types,
    animals,
    items,
  };
};

export default function useQueryFiltersSeeds({ country }: FetchParams) {
  const response = useQuery({
    queryFn: () => fetchData({ country }),
    queryKey: ["filter", country],
    staleTime: 5 * 60 * 1000,
  });

  return response;
}
