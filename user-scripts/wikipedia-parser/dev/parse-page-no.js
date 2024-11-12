const getIsFormer = (text = '') => {
  const lowercaseText = text.toLowerCase();

  return ['tidligere'].some((phrase) => lowercaseText.includes(phrase));
}

const getUnitTypesFromTitle = (text) => {
  const lowercaseText = ` ${text.toLowerCase()} `;
  const lowercaseTextWords = lowercaseText.trim().split(' ');

  const isFormer = getIsFormer(lowercaseText);

  // svalbard is treaten uniquil
  const isKommune = ['kommunevåpen', 'svalbard'].some((phrase) => lowercaseText.includes(phrase));
  const isFylke = ['fylkesvåpene' ,'fylker'].some((phrase) => lowercaseText.includes(phrase));

  const types = [
    isKommune ? 'kommune' : '',
    isFylke ? 'fylker' : '',
  ].filter(Boolean).map((v) => {
    return isFormer ? `former${upperCaseFirstLetter(v)}` : v;
  });

  return types;
}

window.parsedNO = {};

export const savePageCoatOfArmsIfPossibleNO = () => {
  const source = location.href.split('#')[0];
  const pageTitle = document.querySelector('.mw-page-title-main')?.innerText || '';
  // const isCategoryPage = source.includes('Kategorie:');

  // if (isCategoryPage) {
  //   markIndexedCategoriesPagesDE();
  // }

  const headersEl = Array.from(document.querySelectorAll('.mw-heading2, .mw-heading3'));

  let coatOfArmsList = [];

  headersEl.forEach((headersEl) => {
    const sectionTitle = headersEl.firstChild.innerText;
    const groupTypes = getUnitTypesFromTitle(sectionTitle);
    let isFormerGroup = getIsFormer(sectionTitle);

    const groupIcon = isFormerGroup ? '🍂' : '🍃';

    if (groupTypes.length > 0) {
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
            const coatOfArms = parseGalleryElement(imageEl, { isFormerGroup, groupTypes, sectionTitle, source, pageTitle  });
  
            if (coatOfArms) {
              coatOfArmsList.push(coatOfArms);
            }
          });
        }
      }

  //     if (nextTableEl) {
  //       const coatOfArmsFromTable = parseTableElement(nextTableEl, { sectionTitle, source, pageTitle  });

  //       if (coatOfArmsFromTable.length > 0) {
  //         coatOfArmsList = [...coatOfArmsList, ...coatOfArmsFromTable];
  //       }
  //     }
    }

    if (window.parsedNO[source]) {
      window.parsedNO[source] = [...window.parsedNO[source], coatOfArmsList];
    } else {
      window.parsedNO[source] = coatOfArmsList;
    }

    saveSource(source, coatOfArmsList);
  });
};