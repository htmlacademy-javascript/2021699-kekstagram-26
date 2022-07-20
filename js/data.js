import {getRandomArrayElement, getRandomInteger} from './util.js';

const DESCRIPTION = [
  'Сегодня Солнцестояние',
  'С понедельника начну',
  'Около Чаши',
  'Первый шаг к мечте',
  'Счастье не за горами',
];

const NAMES = [
  'Пересвет',
  'Сафина',
  'Раян',
  'Рустам Нургалиевич',
];

const MESSAGES = [
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
];

const MAX_NUMBERS_PHOTO = 25;
const MAX_NUMBERS_COMMENT = 15;

// eslint-disable-next-line
const checkLength = (line, maxLength) => {
  if (line.length >= maxLength) {
    return false;
  }
  return true;
};

const generateComments = (countComment) => {
  const comments = [];

  for (let i = 1; i <= countComment; i++) {
    comments.push({
      id: i,
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      message: getRandomArrayElement(MESSAGES),
      name: getRandomArrayElement(NAMES),
    });
  }

  return comments;
};

const generatePhotos = (count) => {
  const photos = [];

  for (let i = 1; i <= count; i++) {
    photos.push({
      id: i,
      url: `photos/${i}.jpg`,
      description: getRandomArrayElement(DESCRIPTION),
      likes: getRandomInteger(15, 200),
      comments: generateComments(getRandomInteger(0, MAX_NUMBERS_COMMENT)),
    });
  }

  return photos;
};

generatePhotos(MAX_NUMBERS_PHOTO);

export {generatePhotos, generateComments};
