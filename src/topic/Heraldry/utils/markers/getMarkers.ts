import { getMarkers as getMarkersET } from './lang/et';
import { getMarkers as getMarkersDE } from './lang/de';
import { getMarkers as getMarkersFI } from './lang/fi';
import { getMarkers as getMarkersPL } from './lang/pl';

export const getMarkers = ({
  text: rawText = '',
  title,
  imageHash,
  lang,
}: {
  text: string,
  title: string,
  imageHash: string,
  lang: string,
}) => {
  let types: string[] = [];
  let animals: string[] = [];
  let items: string[] = [];

  if (lang === 'de') {
    const response = getMarkersDE({ text: rawText, title, imageHash })

    types = response.types;
    animals = response.animals;
    items = response.items;
  }

  if (lang === 'et') {
    const response = getMarkersET({ text: rawText, title, imageHash })

    types = response.types;
    animals = response.animals;
    items = response.items;
  }

  if (lang === 'fi') {
    const response = getMarkersFI({ text: rawText, title, imageHash })

    types = response.types;
    animals = response.animals;
    items = response.items;
  }

  if (lang === 'pl') {
    const response = getMarkersPL({ text: rawText, title, imageHash });

    types = response.types;
    animals = response.animals;
    items = response.items;
  }

  if (!animals.includes('bird') && animals.some((active) => ['crane', 'duck', 'eagle', 'falcon', 'goose', 'gull', 'grouse', 'hawk', 'heron', 'owl', 'peacock', 'pelican', 'pigeon', 'phoenix', 'stork', 'raven', 'rooster', 'swan', 'vulture'].includes(active))) {
    animals.push('bird');
  }

  if (!animals.includes('insect') && animals.some((active) => ['bee', 'ant', 'dragonfly', 'butterfly'].includes(active))) {
    animals.push('insect');
  }

  if (!animals.includes('wolf') && animals.some((active) => ['wolverine'].includes(active))) {
    animals.push('wolf');
  }

  if (!animals.includes('fish') && animals.some((active) => ['salmon', 'seahorse'].includes(active))) {
    animals.push('fish');
  }

  if (!items.includes('flower') && items.some((active) => ['lily', 'rose'].includes(active))) {
    items.push('flower');
  }

  if (!items.includes('walls') && items.some((active) => ['lighthouse'].includes(active))) {
    items.push('walls');
  }

  if (!items.includes('musicalInstrument') && items.some((active) => ['violin', 'flute', 'horn'].includes(active))) {
    items.push('musicalInstrument')
  }

  return {
    types,
    animals,
    items,
  }
}