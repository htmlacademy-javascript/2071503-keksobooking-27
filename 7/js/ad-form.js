const adForm = document.querySelector('.ad-form');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
});


const roomNumber = adForm.querySelector('[name="rooms"]');
const capacity = adForm.querySelector('[name="capacity"]');
const roomNumberOption = {
  '1' : '1',
  '2' : ['2', '1'],
  '3' : ['3', '2', '1'],
  '100' : '0',
};

function validateroomNumber () {
  return roomNumberOption[roomNumber.value].includes(capacity.value);
}


function getErrorMessage () {
  return `В
  ${roomNumber.value} ${roomNumber.value === '1' ? 'комнате' : 'комнатах'} нельзя разместить
  ${capacity.value.toLowerCase()} гостей`;
}

pristine.addValidator(capacity, capacity.addEventListener('change', () => {
  if(roomNumber.value === capacity.value) {
    pristine.reset(getErrorMessage);
  }
}));


pristine.addValidator(roomNumber, validateroomNumber, getErrorMessage);


adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
