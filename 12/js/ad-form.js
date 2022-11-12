import {createSlider} from './ad-form-slider.js';
import {sendData} from './server.js';
import {TYPE_HOUSING_OPTIONS, ROOM_NUMBER_OPTIONS, ROUND_COORDINATE} from './const.js';
import {getSuccessErrorMassage} from './success-error-massage.js';
import {onAvatarChange, onImagesChange} from './avatar.js';

const adForm = document.querySelector('.ad-form');
const typeHousing = adForm.querySelector('[name="type"]');
const price = adForm.querySelector('[name="price"]');
const address = document.querySelector('#address');
const adFormReset = document.querySelector('.ad-form__reset');
const adFormSubmit = adForm.querySelector('.ad-form__submit');
const {getSuccessMassage, getErrorMassage} = getSuccessErrorMassage();

// Отправка данных
function setUserFormSubmit ({pristine, reset}) {
  const blockSubmitButton = () => {
    adFormSubmit.disabled = true;
    adFormSubmit.textContent = 'Публикую...';
  };

  const unblockSubmitButton = () => {
    adFormSubmit.disabled = false;
    adFormSubmit.textContent = 'Опубликовать';
  };

  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid){
      blockSubmitButton ();

      const formData = new FormData(evt.target);

      sendData(formData).then((data) => {
        if (data.ok) {
          getSuccessMassage ();
          reset ();
        } else {
          getErrorMassage ();
        }
      }).finally(() => {
        unblockSubmitButton ();
      });
    }
  });
}

function initAdForm ({resetPosition, setUpMainMarkerMove}) {
  const pristine = new Pristine(adForm, {
    classTo: 'ad-form__element',
    errorTextParent: 'ad-form__element',
  });

  onAvatarChange (); // аватар пользователя
  onImagesChange (); // фото жилья

  // количество комнат - жильцов
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


  setUpMainMarkerMove ((evt) => {
    address.value = `${(evt.lat).toFixed(ROUND_COORDINATE)},${(evt.lng).toFixed(ROUND_COORDINATE)}`;
  });


  // Цена за жилье
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

  typeHousing.addEventListener('change', () => {
    price.placeholder = TYPE_HOUSING_OPTIONS[typeHousing.value];
    pristine.validate(price);
  });

  /*-----------------------слайдер-------------------------*/
  const {setValue, setSlideEventInput, resetSliderValue} = createSlider (typeHousing, pristine.validate, TYPE_HOUSING_OPTIONS);

  setSlideEventInput(price);

  resetSliderValue(adFormReset);

  price.addEventListener ('change', () => {
    setValue (price.value);
  });
  /*------------------------------------------------*/

  // Время заезда - выезда
  const timein = adForm.querySelector('#timein');
  const timeout = adForm.querySelector('#timeout');
  const timeinAndTimeout = adForm.querySelector('.ad-form__element--time');

  timeinAndTimeout.addEventListener('change', (evt) => {
    if (evt.target.value) {
      timeout.value = timein.value = evt.target.value;
    }
  });

  function reset () {
    resetPosition();
    adForm.reset();
  }

  setUserFormSubmit ({pristine, reset});

  adFormReset.addEventListener('click', () => {
    reset ();
  });
}


export {initAdForm};
