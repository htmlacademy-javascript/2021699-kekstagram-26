const popup = document.querySelector('.big-picture');
const ESC_BTN_CODE = 27;

const closeModal = () => {
  popup.classList.add('hidden');
  document.body.classList.remove('modal-open');
};
popup.addEventListener('click', closeModal);


document.addEventListener('keydown', (evt) => {
  if (evt.keyCode === ESC_BTN_CODE) {
    closeModal();
  }
});
