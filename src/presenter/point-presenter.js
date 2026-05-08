import { remove, render, replace } from '../framework/render';
import PointFormView from '../view/point-form-view';
import PointView from '../view/point-view';

export default class PointPresenter {
  #pointListContainer = null;
  #destinationsModel = null;
  #offersModel = null;

  #pointComponent = null;
  #pointFormComponent = null;

  #point = null;

  #isMinimized = null;

  #handleRollupClick = null;

  constructor({
    pointListContainer,
    destinationsModel,
    offersModel,
    onRollupClick,
    isMinimized = true
  }) {
    this.#pointListContainer = pointListContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#isMinimized = isMinimized;
    this.#handleRollupClick = onRollupClick;
  }

  init(point) {
    this.#point = point;

    const previousPointComponent = this.#pointComponent;
    const previousPointFormComponent = this.#pointFormComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      destination: this.#destinationsModel.getDestination(this.#point.destination),
      selectedOffers: this.#offersModel.getSelectedOffers(this.#point.type, this.#point.offers),
      onRollupClick: this.#rollupClickHandler,
    });

    this.#pointFormComponent = new PointFormView({
      point: this.#point,
      selectedOffers: this.#offersModel.getSelectedOffers(this.#point.type, this.#point.offers),
      offers: this.#offersModel.offers,
      currentDestination: this.#destinationsModel.getDestination(this.#point.destination),
      destinations: this.#destinationsModel.destinations,
      onFormSubmit: this.#handleFormSubmit,
      onFormReset: this.#handleFormReset,
      onRollupClick: this.#rollupClickHandler
    });

    if (previousPointComponent === null || previousPointFormComponent === null) {
      render(this.#pointComponent, this.#pointListContainer);
      this.#isMinimized = true;
      return;
    }

    if (this.#pointListContainer.contains(previousPointComponent.element)) {
      replace(this.#pointComponent, previousPointComponent);
      this.#isMinimized = true;
    }

    if (this.#pointListContainer.contains(previousPointFormComponent.element)) {
      replace(this.#pointFormComponent, previousPointFormComponent);
      this.#isMinimized = false;
    }

    remove(previousPointComponent);
    remove(previousPointFormComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointFormComponent);
  }

  #rollupClickHandler = () => {
    if (this.#isMinimized) {
      this.#handleRollupClick(this.#point.id);
      this.#replacePointToForm();
    } else {
      this.#replaceFormToPoint();
    }
  };

  #handleEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  };

  #handleFormSubmit = () => {
    this.#replaceFormToPoint();
  };

  #handleFormReset = () => {
    this.#replaceFormToPoint();
  };

  #replacePointToForm() {
    replace(this.#pointFormComponent, this.#pointComponent);
    this.#isMinimized = false;
    document.addEventListener('keydown', this.#handleEscKeyDown);
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent, this.#pointFormComponent);
    this.#isMinimized = true;
    document.removeEventListener('keydown', this.#handleEscKeyDown);
  }

  minimize = () => {
    if (!this.#isMinimized) {
      this.#replaceFormToPoint();
    }
  };
}
