const createForm = document.querySelector('.ad-form');
const createFormElement = createForm.querySelectorAll('fieldset');

const filterForm = document.querySelector('.map__filters');
const filterFormElement = filterForm.querySelectorAll('select, fieldset');


function disableCreateForm () {
  createForm.classList.add('ad-form--disabled');

  createFormElement.forEach((element) => {
    element.disabled = true;
  });
}

function disableFilterForm () {
  filterForm.classList.add('map__filters--disabled');

  filterFormElement.forEach((element) => {
    element.disabled = true;
  });
}


function enableCreateForm () {
  createForm.classList.remove('ad-form--disabled');

  createFormElement.forEach((element) => {
    element.disabled = false;
  });
}

function enableFilterForm () {
  filterForm.classList.remove('map__filters--disabled');

  filterFormElement.forEach((element) => {
    element.disabled = false;
  });
}

export {disableCreateForm, disableFilterForm, enableCreateForm, enableFilterForm};
