const form=  document.querySelector('.img-upload__form');
const previewImg = form.querySelector('.img-upload__preview img');
const scalePositive = form.querySelector('.scale__control--bigger');
const scaleNegative = form.querySelector('.scale__control--smaller');
const sliderElement = form.querySelector('.effect-level__slider');
const sliderHidden = form.querySelector('.img-upload__effect-level');
const valueElement = form.querySelector('.effect-level__value');
const specialElements = form.querySelectorAll('.effects__radio');
const scaleField = form.querySelector('.scale__control--value');

const SCALE_STEP = 25;
const INITIAL_SCALE_VALUE = 100;
const EFFECTS_DATA = [
  {
    name: 'effect-none',
    style: 'none',
    min: 0,
    max: 0,
    step: 0.1,
    start: 0,
    unit: ''
  },
  {
    name: 'effect-chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    start: 1,
    unit: ''
  },
  {
    name: 'effect-sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    start: 1,
    unit:''
  },
  {
    name: 'effect-marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    start: 100,
    unit: '%'
  },
  {
    name: 'effect-phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    start: 3,
    unit: 'px'
  },
  {
    name: 'effect-heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    start: 3,
    unit: ''
  }
];

const transform = (value) => {
  previewImg.style.transform = `scale(${value * 0.01})`;
};

const scaleControlPhoto = () => {

  let fieldValue = scaleField.value;
  fieldValue = INITIAL_SCALE_VALUE;
  scaleNegative.addEventListener('click', () => {
    if (fieldValue > SCALE_STEP) {
      fieldValue -= SCALE_STEP;
      scaleField.value = `${fieldValue}%`;
      transform(fieldValue);
    }

  });

  scalePositive.addEventListener('click', () => {
    if (fieldValue < INITIAL_SCALE_VALUE) {
      fieldValue += SCALE_STEP;
      scaleField.value = `${fieldValue}%`;
      transform(fieldValue);
    }

  });
};

const resetScale = () => {
  scaleField.value = `${INITIAL_SCALE_VALUE}%`;
  transform(INITIAL_SCALE_VALUE);

};
const defaultFilter = EFFECTS_DATA[0];
let chosenEffect = defaultFilter;

const isDefault = () => chosenEffect === defaultFilter;

const updateSlider = () => {
  sliderHidden.classList.remove('hidden');
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    step: chosenEffect.step,
    start: chosenEffect.start,
  });

  if (isDefault()) {
    sliderHidden.classList.add('hidden');
  }
};


const onEffectChange = (evt) =>{
  if (!evt.target.id) {
    return;
  }

  const currentEffectData = EFFECTS_DATA.find((item) => item.name === evt.target.id);
  chosenEffect = currentEffectData;
  updateSlider();
};

const onSliderUpdate = () => {
  previewImg.style.filter = 'none';
  previewImg.className = '';
  valueElement.value = '';

  if (isDefault()) {
    return;
  }

  const sliderValue = sliderElement.noUiSlider.get();
  previewImg.style.filter = `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;
  previewImg.classList.add(`effects__preview--${chosenEffect.name}`);
  valueElement.value = sliderValue;
};


const checkoutEffects = () => {
  chosenEffect = defaultFilter;
  updateSlider();
};

noUiSlider.create(sliderElement, {
  range: {
    min: defaultFilter.min,
    max: defaultFilter.max,
  },
  start: defaultFilter.start,
  step: defaultFilter.step,
  connect: 'lower',
});

specialElements.forEach((item) => {
  item.addEventListener('change', onEffectChange);
});
sliderElement.noUiSlider.on('update', onSliderUpdate);

export {scaleControlPhoto, checkoutEffects, resetScale};
