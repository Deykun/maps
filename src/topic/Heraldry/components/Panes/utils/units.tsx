import { CoatOfArmsMapData } from '@/topic/Heraldry/types';
import { removeDiacratics } from '@/utils/text';

const getIsIdMatch = (phrase: string, unit: CoatOfArmsMapData) => {
  const idToFind = phrase.replace('id:', '').toLowerCase();

  return [
    unit.id.toLowerCase(),
    ...(unit.mergedIds || []).map((id) => id.toLowerCase()),
  ].some((id) => id === idToFind);
}

const getIsImageMatch = (phrase: string, unit: CoatOfArmsMapData) => {
  if (!unit.imageHash) {
    return false;
  }

  const hashToFind = phrase.replace('img:', '').toLowerCase();

  return unit.imageHash === hashToFind;
};

const getDoesPhraseMatch =  (phrase: string, unit: CoatOfArmsMapData) => {
  if (phrase.startsWith('id:')) {
    return getIsIdMatch(phrase, unit);
  }

  if (phrase.startsWith('img:')) {
    return getIsImageMatch(phrase, unit);
  }

  if (phrase.includes('-') && getIsIdMatch(phrase, unit)) {
    return true;
  }

  const listPhraseNormalizedWords = phrase.split(' ').filter(Boolean);
  const text = `${unit.title} ${unit?.place?.name || ''}`.toLowerCase();
  const indexText = removeDiacratics(text);

  return listPhraseNormalizedWords.length > 0 && listPhraseNormalizedWords.every((phraseWord) => indexText.includes(phraseWord));
};

export const getDoesUnitMatch = (listPhraseNormalized: string, unit: CoatOfArmsMapData) => {
  const phrases = listPhraseNormalized.split(',').map((text) => text.trim());

  return phrases.some(phrase => getDoesPhraseMatch(phrase, unit));
};

const multiplayerForShortTitlesBonus: {
  [wordsCount: number]: number
} = {
  1: 6,
  2: 4,
  3: 2
} as const;

const getPhraseSortRank = (phrase: string, unit: CoatOfArmsMapData) => {
  if (!getDoesPhraseMatch(phrase, unit)) {
    return 0;
  }

  const listPhraseNormalizedWords = phrase.split(' ');
  const titleWords = removeDiacratics(unit.title.toLowerCase()).split(' ');
  const placeWords = removeDiacratics((unit.place?.name || '').toLowerCase()).split(' ');

  let rank = 0;

  if (phrase.startsWith('id:') && getIsIdMatch(phrase, unit)) {
    rank += 2000;
  }

  if (phrase.startsWith('img:') && getIsImageMatch(phrase, unit)) {
    rank += 2000;
  }

  listPhraseNormalizedWords.forEach((phraseWord) => {
    titleWords.forEach((titleWord) => {
      if (titleWord === phraseWord) {
        rank += 500 * (multiplayerForShortTitlesBonus[titleWords.length] || 1);
      } else if (titleWord.startsWith(phraseWord)) {
        rank += 100 * (multiplayerForShortTitlesBonus[titleWords.length] || 1);
      } else if (titleWord.includes(phraseWord)) {
        rank += 20 * (multiplayerForShortTitlesBonus[titleWords.length] || 1);
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

export const getUnitSortRank = (listPhraseNormalized: string, unit: CoatOfArmsMapData) => {
  const phrases = listPhraseNormalized.split(',').map((text) => text.trim());

  const ranks = phrases.map(phrase => getPhraseSortRank(phrase, unit));

  return Math.max(...ranks);
};
