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

import {createSlider} from './ad-form-slider.js';

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
  const {setValue, setSlideEventInpu} = createSlider (pristine.validate);

  setSlideEventInpu(price);

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

  // Отправка данных
  const successTemplate = document.querySelector('#success').content;
  const successMassage = successTemplate.querySelector('.success');
  const errorTemplate = document.querySelector('#error').content;
  const errorMassage = errorTemplate.querySelector('.success');
  const submitButton = adForm.querySelector('.ad-form__submit');
  const isEscapeKey = (evt) => evt.key === 'Escape';

  function onSuccessMassageEscKeydown (evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      successMassage.classList.add('hidden');
    }
  }

  function onErrorMassageEscKeydown (evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      errorMassage.classList.add('hidden');
    }
  }

  function getSuccessMassage () {
    document.body.append(successMassage);
    document.addEventListener('keydown', onSuccessMassageEscKeydown);
    document.addEventListener('click', () => {
      successMassage.classList.add('hidden');
    });
  }

  function getErrorMassage () {
    document.body.append(errorMassage);
    document.addEventListener('keydown', onErrorMassageEscKeydown);
    document.addEventListener('click', () => {
      successMassage.classList.add('hidden');
    });
  }

  const blockSubmitButton = () => {
    submitButton.disabled = true;
    submitButton.textContent = 'Публикую...';
  };

  const unblockSubmitButton = () => {
    submitButton.disabled = false;
    submitButton.textContent = 'Опубликовать';
  };


  function setUserFormSubmit () {
    adForm.addEventListener('submit', (evt) => {
      evt.preventDefault();

      const isValid = pristine.validate();
      if (isValid){
        blockSubmitButton ();
        const formData = new FormData(evt.target);

        fetch(
          'https://27.javascript.pages.academy/keksobooking',
          {
            method: 'POST',
            body: formData,
          },
        ).then((response) => {
          if (response.ok) {
            unblockSubmitButton ();
            getSuccessMassage ();
            adForm.reset();
          } else {
            unblockSubmitButton ();
            getErrorMassage ();
          }
        });
      }
    });
  }

  return {setUserFormSubmit};
}

export {initValidation, TYPE_HOUSING_OPTIONS, typeHousing};
