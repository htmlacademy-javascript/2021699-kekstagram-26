const getrandomInteger = (min, max) => {
  if (min < 0 && max < 0 && min > max) {
    throw new RangeError('Переданы некорректные параметры');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
getrandomInteger(1, 10);

const checkLength = (line, maxLength) => {
  if (line.length >= maxLength) {
    return false;
  }
  return true;
};
checkLength('2570920', 140);


const getRandomArrayElement = (elements) => {
  return elements[getrandomInteger(0, elements.length - 1)];
};

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


const createPhoto = (id) => {
  return {
    id,
    url: '',
    description: '',
    likes: '',
    comments: '',
  }
};

const createComments = (countComment) => {
  const COMMENTSPHOTO = [];
  for (let i=1; i <= countComment; i++) {
    COMMENTSPHOTO.push({
      id: i,
      avatar: `img/avatar-${getrandomInteger(1, 6)}.svg`,
      message: getRandomArrayElement(MESSAGES),
      name: getRandomArrayElement(NAMES),
    });
  }
  return COMMENTSPHOTO;
};
const MAX_NUMBERS_COMMENT = 5;
const comment = createComments( MAX_NUMBERS_COMMENT);

const generatePhotos = (count) => {
  const PHOTOS = [];
  for (let i=1; i <= count; i++) {
    PHOTOS.push({
      id: i,
      url: `photos/${i}.jpg`,
      description: getRandomArrayElement(DESCRIPTION),
      likes: getrandomInteger(15, 200),
      comments:  getRandomArrayElement(comment),
    });
  }
  return PHOTOS;
};

const MAX_NUMBERS_PHOTO = 25;
const photo = generatePhotos(MAX_NUMBERS_PHOTO);
photo ();

