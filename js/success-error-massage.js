import {ALERT_SHOW_TIME} from './const.js';

const successTemplate = document.querySelector('#success').content;
const successMassage = successTemplate.querySelector('.success');
const errorTemplate = document.querySelector('#error').content;
const errorMassage = errorTemplate.querySelector('.success');

function showAlert (message) {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '1000';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '30%';
  alertContainer.style.top = '50%';
  alertContainer.style.right = '30%';
  alertContainer.style.padding = '30px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

function getSuccessErrorMassage() {
  function isEscapeKey (evt) {
    return evt.key === 'Escape';
  }


  function onSuccessMassageEscKeydown (evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      successMassage.remove();
    }
  }

  function onErrorMassageEscKeydown (evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      errorMassage.remove();
    }
  }

  function getSuccessMassage () {
    document.body.append(successMassage);
    document.addEventListener('keydown', onSuccessMassageEscKeydown);
    document.addEventListener('click', () => {
      successMassage.remove();
    });
  }

  function getErrorMassage () {
    document.body.append(errorMassage);
    document.addEventListener('keydown', onErrorMassageEscKeydown);
    document.addEventListener('click', () => {
      errorMassage.remove();
    });
  }

  return {getSuccessMassage, getErrorMassage};
}

export {showAlert, getSuccessErrorMassage};
