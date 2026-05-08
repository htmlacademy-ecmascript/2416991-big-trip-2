import { remove, render, RenderPosition, replace } from '../framework/render.js';
import { NoPointsMessages } from '../utils/const.js';
import NoPointsView from '../view/no-points-view.js';
import PointsListView from '../view/points-list-view.js';
import SortView from '../view/sort-view.js';
import PointPresenter from './point-presenter.js';

export default class TripPresenter {
  #tripContainer = null;
  #pointsListComponent = new PointsListView();
  #offersModel = null;
  #destinationsModel = null;
  #pointsModel = null;
  #newPointModel = null;
  #sortComponent = new SortView();
  #noPointsComponent = null;

  constructor({ tripContainer, offersModel, destinationsModel, pointsModel, newPointModel }) {
    this.#tripContainer = tripContainer;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#pointsModel = pointsModel;
    this.#newPointModel = newPointModel;
  }

  #renderSort() {
    render(this.#sortComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  }

  #renderNoPoints(message) {
    const previousNoPointsComponent = this.#noPointsComponent;
    this.#noPointsComponent = new NoPointsView(message);

    if (previousNoPointsComponent === null) {
      render(this.#noPointsComponent, this.#tripContainer);
      return;
    }

    replace(this.#noPointsComponent, previousNoPointsComponent);
    remove(previousNoPointsComponent);
  }

  #renderPointsList() {
    render(this.#pointsListComponent, this.#tripContainer);
  }

  #handleRollupClick = (pointId) => {
    console.log('Rollup clicked for point with id:', pointId);
  };

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointsListComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onRollupClick: this.#handleRollupClick
    });
    pointPresenter.init(point);
  }

  #renderPoints(points) {
    points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderBoard() {
    const points = [...this.#pointsModel.points];

    if (points.length === 0) {
      this.#renderNoPoints(NoPointsMessages.EVERYTHING);
      return;
    }

    this.#renderSort();
    this.#renderPointsList();
    this.#renderPoints(points);
  }

  init() {
    this.#renderBoard();
  }
}
