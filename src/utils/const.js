import dayjs from 'dayjs';

const POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const DEFAULT_POINT_TYPE = POINT_TYPES[5];

const DEFAULT_POINT = {
  'id': null,
  'basePrice': 100,
  'dateFrom': dayjs().toISOString(),
  'dateTo': dayjs().add(1, 'day').toISOString(),
  'destination': null,
  'isFavorite': false,
  'offers': [],
  'type': DEFAULT_POINT_TYPE
};

export { DEFAULT_POINT, POINT_TYPES };

