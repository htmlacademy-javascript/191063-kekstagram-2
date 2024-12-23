const RADIX = 10;
const TRANSFORM_SCALE = 0.01;

const ImageZoom = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
};

const imageUploadOverlay = document.querySelector('.img-upload__overlay');
const scaleControlValue = imageUploadOverlay.querySelector('.scale__control--value');
const imageElement = imageUploadOverlay.querySelector('img');
const scaleControlSmaller = imageUploadOverlay.querySelector('.scale__control--smaller');
const scaleControlBigger = imageUploadOverlay.querySelector('.scale__control--bigger');

const changeImageZoom = (factor = 1) => {
  let size = parseInt(scaleControlValue.value, RADIX) + (ImageZoom.STEP * factor);

  if (size < ImageZoom.MIN) {
    size = ImageZoom.MIN;
  }

  if (size > ImageZoom.MAX) {
    size = ImageZoom.MAX;
  }

  scaleControlValue.value = `${size}%`;
  imageElement.style.transform = `scale(${size * TRANSFORM_SCALE})`;
};

const onScaleControlSmallerClick = () => {
  changeImageZoom(-1);
};

const onScaleControlBiggerClick = () => {
  changeImageZoom();
};

scaleControlSmaller.addEventListener('click', onScaleControlSmallerClick);
scaleControlBigger.addEventListener('click', onScaleControlBiggerClick);

const resetImageZoom = () => {
  imageElement.style.removeProperty('transform');
  scaleControlValue.value = `${ImageZoom.MAX}%`;
};

export { resetImageZoom };
