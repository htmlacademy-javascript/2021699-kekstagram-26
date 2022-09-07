
import {renderPictures} from './render-picture.js';
// import { renderBigPicture } from './render-big-picture.js';
import { debounce } from './util.js';


const filterElement = document.querySelector('.img-filters');
const filterButtons = filterElement.querySelectorAll('.img-filters__button');
const NUMBER_OF_RANDOM_PHOTOS = 10;
const RENDER_DELAY = 500;

const clearMiniaturesList = () => {
  const pictureListElement = document.querySelectorAll('.pictures');
  pictureListElement.forEach((image) => {
    image.remove();
  });
};

const filterPicturesRandom = (data) => {
  const filteredPhotosRandom = data.slice().sort(() => Math.random() - 0.5).slice(0, NUMBER_OF_RANDOM_PHOTOS);
  renderPictures(filteredPhotosRandom);
};

const filterPicturesByDiscussed = (data) => {
  const filteredPhotosDiscussed = data.slice().sort((a, b) => b.comments.length - a.comments.length);
  renderPictures(filteredPhotosDiscussed);
};

const getSelectsFilter = (button, data) => {
  filterButtons.forEach((buttonFilter) => {
    buttonFilter.classList.remove('img-filters__button--active');
  });
  button.classList.add('img-filters__button--active');

  switch (button.id) {
    case 'filter-random':
      clearMiniaturesList();
      filterPicturesRandom(data);
      break;
    case 'filter-discussed':
      clearMiniaturesList();
      filterPicturesByDiscussed(data);
      break;
    default:
      clearMiniaturesList();
      renderPictures(data);
      break;
  }
};

const filterPictures = (data) => {
  renderPictures(data);
  filterElement.classList.remove('img-filters--inactive');
  filterButtons.forEach((buttonFilter) => {
    const debounceCallback = debounce(
      () => getSelectsFilter(buttonFilter, data),
      RENDER_DELAY,
    );
    buttonFilter.addEventListener('click', debounceCallback);
  });
};

export {filterPictures};
