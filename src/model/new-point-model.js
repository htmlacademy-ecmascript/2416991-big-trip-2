import { DEFAULT_POINT } from '../utils/const';

export default class NewPointModel {
  #point = { ...DEFAULT_POINT };
  #destination = null;

  constructor(destinationsModel) {
    this.#destination = destinationsModel.getDestination(this.#point.destination);
  }

  get defaultPoint() {
    return this.#point;
  }

  getDefaultPointDestinationExtended() {
    return this.#destination;
  }
}
