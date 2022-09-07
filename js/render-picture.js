import { renderBigPicture } from './render-big-picture.js';

const pictureListElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPictures = (pictures) => {
  const pictureListFragment = document.createDocumentFragment();

  pictures.forEach((photo) => {
    const pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes.length;
    pictureListFragment.appendChild(pictureElement);

    pictureElement.addEventListener('click', () => renderBigPicture(photo));
  });

  pictureListElement.appendChild(pictureListFragment);
};

export {renderPictures};
