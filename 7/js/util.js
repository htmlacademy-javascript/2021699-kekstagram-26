const getRandomInteger = (min, max) => {
  if (min < 0 && max < 0 && min > max) {
    throw new RangeError('Переданы некорректные параметры');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomArrayElement = (elements) =>  elements[getRandomInteger(0, elements.length - 1)];


export {getRandomInteger};
export {getRandomArrayElement};
