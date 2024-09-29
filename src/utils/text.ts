export const capitalize = (text: string | undefined) => (text ? text[0].toUpperCase() + text.slice(1) : text);

export const lowercaseFirstLetter = (text: string | undefined) => (text ? text[0].toLowerCase() + text.slice(1) : text);

export const removeDiacratics = (word: string, lang?: string, special = '') => {
    let textToReturn = word;

    // If lang not passed or specified
    if (!lang || lang === 'cs') {
        textToReturn = textToReturn.replaceAll('á', `${special}a`)
            .replaceAll('č', `${special}c`)
            .replaceAll('ď', `${special}d`)
            .replaceAll('é', `${special}e`)
            .replaceAll('ě', `${special}e`)
            .replaceAll('í', `${special}i`)
            .replaceAll('ň', `${special}n`)
            .replaceAll('ó', `${special}o`)
            .replaceAll('ř', `${special}r`)
            .replaceAll('š', `${special}s`)
            .replaceAll('ť', `${special}t`)
            .replaceAll('ú', `${special}u`)
            .replaceAll('ů', `${special}u`)
            .replaceAll('ý', `${special}y`)
            .replaceAll('ž', `${special}z`);
    }

    if (!lang || lang === 'de') {
        textToReturn = textToReturn
            .replaceAll('ä', `${special}a`)
            .replaceAll('ö', `${special}o`)
            .replaceAll('ß', `${special}s`)
            .replaceAll('ü', `${special}u`);
    }

    if (!lang || lang === 'de') {
        textToReturn = textToReturn
            .replaceAll('ä', `${special}a`)
            .replaceAll('ö', `${special}o`)
            .replaceAll('ß', `${special}s`)
            .replaceAll('ü', `${special}u`);
    }

    if (!lang || lang === 'es') {
        textToReturn = textToReturn
            .replaceAll('á', `${special}a`)
            .replaceAll('é', `${special}e`)
            .replaceAll('í', `${special}i`)
            .replaceAll('ó', `${special}o`)
            .replaceAll('ú', `${special}u`)
            .replaceAll('ü', `${special}ü`)
            .replaceAll('ñ', `${special}n`);
    }

    if (!lang || lang === 'et') {
        textToReturn = textToReturn
            .replaceAll('ä', `${special}a`)
            .replaceAll('õ', `${special}o`)
            .replaceAll('õ', `${special}o`)
            .replaceAll('ö', `${special}o`)
            .replaceAll('š', `${special}s`)
            .replaceAll('ž', `${special}z`)
            .replaceAll('ü', `${special}u`);
    }

    if (!lang || lang === 'fi') {
        textToReturn = textToReturn
            .replaceAll('å', `${special}a`)
            .replaceAll('ä', `${special}a`)
            .replaceAll('ö', `${special}o`)
            .replaceAll('š', `${special}s`)
            .replaceAll('ž', `${special}z`);
    }

    if (!lang || lang === 'fr') {
        textToReturn = textToReturn
            .replaceAll('à', `${special}a`)
            .replaceAll('â', `${special}a`)
            .replaceAll('æ', `${special}a`)
            .replaceAll('ç', `${special}c`)
            .replaceAll('é', `${special}e`)
            .replaceAll('è', `${special}e`)
            .replaceAll('ê', `${special}e`)
            .replaceAll('ë', `${special}e`)
            .replaceAll('î', `${special}i`)
            .replaceAll('ï', `${special}i`)
            .replaceAll('ô', `${special}o`)
            .replaceAll('œ', `${special}o`)
            .replaceAll('ù', `${special}u`)
            .replaceAll('û', `${special}u`)
            .replaceAll('ü', `${special}u`);
    }

    if (!lang || lang === 'it') {
        textToReturn = textToReturn
            .replaceAll('à', `${special}a`)
            .replaceAll('è', `${special}e`)
            .replaceAll('é', `${special}e`)
            .replaceAll('ì', `${special}i`)
            .replaceAll('í', `${special}i`)
            .replaceAll('î', `${special}i`)
            .replaceAll('ò', `${special}o`)
            .replaceAll('ó', `${special}o`)
            .replaceAll('ù', `${special}u`)
            .replaceAll('ú', `${special}u`);
    }

    if (!lang || lang === 'pl') {
        textToReturn = textToReturn
            .replaceAll('ą', `${special}a`)
            .replaceAll('ć', `${special}c`)
            .replaceAll('ę', `${special}e`)
            .replaceAll('ł', `${special}l`)
            .replaceAll('ń', `${special}n`)
            .replaceAll('ó', `${special}o`)
            .replaceAll('ś', `${special}s`)
            .replaceAll('ź', `${special}z`)
            .replaceAll('ż', `${special}z`);
    }

    return textToReturn;
};
