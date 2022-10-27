const adForm = document.querySelector('.ad-form');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
});

function initValidation () {
  // количество комнот - жильцов
  const roomNumber = adForm.querySelector('[name="rooms"]');
  const capacity = adForm.querySelector('[name="capacity"]');
  const ROOM_NUMBER_OPTIONS = {
    '1' : '1',
    '2' : ['2', '1'],
    '3' : ['3', '2', '1'],
    '100' : '0',
  };

  function validateRoomNumber () {
    return ROOM_NUMBER_OPTIONS[roomNumber.value].includes(capacity.value);
  }

  function getErrorMessage () {
    return `В
  ${roomNumber.value} ${roomNumber.value === '1' ? 'комнате' : 'комнатах'} нельзя разместить
  ${capacity.value.toLowerCase()} гостей`;
  }

  pristine.addValidator(roomNumber, validateRoomNumber, getErrorMessage);

  capacity.addEventListener('change', () => {
    pristine.validate(roomNumber);
  });


  // Цена за жилье
  const typeHousing = adForm.querySelector('[name="type"]');
  const priсe = adForm.querySelector('[name="price"]');
  const TYPE_HOUSING_OPTIONS = {
    'bungalow' : '0',
    'flat' : '1000',
    'hotel' : '3000',
    'house' : '5000',
    'palace' : '10000',
  };

  typeHousing.addEventListener('change', () => {
    priсe.placeholder = TYPE_HOUSING_OPTIONS[typeHousing.value];
  });

  function validatePrise (value) {
    const price = parseInt(value, 10);
    const minPrice = TYPE_HOUSING_OPTIONS[typeHousing.value] || 0;

    return price && (price >= minPrice);
  }

  function getErrorMessagePrise () {
    const type = adForm.querySelector('[name="type"]');
    return `Выберете цену от ${TYPE_HOUSING_OPTIONS[type.value]} до 100000`;
  }

  pristine.addValidator(priсe, validatePrise, getErrorMessagePrise);


  priсe.addEventListener('change', () => {
    pristine.validate(typeHousing);
  });


  adForm.addEventListener('submit', (evt) => {
    if (!pristine.validate()){
      evt.preventDefault();
    }
  });
}
export {initValidation};
