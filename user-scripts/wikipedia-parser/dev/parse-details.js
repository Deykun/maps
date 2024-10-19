const grabTextFromNextElements = (elToCheck, maxElementsToCheck = 5) => {
  let text = '';
  let el = elToCheck;

  for (let i = 0; i < maxElementsToCheck; i++) {
    if (!el) {
      return text;
    }

    if (el.classList.contains('mw-heading')) {
      return text;
    }

    el.setAttribute('data-wp-title-sm', `📝`);
    text = `${text} ${getSafeText(el.innerText)}`;

    el = el.nextElementSibling;
  }

  return text;
}

const saveDetailsIfPossible = async () => {
  const hash = location.hash;

  if (hash) {
    const id = decodeURI(hash.replace('#', ''));

    const headerEl = document.getElementById(id)?.parentNode;
    if (headerEl) {
      headerEl.setAttribute('data-wp-title-sm', `📝 details header`);

      const text = grabTextFromNextElements(headerEl.nextElementSibling);

      if (text) {
        const textToSave = text.replace(/(\r\n|\n|\r)/gm, ' ').replace( /\s\s+/g, ' ').trim().substring(0, 1200);

        await saveDetails(location.href, textToSave);
      }
    }
  } else {
    const text = document.querySelector('.mw-body-content')?.innerText;

    if (text) {
      const textToSave = getSafeText(text.replace(/(\r\n|\n|\r)/gm, ' ').replace( /\s\s+/g, ' ').trim()).substring(0, 1200);
  

      await saveDetails(location.href, textToSave);
    }
  }

  if (location.href.includes('autoclose')) {
    setTimeout(() => {
      window.close();
    }, 500);
  }
};
