const SCALE_RADIX = 10;
const Scale = {
  MIN: 25,
  MAX: 100,
  STEP: 25
};

const formImgUpload = document.querySelector('.img-upload__form');
const previewImg = formImgUpload.querySelector('.img-upload__preview img');
const scaleControlSmaller = formImgUpload.querySelector('.scale__control--smaller');
const scaleControlBigger = formImgUpload.querySelector('.scale__control--bigger');
const scaleControlValue = formImgUpload.querySelector('.scale__control--value');

const scaleUpdate = (factor = 1) => {
  const currentScale = parseInt(scaleControlValue.value, SCALE_RADIX);
  const newScale = currentScale + Scale.STEP * factor;

  if (newScale >= Scale.MIN && newScale <= Scale.MAX) {
    scaleControlValue.value = `${newScale.toString()}%`;
    previewImg.style.transform = `scale(${newScale / 100})`;

    scaleControlSmaller.disabled = newScale <= Scale.MIN;
    scaleControlBigger.disabled = newScale >= Scale.MAX;
  }
};

const scaleReset = () => {
  scaleControlValue.value = '100%';
  previewImg.style.transform = 'scale(1)';
  scaleControlSmaller.disabled = false;
  scaleControlBigger.disabled = false;
};

export { scaleUpdate, scaleReset };
