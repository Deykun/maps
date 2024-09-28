appendCSS(`
`, { sourceName: 'render-app-copy' });

export const getAppCopy = () => {
  return `<div class="wp-nav-button-wrapper"><button id="copy-code" class="wp-nav-button">${IconCopy}</button></div>`;
};

window.WikiParser.ui.eventsSubscribers.copyCode = {
  selector: '#copy-code',
  handleClick: () => {
    const source = location.href.split('#')[0];

    if (window.parsedDE[source]) {
      console.log('Copied!');

      copyMessage(`
urls.unitBySource['${source}'] = [
  ${window.parsedDE[source].map((item) => {

    return `{
      title: '${item.title}',
      locationName: '${item.locationName}',
      locationUrl: '${item.locationUrl}',
      thumbnailUrl: '${item.thumbnailUrl}',
      description: '${item.description}',
      type: [${item.type.map((v) => `'${v}'`).join(',')}],
      source: '${item.source}',
      sourceTitle: '${item.sourceTitle}',
    }`;
  }).join(', ')}
]; 
      `);
    }
  },
};
