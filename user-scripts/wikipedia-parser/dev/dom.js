export const appendCSS = (styles, { sourceName = '' } = {}) => {
  const appendOnceSelector = sourceName ? `g-wp-css-${sourceName}`.trim() : undefined;
  if (appendOnceSelector) {
    /* Already appended */
    if (document.getElementById(appendOnceSelector)) {
      return;
    }
  }

  const style = document.createElement('style');
  if (sourceName) {
    style.setAttribute('id', appendOnceSelector);
  }

  style.innerHTML = styles;
  document.head.append(style);
};

// eslint-disable-next-line default-param-last
export const render = (HTML = '', source) => {
  const id = `g-wp-html-${source}`;

  if (HTML === window.WikiParser.cache.HTML[id]) {
    /* Don't rerender if HTML is the same */
    return;
  }

  window.WikiParser.cache.HTML[id] = HTML;

  const wrapperEl = document.getElementById(id);

  if (!HTML) {
    if (wrapperEl) {
      wrapperEl.remove();
    }

    return;
  }

  if (wrapperEl) {
    wrapperEl.innerHTML = HTML;

    return;
  }

  const el = document.createElement('div');
  el.id = id;
  el.setAttribute('data-testid', id);
  el.innerHTML = HTML;

  document.body.appendChild(el);
};

const nestedSelectors = (selectors, subcontents) => {
  return subcontents.map(([subselector, content]) => {
    return `${selectors.map((selector) => `${selector} ${subselector}`).join(', ')} {
      ${content}
    }`;
  }).join(' ');
};
