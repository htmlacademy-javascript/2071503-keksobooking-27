import {createOffers} from './data.js';

import {disableAdForm, disableFilterForm, enableAdForm, enableFilterForm} from './state.js';

import {initValidation} from './ad-form.js';

import {createMarker} from './map.js';
const offers = createOffers();

createMarker(offers);

disableAdForm ();
disableFilterForm ();

enableAdForm ();
initValidation();
enableFilterForm ();

