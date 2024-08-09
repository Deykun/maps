export const removeDiacratics = (word: string, lang?: string) => {
    let textToReturn = word;

    // If lang not passed or specified
    if (!lang || lang === 'cs') {
        textToReturn = textToReturn.replaceAll('á', '_a')
            .replaceAll('č', '_c')
            .replaceAll('ď', '_d')
            .replaceAll('é', '_e')
            .replaceAll('ě', '_e')
            .replaceAll('í', '_i')
            .replaceAll('ň', '_n')
            .replaceAll('ó', '_o')
            .replaceAll('ř', '_r')
            .replaceAll('š', '_s')
            .replaceAll('ť', '_t')
            .replaceAll('ú', '_u')
            .replaceAll('ů', '_u')
            .replaceAll('ý', '_y')
            .replaceAll('ž', '_z');
    }

    if (!lang || lang === 'de') {
        textToReturn = textToReturn
            .replaceAll('ä', '_a')
            .replaceAll('ö', '_o')
            .replaceAll('ß', '_s')
            .replaceAll('ü', '_u');
    }

    if (!lang || lang === 'de') {
        textToReturn = textToReturn
            .replaceAll('ä', '_a')
            .replaceAll('ö', '_o')
            .replaceAll('ß', '_s')
            .replaceAll('ü', '_u');
    }

    if (!lang || lang === 'es') {
        textToReturn = textToReturn
            .replaceAll('á', '_a')
            .replaceAll('é', '_e')
            .replaceAll('í', '_i')
            .replaceAll('ó', '_o')
            .replaceAll('ú', '_u')
            .replaceAll('ü', '_ü')
            .replaceAll('ñ', '_n');
    }

    if (!lang || lang === 'fi') {
        textToReturn = textToReturn
            .replaceAll('å', '_a')
            .replaceAll('ä', '_a')
            .replaceAll('ö', '_o')
            .replaceAll('š', '_s')
            .replaceAll('ž', '_z');
    }

    if (!lang || lang === 'fr') {
        textToReturn = textToReturn
            .replaceAll('à', '_a')
            .replaceAll('â', '_a')
            .replaceAll('æ', '_a')
            .replaceAll('ç', '_c')
            .replaceAll('é', '_e')
            .replaceAll('è', '_e')
            .replaceAll('ê', '_e')
            .replaceAll('ë', '_e')
            .replaceAll('î', '_i')
            .replaceAll('ï', '_i')
            .replaceAll('ô', '_o')
            .replaceAll('œ', '_o')
            .replaceAll('ù', '_u')
            .replaceAll('û', '_u')
            .replaceAll('ü', '_u');
    }

    if (!lang || lang === 'it') {
        textToReturn = textToReturn
            .replaceAll('à', '_a')
            .replaceAll('è', '_e')
            .replaceAll('é', '_e')
            .replaceAll('ì', '_i')
            .replaceAll('í', '_i')
            .replaceAll('î', '_i')
            .replaceAll('ò', '_o')
            .replaceAll('ó', '_o')
            .replaceAll('ù', '_u')
            .replaceAll('ú', '_u');
    }

    if (!lang || lang === 'pl') {
        textToReturn = textToReturn
            .replaceAll('ą', '_a')
            .replaceAll('ć', '_c')
            .replaceAll('ę', '_e')
            .replaceAll('ł', '_l')
            .replaceAll('ń', '_n')
            .replaceAll('ó', '_o')
            .replaceAll('ś', '_s')
            .replaceAll('ź', '_z')
            .replaceAll('ż', '_z');
    }

    return textToReturn;
};
