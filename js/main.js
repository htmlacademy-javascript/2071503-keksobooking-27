
import {disableAdForm, disableFilterForm, enableAdForm, enableFilterForm} from './state.js';

import {initAdForm} from './ad-form.js';

import {createMap} from './map.js';

import {getData} from './server.js';

const SIMILAR_OFFERS_COUNT = 10;

disableAdForm ();
disableFilterForm ();


createMap ()
  .then(({createMarkers, resetPosition, setUpMainMarkerMove}) => {

    initAdForm ({resetPosition, setUpMainMarkerMove});
    enableAdForm ();

    getData().then((offers) => {
      createMarkers(offers.slice(0, SIMILAR_OFFERS_COUNT));

      enableFilterForm ();
    });
  });

