const ALERT_SHOW_TIME = 5000;

const getRandomInteger = (min, max) => {
  if (min < 0 && max < 0 && min > max) {
    throw new RangeError('Переданы некорректные параметры');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomArrayElement = (elements) =>  elements[getRandomInteger(0, elements.length - 1)];

const showAlert = (message) => {
  const alert = document.createElement('div');
  alert.style.position = 'absolute';
  alert.style.zIndex = '10';
  alert.style.left = '0';
  alert.style.top = '0';
  alert.style.right = '0';
  alert.style.padding = '15px 5px';
  alert.style.fontSize = '25px';
  alert.style.textAlign = 'center';
  alert.style.backgroundColor = '#B22222';
  alert.textContent = message;
  document.body.append(alert);

  setTimeout(()=>{
    alert.remove();
  }, ALERT_SHOW_TIME);
};

// function debounce (callback, timeoutDelay) {
//   let timeoutId;
//   return (...rest) => {
//     clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
//   };
// }

// function throttle (callback, delayBetweenFrames) {

//   let lastTime = 0;

//   return (...rest) => {
//     const now = new Date();
//     if (now - lastTime >= delayBetweenFrames) {
//       callback.apply(this, rest);
//       lastTime = now;
//     }
//   };
// }

export {getRandomInteger};
export {getRandomArrayElement};
export {showAlert};
