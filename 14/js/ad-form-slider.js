// Настройка слайдера
const sliderElement = document.querySelector('.ad-form__slider');

function createSlider(typeHousing, checkValidation, TYPE_HOUSING_OPTIONS) {

  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100000,
    },
    start: TYPE_HOUSING_OPTIONS[typeHousing.value],
    step: 1000,
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
    sliderElement.noUiSlider.on('slide' , () => {
      price.value = sliderElement.noUiSlider.get();
      checkValidation(price);
    });
  }

  function setValue (value) {
    sliderElement.noUiSlider.set(value);
  }

  function resetSliderValue (resetBtn) {
    resetBtn.addEventListener ('click', () => {
      sliderElement.noUiSlider.reset();
    });
  }


  // Изменение минимального значения слайдера
  typeHousing.addEventListener('change', (evt) => {
    if (evt.target.value === 'bungalow') {
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100000,
        },
        step: 1000,
      });
    }
    if (evt.target.value === 'flat') {
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 1000,
          max: 100000,
        },
        step: 1000,
      });
    }
    if (evt.target.value === 'hotel') {
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 3000,
          max: 100000,
        },
        step: 1000,
      });
    }
    if (evt.target.value === 'house') {
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 5000,
          max: 100000,
        },
        step: 1000,
      });
    }
    if (evt.target.value === 'palace') {
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 10000,
          max: 100000,
        },
        step: 1000,
      });
    }
  });

  return {setValue, setSlideEventInput, resetSliderValue};
}

function successSendingSliderValue () {
  sliderElement.noUiSlider.reset();
}

export {createSlider, successSendingSliderValue};
