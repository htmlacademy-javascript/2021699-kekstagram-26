const previewImg = document.querySelector('.img-upload__preview');
const buttonPlus = document.querySelector('.scale__control--bigger');
const buttonMinus = document.querySelector('.scale__control--smaller');
const sliderElement = document.querySelector('.effect-level__slider');
const ValueElement = document.querySelector('.effect-level__value');
const specialElements = document.querySelectorAll('.effects__radio');
// const effectOrigin = specialElements.querySelector('#effect-none');
// const effectChrom = specialElement.querySelector('#effect-chrome');
// const effectRadio = specialElement.querySelector('.effects__radio');
// const effectSepia = specialElement.querySelector('#effect-sepia');
// const effectMarvin = specialElement.querySelector('#effect-marvin');
// const effectPhobos = specialElement.querySelector('#effect-phobos');
// const effectHeat = specialElement.querySelector('#effect-heat');

const scallerControlPhoto = () => {
  const field = document.querySelector('.scale__control--value');
  let fieldValue = field.value;
  fieldValue = 100;
  buttonMinus.addEventListener('click', () => {
    if (fieldValue > 25) {
      fieldValue-= 25;
      field.value = fieldValue;
      transform(fieldValue*0.01);
    }

  });
  buttonPlus.addEventListener('click', () => {
    if (fieldValue < 100) {
      fieldValue+= 25;
      field.value = fieldValue;
      transform(fieldValue*0.01);
    }
  });
};

function transform (value) {
  previewImg.style.transform = `scale(${value})`;
}

const СreateSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step:1,
    connect: 'lower',
  });

  sliderElement.noUiSlider.on('update',() => {ValueElement.value = sliderElement.noUiSlider.get();});


  specialElements.forEach((item) => {
    item.addEventListener('change', (evt) => {
      const Id = evt.target.id;
      switch (Id) {
        case 'effect-none':
          previewImg.style.filter='none';
          break;

        case 'effect-chrome':
          previewImg.classList.add('effects__preview--chrome');
          previewImg.style.filter = `grayscale(${ValueElement.value})`;
          sliderElement.noUiSlider.updateOptions({
            range: {
              min: 0,
              max: 1,
            },
            step: 0.1,
          });
          sliderElement.noUiSlider.set(1);
          break;

        case 'effect-sepia':
          previewImg.classList.add('effects__preview--sepia');
          previewImg.style.filter = `sepia(${1})`;
          sliderElement.noUiSlider.updateOptions({
            range: {
              min: 0,
              max: 1,
            },
            step: 0.1,
          });
          sliderElement.noUiSlider.set(1);
          break;
        case 'effect-marvin':
          previewImg.classList.add('effects__preview--marvin');
          previewImg.style.filter = `invert(${1})`;
          sliderElement.noUiSlider.updateOptions({
            range: {
              min: 0,
              max: 100,
            },
            step: 1,
          });
          sliderElement.noUiSlider.set(100);
          break;
        case 'effect-phobos':
          previewImg.classList.add('effects__preview--phobos');
          previewImg.style.filter = `blur(${1})`;
          sliderElement.noUiSlider.updateOptions({
            range: {
              min: 0,
              max: 3,
            },
            step: 0.1,
          });
          sliderElement.noUiSlider.set(3);
          break;
        case 'effect-heat':
          previewImg.classList.add('effects__preview--heat');
          previewImg.style.filter = `brightness(${1})`;
          sliderElement.noUiSlider.updateOptions({
            range: {
              min: 1,
              max: 3,
            },
            step: 0.1,
          });
          sliderElement.noUiSlider.set(3);
          break;
      }
    });
  // hiddenSlider();
  });
};

// function hiddenSlider() {
//   effectOrigin.addEventListener('change', () => {
//     if (effectOrigin.checked)
//     {sliderElement.classList.add('hidden');}
//     else {sliderElement.classList.remove('hidden');}
//   });
// }

export {scallerControlPhoto, СreateSlider};
