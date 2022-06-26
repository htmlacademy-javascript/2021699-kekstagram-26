import {generatePhotos} from '.date.js';

const pictureListElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createPicture = generatePhotos(4);

const pictureListFragment = document.createDocumentFragment();

createPicture.forEach((url, likes, comments) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').textContent = url;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes.length;
  pictureListFragment.appendChild(pictureElement);
});

pictureListElement.appendChild( pictureListFragment);
