import { getStaticData } from './data.js';
import { getRandomInteger, getConsecutiveNumber} from './util.js';

const {SENTENCES, NAMES} = getStaticData();

// Количество необходимых для задания фотографий.
const PHOTO_COUNT = 25;

// Универсальное описание для всех фотографий.
const DESCRIPTION = 'Очень красивая фотография. Но это не точно.';

// Минимальное и максимальное количество лайков,
// которые могут стоять на фотографии.
const Likes = {
  MIN: 15,
  MAX: 200,
};

// Минимальное и максимальное количество комментариев
// у одной фотографии.
const Comments = {
  MIN: 0,
  MAX: 30,
};

// Количество разных аватарок в директории img.
const AVATAR_COUNT = 6;

// Минимальное и максимальное количество предложений
// в одном комментарии.
const MessageLength = {
  MIN: 1,
  MAX: 2,
};

// Функции для создания уникальных, последовательных идентификаторов
const getId = getConsecutiveNumber();
const getUrlId = getConsecutiveNumber();
const getCommentId = getConsecutiveNumber();

// Функция для создания произвольного текста комментария из
// заранее созданного набора предложений, содержащихся в SENTENCES.
// Количество предложений в комментарии определяется случайно
// и находится в пределах между минимальным и максимальным
// значениями в MessageLength, включая эти значения.
const generateMessage = () => {
  const messageSentences = [];
  const sentenceCount = getRandomInteger(MessageLength.MIN, MessageLength.MAX);

  for (let i = 0; i < sentenceCount; i++) {
    messageSentences.push(SENTENCES[getRandomInteger(0, SENTENCES.length - 1)]);
  }

  return messageSentences.join(' ');
};

// Функция для создания комментария для фотографии
const createComment = () => ({
  id: getCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message: generateMessage(),
  name: NAMES[getRandomInteger(0, NAMES.length - 1)],
});

// Функция для создания поста с фотографией
const createPhoto = () => ({
  id: getId(),
  url: `photos/${getUrlId()}.jpg`,
  description: DESCRIPTION,
  likes: getRandomInteger(Likes.MIN, Likes.MAX),
  comments: Array.from({length: getRandomInteger(Comments.MIN, Comments.MAX)}, createComment),
});

// Функция для создания массива из постов с разными фотографиями.
// Количество постов, определяется переменной PHOTO_COUNT.
const createPhotoArray = () => Array.from({length: PHOTO_COUNT}, createPhoto);

export {createPhotoArray};
