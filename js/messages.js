
const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const failTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const closeSuccessMessage = () => {
  const successContainer = document.querySelector('.success');

  document.removeEventListener('keydown',   closeMessageForEscKeydown);
  successContainer.removeEventListener('click', closeSuccessMessage);
  successContainer.remove();
};

function closeMessageForEscKeydown(evt) {
  if (evt.key === 'Escape') {
    closeSuccessMessage();
  }
}

const closeBugMessage = () => {
  const errorContainer = document.querySelector('.error');

  document.removeEventListener('keydown',   closeBugMessageForEscKeydown);
  errorContainer.removeEventListener('click', closeBugMessage);
  errorContainer.remove();
};

function closeBugMessageForEscKeydown(evt) {
  if (evt.key === 'Escape') {
    closeBugMessage();
  }
}

const sendSuccessMessage = () => {
  const successElement = successTemplate.cloneNode(true);
  document.body.append(successElement);

  const buttonMessage = document.querySelector('.success__button');
  const successContainer = document.querySelector('.success');

  buttonMessage.addEventListener('click', closeSuccessMessage, {once:true});
  document.addEventListener('keydown',   closeMessageForEscKeydown);
  successContainer.addEventListener('click', (evt) => {
    if (evt.target !== successContainer) {
      return evt;
    }
    closeSuccessMessage();
  });
};

const sendBugMessage = () => {
  const failElement = failTemplate.cloneNode(true);
  document.body.append(failElement);

  const error = document.querySelector('.error');
  error.style.zIndex = '100';
  const buttonBugMessage = document.querySelector('.error__button');

  buttonBugMessage.addEventListener('click', closeBugMessage, {once:true});
  document.addEventListener('keydown',   closeBugMessageForEscKeydown);
  error.addEventListener('click', (evt) => {
    if (evt.target !== error) {
      return evt;
    }
    closeBugMessage();
  });
};


export {sendSuccessMessage, sendBugMessage};
