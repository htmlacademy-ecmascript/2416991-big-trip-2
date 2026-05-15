import { getMockDestinations } from '../mocks';

const destinations = getMockDestinations();

export default class DestinationsModel {
  #destinations = [...destinations];

  get destinations() {
    return this.#destinations;
  }

  getDestination(id) {
    const result = this.#destinations.find((destination) => destination.id === id);

    return result ? { ...result } : {
      id: id,
      name: id.slice(3)
    };
  }
}
