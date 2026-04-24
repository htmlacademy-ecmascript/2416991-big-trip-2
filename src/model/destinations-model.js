import { getMockDestinations } from '../mocks';

const destinations = getMockDestinations();

export default class DestinationsModel {
  destinations = [...destinations];

  getAllDestinations() {
    return this.destinations;
  }

  getDestination(id) {
    return this.destinations.find((destination) => destination.id === id);
  }

  getDefaultDestination() {
    return this.destinations[0];
  }
}
