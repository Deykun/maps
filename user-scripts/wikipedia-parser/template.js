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
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    fn();

    return;
  }

  document.addEventListener('DOMContentLoaded', fn);
};

const initWikiParser = async () => {
  // TODO: check if needed
  // if (window.WikiParser.cache.inited) {
  //   return;
  // }

  // window.WikiParser.cache.inited = true;

  try {
    /* import @/db.js */
    /* import @/dom.js */
    /* import @/helpers.js */
    /* import @/icons.js */
    /* import @/interface.js */

    /* import @/parse-details.js */
    /* import @/parse-page.js */

    const savePageCoatOfArmsIfPossible = () => {
      if (location.href.includes('de.wikipedia')) {
        /* import @/parse-page-de.js */
        savePageCoatOfArmsIfPossibleDE();
      }

      if (location.href.includes('da.wikipedia')) {
        /* import @/parse-page-dk.js */
        savePageCoatOfArmsIfPossibleDK();
      }
    
      if (location.href.includes('no.wikipedia')) {
        /* import @/parse-page-no.js */
        savePageCoatOfArmsIfPossibleNO();
      }
    };

    /* import @/render-app-copy.js */
    /* import @/render-app.js */

    if (location.href.includes('only=details')) {
      saveDetailsIfPossible();
    } else {    
      savePageCoatOfArmsIfPossible();
    }

    renderApp();

    /* import @/subscribers.js */

    const debouncedRefresh = debounce(() => {
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
