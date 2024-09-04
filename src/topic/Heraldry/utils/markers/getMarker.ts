export const getHasMarker = (
  {
    title,
    text,
  }: {
    title: string,
    text: string,
  },
  {
    phrases = [],
    include = [],
    exclude = [],
  }: {
    phrases?: string[],
    include?: string[],
    exclude?: string[],
  },
) => {
  if (include.includes(title)) {
    return true;
  }

  if (exclude.includes(title)) {
    return false;
  }

  const lowerCaseText = text.toLowerCase();

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

    const phrasesToCheck = words.flatMap((word) => [`${word} `, `${word},`, `${word}.`, `${word})`, `${word}-`, `${word}”`, `${word}"`, `${word};`, `${word}:`, `${word}?`]);
    
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
  }: {
    title: string,
    text: string,
  },
  {
    phrases = [],
    include = [],
    exclude = [],
  }: {
    phrases?: string[],
    include?: string[],
    exclude?: string[],
  },
) => {
  const hasMarker = getHasMarker({ title, text }, { phrases, include, exclude });

  if (hasMarker) {
    markersList.push(name);

    return markersList;
  }

  return markersList;
};
