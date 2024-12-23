import '../vendor/pristine/pristine.min.js';

const MAX_HASHTAGS = 5;
const MAX_SYMBOLS_IN_HASHTAG = 20;
const MAX_SYMBOLS_IN_DESCRIPTION = 140;

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const textHashtags = imgUploadForm.querySelector('.text__hashtags');
const textDescription = imgUploadForm.querySelector('.text__description');
const submitButton = imgUploadForm.querySelector('.img-upload__submit');

let hashtagErrorMessageTemplate = '';

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const validateHashtag = (value) => {
  hashtagErrorMessageTemplate = '';

  const inputText = value.toLowerCase().trim();

  if (inputText.length === 0) {
    return true;
  }

  const inputArray = inputText.split(/\s+/);

  const rules = [
    {
      check: inputArray.some((item) => item === '#'),
      error: 'Хэштег не может состоять только из символа "#"',
    },
    {
      check: inputArray.some((item) => item.slice(1).includes('#')),
      error: 'Хэштеги разделяются пробелами',
    },
    {
      check: inputArray.some((item) => item[0] !== '#'),
      error: 'Хэштег должен начинаться с символа "#"',
    },
    {
      check: inputArray.some((item, i, arr) => arr.includes(item, i + 1)),
      error: 'Хэштеги не должны повторяться',
    },
    {
      check: inputArray.some((item) => item.length > MAX_SYMBOLS_IN_HASHTAG),
      error: `Максимальная длина одного хэштега ${MAX_SYMBOLS_IN_HASHTAG} символов, включая символ "#"`,
    },
    {
      check: inputArray.length > MAX_HASHTAGS,
      error: `Хэштегов должно быть не больше ${MAX_HASHTAGS}`,
    },
    {
      check: inputArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: 'Хэштег содержит недопустимые символы',
    },
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;

    if (isInvalid) {
      hashtagErrorMessageTemplate += rule.error;
    }
    return !isInvalid;
  });
};

const validateTextDescription = (value) => value.length <= MAX_SYMBOLS_IN_DESCRIPTION;

const onTextHashtagsInput = () => {
  submitButton.disabled = !pristine.validate();
};

const onTextDescriptionInput = () => {
  submitButton.disabled = !pristine.validate();
};

const validateForm = () => pristine.validate();

const resetValidateForm = () => {
  imgUploadInput.value = '';
  textHashtags.value = '';
  textDescription.value = '';
  pristine.reset();
};

pristine.addValidator(textHashtags, validateHashtag, () => hashtagErrorMessageTemplate);
pristine.addValidator(textDescription, validateTextDescription, `Количество символов не должно превышать ${MAX_SYMBOLS_IN_DESCRIPTION}`);

textHashtags.addEventListener('input', onTextHashtagsInput);
textDescription.addEventListener('input', onTextDescriptionInput);

export { validateForm, resetValidateForm };
