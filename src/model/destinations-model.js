import { getMockDestinations } from '../mocks';

const destinations = getMockDestinations();

export default class DestinationsModel {
  #destinations = [...destinations];

  get destinations() {
    return this.#destinations;
  }

  getDestination(id) {
    return this.destinations.find((destination) => destination.id === id);
  }
}
