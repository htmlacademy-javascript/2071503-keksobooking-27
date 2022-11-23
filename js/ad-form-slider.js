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
    const type = evt.target.value;
    if (TYPE_HOUSING_OPTIONS[type]) {
      adFormSlider.noUiSlider.updateOptions({
        range: {
          min: Number(TYPE_HOUSING_OPTIONS[type]),
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
