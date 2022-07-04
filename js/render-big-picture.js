// import {renderPictures} from './render-picture.js';

const popup = document.querySelector('.big-picture');

popup.addEventListener('click', () => {
  popup.classList.add('hidden');
});

document.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27) {
    popup.classList.add('hidden');
  }
});

// const  bigPicture = function() {
//   const pictures = document.querySelectorAll('.pictures');
//   console.log(pictures);
// };

// bigPicture();
