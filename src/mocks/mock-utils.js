import dayjs from 'dayjs';

const createCounter = (start = 0) => {
  let count = start;
  return () => ++count;
};

const getRandomInteger = (min = 0, max = 100) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const randomDateThisYear = () => {
  const start = dayjs().startOf('year');
  const end = dayjs().endOf('year');
  const diff = end.diff(start, 'millisecond');
  const randomTimestamp = start.valueOf() + Math.random() * diff;

  return dayjs(randomTimestamp).toISOString();
};

const getRandomDatePair = () => {
  const dateFrom = randomDateThisYear();
  const dateTo = dayjs(dateFrom).add(getRandomInteger(1, 5), 'day').toISOString();

  return { dateFrom, dateTo };
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

export { createCounter, getRandomInteger, randomDateThisYear, getRandomDatePair, getRandomArrayElement };
