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

// Предложения, которые могут быть использованы
// для формирования текста комментария.
const SENTENCES = [
  'Всё отлично!',
  'В целом всё неплохо.',
  'Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!'
];

// Набор из популярных имён, которые могут быть использованы
// в качестве имени автора комментария.
const NAMES = [
  'Александр',
  'Сергей',
  'Андрей',
  'Дмитрий',
  'Владимир',
  'Елена',
  'Юлия',
  'Татьяна',
  'Анна',
  'Ольга'
];

// Функция для получения псевдослучайного числа в промежутке
// между a и b, включая a и b.
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Функция для получения последовательных целых чисел, начиная с 1.
// Каждый вызов внутренней функции возвращает число,
// больше предыдущего на 1.
const getConsecutiveNumber = () => {
  let number = 1;

  return function () {
    return number++;
  };
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
createPhotoArray();
