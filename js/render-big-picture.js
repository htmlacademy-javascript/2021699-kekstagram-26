import {body} from './render-picture.js';

const popup = document.querySelector('.big-picture');

popup.addEventListener('click', () => {
  popup.classList.add('hidden');
  body.classList.remove('modal-open');

});

document.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27) {
    popup.classList.add('hidden');
    body.classList.remove('modal-open');
  }
});
