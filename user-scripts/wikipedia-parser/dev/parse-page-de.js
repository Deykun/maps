const getImageFromThumbnail = (thumbnailUrl) => {
  // https://stackoverflow.com/a/33691240/6743808
  /*
    https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg/200px-Tour_Eiffel_Wikimedia_Commons.jpg

    The first part is always the same: https://upload.wikimedia.org/wikipedia/commons/thumb
    The second part is the first character of the MD5 hash of the file name. In this case, the MD5 hash of Tour_Eiffel_Wikimedia_Commons.jpg is a85d416ee427dfaee44b9248229a9cdd, so we get /a.
    The third part is the first two characters of the MD5 hash from above: /a8.
    The fourth part is the file name: /Tour_Eiffel_Wikimedia_Commons.jpg
    The last part is the desired thumbnail width, and the file name again: /200px-Tour_Eiffel_Wikimedia_Commons.jpg
  */

  let imageUrl = thumbnailUrl.replace('/thumb/', '/');

  imageUrl = imageUrl.split('/').slice(0, -1).join('/');

  return imageUrl;
};

const getIsFormer = (text) => {
  const lowercaseText = text.toLowerCase();

  return ['ehemaliger', 'ehemalige', 'ehemals'].some((phrase) => lowercaseText.includes(phrase));
}

const getUnitTypesFromTitle = (text) => {
  const lowercaseText = ` ${text.toLowerCase()} `;

  const isFormer = getIsFormer(lowercaseText);

  // stadt - city
  const isStad = ['stadt', 'städte', 'stadtwappen', 'städtewappen'].some((phrase) => lowercaseText.includes(phrase));
  const isGemeinde = [' gem.', 'gemeindewappen', 'gemeinde', 'gemeinden', 'städtewappen', 'marktgemeinde'].some((phrase) => lowercaseText.includes(phrase));
  const isMarktgemeinde = ['marktgemeinde', 'märkte'].some((phrase) => lowercaseText.includes(phrase));

  const isKreis = !isStad && !isGemeinde && !isMarktgemeinde && ['kreis', 'landkreis'].some((phrase) => lowercaseText.includes(phrase));

  const types = [
    isStad ? 'stadt' : '',
    isKreis ? 'kreis' : '',
    isGemeinde ? 'gemeinde' : '',
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
    background-color: yellow;
    font-size: 13px;
    padding: 0 5px;
    border: 1px solid orange;
    transform: scale(0.1);
    transform-origin: top left;
    overflow: hidden;
    transition: 0.3s easy-in-out;
  }

  [data-wp-title]:hover::after {
    transform: scale(1);
  }
`, { sourceName: 'parse-de' });

// TODO: change to loop
const getGalleryAfterHeader = (elToCheck) => {
  let el = elToCheck;

  console.log('el0', el);

  if (el.classList.contains('gallery')) {
    return el;
  }

  if (el.classList.contains('.mw-heading2')) {
    return undefined;
  }

  el = el.nextElementSibling;

  console.log('el', el);

  if (el.classList.contains('gallery')) {
    return el;
  }

  if (el.classList.contains('.mw-heading2')) {
    return undefined;
  }

  el = el.nextElementSibling;

  
  console.log('el2', el);

  if (el.classList.contains('gallery')) {
    return el;
  }

  if (el.classList.contains('.mw-heading2')) {
    return undefined;
  }
}

export const savePageCoatOfArmsIfPossibleDE = () => {
  const headersEl = Array.from(document.querySelectorAll('.mw-heading2'));

  headersEl.forEach((headersEl) => {
    const sectionTitle = headersEl.firstChild.innerText;

    const groupTypes = getUnitTypesFromTitle(sectionTitle);
    const isFormerGroup = getIsFormer(sectionTitle);

    if (groupTypes.length > 0) {
      const source = location.href.split('#')[0];

      headersEl.setAttribute('data-wp-title', groupTypes.join(', '));

      let nextGalleryEl = getGalleryAfterHeader(headersEl.nextElementSibling);

      const imagesEl = nextGalleryEl ? Array.from(nextGalleryEl.querySelectorAll('.gallerybox')) : [];

      imagesEl.forEach((imageEl) => {
        const isThatSpecificFormer = Boolean(imageEl.querySelector('.gallerytext')?.innerText?.match(/\d{4}\)/));

        const thumbnailUrl = imageEl.querySelector('.thumb img').src;
        const coatOfArmsTitle = imageEl.querySelector('.gallerytext')?.innerText || '';
        const locationName = imageEl.querySelector('.gallerytext > a')?.innerText;
        const locationUrl = imageEl.querySelector('.gallerytext > a')?.href;
        const descriptionNoteId = imageEl.querySelector('.gallerytext a[href^="#"]')?.getAttribute('href')?.replace('#', '');
        const description = descriptionNoteId ? (document.getElementById(descriptionNoteId)?.innerText || '') : '';

        const itemTypes = getUnitTypesFromTitle(coatOfArmsTitle);

        let types = itemTypes.length > 0 ? itemTypes : groupTypes;

        types = types.map((v) => {
          return (isFormerGroup || isThatSpecificFormer) && !v.startsWith('former') ? `former${upperCaseFirstLetter(v)}` : v;
        });

        imageEl.setAttribute('data-wp-title', types.join(', '));

        console.log({
          coatOfArmsTitle,
          locationName,
          locationUrl,
          thumbnailUrl,
          description,
          types,
          source,
          sourceTitle: sectionTitle,
        })
      });
    }
  })
};