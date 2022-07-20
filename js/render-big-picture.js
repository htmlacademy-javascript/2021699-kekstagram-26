const popup = document.querySelector('.big-picture');
// const commentCount = document.querySelector('.social__comment-count');
// const commentsLoader = document.querySelector('.social__comments-loader');
const commentsContainer = popup.querySelector('.social__comments');
const сloseButton = popup.querySelector('#picture-cancel');
const uploadButton = popup.querySelector('.comments-loader');


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
  // commentCount.classList.add('hidden');
  // commentsLoader.classList.add('hidden');

  // Картинка модалки
  popup.querySelector('.big-picture__img img').src = photo.url;
  popup.querySelector('.social__caption').textContent = photo.description;
  popup.querySelector('.likes-count').textContent = photo.likes;
  popup.querySelector('.comments-count').textContent = photo.comments.length;

  //Комменты
  // Удаляем комментарии,которые были
  popup.querySelector('.social__comments').innerHTML = '';
  //массив готовых комментов
  // let commentsPhoto = createComments(photo.comments);

  let displayedComments = 5;
  const totalcomments = photo.comments.length;

  uploadButton.addEventListener('click', () => {
    if(displayedComments !== totalcomments){
      displayedComments+= 5;
      let photoComments = displaysCertainNumberComments();
      let partComments = createComments(photoComments);
      commentsContainer.appendChild(partComments);
    }else {uploadButton.classList.add('hidden');}

  });


  function displaysCertainNumberComments (){
    return photo.comments.slice(0, displayedComments);
  }

  let photoComments = displaysCertainNumberComments();
  let partComments = createComments(photo.comments);
  commentsContainer.appendChild(partComments);
};

//   const displaysCertainNumberComments = (comments) => {
//     const commentsPhoto = createComments(photo.comments);
//     let displayedComments = 5;
//     const totalcomments = commentsPhoto.length;
//     const minNumberComments = 5;
//     if(totalcomments <= minNumberComments){
//       return commentsPhoto.slice(0, displayedComments);
//     } else {
//       const uploadButton = popup.querySelector('.comments-loader');
//       uploadButton.addEventListener('click', () => {
//         if(displayedComments !== totalcomments){
//           displayedComments+= 5;
//           commentsPhoto.slice(0, displayedComments);
//         } else{uploadButton.classList.add('hidden');}
//       });
//     }
//   };
//   const partComments = displaysCertainNumberComments(commentsPhoto);
//   commentsContainer.appendChild(partComments);
// };

export {renderBigPicture};
