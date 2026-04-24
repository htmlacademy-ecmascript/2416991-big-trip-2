import { POINT_TYPES } from '../utils/const.js';
import { createCounter, getRandomDatePair, getRandomInteger } from './mock-utils.js';

const offers = POINT_TYPES.map((type) => {
  const numberOfOffers = getRandomInteger(1, 5);
  const mockMinPrice = 10;
  const mockMaxPrice = 400;
  return {
    type,
    offers: Array.from({ length: numberOfOffers }, (_, index) => ({
      id: `${type}-offer-${index + 1}`,
      title: `Offer ${index + 1} for ${type}`,
      price: getRandomInteger(mockMinPrice, mockMaxPrice)
    }))
  };
});

const mockIdCounter = createCounter();

const createPoint = (destinationId) => {
  const { dateFrom, dateTo } = getRandomDatePair();
  const type = POINT_TYPES[getRandomInteger(0, POINT_TYPES.length - 1)];
  const allOffers = [...offers.find((offer) => offer.type === type).offers];
  const numberOfOffers = getRandomInteger(0, allOffers.length);
  const pointOffers = [...allOffers].sort(() => 0.5 - Math.random()).slice(0, numberOfOffers).map((offer) => offer.id);
  return {
    id: mockIdCounter(),
    basePrice: getRandomInteger(200, 9900),
    dateFrom,
    dateTo,
    destination: destinationId,
    isFavorite: Math.random() < 0.5,
    offers: pointOffers,
    type
  };
};

const getMockOffers = () => [...offers];

export { createPoint, getMockOffers };


