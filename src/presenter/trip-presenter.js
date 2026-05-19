import { remove, render, RenderPosition, replace } from '../framework/render.js';
import { NoPointsMessages, SortItem } from '../utils/const.js';

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

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    return sortPoints(this.#pointsModel.points, this.#currentSortType);
  }

  init() {
    this.#renderBoard();
  }

  #handleViewAction = (actionType, updateType, update) => {
    console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
  };

  #handleModelEvent = (updateType, data) => {
    console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
  };

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

    this.#clearPoints();
    this.#renderPoints();
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

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointsListComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints() {
    this.points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderBoard() {
    if (this.points.length === 0) {
      this.#renderNoPoints(NoPointsMessages.EVERYTHING);
      return;
    }

    this.#renderSort();
    this.#renderPointsList();
    this.#renderPoints();
  }

  #clearPoints() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }
}
