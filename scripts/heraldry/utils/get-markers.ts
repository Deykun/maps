import { getMarkers as getMarkersET } from '../ee/utils/get-markers';
import { getMarkers as getMarkersFI } from '../fi/utils/get-markers';
import { getMarkers as getMarkersPL } from '../pl/utils/get-markers';

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

  if (lang === 'ee') {
    const response = getMarkersET({ text: rawText, title })

    animals = response.animals;
    items = response.items;
  }

  if (lang === 'fi') {
    const response = getMarkersFI({ text: rawText, title })

    animals = response.animals;
    items = response.items;
  }

  if (lang === 'pl') {
    const response = getMarkersPL({ text: rawText, title });

    animals = response.animals;
    items = response.items;
  }

  if (!animals.includes('bird') && animals.some((active) => ['crane', 'duck', 'eagle', 'goose', 'gull', 'hawk', 'stork', 'raven', 'rooster', 'swan', 'owl'].includes(active))) {
    animals.push('bird');
  }

  if (!animals.includes('insect') && animals.some((active) => ['bee', 'ant', 'dragonfly', 'butterfly'].includes(active))) {
    animals.push('insect');
  }

  if (!animals.includes('wolf') && animals.some((active) => ['wolverine'].includes(active))) {
    animals.push('wolf');
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