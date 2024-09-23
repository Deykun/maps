const getFromLocalStorage = (key, defaultValues = {}) => (localStorage.getItem(key)
  ? { ...defaultValues, ...JSON.parse(localStorage.getItem(key)) }
  : { ...defaultValues });

const defaultState = {
  unitsBySource: {
  },
};

const getSettingsFromLS = () => getFromLocalStorage('wikiparse-state', defaultState);