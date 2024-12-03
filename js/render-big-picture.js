import { photoArray } from './create-photo-array.js';
import { isEscapeKey} from './util.js';
import { renderComments, clearComments } from './render-comments.js';

const allMiniatures = document.querySelector('.pictures');
const bigPictureBlock = document.querySelector('.big-picture');
const bigPictureImg = bigPictureBlock.querySelector('.big-picture__img img');
const bigPictureCaption = bigPictureBlock.querySelector('.social__caption');
const bigPictureLikesCount = bigPictureBlock.querySelector('.likes-count');
const bigPictureCloseButton = bigPictureBlock.querySelector('.big-picture__cancel');


const closeBigPicture = () => {
  clearComments();
  bigPictureBlock.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.body.removeEventListener('keydown', onDocumentKeydown);
};

function onCloseButtonClick (evt) {
  evt.preventDefault();
  closeBigPicture();
}

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    closeBigPicture();
  }
}

const openBigPicture = (pictureId) => {
  bigPictureBlock.classList.remove('hidden');
  const selectedPicture = photoArray.find((photo) => photo.id === +pictureId);

  bigPictureImg.src = selectedPicture.url;
  bigPictureCaption.textContent = selectedPicture.description;
  bigPictureLikesCount.textContent = selectedPicture.likes;

  renderComments(selectedPicture.comments);

  document.body.classList.add('modal-open');

  document.body.addEventListener('keydown', onDocumentKeydown);
};

allMiniatures.addEventListener('click', (evt) => {
  const targetPicture = evt.target.closest('.picture');

  if (targetPicture) {
    evt.preventDefault();
    openBigPicture(targetPicture.dataset.pictureId);
  }
});

bigPictureCloseButton.addEventListener('click', onCloseButtonClick);
