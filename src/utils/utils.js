import { isDatesEqual } from './date';

const isPointsEqual = (pointA, pointB) => {

  const isBasePriceEqual = pointA.basePrice === pointB.basePrice;
  const isDatesSame = isDatesEqual(pointA, pointB);

  const isDestinationEqual = pointA.destination === pointB.destination;
  const isFavoriteEqual = pointA.isFavorite === pointB.isFavorite;
  const isOffersEqual = pointA.offers.length === pointB.offers.length && pointA.offers.every((offer) => pointB.offers.includes(offer));
  const isTypeEqual = pointA.type === pointB.type;

  return isBasePriceEqual && isDatesSame && isDestinationEqual && isFavoriteEqual && isOffersEqual && isTypeEqual;
};

export { isPointsEqual };
