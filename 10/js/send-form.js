import { isEscapeKey} from './util.js';
import { scaleUpdate, scaleReset } from './change-scale.js';
import { effectReset, onEffectsListClick, onSliderUpdate } from './add-effect.js';
import { hashtagHandler, hashtagError } from './validate-hashtags.js';
import { descriptionHandler, descriptionError } from './validate-description.js';

const imageUploadForm = document.querySelector('.img-upload__form');
const userImage = imageUploadForm.querySelector('.img-upload__input');
const imageEditForm = imageUploadForm.querySelector('.img-upload__overlay');
const imageUploadCancelButton = imageUploadForm.querySelector('.img-upload__cancel');
const hashtagField = imageUploadForm.querySelector('.text__hashtags');
const descriptionField = imageUploadForm.querySelector('.text__description');
const imageUploadFormSubmitButton = imageUploadForm.querySelector('.img-upload__submit');
const scaleControlSmaller = imageUploadForm.querySelector('.scale__control--smaller');
const scaleControlBigger = imageUploadForm.querySelector('.scale__control--bigger');
const effectsList = imageUploadForm.querySelector('.effects__list');
const slider = imageUploadForm.querySelector('.effect-level__slider');

const pristine = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const openImageUploadForm = () => {
  imageUploadFormSubmitButton.disabled = false;
  imageEditForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.body.addEventListener('keydown', onDocumentKeydown);
};

const onUserImageChange = () => {
  openImageUploadForm();
};

const closeImageUploadForm = () => {
  imageEditForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  scaleReset();
  effectReset();
  pristine.reset();
  imageUploadForm.reset();
  document.body.removeEventListener('keydown', onDocumentKeydown);
};

const onImageUploadCancelButtonClick = (evt) => {
  evt.preventDefault();
  closeImageUploadForm();
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    if (document.activeElement === hashtagField || document.activeElement === descriptionField) {
      evt.stopPropagation();
    } else {
      closeImageUploadForm();
    }
  }
}

const onScaleControlSmallerClick = () => {
  scaleUpdate(-1);
};

const onScaleControlBiggerClick = () => {
  scaleUpdate(1);
};

const onHashtagFieldInput = () => {
  if (pristine.validate()) {
    imageUploadFormSubmitButton.disabled = false;
  } else {
    imageUploadFormSubmitButton.disabled = true;
  }
};

const onDescriptionInput = () => {
  if (pristine.validate()) {
    imageUploadFormSubmitButton.disabled = false;
  } else {
    imageUploadFormSubmitButton.disabled = true;
  }
};

effectsList.addEventListener('click', onEffectsListClick);
slider.noUiSlider.on('update', onSliderUpdate);

pristine.addValidator(hashtagField, hashtagHandler, hashtagError);
hashtagField.addEventListener('input', onHashtagFieldInput);

pristine.addValidator(descriptionField, descriptionHandler, descriptionError);
descriptionField.addEventListener('input', onDescriptionInput);

userImage.addEventListener('change', onUserImageChange);
imageUploadCancelButton.addEventListener('click', onImageUploadCancelButtonClick);

scaleControlSmaller.addEventListener('click', onScaleControlSmallerClick);
scaleControlBigger.addEventListener('click', onScaleControlBiggerClick);
