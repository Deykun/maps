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
  const animals: string[] = [];
  const items: string[] = [];

  const text = rawText.toLowerCase() || '';

  if (lang === 'pl') {
    return getMarkersPL({ text: rawText, title })
  }

  if (lang === 'et') {
    return getMarkersET({ text: rawText, title })
  }

  return {
    animals,
    items,
  }
}