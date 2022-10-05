
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


const AVATAR_COUNTS = 10;
const OFFER_MIN_GUEST_COUNT = 1;
const OFFER_MAX_GUEST_COUNT = 10;
const OFFER_MIN_ROOM_COUNT = 1;
const OFFER_MAX_ROOM_COUNT = 5;
const OFFER_MIN_PRICE = 200;
const OFFER_MAX_PRICE = 10000;
const SIMULATION_ARRAY_DATA_COUNT = 10;
const CHECKIN_AND_CHECKOUT_MIN_COUNT = 12;
const CHECKIN_AND_CHECKOUT_MAX_COUNT = 14;


// Массивы с рандомными данными
const OFFER_TITLES = ['Квартира в центре Питера', 'Квартира в центре Москвы', 'Квартира в центре Сочи'];
const OFFER_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const OFFER_DESCRIPTIONS = ['Все отлично', 'Все плохо'];
const OFFER_PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];


// Возвращает фотографию пользователя
function getAvatarUrl () {
  const randomAvatarId = getRandomNumber(1, AVATAR_COUNTS);

  const AvatarUrl = `img/avatars/userget${ String(randomAvatarId).padStart(2,0) }.png`;

  return AvatarUrl;
}

const avatarArray = [];

function getAvatarValue () {
  let nextValue;
  while (avatarArray.length < AVATAR_COUNTS) {
    nextValue = getAvatarUrl();
    if(!avatarArray.includes(nextValue))
    {avatarArray.push(nextValue);
      return nextValue;
    }
  }
}
// Расчет координат
function CALCULATION_LAT (){return(Math.random() + 35).toFixed(5);}
function CALCULATION_LNG (){return(Math.random() + 139).toFixed(5);}

// Возвращает время заезда и выезда
function getTimeCheckinAndCheckout () {
  const randomTimeCheckinAndCheckout = getRandomNumber(CHECKIN_AND_CHECKOUT_MIN_COUNT, CHECKIN_AND_CHECKOUT_MAX_COUNT);
  const checkinAndCheckout = `${ randomTimeCheckinAndCheckout }:00`;
  return checkinAndCheckout;
}

// Возвращает случайные элементы массива
function getRandomArrayItem (arr){
  const randomArrayItem = arr.sort(() => 0.5 - Math.random()).slice(0, getRandomNumber(1, arr.length));
  return randomArrayItem;
}

// Возвращает случайный элемент массива
function getRandomArrayElement (elements) {
  const randomArrayElement = elements[getRandomNumber(0, elements.length - 1)];
  return randomArrayElement;
}


const createData = function () {
  const LOCATION_STORAGE = { lat: CALCULATION_LAT (), lng: CALCULATION_LNG () };
  return {
    author: {
      avatar: getAvatarValue ()
    },
    offer: {
      title: getRandomArrayElement(OFFER_TITLES),
      address: LOCATION_STORAGE,
      price: getRandomFractionNumber(OFFER_MIN_PRICE, OFFER_MAX_PRICE, 0),
      type: getRandomArrayElement(OFFER_TYPES),
      rooms: getRandomNumber(OFFER_MIN_ROOM_COUNT, OFFER_MAX_ROOM_COUNT),
      guests: getRandomNumber(OFFER_MIN_GUEST_COUNT, OFFER_MAX_GUEST_COUNT),
      checkin: getTimeCheckinAndCheckout (),
      checkout: getTimeCheckinAndCheckout (),
      features: getRandomArrayItem(OFFER_FEATURES),
      description: getRandomArrayElement(OFFER_DESCRIPTIONS),
      photos: getRandomArrayItem(OFFER_PHOTOS)
    },
    location: {
      lat: LOCATION_STORAGE.lat,
      lng: LOCATION_STORAGE.lng
    }
  };
};

Array.from({length: SIMULATION_ARRAY_DATA_COUNT}, createData);
