appendCSS(`
  :root {
    --wp-nav-item-size: 35px;
    --wp-nav-item-bg: var(--bgColor-muted);
    --wp-nav-item-bg: var(--bgColor-default);
    --wp-nav-item-text-strong: var(--fgColor-default);
    --wp-nav-item-text: var(--fgColor-muted);
    --wp-nav-item-text-hover: var(--fgColor-accent);
    --wp-nav-item-border: var(--borderColor-muted);
    --wp-nav-item-radius: 5px;
  }

  .wp-nav {
    display: flex;
    position: fixed;
    bottom: 0;
    right: 30px;
    height: var(--wp-nav-item-size);
    filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.08));
  }

  .wp-nav > * + * {
    margin-left: -1px;
  }

  .wp-nav > :first-child {
    border-top-left-radius: var(--wp-nav-item-radius);
  }

  .wp-nav > :last-child {
    border-top-right-radius: var(--wp-nav-item-radius);
  }

  .wp-nav-status,
  .wp-nav-button-wrapper {
    height: var(--wp-nav-item-size);
    min-width: var(--wp-nav-item-size);
    line-height: var(--wp-nav-item-size);
    border: 1px solid var(--wp-nav-item-border);
    border-bottom-width: 0px;
    background: var(--wp-nav-item-bg);
  }

  .wp-nav-button-wrapper {
    position: relative;
  }

  .wp-nav-button {
    background: transparent;
    border: none;
    padding: 0;
    color: var(--wp-nav-item-text);
    width: var(--wp-nav-item-size);
    transition: 0.3s ease-in-out;
  }

  .wp-nav-button:hover {
    color: var(--wp-nav-item-text-hover);
  }

  .wp-nav-button--active {
    color: var(--wp-nav-item-text-strong);
  }

  .wp-nav-button svg {
    fill: currentColor;
    padding: 25%;
    height: var(--wp-nav-item-size);
    width: var(--wp-nav-item-size);
    line-height: var(--wp-nav-item-size);
  }

  .wp-nav-popup {
    position: absolute;
    right: 0;
    bottom: calc(100% + 10px);
    width: 300px;
    color: var(--wp-nav-item-text-strong);
    border: 1px solid var(--wp-nav-item-border);
    border-radius: var(--wp-nav-item-radius);
    border-bottom-right-radius: 0;
    background-color: var(--wp-nav-item-bg);
  }

  .wp-nav-popup-content {
    display: flex;
    flex-flow: column;
    gap: 18px;
    max-height: calc(100vh - 60px);
    overflow: auto;
    padding: 10px;
    padding-top: 0;
    font-size: 12px;
    line-height: 1.3;
    text-align: left;
  }

  .wp-nav-popup-title {
    position: sticky;
    top: 0px;
    display: flex;
    align-items: center;
    gap: 8px;
    padding-top: 10px;
    padding-bottom: 5px;
    font-size: 16px;
    background-color: var(--wp-nav-item-bg);
  }

  .wp-nav-popup-title svg {
    fill: currentColor;
    height: 16px;
    width: 16px;
  }

  .wp-nav-popup h3 {
    font-size: 13px;
    margin-bottom: 8px;
  }

  .wp-nav-popup ul {
    display: flex;
    flex-flow: column;
    gap: 8px;
    list-style: none;
  }

  .wp-nav-popup .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .wp-nav-popup::after {
    content: '';
    position: absolute;
    bottom: -10px;
    right: calc((var(--wp-nav-item-size) / 2) - 5px);
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-top-color: var(--wp-nav-item-border);
  }

  .wp-nav-popup-button {
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
    padding: 8px;
    border-radius: 3px;
    font-size: 14px;
    letter-spacing: 0.04em;
    text-decoration: none;
    background: none;
    border: none;
    color: var(--bgColor-default);
    background-color: var(--fgColor-success);
  }

  .wp-nav-popup-button:hover {
    text-decoration: none;
  }

  .wp-nav-popup-button svg {
    fill: currentColor;
    width: 18px;
    height: 18px;
  }
`, { sourceName: 'render-app' });

export const renderApp = () => {
  const content = window.WikiParser.ui.openedContent;

  render(`<aside class="wp-nav" data-active="${content}">
    TEST
  </aside>`, 'wp-app');
};

// window.wp.ui.eventsSubscribers.content = {
//   selector: '.wp-nav-button',
//   handleClick: (_, calledByElement) => {
//     if (calledByElement) {
//       const content = calledByElement.getAttribute('data-content');
//       const isClose = !content || content === window.wp.ui.openedContent;

//       if (isClose) {
//         window.wp.ui.openedContent = '';
//       } else {
//         window.wp.ui.openedContent = content;
//       }
//     }

//     renderApp();
//   },
// };
