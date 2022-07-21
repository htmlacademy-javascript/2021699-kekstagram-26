const previewImg = document.querySelector('.img-upload__preview');
const buttonPlus = document.querySelector('.scale__control--bigger');
const buttonMinus = document.querySelector('.scale__control--smaller');
const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const specialElements = document.querySelectorAll('.effects__radio');

const scallerControlPhoto = () => {
  const field = document.querySelector('.scale__control--value');
  let fieldValue = field.value;
  fieldValue = 100;
  buttonMinus.addEventListener('click', () => {
    if (fieldValue > 25) {
      fieldValue -= 25;
      field.value = fieldValue;
      transform(fieldValue * 0.01);
    }

  });
  buttonPlus.addEventListener('click', () => {
    if (fieldValue < 100) {
      fieldValue += 25;
      field.value = fieldValue;
      transform(fieldValue * 0.01);
    }
  });
};

function transform (value) {
  previewImg.style.transform = `scale(${value})`;
}

const effectValues = [
  { name:'effect-none',
    style: 'none',
    min:0,
    max:0,
    step:0.1,
    start:0,
    unit:''
  },
  { name:'effect-chrome',
    style: 'grayscale',
    min:0,
    max:1,
    step:0.1,
    start:1,
    unit:''
  },
  { name:'effect-sepia',
    style: 'sepia',
    min:0,
    max:1,
    step:0.1,
    start:1,
    unit:'none'
  },
  { name:'effect-marvin',
    style: 'invert',
    min:0,
    max:100,
    step:1,
    start:100,
    unit:'%'
  },
  { name:'effect-phobos',
    style:'blur',
    min:0,
    max:3,
    step:0.1,
    start:3,
    unit:'px'
  },
  { name:'effect-heat',
    style: 'brightness',
    min:1,
    max:3,
    step:0.1,
    start:3,
    unit:''
  }
];

const defaultFilter = effectValues[0];
let chosenEffect = defaultFilter;

const isDefault = () => chosenEffect === defaultFilter;

const upDateslider = () => {
  sliderElement.classList.remove('hidden');
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    step: chosenEffect.step,
    start: chosenEffect.start,
  });


  if(isDefault())
  {sliderElement.classList.add('hidden');
  }
};


const currentEffect = (evt) =>{
  if(!evt.target.id)
  {return;
  }
  const currentEffectData = effectValues.find((item) => item.name === evt.target.id);
  chosenEffect = currentEffectData;
  upDateslider();
};

const onSliderUpdate = () => {
  previewImg.style.filter = 'none';
  previewImg.className = '';
  valueElement.value = '';
  if (isDefault()){
    return;
  }
  const sliderValue = sliderElement.noUiSlider.get();
  previewImg.style.filter = `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;
  previewImg.classList.add(`effects__preview--${chosenEffect.name}`);
  valueElement.value = sliderValue;
};


const checkoutEffects = () => {
  chosenEffect = defaultFilter;
  upDateslider();
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
  item.addEventListener('change', currentEffect);
});
sliderElement.noUiSlider.on('update', onSliderUpdate);

export {scallerControlPhoto, checkoutEffects};
