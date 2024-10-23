import { ManualMarker, ComplexManualMarker } from '@/topic/Heraldry/types';

export const getHasMarker = (
  {
    title,
    text,
    imageHash,
  }: {
    title: string,
    text: string,
    imageHash: string,
  },
  {
    phrases = [],
    include = [],
    exclude = [],
  }: {
    phrases?: string[],
    include?: ManualMarker[],
    exclude?: ManualMarker[],
  },
) => {
  // Legacy, imageHash will be better to use
  const includeStrings = include.filter((value) => typeof value === 'string') as string[];
  const excludeStrings = exclude.filter((value) => typeof value === 'string') as string[];

  if (includeStrings.includes(title)) {
    return true;
  }

  if (excludeStrings.includes(title)) {
    return false;
  }

  const includeImageHash = (include.filter((value) => typeof value !== 'string') as ComplexManualMarker[]).map(({ imageHash }) => imageHash);
  const excludeImageHash = (exclude.filter((value) => typeof value !== 'string') as ComplexManualMarker[]).map(({ imageHash }) => imageHash);

  if (includeImageHash.includes(imageHash)) {
    return true;
  }

  if (excludeImageHash.includes(imageHash)) {
    return false;
  }

  const lowerCaseText = ` ${text.toLowerCase()} `;

  const hasPhrase = phrases.some((phrase) => {
    const isEnding = phrase.startsWith('-');

    /*
      It guarantees that it is a word's start and not inside it "Bear" -> " bear"

      "-ing" gurantes the ending.
    */
    const words = isEnding ?
    [`${phrase.toLowerCase().replace('-', '')}`]
    : [
      ` ${phrase.toLowerCase()}`,
      `(${phrase.toLowerCase()}`,
      `:(${phrase.toLowerCase()}`,
      `\n${phrase.toLowerCase()}`
    ];

    const phrasesToCheck = words.flatMap((word) => [`${word} `, `${word},`, `${word}.`, `${word})`, `${word}-`, `${word}”`, `${word}“`, `${word}"`, `${word};`, `${word}:`, `${word}?`, `${word}[`]);
    
    // " bear" -> [" bear", " bear ", " bear,", " bear."]
    return phrasesToCheck.some((phraseToCheck) => lowerCaseText.includes(phraseToCheck));
  });

  if (hasPhrase) {
    return true;
  }

  return false;
};


export const getMarker = (
  markersList: string[],
  name: string,
  {
    title,
    text,
    imageHash,
  }: {
    title: string,
    text: string,
    imageHash: string,
  },
  {
    phrases = [],
    include = [],
    exclude = [],
  }: {
    phrases?: string[],
    include?: ManualMarker[],
    exclude?: ManualMarker[],
  },
) => {
  const hasMarker = getHasMarker({ title, text, imageHash }, { phrases, include, exclude });

  if (hasMarker) {
    markersList.push(name);

    return markersList;
  }

  return markersList;
};
