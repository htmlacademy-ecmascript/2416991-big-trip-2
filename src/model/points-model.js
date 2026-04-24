import { generateMockPoints } from '../mocks';

const MOCK_POINTS_NUMBER = 6;

const points = generateMockPoints(MOCK_POINTS_NUMBER);

export default class PointsModel {
  points = [...points];

  getPoints() {
    return this.points;
  }
}
