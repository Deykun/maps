const domReady = (fn) => {
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    fn();

    return;
  }

  document.addEventListener('DOMContentLoaded', fn);
};

const copyText = (text) => {
  const selBox = document.createElement('textarea');
  selBox.style.position = 'fixed';
  selBox.style.left = '0';
  selBox.style.top = '0';
  selBox.style.opacity = '0';
  selBox.value = text;
  document.body.appendChild(selBox);
  selBox.focus();
  selBox.select();
  document.execCommand('copy');
  document.body.removeChild(selBox);
};

const updateTranslationProgress = () => {
  const langs = window.appLangs || [];

  langs.forEach((lang) => {
    const fields = Array.from(document.querySelectorAll(`[data-field-lang="${lang}"]`));
    const total = fields.length;

    const value = fields.reduce((stack, el) => {
      if (el.value.trim().length > 0) {
        stack += 1;
      }

      return stack;
    }, 0);

    const marker = document.createElement('span');
    marker.setAttribute('class', 'marker-progress');
    marker.innerText = `${(100 * (value / total)).toFixed(1)}%`;

    document.querySelector(`[data-lang-header="${lang}"]`)?.appendChild(marker);
  });
};

const copyTranslation = (lang) => {
  const fields = Array.from(document.querySelectorAll(`[data-field-lang="${lang}"]`));

  const translatons = fields.reduce((stack, el) => {
    if (el.value.trim().length > 0) {
      const key = el.getAttribute('data-field-key');
      stack[key] = el.value.trim();
    }

    return stack;
  }, {});

  copyText(JSON.stringify(translatons, null, 2));
};

domReady(() => {
  updateTranslationProgress();

  document.addEventListener('input', (event) => {
    event.target.classList.add('field-touched');
  });

  document.addEventListener('click', (event) => {
    if (event.target.closest('[data-copy]')) {
      const lang = event.target.closest('[data-copy]').getAttribute('data-copy');

      copyTranslation(lang);
    }
  });
});