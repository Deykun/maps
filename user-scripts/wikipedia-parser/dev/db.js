const saveSource = (source, value) => {
  const unitsBySource = getSourcesFromLS();

  unitsBySource[source] = value;

  localStorage.setItem('wikiparse-units', JSON.stringify(unitsBySource));
};