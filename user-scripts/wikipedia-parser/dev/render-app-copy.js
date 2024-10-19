appendCSS(`
`, { sourceName: 'render-app-copy' });

export const getAppCopy = () => {
  return `<div class="wp-nav-button-wrapper">
    <button id="copy-code" class="wp-nav-button" title="Copy this page">${IconCopy}</button>
    <button id="copy-code-all" class="wp-nav-button" title="Copy all">${IconCopyAlt}</button>
    <button id="remove-all" class="wp-nav-button" title="Clear">${IconRemove}</button>
  </div>`;
};

const getSourceTextToCopy = (source, value) => {
  return `
  urls.unitBySource['${source}'] = [
    ${(value || window.parsedDE[source]).filter((item) => item.thumbnailUrl).map((item) => {
      const description = item.detailsUrl ? [item.description, getDetails(item.detailsUrl)].filter(Boolean).join(' |||| ') : item.description;

      if (item.detailsUrl) {
        console.log(item.detailsUrl);
        console.log(getDetails(item.detailsUrl));
      }

      const descriptionToCopy = (description || '').substring(0, 3000);

      return `{
        locationName: '${item.locationName}',
        locationUrl: '${item.locationUrl.replace('?only=details', '')}',
        thumbnailUrl: ${item.thumbnailUrl ? `'${item.thumbnailUrl}'` : 'undefined'},
        description: '${descriptionToCopy}',
        type: [${(item.type || []).map((v) => `'${v}'`).join(',')}],
        source: '${item.source}',
        sourceTitle: '${item.sourceTitle}',
      }`;
    }).join(', ')}
  ]; 
`;
}

window.WikiParser.ui.eventsSubscribers.copyCode = {
  selector: '#copy-code',
  handleClick: () => {
    const source = location.href.split('#')[0];

    if (window.parsedDE[source]) {
      console.log('Copied!');

      copyMessage(getSourceTextToCopy(source));
    }
  },
};

window.WikiParser.ui.eventsSubscribers.copyCodeAll = {
  selector: '#copy-code-all',
  handleClick: () => {
    const unitsBySource = getSourcesFromLS();
    const indexedSources = Object.keys(unitsBySource).sort((a, b) => a.localeCompare(b));

    if (indexedSources.length > 0) {
      const textToCopy = indexedSources.map((source) => getSourceTextToCopy(source, unitsBySource[source])).join(' ');
      
      console.log('Copied!');
      copyMessage(textToCopy);
    }
  },
};

window.WikiParser.ui.eventsSubscribers.removeAll = {
  selector: '#remove-all',
  handleClick: () => {
    // localStorage.removeItem('wikiparse-units');
    localStorage.clear();
    console.log('Removed!');
  },
};
