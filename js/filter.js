import {renderPictures} from './render-picture.js';
import { debounce } from './util.js';

const filterElement = document.querySelector('.img-filters');
const filterButtons = filterElement.querySelectorAll('.img-filters__button');

const NUMBER_OF_RANDOM_PHOTOS = 10;


const clearMiniaturesList = () => {
  const pictureListElement = document.querySelectorAll('.picture');
  pictureListElement.forEach((image) => {
    image.remove();
  });
};

const filterPicturesRandom = (data) => data.slice().sort(() => Math.random() - 0.5).slice(0, NUMBER_OF_RANDOM_PHOTOS);

const filterPicturesByDiscussed = (data) =>data.slice().sort((a, b) => b.comments.length - a.comments.length);


const onFilterChange = (evt, data) => {
  const target = evt.target;

  if (!target.id) {
    return;
  }


  if (target.classList.contains('img-filters__button--active')) {
    return;
  }

  filterButtons.forEach((buttonFilter) => {
    buttonFilter.classList.remove('img-filters__button--active');
  });
  target.classList.add('img-filters__button--active');

  let currentsPhoto;

  switch (target.id) {
    case 'filter-random':
      currentsPhoto = filterPicturesRandom(data);
      break;
    case 'filter-discussed':
      currentsPhoto = filterPicturesByDiscussed(data);
      break;
    case 'filter-default':
      currentsPhoto = data;
      break;
    default:
      throw new Error (`Unknow filter button id: ${target.id}`);
  }

  clearMiniaturesList();
  renderPictures(currentsPhoto);
};

const renderApp = (data) => {
  renderPictures(data);
  filterElement.classList.remove('img-filters--inactive');

  filterElement.addEventListener('click', debounce((evt) => (onFilterChange(evt, data))));

};

export {renderApp};
