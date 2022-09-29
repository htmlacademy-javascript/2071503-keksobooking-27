
function getRandomNumber(min, max) {
  if (max < min) {
    [min, max] = [max, min];
  }

  if (min < 0 || max < 0) {
    return NaN;
  }

  return Math.round(min + Math.random() * (max - min));
}

getRandomNumber(1, 10);


function getRandomFractionNumber(min, max) {
  if (max < min) {
    [min, max] = [max, min];
  }

  if (min < 0 || max < 0) {
    return NaN;
  }

  const randomNumber = min + Math.random() * (max - min);

  return randomNumber.toFixed(1);
}

getRandomFractionNumber(1, 10);
