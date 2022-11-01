// Настройка карты leaflet
const ROUND_COORDINATE = 5;
// Создание карты
const map = L.map('map-canvas')
  .setView({
    lat: 35.6895,
    lng: 139.692,
  }, 10);


// Отрисовка карты OpenStreetMap
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// Отрисовка главной метки выбора адреса
function createMainMarker (checkValidation) {
  const mainPinIcon = L.icon({
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });


  const mainPinMarker = L.marker(
    {
      lat: 35.6895,
      lng: 139.692,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  mainPinMarker.addTo(map);

  // Фиксирование координат главной метки и передача в поле адреса
  const address = document.querySelector('#address');

  function getAddressCoordinates (coordinates) {
    address.value = `lat: ${(coordinates.lat).toFixed(ROUND_COORDINATE)}, lng: ${(coordinates.lng).toFixed(ROUND_COORDINATE )}`;
  }

  mainPinMarker.on('moveend', (evt) => {
    const point = evt.target.getLatLng();
    getAddressCoordinates (point);
  });

  const resetButton = document.querySelector('.ad-form__reset');

  mainPinMarker.on('change', () => {
    checkValidation(address);
  });


  // Вернуть масштаб и положение метки
  resetButton.addEventListener('click', () => {
    mainPinMarker.setLatLng({
      lat: 35.6895,
      lng: 139.692,
    });

    map.setView({
      lat: 35.6895,
      lng: 139.692,
    }, 10);
  });
}
createMainMarker ();

// Отрисовка предложений
const markerGroup = L.layerGroup().addTo(map); // слой для меток

import {createPopup} from './popup.js';

const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function createMarker(points) {
  points.forEach((point) => {
    const {location: {lat, lng}} = point;
    const marker = L.marker(
      {
        lat,
        lng,
      },
      {
        icon: pinIcon,
      },
    );

    marker
      .addTo(markerGroup)
      .bindPopup(createPopup(point));
  });
}

/* Код для сортировки меток
Button.addEventListener('click', () => {
  markerGroup.clearLayers();
  points.slice(points.length / 2).forEach((point) => {
    createMarker(point);
  });
  Button.remove();
});
*/

export {createMarker};
