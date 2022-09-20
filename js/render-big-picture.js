const popup = document.querySelector('.big-picture');
const commentCount = document.querySelector('.social__comment-count');
const commentsCount = commentCount.querySelector('.comments-count');
const commentCountSlice = document.querySelector('.comments-count__slice');
const commentsContainer = popup.querySelector('.social__comments');
const сloseButton = popup.querySelector('#picture-cancel');
const uploadButton = popup.querySelector('.comments-loader');

const COMMENTS_DISPLAY_STEP = 5;
let displayedComments = COMMENTS_DISPLAY_STEP;

const closeModal = () => {
  displayedComments = COMMENTS_DISPLAY_STEP;
  popup.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
};

const openModal = () => {
  popup.classList.remove('hidden');
  document.body.classList.add('modal-open');
  uploadButton.classList.remove('hidden');
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

const onClickAddComments = (commentList) => {
  if (commentList.length <= displayedComments) {
    uploadButton.classList.add('hidden');
    commentCountSlice.textContent=commentList.length;
  } else {
    displayedComments +=COMMENTS_DISPLAY_STEP;
    commentList.slice(displayedComments);
    commentCountSlice.textContent=displayedComments;
  }
  createComments(commentList);
};


const renderComents = (commentList) => {
  const copyCommentsList = commentList.slice();
  commentsContainer.innerHTML = '';


  commentsCount.textContent=commentList.length;
  const renderPictureComments = () => {
    onClickAddComments(copyCommentsList);
  };


  if (commentList.length <= COMMENTS_DISPLAY_STEP) {
    uploadButton.classList.add('hidden');
    commentCountSlice.textContent=copyCommentsList.length;
    createComments(copyCommentsList);
  } else {
    commentCountSlice.textContent=COMMENTS_DISPLAY_STEP;
    uploadButton.classList.remove('hidden');
    uploadButton.addEventListener('click', renderPictureComments, {once:true});
  }
};

const renderBigPicture = (photo) => {
  popup.querySelector('.big-picture__img').querySelector('img').src = photo.url;
  popup.querySelector('.social__caption').textContent = photo.description;
  popup.querySelector('.likes-count').textContent = String(photo.likes);
  popup.querySelector('.comments-count').textContent = String(photo.comments.length);

  popup.querySelector('.social__comments').innerHTML = '';

  renderComents(photo.comments);

  openModal();
};

export {renderBigPicture, closeModal};
