const createForm = document.querySelector('.ad-form');
const createFormElement = createForm.querySelectorAll('fieldset');

const filterForm = document.querySelector('.map__filters');
const filterFormElement = filterForm.querySelectorAll('select, fieldset');


function disableForm () {
  createForm.classList.add('ad-form--disabled');
  filterForm.classList.add('map__filters--disabled');

  createFormElement.forEach((element) => {
    element.disabled = true;
  });

  filterFormElement.forEach((element) => {
    element.disabled = true;
  });
}

function enableForm () {
  createForm.classList.remove('ad-form--disabled');
  filterForm.classList.remove('map__filters--disabled');

  createFormElement.forEach((element) => {
    element.disabled = false;
  });

  filterFormElement.forEach((element) => {
    element.disabled = false;
  });
}

export {disableForm, enableForm};
