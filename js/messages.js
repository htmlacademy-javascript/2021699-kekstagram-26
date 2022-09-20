
const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const failTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');


const renderPopupInfo = (node, messageContainer) => {
  document.body.append(node);

  const onClose = () => {
    document.removeEventListener('keydown',   onDocumentKeyDown);
    node.remove();
  };

  function onDocumentKeyDown (evt) {
    if (evt.key === 'Escape') {
      onClose();
    }
  }

  const onNodeClick = (evt) => {
    if (evt.target === messageContainer) {
      return;
    }
    onClose();
  };

  node.addEventListener('click', onNodeClick);
  document.addEventListener('keydown',   onDocumentKeyDown);
};


const renderSuccessMessage = () => {
  const node = successTemplate.cloneNode(true);
  const messageContainer = node.querySelector('.success__inner');
  renderPopupInfo(node, messageContainer);
};

const renderErrorMessage = () => {
  const node = failTemplate.cloneNode(true);
  const messageContainer = node.querySelector('.error__inner');
  renderPopupInfo(node, messageContainer);
};
export {renderSuccessMessage, renderErrorMessage};
