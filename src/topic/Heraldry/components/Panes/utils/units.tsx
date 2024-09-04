import { AdministrativeUnit } from '@/topic/Heraldry/types';
import { removeDiacratics } from '@/utils/text';

export const getDoesUnitMatch = (listPhraseNormalized: string, unit: AdministrativeUnit) => {
  const listPhraseNormalizedWords = listPhraseNormalized.split(' ');
  const text = `${unit.title} ${unit?.place?.name || ''}`.toLowerCase();
  const indexText = removeDiacratics(text);

  return listPhraseNormalizedWords.every((phraseWord) => indexText.includes(phraseWord));
};

export const getUnitSortRank = (listPhraseNormalized: string, unit: AdministrativeUnit) => {
  const listPhraseNormalizedWords = listPhraseNormalized.split(' ');
  const titleWords = removeDiacratics(unit.title.toLowerCase()).split(' ');
  const placeWords = removeDiacratics((unit.place?.name || '').toLowerCase()).split(' ');

  let rank = 0;

  listPhraseNormalizedWords.forEach((phraseWord) => {
    titleWords.forEach((titleWord) => {
      if (titleWord === phraseWord) {
        rank += 500;
      } else if (titleWord.startsWith(phraseWord)) {
        rank += 100;
      } else if (titleWord.includes(phraseWord)) {
        rank += 20;
      }
    });
  })

  listPhraseNormalizedWords.forEach((phraseWord) => {
    placeWords.forEach((placeWord) => {
      if (placeWord === phraseWord) {
        rank += 1000;
      } else if (placeWord.startsWith(phraseWord)) {
        rank += 5;
      } else if (placeWord.includes(phraseWord)) {
        rank += 1;
      }
    });
  });

  return rank;
};

