// import {createOffers} from './data.js';
// const offers = createOffers();

import {disableAdForm, disableFilterForm, enableAdForm, enableFilterForm} from './state.js';

import {initValidation} from './ad-form.js';

import {createMap} from './map.js';

import {getData} from './server.js';

const SIMILAR_OFFERS_COUNT = 10;

disableAdForm ();
disableFilterForm ();

const {createMarkers, initMap, createMainMarker} = createMap ();

const {setUserFormSubmit} = initValidation();

getData((offers) => {
  createMarkers(offers.slice(0, SIMILAR_OFFERS_COUNT));
});

setUserFormSubmit();


createMainMarker ();

initMap ();

enableAdForm ();


enableFilterForm ();


