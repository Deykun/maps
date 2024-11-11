appendCSS(`
  [data-wp-title],
  [data-wp-title-sm] {
    position: relative;
  }

  [data-wp-title]::after,
  [data-wp-title-sm]::after {
    content: attr(data-wp-title);
    position: absolute;
    top: 0%;
    left: 0%;
    background-color: #e0efff9c;
    font-size: 13px;
    padding: 0 3px;
    border-radius: 30px;
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

  [data-wp-title-sm]::after {
    max-width: 14px;
    content: attr(data-wp-title-sm);
    font-size: 10px;
    padding: 0 2px;
  }

  [data-wp-title]:hover::after,
  [data-wp-title-sm]:hover::after,
  [data-wp-title-open]::after {
    max-width: 300px;
  }
`, { sourceName: 'parse-de' });

const getElementAfterHeader = (elToCheck, classToFind, maxElementsToCheck = 7) => {
  let el = elToCheck;

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

const detailsSelectorsDE = 'a[href*="#Wappen"], a[href*="/Wappen"], a[href*="/Landeswappen"], a[href*="#Hoheitszeichen"], a[href*="#Hoheitssymbole"]';
const detailsSelectors = detailsSelectorsDE;

export const parseGalleryElement = (imageEl, { isFormerGroup, groupTypes, sectionTitle, source, pageTitle, getUnitTypesFromTitle }) => {
  const isThatSpecificFormer = Boolean(imageEl.querySelector('.gallerytext')?.innerText?.match(/\d{4}\)/));

  const thumbnailUrl = imageEl.querySelector('.thumb img').src;
  const title = getSafeText(imageEl.querySelector('.gallerytext')?.innerText);
  const locationName = getSafeText(imageEl.querySelector('.gallerytext a')?.innerText);
  const locationUrl = imageEl.querySelector('.gallerytext a')?.href || '';
  const descriptionNoteId = imageEl.querySelector('.gallerytext a[href^="#"]')?.getAttribute('href')?.replace('#', '');
  const description = descriptionNoteId ? `${(document.getElementById(descriptionNoteId)?.innerText || '').replace(/\n|\r/g, '')} |||| ${title}` : title;
  const detailsUrlEl = imageEl.querySelector(detailsSelectors) || document.getElementById(descriptionNoteId)?.querySelector(detailsSelectors);

  const itemTypes = getUnitTypesFromTitle(title);

  let types = itemTypes.length > 0 ? itemTypes : groupTypes;

  const itemIcon = (isFormerGroup || isThatSpecificFormer) ? '🍂' : '🍃';

  types = types.map((v) => {
    return (isFormerGroup || isThatSpecificFormer) && !v.startsWith('former') ? `former${upperCaseFirstLetter(v)}` : v;
  });

  if (types.length > 0) {
    let detailsUrl = '';

    if (detailsUrlEl) {
      if (!detailsUrlEl.hasAttribute('data-wp-title-sm')) {
        detailsUrlEl.setAttribute('data-wp-title-sm', `🔖 more`);
  
        const [root, hash] = detailsUrlEl.href.split('#');
    
        detailsUrl = `${root}?only=details&autoclose=1${hash ? `#${hash}` : ''}`;
        detailsUrlEl.setAttribute('href', detailsUrl.replace('&autoclose=1', ''));
  
        openInNewTab(detailsUrl);
      }
    }

    imageEl.setAttribute('data-wp-title', `${itemIcon} ${types.join(', ')}`);

    const coatOfArms = {
      locationName,
      locationUrl,
      thumbnailUrl,
      description,
      type: types,
      detailsUrl,
      source,
      sourceTitle: [pageTitle, sectionTitle].filter(Boolean).join(' | '),
    };

    return coatOfArms;
  }
}