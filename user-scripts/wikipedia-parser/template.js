// ==UserScript==
// @name            Wikipedia Parser
// @description     It parses information about coats of arms from Wikipedia using visual markers.
// @namespace       deykun
// @author          deykun
// @version         SCRIPT_VERSION
// @include         https://*wikipedia.org*
// @grant           none
// @run-at          document-start
// ==/UserScript==

'use strict';

/* import @/constants.js */

const userScriptLogger = (params) => {
  if (params.isError) {
    const { isCritical = false, message = '', error } = params;

    if (isCritical) {
      // eslint-disable-next-line no-console
      console.error('A WikipediaParser error (from Tampermonkey) has occurred.');
      // eslint-disable-next-line no-console
      console.error(`WikipediaParser error: ${message}`);
      // eslint-disable-next-line no-console
      console.error(error);
    }

    if (window.WikiParser.isDevMode && error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
};

const domReady = (fn) => {
  document.addEventListener('DOMContentLoaded', fn);
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    fn();
  }
};

const initWikiParser = async () => {
  // TODO: check if needed
  // if (window.WikiParser.cache.inited) {
  //   return;
  // }

  // window.WikiParser.cache.inited = true;

  try {
    /* import @/db.js */
    // /* import @/dom.js */
    // /* import @/helpers.js */
    // /* import @/icons.js */
    // /* import @/interface.js */
    // /* import @/render-app-settings.js */
    // /* import @/render-app-status.js */
    // /* import @/render-app-theme.js */
    // /* import @/render-app-user.js */
    // /* import @/render-app.js */
    // /* import @/render-status.js */
    // /* import @/render-users.js */
    // /* import @/save-users.js */

    /* import @/parse-page.js */

    savePageCoatOfArmsIfPossible();
    // renderUsers();
    // renderStatus();
    renderApp();

    /* import @/subscribers.js */

    const debouncedRefresh = debounce(() => {
      saveNewUsersIfPossible();
      renderUsers();

      const didLocationChange = location.href !== window.WikiParser.cache.location;
      if (didLocationChange) {
        window.WikiParser.cache.location = location.href;

        renderApp();
      }
    }, 500);

    const observer = new MutationObserver(debouncedRefresh);
    const config = {
      childList: true,
      subtree: true,
    };
    observer.observe(document.body, config);
  } catch (error) {
    userScriptLogger({
      isError: true, isCritical: true, message: 'initWikiParser() failed', error,
    });

    throw error;
  }
};

domReady(initWikiParser);
