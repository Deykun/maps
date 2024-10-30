const domReady = (fn) => {
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    fn();

    return;
  }

  document.addEventListener('DOMContentLoaded', fn);
};

domReady(() => {
  console.log('js');

  
  document.addEventListener('input', (event) => {
    // console.log(event);

    event.target.classList.add('field-touched');
  });
});