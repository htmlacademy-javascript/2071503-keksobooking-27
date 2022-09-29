
function getRandomNumber(min, max) {
  if (max < min) {
    [min, max] = [max, min];
  }

  if (min < 0 || max < 0) {
    throw new RangeError('minimum or maximum value must be positive or 0');
  }

  return Math.round(min + Math.random() * (max - min));
}

getRandomNumber(1, 10);


function getRandomFractionNumber(min, max, numberSymbols) {
  if (max < min) {
    [min, max] = [max, min];
  }

  if (min < 0 || max < 0) {
    throw new RangeError('minimum or maximum value must be positive or 0');
  }

  const randomNumber = min + Math.random() * (max - min);

  return Number(randomNumber.toFixed(1 * numberSymbols));
}

getRandomFractionNumber(1, 10, 2);


