// Получение данных от сервера
const ALERT_SHOW_TIME = 3000;

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

function getData (onSuccess) {
  fetch('https://27.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      showAlert('Не удалось загрузить данные. Попробуйте ещё разок');
    })
    .then((offers) => {
      onSuccess(offers);
    });
}

export {getData};
