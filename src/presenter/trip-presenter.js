import { render } from '../render.js';
import PointFormView from '../view/point-form-view.js';
import PointView from '../view/point-view.js';
import PointsListView from '../view/points-list-view.js';
import SortView from '../view/sort-view.js';

export default class TripPresenter {
  pointsListComponent = new PointsListView();
  offersModel = null;
  destinationsModel = null;
  pointsModel = null;

  constructor({ tripContainer, offersModel, destinationsModel, pointsModel, newPointModel }) {
    this.tripContainer = tripContainer;
    this.offersModel = offersModel;
    this.destinationsModel = destinationsModel;
    this.pointsModel = pointsModel;
    this.newPointModel = newPointModel;
  }

  init() {
    const points = this.pointsModel.getPoints();

    render(new SortView(), this.tripContainer);
    render(this.pointsListComponent, this.tripContainer);
    render(
      new PointFormView(
        {
          point: points[0],
          destinationExtended: this.destinationsModel.getDestination(points[0].destination),
          selectedOffers: this.offersModel.getSelectedOffers(points[0].type, points[0].offers),
          offers: this.offersModel.getOffersByType(points[0].type),
          currentDestination: this.destinationsModel.getDestination(points[0].destination),
          allDestinations: this.destinationsModel.getAllDestinations(),
        }
      ),
      this.pointsListComponent.getElement()
    );

    for (let i = 1; i < points.length; i++) {
      const point = points[i];
      const destinationExtended = this.destinationsModel.getDestination(point.destination);
      const selectedOffers = this.offersModel.getSelectedOffers(point.type, point.offers);
      render(
        new PointView({ point, destinationExtended, selectedOffers }),
        this.pointsListComponent.getElement()
      );
    }
  }
}
