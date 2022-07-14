const fileUploadControl = document.querySelector('#upload-file');
const form = document.querySelector('.img-upload__overlay');
const formCloseButton = form.querySelector('#upload-cancel');
const fileUploadImage = document.querySelector('#upload-select-image');

const closeForm = () => {
  form.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.addEventListener('change', onFormKey);
  document.removeEventListener('keydown', onFormKeyDown);
  document.removeEventListener('click', formPageCloseButton);
  document.removeEventListener('change', openFormFile);
};

const openForm = () => {
  fileUploadControl.addEventListener('change', onFormKey);
  fileUploadControl.addEventListener('change', openFormFile);
  fileUploadControl.addEventListener('keydown', onFormKeyDown);
  fileUploadControl.addEventListener('click', formPageCloseButton);
};

function openFormFile () {
  form.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

function onFormKeyDown (evt) {
  if (evt.key === 'Escape') {
    closeForm();
  }
}

function onFormKey (evt) {
  if (fileUploadImage.querySelector('#hashtags') === document.activeElement || fileUploadImage.querySelector('.text__description')) {
    return evt;
  } else {
    if (evt.key === 'Escape') {
      closeForm();
    }
  }
}

function formPageCloseButton () {
  formCloseButton.onclick=closeForm;
}

const validationForm = () => {
  openForm ();
};

const pristine = new Pristine(fileUploadImage,{
  classTo: 'img-upload__field-wrapper',
  errorClass: 'text__item--invalid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'text__error'
});

const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const findDuplicatesHashtags = (hashtags) => {
  const length=hashtags.length,
    out=[],
    counts={};

  for (let i=0; i<length; i++) {
    const item = hashtags[i];
    counts[item] = counts[item] >= 1 ? counts[item] + 1 : 1;
    if (counts[item] === 2) {
      out.push(item);
      return false;
    }
  }
  return true;
};

const preparedHashtags = (value) => value.trim().toLowerCase().split(' ');

pristine.addValidator(fileUploadImage.querySelector('#hashtags'),
  (hashtags) => hashtags === ''|| preparedHashtags(hashtags).every((value) => re.test(value)),
  'Ошибка при вводе значений');

pristine.addValidator(fileUploadImage.querySelector('#hashtags'),
  (hashtags) => preparedHashtags(hashtags).length <= 5,
  'Не больше 5 хэштегов');

pristine.addValidator(fileUploadImage.querySelector('#hashtags'),
  (hashtags) => findDuplicatesHashtags(preparedHashtags(hashtags)),
  'Повтор хештегов');

const validateComment = (value) =>  value.length <= 140;

pristine.addValidator(fileUploadImage.querySelector('.text__description'),
  validateComment,
  'Комментарий не должен быть длиннее 140 символов');

fileUploadImage.addEventListener('submit', (evt) => {
  if(!pristine.validate()){
    evt.preventDefault();
  }
});

export {validationForm};
