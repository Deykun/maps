import { getMarkers as getMarkersPL } from '../pl/utils/get-markers';
import { getMarkers as getMarkersET } from '../et/utils/get-markers';

export const getMarkers = ({
  text: rawText = '',
  title,
  lang,
}: {
  text: string,
  title: string,
  lang: string,
}) => {
  let animals: string[] = [];
  let items: string[] = [];

  const text = rawText.toLowerCase() || '';

  if (lang === 'pl') {
    const response = getMarkersPL({ text: rawText, title });

    animals = response.animals;
    items = response.items;
  }

  if (lang === 'et') {
    const response = getMarkersET({ text: rawText, title })

    animals = response.animals;
    items = response.items;
  }

  if (!animals.includes('bird') && animals.some((active) => ['stork', 'crane', 'raven', 'goose', 'gull', 'rooster', 'swan', 'owl', 'hawk', 'eagle'].includes(active))) {
    animals.push('bird');
  }

  if (!animals.includes('insect') && animals.some((active) => ['bee', 'ant', 'dragonfly'].includes(active))) {
    animals.push('insect');
  }

  if (!animals.includes('fish') && animals.some((active) => ['salmon'].includes(active))) {
    animals.push('fish');
  }

  if (!items.includes('flower') && items.some((active) => ['lily', 'rose'].includes(active))) {
    items.push('flower');
  }

  if (!items.includes('walls') && items.some((active) => ['lighthouse'].includes(active))) {
    items.push('walls');
  }

  return {
    animals,
    items,
  }
}