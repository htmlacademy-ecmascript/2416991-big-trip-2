import { DEFAULT_POINT } from '../utils/const';

export default class NewPointModel {
  constructor(defaultDestination) {
    this.defaultPoint = {...DEFAULT_POINT, destination: defaultDestination.id};

    this.destinationExtended = defaultDestination;
  }

  getDefaultPoint() {
    return this.defaultPoint;
  }

  getDefaultPointDestinationExtended() {
    return this.destinationExtended;
  }
}
