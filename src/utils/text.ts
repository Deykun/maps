export const removeDiacratics = (word: string, lang?: string) => {
  let textToReturn = word;

  // If lang not passed or specified
  if (!lang || lang === 'cs') {
    textToReturn = textToReturn.replaceAll('á', 'a')
      .replaceAll('č', 'c')
      .replaceAll('ď', 'd')
      .replaceAll('é', 'e')
      .replaceAll('ě', 'e')
      .replaceAll('í', 'i')
      .replaceAll('ň', 'n')
      .replaceAll('ó', 'o')
      .replaceAll('ř', 'r')
      .replaceAll('š', 's')
      .replaceAll('ť', 't')
      .replaceAll('ú', 'u')
      .replaceAll('ů', 'u')
      .replaceAll('ý', 'y')
      .replaceAll('ž', 'z');
  }

  if (!lang || lang === 'de') {
    textToReturn = textToReturn
      .replaceAll('ä', 'a')
      .replaceAll('ö', 'o')
      .replaceAll('ß', 's')
      .replaceAll('ü', 'u');
  }

  if (!lang || lang === 'de') {
    textToReturn = textToReturn
      .replaceAll('ä', 'a')
      .replaceAll('ö', 'o')
      .replaceAll('ß', 's')
      .replaceAll('ü', 'u');
  }

  if (!lang || lang === 'es') {
    textToReturn = textToReturn
      .replaceAll('á', 'a')
      .replaceAll('é', 'e')
      .replaceAll('í', 'i')
      .replaceAll('ó', 'o')
      .replaceAll('ú', 'u')
      .replaceAll('ü', 'ü')
      .replaceAll('ñ', 'n');
  }

  if (!lang || lang === 'fi') {
    textToReturn = textToReturn
      .replaceAll('å', 'a')
      .replaceAll('ä', 'a')
      .replaceAll('ö', 'o')
      .replaceAll('š', 's')
      .replaceAll('ž', 'z');
  }

  if (!lang || lang === 'fr') {
    textToReturn = textToReturn
      .replaceAll('à', 'a')
      .replaceAll('â', 'a')
      .replaceAll('æ', 'a')
      .replaceAll('ç', 'c')
      .replaceAll('é', 'e')
      .replaceAll('è', 'e')
      .replaceAll('ê', 'e')
      .replaceAll('ë', 'e')
      .replaceAll('î', 'i')
      .replaceAll('ï', 'i')
      .replaceAll('ô', 'o')
      .replaceAll('œ', 'o')
      .replaceAll('ù', 'u')
      .replaceAll('û', 'u')
      .replaceAll('ü', 'u');
  }

  if (!lang || lang === 'it') {
    textToReturn = textToReturn
      .replaceAll('à', 'a')
      .replaceAll('è', 'e')
      .replaceAll('é', 'e')
      .replaceAll('ì', 'i')
      .replaceAll('í', 'i')
      .replaceAll('î', 'i')
      .replaceAll('ò', 'o')
      .replaceAll('ó', 'o')
      .replaceAll('ù', 'u')
      .replaceAll('ú', 'u');
  }

  if (!lang || lang === 'pl') {
    textToReturn = textToReturn
      .replaceAll('ą', 'a')
      .replaceAll('ć', 'c')
      .replaceAll('ę', 'e')
      .replaceAll('ł', 'l')
      .replaceAll('ń', 'n')
      .replaceAll('ó', 'o')
      .replaceAll('ś', 's')
      .replaceAll('ź', 'z')
      .replaceAll('ż', 'z');
  }

  return textToReturn;
};
