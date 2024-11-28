import { createPhotoArray } from './create-photo-array.js';

const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const photos = createPhotoArray();
const fragment = new DocumentFragment;

photos.forEach((photo) => {
  const { url, description, comments, likes } = photo;
  const newPhoto = pictureTemplate.cloneNode(true);

  newPhoto.querySelector('.picture__img').src = url;
  newPhoto.querySelector('.picture__img').alt = description;
  newPhoto.querySelector('.picture__comments').textContent = comments.length;
  newPhoto.querySelector('.picture__likes').textContent = likes;
  fragment.append(newPhoto);
});

pictures.append(fragment);
