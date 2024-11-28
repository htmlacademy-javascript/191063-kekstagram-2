const checkStringLength = (string, length) => string.length <= length;

// Строка короче 20 символов
checkStringLength('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
checkStringLength('проверяемая строка', 18); // true
// Строка длиннее 10 символов
checkStringLength('проверяемая строка', 10); // false


const isPalindrome = (string) => {
  const normalizedString = string.replaceAll(' ', '').toLowerCase();
  const reversedString = normalizedString.split('').reverse().join('');

  return normalizedString === reversedString;
};

// Строка является палиндромом
isPalindrome('топот'); // true
// Несмотря на разный регистр, тоже палиндром
isPalindrome('ДовОд'); // true
// Это не палиндром
isPalindrome('Кекс'); // false
// Это палиндром
isPalindrome('Лёша на полке клопа нашёл '); // true


const extractNumbers = (string) => {
  string = string.toString();
  let result = '';

  for (let i = 0; i < string.length; i++) {
    result += !Number.isNaN(parseInt(string[i], 10)) ? string[i] : '';
  }

  return parseInt(result, 10);
};

extractNumbers('2023 год'); // 2023
extractNumbers('ECMAScript 2022'); // 2022
extractNumbers('1 кефир, 0.5 батона'); // 105
extractNumbers('агент 007'); // 7
extractNumbers('а я томат'); // NaN
extractNumbers(2023); // 2023
extractNumbers(-1); // 1
extractNumbers(1.5); // 15

const checkMeetingTime = (workdayStart, workdayEnd, meetingStart, meetingDuration) => {
  const convertTimeToMinutes = (time) => {
    const [hours, minutes] = time.split(':');
    return +hours * 60 + +minutes;
  };

  return convertTimeToMinutes(workdayStart) <= convertTimeToMinutes(meetingStart) &&
    convertTimeToMinutes(workdayEnd) >= convertTimeToMinutes(meetingStart) + meetingDuration;
};

checkMeetingTime('08:00', '17:30', '14:00', 90); // true
checkMeetingTime('8:0', '10:0', '8:0', 120); // true
checkMeetingTime('08:00', '14:30', '14:00', 90); // false
checkMeetingTime('14:00', '17:30', '08:0', 90); // false
checkMeetingTime('8:00', '17:30', '08:00', 900); // false
