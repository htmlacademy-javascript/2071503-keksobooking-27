// Настройка слайдера
import {STEP_COUNT, MAX_COUNT_VALUE} from './const.js';

const adFormSlider = document.querySelector('.ad-form__slider');

function createSlider(typeHousing, checkValidation, TYPE_HOUSING_OPTIONS) {

  noUiSlider.create(adFormSlider, {
    range: {
      min: 0,
      max: MAX_COUNT_VALUE,
    },
    start: TYPE_HOUSING_OPTIONS[typeHousing.value],
    step: STEP_COUNT,
    connect: 'lower',
    format: {
      to: function (value) {
        return value.toFixed(0);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  // Синхронизация поля ввода и слайдера
  function setSlideEventInput (price) {
    adFormSlider.noUiSlider.on('slide' , () => {
      price.value = adFormSlider.noUiSlider.get();
      checkValidation(price);
    });
  }

  function setValue (value) {
    adFormSlider.noUiSlider.set(value);
  }

  function resetSliderValue (resetBtn) {
    resetBtn.addEventListener ('click', () => {
      adFormSlider.noUiSlider.reset();
    });
  }


  // Изменение минимального значения слайдера
  typeHousing.addEventListener('change', (evt) => {
    if (evt.target.value === 'bungalow') {
      adFormSlider.noUiSlider.updateOptions({
        range: {
          min: TYPE_HOUSING_OPTIONS[Object.keys(TYPE_HOUSING_OPTIONS)[0]],
          max: MAX_COUNT_VALUE,
        },
        step: STEP_COUNT,
      });
    }
    if (evt.target.value === 'flat') {
      adFormSlider.noUiSlider.updateOptions({
        range: {
          min: 1000,
          max: MAX_COUNT_VALUE,
        },
        step: STEP_COUNT,
      });
    }
    if (evt.target.value === 'hotel') {
      adFormSlider.noUiSlider.updateOptions({
        range: {
          min: 3000,
          max: MAX_COUNT_VALUE,
        },
        step: STEP_COUNT,
      });
    }
    if (evt.target.value === 'house') {
      adFormSlider.noUiSlider.updateOptions({
        range: {
          min: 5000,
          max: MAX_COUNT_VALUE,
        },
        step: STEP_COUNT,
      });
    }
    if (evt.target.value === 'palace') {
      adFormSlider.noUiSlider.updateOptions({
        range: {
          min: 10000,
          max: MAX_COUNT_VALUE,
        },
        step: STEP_COUNT,
      });
    }
  });

  return {setValue, setSlideEventInput, resetSliderValue};
}

function successSendingSliderValue () {
  adFormSlider.noUiSlider.reset();
}

export {createSlider, successSendingSliderValue};
