const popupTemplateContent = document.querySelector('#card').content;
const popupTemplate = popupTemplateContent.querySelector('.popup');

function createPopup (user) {
  const popupTemplateClone = popupTemplate.cloneNode(true);

  // Поиск и проверка элемента
  function searchVerificationContent (selector, text) {
    const element = popupTemplateClone.querySelector(selector);

    if (text) {
      element.textContent = text;
    } else {element.remove();}
  }

  const avatar = popupTemplateClone.querySelector('.popup__avatar');
  avatar.src = user.author.avatar;
  if (!avatar.src) {
    avatar.remove();
  }
  searchVerificationContent ('.popup__title', user.offer.title);
  searchVerificationContent ('.popup__text--address', user.offer.address);
  searchVerificationContent ('.popup__text--price', user.offer.price ? `${user.offer.price} ₽/ночь` : null);
  searchVerificationContent ('.popup__type', user.offer.type);

  const capacity = popupTemplateClone.querySelector('.popup__text--capacity');
  capacity.textContent = `${user.offer.rooms} комнаты для ${user.offer.guests} гостей`;
  if (!user.offer.rooms || !user.offer.guests) {
    capacity.remove();
  }

  const time = popupTemplateClone.querySelector('.popup__text--time');
  time.textContent = `Заезд после ${user.offer.checkin}, выезд до ${user.offer.checkout}`;
  if (!user.offer.checkin || !user.offer.checkout) {
    time.remove();
  }

  // выведение необходимых особенностей
  const popupFeaturesContainer = popupTemplateClone.querySelector('.popup__features');
  const featuresList = popupFeaturesContainer.querySelectorAll('.popup__feature');
  const features = user.offer.features;
  if (features) {
    featuresList.forEach((featuresListItem) => {
      const isNecessary = features.some(
        (feature) => featuresListItem.classList.contains(`popup__feature--${feature}`)
      );
      if (!isNecessary) {
        featuresListItem.remove();
      }
    });
  } else {popupFeaturesContainer.innerHTML = '';}

  searchVerificationContent ('.popup__description', user.offer.description);

  // Добавление фото
  const photos = user.offer.photos;
  const imgContainer = popupTemplateClone.querySelector('.popup__photos');
  const photoClone = imgContainer.querySelector('.popup__photo').cloneNode(true);

  imgContainer.innerHTML = '';

  photos?.forEach((phohtoUrl) => {
    const regularPhotoClone = photoClone.cloneNode(true);
    regularPhotoClone.src = phohtoUrl;
    imgContainer.appendChild(regularPhotoClone);
  });

  return popupTemplateClone;
}

export {createPopup};


