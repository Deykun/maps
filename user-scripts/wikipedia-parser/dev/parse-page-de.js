const getIsFormer = (text = '') => {
  const lowercaseText = text.toLowerCase();

  return ['historische', 'ehemaliger', 'ehemalige', 'ehemals'].some((phrase) => lowercaseText.includes(phrase));
}

const getUnitTypesFromTitle = (text) => {
  const lowercaseText = ` ${text.toLowerCase()} `;
  const lowercaseTextWords = lowercaseText.trim().split(' ');

  const isFormer = getIsFormer(lowercaseText);

  // stadt - city
  const isCity = ['stadt\n', 'stadt ', 'städte ', 'stadtteile', 'stadtwappen', 'städtewappen'].some((phrase) => lowercaseText.includes(phrase));
  // bezirke - distric
  const isBezirke = ['bezirke', 'ortsbezirk', 'bezirk'].some((phrase) => lowercaseText.includes(phrase));
  const isLand = ['landeswappen', 'landschaftsverbände'].some((phrase) => lowercaseText.includes(phrase)) || lowercaseTextWords.some((word) => ['land', 'bundesland'].includes(word));
  const isRegion = lowercaseTextWords.some((word) => word === 'region');
  const isGemeinde = [' gem.', 'gemeindewappen', 'gemeinde', 'gemeinden', 'gemeinschaften', 'marktgemeinde'].some((phrase) => lowercaseText.includes(phrase));
  const isMarkt = ['markt', 'märkte'].some((phrase) => lowercaseText.includes(phrase));
  const isMarktgemeinde = ['marktgemeinde', 'märkte'].some((phrase) => lowercaseText.includes(phrase));
  const isAmter = lowercaseTextWords.some((word) => ['ämter', 'amt'].includes(word));
  const isOrtsteil = lowercaseTextWords.includes('ortsteil');

  const isKreis = !isCity && !isBezirke && !isLand && !isGemeinde && !isMarkt && !isMarktgemeinde && ['kreis', 'landkreis'].some((phrase) => lowercaseText.includes(phrase));

  const types = [
    isCity ? 'city' : '',
    isKreis ? 'kreis' : '',
    isBezirke ? 'bezirke' : '',
    isLand ? 'land' : '',
    isRegion ? 'region' : '',
    isGemeinde ? 'gemeinde' : '',
    isMarkt ? 'markt' : '',
    isMarktgemeinde ? 'marktgemeinde' : '',
    isAmter ? 'amt' : '',
    isOrtsteil ? 'ortsteil' : '',
  ].filter(Boolean).map((v) => {
    return isFormer && v !== 'kreis' ? `former${upperCaseFirstLetter(v)}` : v;
  });

  return types;
}

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

export const parseTableElement = (nextTableEl, { isFormerGroup, groupTypes, sectionTitle, source, pageTitle }) => {
  const coatOfArmsList = [];
  // https://de.wikipedia.org/wiki/Liste_der_Wappen_im_Landkreis_Celle - table example
  const {
    tableTypes: tableTypesFromTable,
    indexCoatOfArms,
    indexLocation,
    indexDescription,
  } = Array.from(nextTableEl.querySelectorAll('tr:first-child th, tr:first-child td')).reduce((stack, el, index) => {
    const text = (el.innerText || '').toLowerCase();
    const isCoatOfArms = ['wappen'].some((v) => text.includes(v));
    const isDescription = ['kommentare', 'beschreibung'].some((v) => text.includes(v));
    const isLocation = !isCoatOfArms && !isDescription && getUnitTypesFromTitle(text).length > 0;

    if (isLocation) {
      stack.indexLocation = index;
      console.log('text', text);
      stack.tableTypes = getUnitTypesFromTitle(text);
    }

    if (isDescription) {
      stack.indexDescription = index;
    }

    if (isCoatOfArms) {
      stack.indexCoatOfArms = index;
    }

    return stack;
  }, {
    tableTypes: [],
    indexLocation: 0,
    indexCoatOfArms: 1,
    indexDescription: 2,
  });

  const isTableFormer = isFormerGroup || tableTypesFromTable.length > 0 && tableTypesFromTable[0].startsWith('former');

  const tableTypes = tableTypesFromTable.length > 0 ? tableTypesFromTable.map((v) => {
    return isTableFormer && !v.startsWith('former') ? `former${upperCaseFirstLetter(v)}` : v;
  }) : groupTypes;

  const groupIcon = isTableFormer ? '🍂' : '🍃';

  nextTableEl.setAttribute('data-wp-title', `${groupIcon} ${(tableTypes || []).join(', ')}`);

  const hasEnoughData = typeof indexCoatOfArms === 'number';
  if (hasEnoughData) {
    const [headEl, ...rowsEl] = Array.from(nextTableEl.querySelectorAll('tr'));

    rowsEl.forEach(rowEl => {
      const columnEls = Array.from(rowEl.querySelectorAll('td, th'));
      const isThatSpecificFormer = getIsFormer(rowEl.innerText);

      const thumbnailUrl = columnEls[indexCoatOfArms].querySelector('img')?.src;
      const title = getSafeText(columnEls[indexLocation]?.innerText);
      const locationName = getSafeText(columnEls[indexLocation]?.querySelector('a')?.innerText);
      const locationUrl = columnEls[indexLocation]?.querySelector('a')?.href || '';
      const description = `${getSafeText(columnEls[indexDescription]?.innerText)} |||| ${title}`;

      const itemTypes = getUnitTypesFromTitle(description);

      let types = (itemTypes.length > 0 ? itemTypes : (tableTypes || groupTypes)) || [];

      const titleToTest = `${title} `.replaceAll('-', '-').replaceAll('–', '-');
      const isTitleFormer = Boolean(titleToTest.match(/-\d{4} /) || titleToTest.match(/-\d{4}\)/) || titleToTest.match(/bis \d{4}/));

      const itemIcon = (isFormerGroup || isTableFormer || isThatSpecificFormer || isTitleFormer) ? '🍂' : '🍃';

      types = types.map((v) => {
        return (isFormerGroup || isTableFormer || isThatSpecificFormer || isTitleFormer) && !v.startsWith('former') ? `former${upperCaseFirstLetter(v)}` : v;
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

  return coatOfArmsList;
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

    // Andere - Other
    if (groupTypes.length > 0 || ['historische', 'andere', 'wappen'].some((phrase) => sectionTitle.toLowerCase().includes(phrase))) {
      headersEl.setAttribute('data-wp-title', `${groupIcon} ${groupTypes.join(', ')}`);

      const nextGalleryEl = getElementAfterHeader(headersEl.nextElementSibling, 'gallery');
      const nextTableEl = getElementAfterHeader(headersEl.nextElementSibling, 'wikitable');

      if (nextGalleryEl) {
        const imagesEl = nextGalleryEl ? Array.from(nextGalleryEl.querySelectorAll('.gallerybox')) : [];

        imagesEl.forEach((imageEl) => {
          const coatOfArms = parseGalleryElement(imageEl, { isFormerGroup, groupTypes, sectionTitle, source, pageTitle, getUnitTypesFromTitle });

          if (coatOfArms) {
            coatOfArmsList.push(coatOfArms);
          }
        });

        const nextNextGalleryEl = getElementAfterHeader(nextGalleryEl.nextElementSibling, 'gallery', 1);

        // Next element is a gallery too
        if (nextNextGalleryEl) {
          const imagesEl = nextNextGalleryEl ? Array.from(nextNextGalleryEl.querySelectorAll('.gallerybox')) : [];

          imagesEl.forEach((imageEl) => {
            const coatOfArms = parseGalleryElement(imageEl, { isFormerGroup, groupTypes, sectionTitle, source, pageTitle, getUnitTypesFromTitle });
  
            if (coatOfArms) {
              coatOfArmsList.push(coatOfArms);
            }
          });
        }
      }

      if (nextTableEl) {
        const coatOfArmsFromTable = parseTableElement(nextTableEl, { sectionTitle, source, pageTitle  });

        if (coatOfArmsFromTable.length > 0) {
          coatOfArmsList = [...coatOfArmsList, ...coatOfArmsFromTable];
        }
      }
    }

    if (window.parsedDE[source]) {
      window.parsedDE[source] = [...window.parsedDE[source], coatOfArmsList];
    } else {
      window.parsedDE[source] = coatOfArmsList;
    }

    saveSource(source, coatOfArmsList);
  })

  // It is a list page or contains a lot coat of arms, so is a good idea to check all coat of arms individualy
  if (pageTitle.includes('Liste der ') || coatOfArmsList.length > 20) {
    const isFormerGroup = getIsFormer(pageTitle);
    const notParsedImagesEl = Array.from(document.querySelectorAll('.gallerybox:not([data-wp-title]')) || [];

    notParsedImagesEl.forEach((imageEl) => {
      const coatOfArms = parseGalleryElement(imageEl, { isFormerGroup, groupTypes: [], sectionTitle: '', source, pageTitle, getUnitTypesFromTitle });

      if (coatOfArms) {
        coatOfArmsList.push(coatOfArms);
      }
    });

    const notParsedTablesEl = Array.from(document.querySelectorAll('.wikitable:not([data-wp-title]')) || [];

    notParsedTablesEl.forEach((tableEl) => {
      const coatOfArmsFromTable = parseTableElement(tableEl, { isFormerGroup, groupTypes: [], sectionTitle: '', source, pageTitle, getUnitTypesFromTitle });

      if (coatOfArmsFromTable.length > 0) {
        coatOfArmsList = [...coatOfArmsList, ...coatOfArmsFromTable];
      }
    });

    
    if (window.parsedDE[source]) {
      window.parsedDE[source] = [...window.parsedDE[source], coatOfArmsList];
    } else {
      window.parsedDE[source] = coatOfArmsList;
    }

    if (coatOfArmsList.length > 0) {
      saveSource(source, coatOfArmsList);
    }
  }
};