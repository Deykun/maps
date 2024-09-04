import { getMarker } from '../getMarker';
import { MarkerParams } from '@/topic/Heraldry/types'

import filtersJSON from '@/../public/data/heraldry/et/filters.json'

const {
  animals: animalsRules,
  items: itemsRules,
}: {
  animals: MarkerParams[],
  items: MarkerParams[],
} = filtersJSON;

export const getMarkers = ({
  text: rawText = '',
  title,
}: {
  text: string,
  title: string,
}) => {
  let animals: string[] = [];
  let items: string[] = [];

  const text = rawText.toLowerCase() || '';

  const data = { title, text };

  animalsRules.forEach(({ name, phrases, exclude = [], include = [] }) => {
    animals = getMarker(animals, name, data, {
      phrases,
      exclude,
      include,
    });
  });

  itemsRules.forEach(({ name, phrases, exclude = [], include = [] }) => {
    items = getMarker(items, name, data, {
      phrases,
      exclude,
      include,
    });
  });

  return {
    animals,
    items,
  }
};
