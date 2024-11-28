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


export {getRandomInteger, getConsecutiveNumber};
