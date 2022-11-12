// Получение данных от сервера
import {showAlert} from './success-error-massage.js';
import {GET_DATA_URL, SEND_DATA_URL} from './const.js';


function getData () {
  return fetch(GET_DATA_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    }).catch((err) => {
      showAlert(`Не удалось загрузить данные ${err}`);
    });
}

function sendData (formData) {
  return fetch(SEND_DATA_URL,
    {
      method: 'POST',
      body: formData,
    },
  );
}

export {getData, sendData};
