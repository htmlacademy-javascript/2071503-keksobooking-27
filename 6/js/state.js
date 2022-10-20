
function disableForm () {
  const disableCreateForm = document.querySelectorAll('.ad-form__element');
  const disableFilterForm = document.querySelectorAll('.map__filters');

  disableCreateForm.forEach((element) => {
    element.classList.add('ad-form--disabled');
    element.disabled = true;
  });

  disableFilterForm.forEach((element) => {
    element.classList.add('ad-form--disabled');
    element.disabled = true;
  });
}


function enableForm () {
  const enableCreateForm = document.querySelectorAll('.ad-form__element');
  const enableFilterForm = document.querySelectorAll('.map__filters');

  enableCreateForm.forEach((element) => {
    element.classList.remove('ad-form--disabled');
    element.disabled = false;
  });

  enableFilterForm.forEach((element) => {
    element.classList.remove('ad-form--disabled');
    element.disabled = false;
  });
}

export {disableForm, enableForm};
