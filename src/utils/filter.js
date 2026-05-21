import dayjs from 'dayjs';
import { FilterType } from './const';

const isFuturePoint = (point) => dayjs(point.dateFrom).isAfter(dayjs());
const isPastPoint = (point) => dayjs(point.dateTo).isBefore(dayjs());
const isPresentPoint = (point) =>
  (dayjs(point.dateFrom).isBefore(dayjs()) || dayjs(point.dateFrom).isSame(dayjs())) &&
  dayjs(point.dateTo).isAfter(dayjs());

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter(isFuturePoint),
  [FilterType.PAST]: (points) => points.filter(isPastPoint),
  [FilterType.PRESENT]: (points) => points.filter(isPresentPoint),
};

export { filter };

