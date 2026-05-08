import { remove, render, RenderPosition, replace } from '../framework/render.js';
import { NoPointsMessages } from '../utils/const.js';
import NoPointsView from '../view/no-points-view.js';
import PointFormView from '../view/point-form-view.js';
import PointView from '../view/point-view.js';
import PointsListView from '../view/points-list-view.js';
import SortView from '../view/sort-view.js';

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

  #renderPoint(point) {
    const destinationExtended = this.#destinationsModel.getDestination(point.destination);
    const selectedOffers = this.#offersModel.getSelectedOffers(point.type, point.offers);

    const pointsListContainer = this.#pointsListComponent.element;

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointView({
      point,
      destination: destinationExtended,
      selectedOffers,
      onRollupClick: () => {
        replacePointToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const formComponent = new PointFormView({
      point,
      selectedOffers: this.#offersModel.getSelectedOffers(point.type, point.offers),
      offers: this.#offersModel.offers,
      currentDestination: this.#destinationsModel.getDestination(point.destination),
      destinations: this.#destinationsModel.destinations,

      onFormSubmit: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onFormReset: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onRollupClick: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToForm() {
      replace(formComponent, pointComponent);
    }

    function replaceFormToPoint() {
      replace(pointComponent, formComponent);
    }

    render(pointComponent, pointsListContainer);
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
