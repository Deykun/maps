try {
  document.body.addEventListener('click', (event) => {
    const handlerData = Object.values(window.WikiParser.ui.eventsSubscribers).find(({ selector }) => {
      /* It checks max 4 nodes, while .closest() would look for all the nodes to body */
      const matchedHandlerData = [
        event.target,
        event.target?.parentElement,
        event.target?.parentElement?.parentElement,
        event.target?.parentElement?.parentElement?.parentElement,
      ].filter(Boolean).find((el) => el.matches(selector));

      return Boolean(matchedHandlerData);
    });

    if (handlerData) {
      const { selector, handleClick, shouldPreventDefault = true } = handlerData;

      if (shouldPreventDefault) {
        event.preventDefault();
      }

      const calledByElement = event.target.closest(selector);

      handleClick(event, calledByElement);
    }
  });
} catch (error) {
  userScriptLogger({
    isError: true, isCritical: true, message: 'Click detect failed', error,
  });
}
