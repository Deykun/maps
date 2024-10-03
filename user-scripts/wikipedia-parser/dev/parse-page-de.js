const getIsFormer = (text = '') => {
  const lowercaseText = text.toLowerCase();

  return ['historische', 'ehemaliger', 'ehemalige', 'ehemals'].some((phrase) => lowercaseText.includes(phrase));
}

const getSafeText = (text) => {
  if (!text) {
    return '';
  }

  return text.replace(/\n|\r/g, ' ').replaceAll(`'`, `"`).replace(/\s\s+/g, ' ');
}

const getUnitTypesFromTitle = (text) => {
  const lowercaseText = ` ${text.toLowerCase()} `;

  const isFormer = getIsFormer(lowercaseText);

  // stadt - city
  const isCity = ['stadt\n', 'stadt ', 'städte ', 'stadtteile', 'stadtwappen', 'städtewappen'].some((phrase) => lowercaseText.includes(phrase));
  // bezirke - distric
  const isBezirke = ['bezirke', 'ortsbezirk'].some((phrase) => lowercaseText.includes(phrase));
  const isLand = ['landeswappen'].some((phrase) => lowercaseText.includes(phrase));
  const isGemeinde = [' gem.', 'gemeindewappen', 'gemeinde', 'gemeinden', 'gemeinschaften', 'marktgemeinde'].some((phrase) => lowercaseText.includes(phrase));
  const isMarkt = ['markt', 'märkte'].some((phrase) => lowercaseText.includes(phrase));
  const isMarktgemeinde = ['marktgemeinde', 'märkte'].some((phrase) => lowercaseText.includes(phrase));

  const isKreis = !isCity && !isBezirke && !isLand && !isGemeinde && !isMarkt && !isMarktgemeinde && ['kreis', 'landkreis'].some((phrase) => lowercaseText.includes(phrase));

  const types = [
    isCity ? 'city' : '',
    isKreis ? 'kreis' : '',
    isBezirke ? 'bezirke' : '',
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

const getHeaderBefore = (elToCheck, classToFind) => {
  let el = elToCheck;

  const maxElementsToCheck = 40;
  for (let i = 0; i < maxElementsToCheck; i++) {
    if (!el) {
      return undefined;
    }
    
    if (el.classList.contains(classToFind)) {
      return el;
    }

    el = el.previousElementSibling;
  }

  return undefined;
}

const getElementAfterHeader = (elToCheck, classToFind) => {
  let el = elToCheck;

  const maxElementsToCheck = 7;
  for (let i = 0; i < maxElementsToCheck; i++) {
    if (!el) {
      return undefined;
    }

    if (el.classList.contains(classToFind)) {
      return el;
    }
  
    if (el.classList.contains('.mw-heading2') || el.classList.contains('.mw-heading3')) {
      return undefined;
    }

    el = el.nextElementSibling;
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
  const pageTitle = document.querySelector('.mw-page-title-main')?.innerText || '';
  const isCategoryPage = source.includes('Kategorie:');

  if (isCategoryPage) {
    markIndexedCategoriesPagesDE();
  }

  const headersEl = Array.from(document.querySelectorAll('.mw-heading2, .mw-heading3'));

  let coatOfArmsList = [];

  headersEl.forEach((headersEl) => {
    const sectionTitle = headersEl.firstChild.innerText;
    const groupTypes = getUnitTypesFromTitle(sectionTitle);
    let isFormerGroup = getIsFormer(sectionTitle);

    const isH3 = headersEl.getAttribute('class').includes('mw-heading3');

    if (isH3 && !isFormerGroup) {
      const sectionHeaderH2 = getHeaderBefore(headersEl, 'mw-heading2');

      if (sectionHeaderH2) {
        const sectionTitleH2 = sectionHeaderH2.firstChild.innerText;

        isFormerGroup = getIsFormer(sectionTitleH2);
      }
    }

    const groupIcon = isFormerGroup ? '🍂' : '🍃';

    if (groupTypes.length > 0 || sectionTitle.toLowerCase().includes('historische')) {

      headersEl.setAttribute('data-wp-title', `${groupIcon} ${groupTypes.join(', ')}`);

      const nextGalleryEl = getElementAfterHeader(headersEl.nextElementSibling, 'gallery');
      const nextTableEl = getElementAfterHeader(headersEl.nextElementSibling, 'wikitable');

      if (nextGalleryEl) {
        const imagesEl = nextGalleryEl ? Array.from(nextGalleryEl.querySelectorAll('.gallerybox')) : [];

        imagesEl.forEach((imageEl) => {
          const isThatSpecificFormer = Boolean(imageEl.querySelector('.gallerytext')?.innerText?.match(/\d{4}\)/));

          const thumbnailUrl = imageEl.querySelector('.thumb img').src;
          const title = getSafeText(imageEl.querySelector('.gallerytext')?.innerText);
          const locationName = getSafeText(imageEl.querySelector('.gallerytext a')?.innerText);
          const locationUrl = imageEl.querySelector('.gallerytext a')?.href || '';
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
              sourceTitle: [pageTitle, sectionTitle].filter(Boolean).join(' | '),
            };

            coatOfArmsList.push(coatOfArms);
          }
        });
      }

      if (nextTableEl) {
        // https://de.wikipedia.org/wiki/Liste_der_Wappen_im_Landkreis_Celle - table example
        const {
          groupTypes,
          indexCoatOfArms,
          indexLocation,
          indexDescription,
        } = Array.from(nextTableEl.querySelectorAll('tr:first-child th')).reduce((stack, el, index) => {
          const text = (el.innerText || '').toLowerCase();
          const isCoatOfArms = ['wappen'].some((v) => text.includes(v));
          const isDescription = ['kommentare'].some((v) => text.includes(v));
          const isLocation = !isCoatOfArms && !isDescription;

          if (isLocation) {
            stack.indexLocation = index;
            stack.groupTypes = getUnitTypesFromTitle(text);
          }

          if (isDescription) {
            stack.indexDescription = index;
          }

          if (isCoatOfArms) {
            stack.indexCoatOfArms = index;
          }

          return stack;
        }, {
          groupTypes: [],
          indexLocation: 0,
          indexCoatOfArms: 1,
          indexDescription: 2,
        });

        const hasEnoughData = typeof indexCoatOfArms === 'number';
        if (hasEnoughData) {
          const [headEl, ...rowsEl] = Array.from(nextTableEl.querySelectorAll('tr'));

          rowsEl.forEach(rowEl => {
            const columnEls = Array.from(rowEl.querySelectorAll('td'));
            const isThatSpecificFormer = getIsFormer(rowEl.innerText);

            const thumbnailUrl = columnEls[indexCoatOfArms].querySelector('img')?.src;
            const title = getSafeText(columnEls[indexLocation]?.innerText);
            const locationName = getSafeText(columnEls[indexLocation]?.querySelector('a')?.innerText);
            const locationUrl = columnEls[indexLocation]?.querySelector('a')?.href || '';
            const description = `${getSafeText(columnEls[indexDescription]?.innerText)} ${title}`;
  
            const itemTypes = getUnitTypesFromTitle(description);
  
            let types = itemTypes.length > 0 ? itemTypes : groupTypes;
  
            const itemIcon = (isFormerGroup || isThatSpecificFormer) ? '🍂' : '🍃';
  
            types = types.map((v) => {
              return (isFormerGroup || isThatSpecificFormer) && !v.startsWith('former') ? `former${upperCaseFirstLetter(v)}` : v;
            });
 
            if (types.length > 0) {
              rowEl.setAttribute('data-wp-title', `${itemIcon} ${types.join(', ')}`);
  
              const coatOfArms = {
                locationName,
                locationUrl,
                thumbnailUrl,
                description,
                type: types,
                source,
                sourceTitle: [pageTitle, sectionTitle].filter(Boolean).join(' | '),
              };
  
              coatOfArmsList.push(coatOfArms);
            }
          })
        }
      }
    }

    window.parsedDE[source] = coatOfArmsList;

    saveSource(source, coatOfArmsList);
  })
};