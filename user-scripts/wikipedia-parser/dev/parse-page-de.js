const getIsFormer = (text) => {
  const lowercaseText = text.toLowerCase();

  return ['historische', 'ehemaliger', 'ehemalige', 'ehemals'].some((phrase) => lowercaseText.includes(phrase));
}

const getUnitTypesFromTitle = (text) => {
  const lowercaseText = ` ${text.toLowerCase()} `;

  const isFormer = getIsFormer(lowercaseText);

  // stadt - city
  const isCity = ['stadt\n', 'stadt ', 'städte ', 'stadtwappen', 'städtewappen'].some((phrase) => lowercaseText.includes(phrase));
  const isLand = ['landeswappen'].some((phrase) => lowercaseText.includes(phrase));
  const isGemeinde = [' gem.', 'gemeindewappen', 'gemeinde', 'gemeinden', 'marktgemeinde'].some((phrase) => lowercaseText.includes(phrase));
  const isMarkt = ['markt', 'märkte'].some((phrase) => lowercaseText.includes(phrase));
  const isMarktgemeinde = ['marktgemeinde', 'märkte'].some((phrase) => lowercaseText.includes(phrase));

  const isKreis = !isCity && !isLand && !isGemeinde && !isMarkt && !isMarktgemeinde && ['kreis', 'landkreis'].some((phrase) => lowercaseText.includes(phrase));

  const types = [
    isCity ? 'city' : '',
    isKreis ? 'kreis' : '',
    isLand ? 'land' : '',
    isGemeinde ? 'gemeinde' : '',
    isMarkt ? 'markt' : '',
    isMarktgemeinde ? 'marktgemeinde' : '',
  ].filter(Boolean).map((v) => {
    return isFormer && v !== 'kreis' ? `former${upperCaseFirstLetter(v)}` : v;
  });

  return types;
}

appendCSS(`
  [data-wp-title] {
    position: relative;
  }

  [data-wp-title]::after {
    content: attr(data-wp-title);
    position: absolute;
    top: 0%;
    left: 0%;
    background-color: #e0efff9c;
    font-size: 13px;
    padding: 0 3px;
    letter-spacing: 0.05em;
    color: #0c54a2;
    border: 1px solid #64788e40;
    transform-origin: top left;
    overflow: hidden;
    transition: all 0.15s ease-in-out;
    backdrop-filter: blur(7px) saturate(0.3);
    max-width: 17px;
    height: 17px;
    line-height: 17px;
    white-space: nowrap;
  }

  [data-wp-title]:hover::after,
  [data-wp-title-open]::after {
    max-width: 300px;
  }
`, { sourceName: 'parse-de' });

const getGalleryAfterHeader = (elToCheck) => {
  let el = elToCheck;

  const maxElementsToCheck = 7;
  for (let i = 0; i < maxElementsToCheck; i++) {
    if (el.classList.contains('gallery')) {
      return el;
    }
  
    if (el.classList.contains('.mw-heading2') || el.classList.contains('.mw-heading3')) {
      return undefined;
    }

    el = el.nextElementSibling;
    console.log(i);
  }
}

window.parsedDE = {};

export const markIndexedCategoriesPagesDE = () => {
  const unitsBySource = getSourcesFromLS();
  const indexedSources = Object.keys(unitsBySource).map((v) => v.replace('https://de.wikipedia.org', ''));

  if (indexedSources.length > 0) {
    const linksEl = Array.from(document.querySelectorAll('.mw-category-group a'));

    linksEl.forEach((linkEl) => {
      const href = linkEl.getAttribute('href');

      if (indexedSources.includes(href)) {
        linkEl.setAttribute('data-wp-title', `${unitsBySource[`https://de.wikipedia.org${href}`]?.length || 0} 🗂️`);
        linkEl.setAttribute('data-wp-title-open', 'true');
      }
    })
  }
}

export const savePageCoatOfArmsIfPossibleDE = () => {
  const source = location.href.split('#')[0];
  const isCategoryPage = source.includes('Kategorie:');

  if (isCategoryPage) {
    markIndexedCategoriesPagesDE();
  }

  const headersEl = Array.from(document.querySelectorAll('.mw-heading2, .mw-heading3'));

  let coatOfArmsList = [];

  headersEl.forEach((headersEl) => {
    const sectionTitle = headersEl.firstChild.innerText;

    const groupTypes = getUnitTypesFromTitle(sectionTitle);
    const isFormerGroup = getIsFormer(sectionTitle);
    const groupIcon = isFormerGroup ? '🍂' : '🍃';

    if (groupTypes.length > 0 || sectionTitle.toLowerCase().includes('historische')) {

      headersEl.setAttribute('data-wp-title', `${groupIcon} ${groupTypes.join(', ')}`);

      let nextGalleryEl = getGalleryAfterHeader(headersEl.nextElementSibling);

      const imagesEl = nextGalleryEl ? Array.from(nextGalleryEl.querySelectorAll('.gallerybox')) : [];

      imagesEl.forEach((imageEl) => {
        const isThatSpecificFormer = Boolean(imageEl.querySelector('.gallerytext')?.innerText?.match(/\d{4}\)/));

        const thumbnailUrl = imageEl.querySelector('.thumb img').src;
        const title = (imageEl.querySelector('.gallerytext')?.innerText || '').replace(/\n|\r/g, ' ');
        const locationName = (imageEl.querySelector('.gallerytext a')?.innerText || '').replace(/\n|\r/g, ' ');
        const locationUrl = (imageEl.querySelector('.gallerytext a')?.href || '').replace(/\n|\r/g, ' ');
        const descriptionNoteId = imageEl.querySelector('.gallerytext a[href^="#"]')?.getAttribute('href')?.replace('#', '');
        const description = descriptionNoteId ? `${(document.getElementById(descriptionNoteId)?.innerText || '').replace(/\n|\r/g, '')} ${title}` : title;

        const itemTypes = getUnitTypesFromTitle(title);

        let types = itemTypes.length > 0 ? itemTypes : groupTypes;

        const itemIcon = (isFormerGroup || isThatSpecificFormer) ? '🍂' : '🍃';

        types = types.map((v) => {
          return (isFormerGroup || isThatSpecificFormer) && !v.startsWith('former') ? `former${upperCaseFirstLetter(v)}` : v;
        });

        if (types.length > 0) {
          imageEl.setAttribute('data-wp-title', `${itemIcon} ${types.join(', ')}`);

          const coatOfArms = {
            locationName,
            locationUrl,
            thumbnailUrl,
            description,
            type: types,
            source,
            sourceTitle: sectionTitle,
          };

          coatOfArmsList.push(coatOfArms);
        }
      });
    }

    window.parsedDE[source] = coatOfArmsList;

    saveSource(source, coatOfArmsList);
  })
};