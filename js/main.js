const getrandomInteger = (min, max) => {
  if (min < 0 && max < 0 && min > max){
    throw new RangeError('Переданы некорректные параметры');
  }
  return Math.floor(Math.random() * (max - min + 1) ) + min;
};
getrandomInteger(1, 10);

const checkLength = (line, maxLength) => {
  if (line.length >= maxLength){
    return false;
  }
  return true;
};
checkLength('2570920', 140);
