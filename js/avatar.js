const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const adFormHeaderPreview = document.querySelector('.ad-form-header__preview');
const avatarPreview = adFormHeaderPreview.querySelector('img');
const avatarChooser = document.querySelector('#avatar');

const adFormPhotoBox = document.querySelector('.ad-form__photo');
const imagesChooser = document.querySelector('#images');

function onAvatarChange () {
  avatarChooser.addEventListener ('change', () => {
    const file = avatarChooser.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    if (matches) {
      avatarPreview.src = URL.createObjectURL(file);
    }
  });
}


function onImagesChange () {
  imagesChooser.addEventListener ('change', () => {
    const file = imagesChooser.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    if (matches) {
      const image = document.createElement('img');
      image.src = URL.createObjectURL(file);
      image.style.maxWidth = '100%';
      image.style.height = 'auto';
      adFormPhotoBox.appendChild(image);
    }
  });
}

export {onAvatarChange, onImagesChange};
