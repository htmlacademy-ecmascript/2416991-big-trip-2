import { generateMockPoints } from '../mocks';
import Observable from '../framework/observable';

const MOCK_POINTS_NUMBER = 6;

const points = generateMockPoints(MOCK_POINTS_NUMBER);

export default class PointsModel extends Observable {
  #points = [...points];

  get points() {
    return this.#points;
  }
}
