
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

  return Number(randomNumber.toFixed(numberSymbols));
}

getRandomFractionNumber(1, 10, 0);


// Возвращает фотографию пользователя
const AVATAR_COUNTS = 10;

function getAvatarUrl () {
  const randomNumber = getRandomFractionNumber(1, AVATAR_COUNTS, 0);

  let AvatarUrl = 'img/avatars/userget' + `0${ randomNumber }.png`;
  if (randomNumber === 10) {
    AvatarUrl = 'img/avatars/userget' + `${ randomNumber }.png`;
  }

  return AvatarUrl;
}

const avatarArray = [];

function getavatarValue () {
  let nextValue;
  while (avatarArray.length < AVATAR_COUNTS) {
    nextValue = getAvatarUrl();
    if(!avatarArray.includes(nextValue))
    {avatarArray.push(nextValue);
      return nextValue;
    }
  }
}

const createAvatarArray = Array.from({length: 10}, getavatarValue);


// возвращает время заезда и выезда
function getCheckinAndCheckout () {
  const randomNumber = getRandomFractionNumber(12, 14, 0);
  const checkinAndCheckout = `${ randomNumber }` + ':00';
  return checkinAndCheckout;
}

// Массивы с рандомными данными
const title = ['Квартира в центре Питера', 'Квартира в центре Москвы', 'Квартира в центре Сочи'];
const type = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const description = ['Все отлично', 'Все плохо'];
const photos = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const calculationLat = (Math.random() + 35).toFixed(5);
const calculationLng = (Math.random() + 139).toFixed(5);

// Возвращает случайные элементы массива
const getRandomRiver = (arr) => arr.sort(() => 0.5 - Math.random()).slice(0, getRandomNumber(1, arr.length));

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const createData = () => ({
  author: {
    avatar: createAvatarArray.splice(0, 1)
  },
  offer: {
    title: getRandomArrayElement(title),
    address: `${ calculationLat }, ` + ` ${ calculationLng }`,
    price: getRandomFractionNumber(200, 10000, 0),
    type: getRandomArrayElement(type),
    rooms: getRandomFractionNumber(1, 5, 0),
    guests: getRandomFractionNumber(1, 10, 0),
    checkin: getCheckinAndCheckout (),
    checkout: getCheckinAndCheckout (),
    features: getRandomRiver(features),
    description: getRandomArrayElement(description),
    photos: getRandomRiver(photos),
  },
  location: {
    lat: calculationLat,
    lng: calculationLng
  }
});

const simulationArrayData = Array.from({length: 10}, createData);
