import dayjs from 'dayjs';

const DESTINATION_ID_START = 1001;

const POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const DEFAULT_POINT_TYPE = POINT_TYPES[5];

const DEFAULT_POINT = {
  'id': null,
  'basePrice': 100,
  'dateFrom': dayjs().toISOString(),
  'dateTo': dayjs().add(1, 'day').toISOString(),
  'destination': DESTINATION_ID_START,
  'isFavorite': false,
  'offers': [],
  'type': DEFAULT_POINT_TYPE
};

const NoPointsMessages = {
  EVERYTHING: 'Click New Event to create your first point',
  PAST: 'There are no past events now',
  PRESENT: 'There are no present events now',
  FUTURE: 'There are no future events now'
};

const SortItem = {
  DEFAULT: {
    name: 'day',
    id: 'sort-day',
    isDisabled: false
  },
  EVENT: {
    name: 'event',
    id: 'sort-event',
    isDisabled: true
  },
  TIME: {
    name: 'time',
    id: 'sort-time',
    isDisabled: false
  },
  PRICE: {
    name: 'price',
    id: 'sort-price',
    isDisabled: false
  },
  OFFER: {
    name: 'offer',
    id: 'sort-offer',
    isDisabled: true
  }
};

const USER_DESTINATION = {
  id: 'user-id',
  name: 'user-destination',
  description: '',
  pictures: []

};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT'
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR'
};

export { DEFAULT_POINT, DESTINATION_ID_START, NoPointsMessages, POINT_TYPES, SortItem, UpdateType, USER_DESTINATION, UserAction };

