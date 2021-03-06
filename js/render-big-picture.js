const popup = document.querySelector('.big-picture');
const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.social__comments-loader');
const commentsContainer = popup.querySelector('.social__comments');
const CloseButton = popup.querySelector('#picture-cancel');


const closeModal = () => {
  popup.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
  CloseButton.removeEventListener('click', onCloseButtonClick);
};

const openModal = () => {
  popup.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeyDown);
  CloseButton.addEventListener('click', onCloseButtonClick);
};

function onCloseButtonClick () {
  closeModal();
  document.addEventListener('click', modalCloseButton);
};

function onDocumentKeyDown (evt) {
  if (evt.key === 'Escape') {
    closeModal();
  }
}

const createComment = (comment) =>{
  const oneComment = document.createElement('li');
  oneComment.classList.add('social__comment');
  // картинка
  const oneImg = document.createElement('img');
  oneImg.classList.add('social__picture');
  oneImg.src = comment.avatar;
  oneImg.alt = comment.name;
  oneComment.appendChild(oneImg);

  // добавляем абзац
  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.textContent = comment.message;
  oneComment.appendChild(commentText);

  return oneComment;
};

const createComments = (comments) => {
  const fragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const renderedComment = createComment(comment);
    fragment.appendChild(renderedComment);
  });

  return fragment;
};

const renderBigPicture = (photo) => {

  openModal();

  commentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  // Картинка модалки
  popup.querySelector('.big-picture__img img').src = photo.url;
  popup.querySelector('.social__caption').textContent = photo.description;
  popup.querySelector('.likes-count').textContent = photo.likes;
  popup.querySelector('.comments-count').textContent = photo.comments.length;

  //Комменты
  // Удаляем комментарии,которые были
  popup.querySelector('.social__comments').innerHTML = '';
  //массив готовых комментов
  const commentsPhoto = createComments(photo.comments);
  commentsContainer.appendChild(commentsPhoto);
};

export {renderBigPicture};
