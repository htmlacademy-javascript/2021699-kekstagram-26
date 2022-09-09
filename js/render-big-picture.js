const popup = document.querySelector('.big-picture');
const commentCount = document.querySelector('.social__comment-count');
const commentCountSlice = commentCount.querySelector('.comments-count__slice');
const commentsContainer = popup.querySelector('.social__comments');
const сloseButton = popup.querySelector('#picture-cancel');
const uploadButton = popup.querySelector('.comments-loader');
let displayedComments = 5;

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

  return fragment;
};

const renderBigPicture = (photo) => {

  openModal();


  // Картинка модалки
  popup.querySelector('.big-picture__img').querySelector('img').src = photo.url;
  console.log(photo.url);
  popup.querySelector('.social__caption').textContent = photo.description;
  popup.querySelector('.likes-count').textContent = photo.likes;
  popup.querySelector('.comments-count').textContent = photo.comments.length;


  //Комменты
  // Удаляем комментарии,которые были
  popup.querySelector('.social__comments').innerHTML = '';
  //массив готовых комментов
  // let commentsPhoto = createComments(photo.comments);


  const totalcomments = photo.comments.length;
  commentCountSlice.innerHTML = displayedComments;
  const op = () => {
    if(totalcomments === displayedComments){
      let photoComments = displaysCertainNumberComments();
      let partComments = createComments(photoComments);
      commentsContainer.appendChild(partComments);
    }
    op();
    uploadButton.addEventListener('click', () => {
      displayedComments += 5;
      if(displayedComments !== totalcomments){
        let photoComments = displaysCertainNumberComments();
        let partComments = createComments(photoComments);
        commentsContainer.appendChild(partComments);
      }else {uploadButton.classList.add('hidden');}
    });
  };

  function displaysCertainNumberComments (){
    return photo.comments.slice(0, displayedComments);
  }

  let photoComments = displaysCertainNumberComments();
  let partComments = createComments(photoComments);
  commentsContainer.appendChild(partComments);
};

export {renderBigPicture, closeModal};
