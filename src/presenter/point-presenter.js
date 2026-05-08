import { remove, render, replace } from '../framework/render';
import PointFormView from '../view/point-form-view';
import PointView from '../view/point-view';

const Mode = {
  DEFAULT: 'DEFAULT',
  FORM: 'FORM',
};

export default class PointPresenter {
  #pointListContainer = null;
  #destinationsModel = null;
  #offersModel = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #pointComponent = null;
  #pointFormComponent = null;

  #point = null;
  #mode = Mode.DEFAULT;

  constructor({
    pointListContainer,
    destinationsModel,
    offersModel,
    onDataChange,
    onModeChange
  }) {
    this.#pointListContainer = pointListContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
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
      onFavoriteClick: this.#handleFavoriteClick
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
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, previousPointComponent);
    }

    if (this.#mode === Mode.FORM) {
      replace(this.#pointFormComponent, previousPointFormComponent);
    }

    remove(previousPointComponent);
    remove(previousPointFormComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointFormComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPoint();
    }
  }

  #rollupClickHandler = () => {
    if (this.#mode === Mode.DEFAULT) {
      this.#replacePointToForm();
    } else if (this.#mode === Mode.FORM) {
      this.#replaceFormToPoint();
    }
  };

  #handleEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  };

  #handleFormSubmit = (point) => {
    this.#handleDataChange(point);
    this.#replaceFormToPoint();
  };

  #handleFormReset = () => {
    this.#replaceFormToPoint();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({ ...this.#point, isFavorite: !this.#point.isFavorite });
  };

  #replacePointToForm() {
    replace(this.#pointFormComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#handleEscKeyDown);
    this.#handleModeChange();
    this.#mode = Mode.FORM;
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent, this.#pointFormComponent);
    this.#mode = Mode.DEFAULT;
    document.removeEventListener('keydown', this.#handleEscKeyDown);
  }
}
