import { unblockSubmitButton } from './user-form.js';

const API_URL = 'https://26.javascript.pages.academy/kekstagram';
const sendErrorMessage = 'Не удалось загрузить. Попробуйте снова';
const getErrorMessage = 'Не удалось загрузить фотографии';

const getData = (onSuccess, onFail) => {
  fetch(`${API_URL}/data`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(getErrorMessage);
      }
      return response.json();
    })
    .then((pictures) => {
      onSuccess(pictures);
    })
    .catch((err) => {
      onFail(err.message);
    });
};


const sendData = (onSuccess, onFail, body) => {
  fetch(
    `${API_URL}`,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(sendErrorMessage);
      }
      onSuccess();
    })
    .catch((err) => {
      onFail(err.message);
    })
    .finally(() => {
      unblockSubmitButton();
    });
};

export {getData, sendData};
