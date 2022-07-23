const fileUploadControl = document.querySelector('#upload-file');
const form = document.querySelector('.img-upload__form');
const formOverlay = document.querySelector('.img-upload__overlay');
const formCloseButton = form.querySelector('#upload-cancel');
const hashtagsInput = form.querySelector('#hashtags');
const description = formOverlay.querySelector('.text__description');


const  maxSymbolsComment = 140;
const maxNumbersHashtags = 5;
const HASHTAGS_REGEX = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const hashtagError = {
  COUNT: 'Не больше 5 хэштегов',
  REPEAT: 'Повтор хештегов',
  MAXSYMBOLS: 'Хештег должен начинаться с решетки, макс 20 символов'
};

const commentError = {
  COUNT: 'Комментарий не должен быть длиннее 140 символов'
};

const pristine = new Pristine(form,{
  classTo: 'img-upload__field-wrapper',
  errorClass: 'text__item--invalid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'text__error'
});

const closeForm = () => {
  formOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onFormKeyDown);
};

function openForm () {
  formOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onFormKeyDown);
}

function onFormKeyDown (evt) {
  if (evt.key === 'Escape' && hashtagsInput !== document.activeElement) {
    closeForm();
  }
}

function onformCloseButton () {
  closeForm();
}

const findDuplicatesHashtags = (value) => {
  const set = new Set(value);
  return value.length === set.size;
};


const preparedHashtags = (value) => value.trim().toLowerCase().split(' ');

const validateComment = (value) =>  value.length <= maxSymbolsComment;

const initValidation = () => {
  fileUploadControl.addEventListener( 'change', openForm);
  formCloseButton.addEventListener( 'click', onformCloseButton);

  pristine.addValidator(hashtagsInput,
    (hashtags) => hashtags === ''|| preparedHashtags(hashtagsInput.value).every((value) => HASHTAGS_REGEX.test(value)),
    hashtagError.MAXSYMBOLS);

  pristine.addValidator(hashtagsInput,
    (hashtags) => preparedHashtags(hashtags).length <= maxNumbersHashtags,
    hashtagError.COUNT);

  pristine.addValidator(hashtagsInput,
    (hashtags) => findDuplicatesHashtags(preparedHashtags(hashtags)),
    hashtagError.REPEAT);

  pristine.addValidator(description,
    validateComment,
    commentError.COUNT);

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      return true;
    }
  });
};

export {initValidation};
