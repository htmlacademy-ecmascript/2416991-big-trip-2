import dayjs from 'dayjs';
import { SortItem } from './const.js';

const compareByDay = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));

const compareByTime = (pointA, pointB) => {
  const durationA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const durationB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));

  return durationB - durationA;
};

const compareByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

const sortPoints = (points, sortType) => {
  switch (sortType) {
    case SortItem.TIME.name:
      return [...points].sort(compareByTime);
    case SortItem.PRICE.name:
      return [...points].sort(compareByPrice);
    default:
      return [...points].sort(compareByDay);
  }
};

export { sortPoints };
