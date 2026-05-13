import { remove, render, RenderPosition, replace } from '../framework/render.js';
import { NoPointsMessages, SortItem } from '../utils/const.js';
import { updateItem } from '../utils/data.js';
import { sortPoints } from '../utils/sort.js';
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
  #sortComponent = null;
  #currentSortType = SortItem.DEFAULT.name;
  #noPointsComponent = null;
  #pointPresenters = new Map();

  #points = [];

  constructor({ tripContainer, offersModel, destinationsModel, pointsModel, newPointModel }) {
    this.#tripContainer = tripContainer;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#pointsModel = pointsModel;
    this.#newPointModel = newPointModel;

    this.#points = [...this.#pointsModel.points];
  }

  init() {
    this.#renderBoard();
  }

  #getSortedPoints = () => sortPoints(this.#points, this.#currentSortType);

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    const sortedPoints = this.#getSortedPoints();

    this.#clearPoints();
    this.#renderPoints(sortedPoints);
  };

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

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointsListComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints(points) {
    points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderBoard() {
    if (this.#points.length === 0) {
      this.#renderNoPoints(NoPointsMessages.EVERYTHING);
      return;
    }

    const sortedPoints = this.#getSortedPoints();

    this.#renderSort();
    this.#renderPointsList();
    this.#renderPoints(sortedPoints);
  }

  #clearPoints() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }
}
