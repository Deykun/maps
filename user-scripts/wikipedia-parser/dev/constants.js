const getFromLocalStorage = (key, defaultValues = {}) => (localStorage.getItem(key)
  ? { ...defaultValues, ...JSON.parse(localStorage.getItem(key)) }
  : { ...defaultValues });

const defaultState = {
  unitsBySource: {
  },
};

const getSettingsFromLS = () => getFromLocalStorage('wikiparse-state', defaultState);

window.WikiParser = {
  version: 'SCRIPT_VERSION',
  isDevMode: false,
  cache: {
    HTML: {},
    CSS: {},
    inited: false,
    status: null,
    location: location.href,
  },
  settings: getSettingsFromLS(),
  actions: {},
};

window.WikiParser.ui = {
  status: {
    type: '',
    text: '',
  },
  openedContent: '',
  eventsSubscribers: {},
};
