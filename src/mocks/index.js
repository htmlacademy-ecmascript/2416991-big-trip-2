import { DESTINATION_ID_START } from '../utils/const.js';
import { generateDestinations } from './destination.js';
import { getRandomArrayElement } from './mock-utils';
import { createPoint, getMockOffers } from './point';

const destinations = generateDestinations(DESTINATION_ID_START);

const destinationIds = destinations.map((destination) => destination.id);

const generateMockPoints = (numberOfPoints) => Array.from({ length: numberOfPoints }, () => createPoint(getRandomArrayElement(destinationIds)));

const getMockDestinations = () => [...destinations];

export { generateMockPoints, getMockDestinations, getMockOffers };

