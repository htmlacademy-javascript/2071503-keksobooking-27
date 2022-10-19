import {createArrayData} from './data.js';

const popupTemplateContent = document.querySelector('#card').content;
const popupTemplate = popupTemplateContent.querySelector('.popup');
const map = document.querySelector('.map__canvas');

const simularUsers = createArrayData();

simularUsers.forEach((user) => {
  const popupTemplateClone = popupTemplate.cloneNode(true);
  popupTemplateClone.querySelector('.popup__avatar').src = user.author.avatar;
  popupTemplateClone.querySelector('.popup__title').textContent = user.offer.title;
  popupTemplateClone.querySelector('.popup__text--address').textContent = user.offer.address;
  popupTemplateClone.querySelector('.popup__text--price').textContent = `${user.offer.price} ₽/ночь`;
  popupTemplateClone.querySelector('.popup__type').textContent = user.offer.type;
  popupTemplateClone.querySelector('.popup__text--capacity').textContent = `${user.offer.rooms} комнаты для ${user.offer.guests} гостей`;
  popupTemplateClone.querySelector('.popup__text--time').textContent = `Заезд после ${user.offer.checkin}, выезд до ${user.offer.checkout}`;

  // выведение необходимых особенностей
  const popupFeaturesContainer = popupTemplateClone.querySelector('.popup__features');
  const featuresList = popupFeaturesContainer.querySelectorAll('.popup__feature');
  const arrayfeatures = user.offer.features;
  featuresList.forEach((featuresListItem) => {
    const isNecessary = arrayfeatures.some(
      (arrayfeature) => featuresListItem.classList.contains(`popup__feature--${arrayfeature}`)
    );
    if (!isNecessary) {
      featuresListItem.remove();
    }
  });

  popupTemplateClone.querySelector('.popup__description').textContent = user.offer.description;

  // Добавление фото
  const arrayPhoto = user.offer.photos;
  const imgContainer = popupTemplateClone.querySelector('.popup__photos');
  const photoClone = imgContainer.querySelector('.popup__photo').cloneNode(true);

  imgContainer.innerHTML = '';

  arrayPhoto.forEach((phohtoUrl) => {
    const regularPhotoClone = photoClone.cloneNode(true);
    regularPhotoClone.src = phohtoUrl;
    imgContainer.appendChild(regularPhotoClone);
  });

  map.appendChild(popupTemplateClone);
});


