function getRandomNumber(min, max) {
  if (max < min) {
    [min, max] = [max, min];
  }

  if (min < 0 || max < 0) {
    throw new RangeError('minimum or maximum value must be positive or 0');
  }

  return Math.round(min + Math.random() * (max - min));
}

function getRandomFractionNumber(min, max, numberSymbols) {
  if (max < min) {
    [min, max] = [max, min];
  }

  if (min < 0 || max < 0) {
    throw new RangeError('minimum or maximum value must be positive or 0');
  }

  const randomNumber = min + Math.random() * (max - min);

  return Number(randomNumber.toFixed(numberSymbols));
}

// Возвращает случайные элементы массива
function getRandomArrayElements (arr){
  return arr.sort(() => 0.5 - Math.random()).slice(0, getRandomNumber(1, arr.length));
}

// Возвращает случайный элемент массива
function getRandomArrayElement (elements) {
  return elements[getRandomNumber(0, elements.length - 1)];
}

export {getRandomNumber, getRandomFractionNumber, getRandomArrayElements, getRandomArrayElement,};
