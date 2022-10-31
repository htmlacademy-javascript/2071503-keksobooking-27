import {createOffers} from './data.js';

import {disableAdForm, disableFilterForm, enableAdForm, enableFilterForm} from './state.js';

import {initValidation} from './ad-form.js';

import {createSlider} from './no-ui-slider.js';
createSlider ();

import {createMarker} from './map.js';
const offers = createOffers();

createMarker(offers);

disableAdForm ();
disableFilterForm ();

enableAdForm ();
initValidation();
enableFilterForm ();

