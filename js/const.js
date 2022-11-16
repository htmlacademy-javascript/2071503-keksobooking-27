// popup
const TYPES_OF_HOUSING = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель',
};

export {TYPES_OF_HOUSING};

// ad-form.js
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

const ROUND_COORDINATE = 5;

export {TYPE_HOUSING_OPTIONS, ROOM_NUMBER_OPTIONS, ROUND_COORDINATE};

// show-alert.js
const ALERT_SHOW_TIME = 3000;

export {ALERT_SHOW_TIME};

// server.js
const GET_DATA_URL = 'https://27.javascript.pages.academy/keksobooking/data';
const SEND_DATA_URL = 'https://27.javascript.pages.academy/keksobooking';

export {GET_DATA_URL, SEND_DATA_URL};

// map.js

const INIT_MAP_POSITION = {
  lat: 35.6895,
  lng: 139.692,
};

const INIT_MAP_ZOOM = 12;

const MAIN_PIN_URL = './img/main-pin.svg';
const MAIN_ICON_SIZE = [52, 52];
const MAIN_ICON_ANHOR = [26, 52];

const OTHER_PIN_URL = './img/pin.svg';
const OTHER_ICON_SIZE = [40, 40];
const OTHER_ICON_ANHOR = [20, 40];

export {
  INIT_MAP_POSITION,
  INIT_MAP_ZOOM,
  MAIN_PIN_URL,
  MAIN_ICON_SIZE,
  MAIN_ICON_ANHOR,
  OTHER_PIN_URL,
  OTHER_ICON_SIZE,
  OTHER_ICON_ANHOR,
};

// filter.js
const OFFERS_COUNT = 10;
const DEFAULT_VALUE = 'any';

export {OFFERS_COUNT, DEFAULT_VALUE};
