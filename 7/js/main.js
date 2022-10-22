import {createOffers} from './data.js';

import {createPopup} from './popup.js';

import {disableСreateForm, disableFilterForm, enableСreateForm, enableFilterForm} from './state.js';

const map = document.querySelector('.map__canvas');

const offers = createOffers();

offers.forEach((offer) => map.append(createPopup(offer)));

disableСreateForm();
disableFilterForm();

enableСreateForm();
enableFilterForm();
