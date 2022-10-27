import {createOffers} from './data.js';

import {createPopup} from './popup.js';

import {disableAdForm, disableFilterForm, enableAdForm, enableFilterForm} from './state.js';

import {initValidation} from './ad-form.js';

const map = document.querySelector('.map__canvas');

const offers = createOffers();

offers.forEach((offer) => map.append(createPopup(offer)));

disableAdForm ();
disableFilterForm ();

enableAdForm ();
initValidation();
enableFilterForm ();

