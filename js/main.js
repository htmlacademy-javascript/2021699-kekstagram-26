const randomInteger = (min, max) => {
  if (min < 0 && max < 0 && min > max){
    throw new RangeError('ошибка');
  }
  return Math.floor(Math.random() * (max - min + 1) ) + min;
};
randomInteger(1, 10);

const lengthCheck = (line, maxLength) => {
  if (maxLength <= 140 && line.length >= maxLength){
    return false;
  }
  return true;
};
lengthCheck('2570920', 10);
