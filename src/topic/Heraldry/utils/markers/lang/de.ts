import { getMarker } from '../getMarker';
import { MarkerParams } from '@/topic/Heraldry/types'

import filtersJSON from '@/../public/data/heraldry/de/filters.json'

const {
  types: typesRules,
  animals: animalsRules,
  items: itemsRules,
}: {
  types: MarkerParams[],
  animals: MarkerParams[],
  items: MarkerParams[],
} = filtersJSON;

export const getMarkers = ({
  text: rawText = '',
  title,
  imageHash,
}: {
  text: string,
  title: string,
  imageHash: string,
}) => {
  let types: string[] = [];
  let animals: string[] = [];
  let items: string[] = [];

  const text = rawText.toLowerCase() || '';

  const data = { title, text, imageHash };
  
  typesRules.forEach(({ name, phrases, exclude = [], include = [] }) => {
    types = getMarker(types, name, data, {
      phrases,
      exclude,
      include,
    });
  });

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
    types,
  }
};
