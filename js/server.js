// Получение данных от сервера
import {showAlert} from './success-error-massage.js';
import {GET_DATA_URL, SEND_DATA_URL} from './const.js';


function getData () {
  return fetch(GET_DATA_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      showAlert('Не удалось загрузить данные. Попробуйте ещё разок');
    }).catch(() => {
      new Error('Data not correct');
    });
}

function sendData (formData) {
  return fetch(SEND_DATA_URL,
    {
      method: 'POST',
      body: formData,
    },
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }
    showAlert('Не удалось отправить форму. Попробуйте ещё разок');
  }).catch(() => {
    new Error('Server is not responding');
  });
}

export {getData, sendData};
