const TYPE_HOUSING_OPTIONS = {
  'bungalow' : '0',
  'flat' : '1000',
  'hotel' : '3000',
  'house' : '5000',
  'palace' : '10000',
};

const ROOM_NUMBER_OPTIONS = {
  '1' : '1',
  '2' : ['2', '1'],
  '3' : ['3', '2', '1'],
  '100' : '0',
};

const adForm = document.querySelector('.ad-form');

const typeHousing = adForm.querySelector('[name="type"]');
const price = adForm.querySelector('[name="price"]');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
});

function initValidation () {
  // количество комнот - жильцов
  const roomNumber = adForm.querySelector('[name="rooms"]');
  const capacity = adForm.querySelector('[name="capacity"]');

  function validateRoomNumber () {
    return ROOM_NUMBER_OPTIONS[roomNumber.value].includes(capacity.value);
  }

  function getErrorMessage () {
    if (roomNumber.value === '100') {
      return '100 комнат не для гостей';
    } if (capacity.value === '0') {
      return `В ${roomNumber.value} ${roomNumber.value === '1' ? 'комнате' : 'комнатах'} должен кто то проживать, хотя бы кот`;
    } else {
      return `В
        ${roomNumber.value} ${roomNumber.value === '1' ? 'комнате' : 'комнатах'} нельзя разместить
        ${capacity.value.toLowerCase()} гостей`;
    }
  }

  pristine.addValidator(roomNumber, validateRoomNumber, getErrorMessage);

  capacity.addEventListener('change', () => {
    pristine.validate(roomNumber);
  });


  // Цена за жилье

  typeHousing.addEventListener('change', () => {
    price.placeholder = TYPE_HOUSING_OPTIONS[typeHousing.value];

    pristine.validate(price);
  });

  function validatePrise (value) {
    const cost = parseInt(value, 10);
    const minPrice = TYPE_HOUSING_OPTIONS[typeHousing.value] || 0;

    return cost && (cost >= minPrice);
  }

  function getErrorMessagePrise () {
    const type = adForm.querySelector('[name="type"]');
    return `Выберете цену от ${TYPE_HOUSING_OPTIONS[type.value]} до 100000`;
  }

  pristine.addValidator(price, validatePrise, getErrorMessagePrise);

  // Время заезда - выезда
  const timein = adForm.querySelector('#timein');
  const timeout = adForm.querySelector('#timeout');
  const timeinAndTimeout = adForm.querySelector('.ad-form__element--time');

  timeinAndTimeout.addEventListener('change', (evt) => {
    if (evt.target.value) {
      timeout.value = timein.value = evt.target.value;
    }
  });

  adForm.addEventListener('submit', (evt) => {
    if (!pristine.validate()){
      evt.preventDefault();
    }
  });
}
export {initValidation, TYPE_HOUSING_OPTIONS, typeHousing};


