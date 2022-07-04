
const pictureListElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.social__comments-loader');
const body = document.querySelector('body');
const commentList = document.querySelector('.social__comments');

const renderPictures = (pictures) => {
  const pictureListFragment = document.createDocumentFragment();

  pictures.forEach((photo) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureListFragment.appendChild(pictureElement);

    pictureElement.addEventListener('click', (photo) => {
      const popup = document.querySelector('.big-picture');
      popup.classList.remove('hidden');
      body.classList.add('modal-open');
      commentCount.classList.add('hidden');
      commentsLoader.classList.add('hidden');

      popup.querySelector('.big-picture__img').src = photo.url;
      popup.querySelector('.comments-count').textContent = photo.comments.length;
      popup.querySelector('.likes-count').textContent = photo.likes;
      popup.querySelector('.social__caption').textContent = photo.description;

      const makeComment = function (tagName, className, text) {
        const commentElement = document.createElement(tagName);
        commentElement.classList.add(className);
        if (text) {
          commentElement.textContent = text;
        }
        return commentElement;
      };


      const creatComment = function (socialComments) {
        for( let i = 0; i < socialComments.length; i++){
          const li = makeComment('li','social__comment');
          commentList.appendChild(li);

          const img = makeComment('img','social__comment');
          img.src = socialComments[i].src;
          img.alt = socialComments[i].alt;
          img.width='35';
          img.height='35';
          li.appendChild(img);

          const p = document.createElement('p');
          p.classList.add('social__text');
          p.textContent = 'текст комментария';
          li.appendChild(p);
        }
      };
      creatComment();
    });
  });
  pictureListElement.appendChild(pictureListFragment);
};


export {renderPictures};
