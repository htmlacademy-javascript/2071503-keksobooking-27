import {debounce} from './debounce.js';
import {OFFERS_COUNT, DEFAULT_VALUE} from './const.js';
const Price = {
  MIDDLE : 10000,
  HIGH : 50000
};

const mapFilters = document.querySelector('.map__filters');
const housingType = mapFilters.querySelector('#housing-type');
const housingPrice = mapFilters.querySelector('#housing-price');
const housingRooms = mapFilters.querySelector('#housing-rooms');
const housingGuests = mapFilters.querySelector('#housing-guests');
const featuresCheckboxes = mapFilters.querySelectorAll('.map__checkbox');


function checkType (offer, type) {
  return type === DEFAULT_VALUE || offer.offer.type === type;
}

function checkPrice (offer, price) {
  switch (price) {
    case DEFAULT_VALUE:
      return true;
    case 'low':
      return offer.offer.price < Price.MIDDLE;
    case 'middle':
      return offer.offer.price < Price.HIGH && offer.offer.price > Price.MIDDLE;
    case 'high':
      return offer.offer.price > Price.HIGH;
  }
}

function checkRooms (offer, rooms) {
  return rooms === DEFAULT_VALUE || offer.offer.rooms === +rooms;
}

function checkGuests (offer, guests) {
  return guests === DEFAULT_VALUE || offer.offer.guests === +guests;
}

function checkFeatures (offer, features) {
  if (!features.length) {
    return true;
  }
  if (!offer.offer.features) {
    return false;
  }

  return features.every((feature) => offer.offer.features.includes(feature));
}

function getСheckedOffers (offers) {
  const selectedType = housingType.value;
  const selectedPrice = housingPrice.value;
  const selectedRooms = housingRooms.value;
  const selectedGuests = housingGuests.value;

  const selectedFeatures = [];
  featuresCheckboxes.forEach((сheckbox) => {
    if (сheckbox.checked) {
      selectedFeatures.push(сheckbox.value);
    }
  });

  const checkedOffers = [];
  for (const offer of offers) {
    if(checkedOffers >= OFFERS_COUNT) {
      break;
    }
    if (
      checkType(offer, selectedType) &&
      checkPrice(offer, selectedPrice) &&
      checkRooms(offer, selectedRooms) &&
      checkGuests(offer, selectedGuests) &&
      checkFeatures(offer, selectedFeatures)
    ) {
      checkedOffers.push(offer);
    }
  }
  return checkedOffers;
}

let render;

function applyFilters (offers, after) {
  render = () => after(offers);

  mapFilters.addEventListener('change', debounce(() => {
    const filteredOffers = getСheckedOffers(offers.slice());
    after(filteredOffers);
  }));

  render ();
}

function resetFilters () {
  housingType.value = DEFAULT_VALUE;
  housingPrice.value = DEFAULT_VALUE;
  housingRooms.value = DEFAULT_VALUE;
  housingGuests.value = DEFAULT_VALUE;
  featuresCheckboxes.forEach((featuresCheckbox) => {
    featuresCheckbox.checked = false;
  });

  render?.();
}

export {applyFilters, resetFilters};
