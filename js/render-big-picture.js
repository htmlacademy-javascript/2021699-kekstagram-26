const popup = document.querySelector('.big-picture');
const commentCount = document.querySelector('.social__comment-count');
const commentCountSlice = commentCount.querySelector('.comments-count__slice');
const commentsContainer = popup.querySelector('.social__comments');
const сloseButton = popup.querySelector('#picture-cancel');
const uploadButton = popup.querySelector('.comments-loader');

const displayedComments = 5;

const closeModal = () => {
  popup.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
};

const openModal = () => {
  popup.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeyDown);
  сloseButton.addEventListener('click', () => closeModal());
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
  commentsContainer.appendChild(fragment);
};

const renderBigPicture = (photo) => {
  popup.querySelector('.big-picture__img').querySelector('img').src = photo.url;
  popup.querySelector('.social__caption').textContent = photo.description;
  popup.querySelector('.likes-count').textContent = photo.likes;
  popup.querySelector('.comments-count').textContent = String(photo.comments.length);

  popup.querySelector('.social__comments').innerHTML = '';

  addMoreComents(photo.comments);

  openModal();
};

const onClickAddComments = (commentList) => {
  uploadButton.addEventListener('click', () => {
    if (commentList.length <= displayedComments) {
      uploadButton.classList.add('hidden');
      commentCount.textContent = String(Number(commentCountSlice.textContent) + commentList.length);
      uploadButton.removeEventListener('click', addMoreComents);
    } else {
      commentCount.textContent = String(Number(commentCountSlice.textContent) + displayedComments);
    }
    createComments(commentList.splice(0, displayedComments));
  });
};

function addMoreComents (commentList) {
  const copyCommentsList = commentList.slice();
  commentsContainer.innerHTML = '';

  onClickAddComments(copyCommentsList);

  const totalcomments = commentList.length;

  if (totalcomments <= displayedComments) {
    uploadButton.classList.add('hidden');
    createComments(copyCommentsList);
    commentCountSlice.textContent = String(totalcomments);
  } else {
    commentCountSlice.textContent = String(displayedComments);
    uploadButton.classList.remove('hidden');
    createComments(copyCommentsList.splice(0, displayedComments));
  }
}


export {renderBigPicture, closeModal};
