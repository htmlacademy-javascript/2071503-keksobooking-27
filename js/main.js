import {disableAdForm, disableFilterForm, enableAdForm, enableFilterForm} from './state.js';
import {initAdForm} from './ad-form.js';
import {createMap} from './map.js';
import {getData} from './server.js';
import {applyFilters} from './filter.js';

const SIMILAR_OFFERS_COUNT = 10;

disableAdForm ();
disableFilterForm ();

createMap ()
  .then(({clearMarkers, createMarkers, resetPosition, setUpMainMarkerMove}) => {

    initAdForm ({resetPosition, setUpMainMarkerMove});
    enableAdForm ();

    getData().then((offers) => {
      enableFilterForm ();

      applyFilters(offers, (filteredOffers) => {
        clearMarkers ();
        createMarkers(filteredOffers.slice(0, SIMILAR_OFFERS_COUNT));
      });
    });
  });

