const saveSource = (source, value) => {
  const unitsBySource = getSourcesFromLS();

  unitsBySource[source] = value;

  localStorage.setItem('wikiparse-units', JSON.stringify(unitsBySource));
};

const getDetailsKey = (url) => url.split(location.host).at(-1).replace('&autoclose=1', '');

const saveDetails = (url, value) => {
  const key = getDetailsKey(url);


  localStorage.setItem(`details_${key}`, value);
}

const getDetails = (url) => {
  const key = getDetailsKey(url);

  return localStorage.getItem(`details_${key}`) || '';
}