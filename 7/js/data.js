import {getRandomNumber, getRandomFractionNumber, getRandomArrayElements, getRandomArrayElement} from './util.js';

const AVATAR_COUNTS = 10;
const OFFER_MIN_GUEST_COUNT = 1;
const OFFER_MAX_GUEST_COUNT = 10;
const OFFER_MIN_ROOM_COUNT = 1;
const OFFER_MAX_ROOM_COUNT = 5;
const OFFER_MIN_PRICE = 200;
const OFFER_MAX_PRICE = 10000;
const SIMULATION_ARRAY_DATA_COUNT = 2;
const CHECKIN_AND_CHECKOUT_MIN_COUNT = 12;
const CHECKIN_AND_CHECKOUT_MAX_COUNT = 14;


// Массивы с рандомными данными
const OFFER_TITLES = ['Квартира в центре Питера', 'Квартира в центре Москвы', 'Квартира в центре Сочи'];
const OFFER_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const OFFER_DESCRIPTIONS = ['Отличная квартира', 'Хорошая квартира'];
const OFFER_PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];


// Возвращает фотографию пользователя
function getAvatarUrl () {
  const randomAvatarId = getRandomNumber(1, AVATAR_COUNTS);
  return `img/avatars/user${ String(randomAvatarId).padStart(2,0) }.png`;
}

const avatars = [];

function getAvatarValue () {
  let nextValue;
  while (avatars.length < AVATAR_COUNTS) {
    nextValue = getAvatarUrl();
    if(!avatars.includes(nextValue))
    {avatars.push(nextValue);
      return nextValue;
    }
  }
}
// Расчет координат
function CALCULATION_LAT (){return getRandomFractionNumber(35.65000, 35.70000, 5);}
function CALCULATION_LNG (){return getRandomFractionNumber(139.65000, 139.70000, 5);}

// Возвращает время заезда и выезда
function getTimeCheckinAndCheckout () {
  const randomTimeCheckinAndCheckout = getRandomNumber(CHECKIN_AND_CHECKOUT_MIN_COUNT, CHECKIN_AND_CHECKOUT_MAX_COUNT);
  return `${ randomTimeCheckinAndCheckout }:00`;
}

function createOferData () {
  const location = { lat: CALCULATION_LAT (), lng: CALCULATION_LNG () };
  return {
    author: {
      avatar: getAvatarValue ()
    },
    offer: {
      title: getRandomArrayElement(OFFER_TITLES),
      address: `${location.lat}, ${location.lng}`,
      price: getRandomNumber(OFFER_MIN_PRICE, OFFER_MAX_PRICE),
      type: getRandomArrayElement(OFFER_TYPES),
      rooms: getRandomNumber(OFFER_MIN_ROOM_COUNT, OFFER_MAX_ROOM_COUNT),
      guests: getRandomNumber(OFFER_MIN_GUEST_COUNT, OFFER_MAX_GUEST_COUNT),
      checkin: getTimeCheckinAndCheckout (),
      checkout: getTimeCheckinAndCheckout (),
      features: getRandomArrayElements(OFFER_FEATURES),
      description: getRandomArrayElement(OFFER_DESCRIPTIONS),
      photos: getRandomArrayElements(OFFER_PHOTOS)
    },
    location
  };
}

function createOffers () {return Array.from({length: SIMULATION_ARRAY_DATA_COUNT}, createOferData);}

export {createOffers, createOferData};