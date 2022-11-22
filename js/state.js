const createForm = document.querySelector('.ad-form');
const createFormFieldsets = createForm.querySelectorAll('fieldset');

const filterForm = document.querySelector('.map__filters');
const filterFormFieldsetandSelects = filterForm.querySelectorAll('select, fieldset');


function disableAdForm () {
  createForm.classList.add('ad-form--disabled');

  createFormFieldsets.forEach((element) => {
    element.disabled = true;
  });
}

function disableFilterForm () {
  filterForm.classList.add('map__filters--disabled');

  filterFormFieldsetandSelects.forEach((element) => {
    element.disabled = true;
  });
}


function enableAdForm () {
  createForm.classList.remove('ad-form--disabled');

  createFormFieldsets.forEach((element) => {
    element.disabled = false;
  });
}

function enableFilterForm () {
  filterForm.classList.remove('map__filters--disabled');

  filterFormFieldsetandSelects.forEach((element) => {
    element.disabled = false;
  });
}

export {disableAdForm, disableFilterForm, enableAdForm, enableFilterForm};
