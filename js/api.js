const getData = (onSuccess) => {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Не удалось загрузить фотографии');
      }
      return response.json();
    })
    .then((pictures) => {
      onSuccess(pictures);
    });
};


const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://26.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error('Не удалось загрузить. Попробуйте снова');
      }
      onSuccess();
    })
    .catch((err) => {
      onFail(err.message);
    });
};

export {getData, sendData};
