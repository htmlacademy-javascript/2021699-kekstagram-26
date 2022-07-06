
const pictureListElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.social__comments-loader');
const body = document.querySelector('body');

const renderPictures = (pictures) => {
  const pictureListFragment = document.createDocumentFragment();

  pictures.forEach((photo) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes.length;
    pictureListFragment.appendChild(pictureElement);

    pictureElement.addEventListener('click', () => {
      const popup = document.querySelector('.big-picture');

      // Открываем модалку
      popup.classList.remove('hidden');
      body.classList.add('modal-open');

      commentCount.classList.add('hidden');
      commentsLoader.classList.add('hidden');

      // Картинка модалки
      popup.querySelector('.big-picture__img img').src = photo.url;
      popup.querySelector('.social__caption').textContent = photo.description;
      popup.querySelector('.likes-count').textContent = photo.likes;
      popup.querySelector('.comments-count').textContent = photo.comments.length;

      // Удаляем комментарии,которые были
      popup.querySelector('.social__comments').innerHTML = '';
    });
  });
  pictureListElement.appendChild(pictureListFragment);
};


// функция создания коммента
function creatComments(comment){

  // создаем лишку
  const oneComment = document.createElement('li');
  oneComment.classList.add('social__comment');
  // commentList.appendChild(oneComment);

  // картинка
  const oneImg = document.createElement('img');
  oneImg.classList.add('social__picture');
  oneImg.src=comment.avatar;
  oneImg.alt=comment.name;
  oneComment.appendChild(oneImg);


  // добавляем абзац
  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.textContent = comment.message;
  oneComment.appendChild(commentText);

  return oneComment;
}

// перебор коллекции элементов
const commentList = document.querySelector('.social__comments');
for (let i = 0; i < commentList.length; i++) {
  const cardItem = commentList[i];
  commentList.appendChild(cardItem);
}


creatComments(commentList);

export {renderPictures, body};
