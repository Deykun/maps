const getFromLocalStorage = (key, defaultValues = {}) => (localStorage.getItem(key)
  ? { ...defaultValues, ...JSON.parse(localStorage.getItem(key)) }
  : { ...defaultValues });

const getSourcesFromLS = () => getFromLocalStorage('wikiparse-units', {});

const getSettingsFromLS = () => getFromLocalStorage('wikiparse-state', {});

window.WikiParser = {
  version: 'SCRIPT_VERSION',
  IS_DEVMode: false,
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
