// Настройка карты leaflet
import {createPopup} from './popup.js';


import {
  INIT_MAP_POSITION,
  INIT_MAP_ZOOM,
  MAIN_PIN_URL,
  MAIN_ICON_SIZE,
  MAIN_ICON_ANHOR,
  OTHER_PIN_URL,
  OTHER_ICON_SIZE,
  OTHER_ICON_ANHOR,
} from './const.js';

// Отрисовка главной метки выбора адреса
function createMainMarker ({moveHandler}) {
  const mainPinIcon = L.icon({
    iconUrl: MAIN_PIN_URL,
    iconSize: MAIN_ICON_SIZE,
    iconAnchor: MAIN_ICON_ANHOR,
  });

  const mainPinMarker = L.marker(
    INIT_MAP_POSITION,
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );


  mainPinMarker.on('move', (evt) => {
    const point = evt.target.getLatLng();
    moveHandler (point);
  });

  return {
    addTo: (map) => mainPinMarker.addTo(map),
    resetPosition: () => {
      mainPinMarker.setLatLng(INIT_MAP_POSITION);
    }
  };
}

function createMap () {
  return new Promise((resolve) => {
    // Создание карты
    L.map('map-canvas')
      .on('load', ({target: map}) => {
        // Отрисовка карты OpenStreetMap
        L.tileLayer(
          'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          },
        ).addTo(map);

        const {addTo: addMainMarkerToMap, resetPosition: resetMainMarkerPosition} = createMainMarker ({moveHandler: mainPinMapMoveHandler});

        addMainMarkerToMap (map);

        // Отрисовка предложений
        const markerGroup = L.layerGroup().addTo(map); // слой для меток

        const pinIcon = L.icon({
          iconUrl: OTHER_PIN_URL,
          iconSize: OTHER_ICON_SIZE,
          iconAnchor: OTHER_ICON_ANHOR,
        });

        function createMarkers(points) {
          points.forEach((point) => {
            const {location: {lat, lng}} = point;
            const marker = L.marker(
              {
                lat,
                lng
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

        function closePopup () {
          map.closePopup();
        }

        function clearMarkers () {
          markerGroup.clearLayers();
        }

        function resetPosition () {
          resetMainMarkerPosition();
          closePopup ();


          // Сбрасывает положение карты
          map.setView(INIT_MAP_POSITION, INIT_MAP_ZOOM);
        }

        let _mainPinMapMoveHandler;

        function setUpMainMarkerMove(handler) {
          _mainPinMapMoveHandler = handler;
        }

        function mainPinMapMoveHandler (...arg) {
          _mainPinMapMoveHandler (...arg);
        }

        resolve({createMarkers, resetPosition, setUpMainMarkerMove, clearMarkers});
      })
      .setView(INIT_MAP_POSITION, INIT_MAP_ZOOM);
  });
}

export {createMap};


