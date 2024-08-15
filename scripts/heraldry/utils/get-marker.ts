export type MarkerParams = {
  name: string,
  phrases?: string[],
  exclude?: string[],
  include?: string[],
}

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
  if (include.includes(title)) {
    markersList.push(name);

    return markersList;
  }

  if (exclude.includes(title)) {
    return markersList;
  }

  const hasPhrase = phrases.some((phrase) => {
    /*
      It guarantees that it is a word's start and not inside it "Bear" -> " bear"

      "-ing" gurantes the ending.
    */
    const word = phrase.startsWith('-') ? `${phrase.toLowerCase().replace('-', '')}` : ` ${phrase.toLowerCase()}`;
    
    // " bear" -> [" bear", " bear ", " bear,", " bear."]
    return [word, `${word} `, `${word},`, `${word}.`, `${word}-`, `${word}”`, `${word};`].some((phraseToCheck) => text.includes(phraseToCheck));
  });

  if (hasPhrase) {
    markersList.push(name);
  }
  
  return markersList;
};
