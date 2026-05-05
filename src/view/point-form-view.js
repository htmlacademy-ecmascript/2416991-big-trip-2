import AbstractView from '../framework/view/abstract-view.js';
import { POINT_TYPES } from '../utils/const.js';
import { formatToDateInput } from '../utils/date.js';
import { capitalize } from '../utils/text.js';

const createTypeItemTemplate = (type, id) => `
  <div class="event__type-item">
    <input id="event-type-${type}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${id}">${capitalize(type)}</label>
  </div>
`;

const createTypeListTemplate = (id) => `
  <div class="event__type-list">
    <fieldset class="event__type-group">
      <legend class="visually-hidden">Event type</legend>
      ${POINT_TYPES.map((type) => createTypeItemTemplate(type, id)).join('')}
    </fieldset>
  </div>
`;

const createTypeWrapperTemplate = (type, id) =>
  `
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

      ${createTypeListTemplate(id)}

    </div>
  `;

const createDestinationInputTemplate = ({
  id,
  type,
  currentDestination,
  destinations
}) => `
        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-${id}">
            ${type}
          </label>

          <input
            class="event__input event__input--destination"
            id="event-destination-${id}"
            type="text"
            name="event-destination"
            value="${currentDestination.name}"
            list="destination-list-${id}"
          >

          <datalist id="destination-list-${id}">
            ${destinations.map((destination) => `<option value="${destination.name}"></option>`).join('')}
          </datalist>
        </div>
      `;

const createDateInterfaceTemplate = (dateFrom, dateTo, id) => `
  <div class="event__field-group  event__field-group--time">
    <label class="visually-hidden" for="event-start-time-${id}">From</label>
    <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${formatToDateInput(dateFrom)}">
    —
    <label class="visually-hidden" for="event-end-time-${id}">To</label>
    <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${formatToDateInput(dateTo)}">
  </div>
`;

const createPriceTemplate = (basePrice, id) => `
  <div class="event__field-group  event__field-group--price">
    <label class="event__label" for="event-price-${id}">
      <span class="visually-hidden">Price</span>
      €
    </label>
    <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${basePrice}">
  </div>
`;

const createButtonTemplate = (isResetButton, isNewPoint) => {
  if (isResetButton) {
    return `
      <button class="event__reset-btn" type="reset">${isNewPoint ? 'Cancel' : 'Delete'}</button>
    `;
  }

  return `
    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
  `;
};

const createRollupButtonTemplate = () => `
  <button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>
`;

const createOfferTemplate = (offer, isChecked) => `
  <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="${offer.id}" type="checkbox" name="event-offer-${offer.id}" ${isChecked ? 'checked' : ''}>
    <label class="event__offer-label" for="${offer.id}">
      <span class="event__offer-title">${offer.title}</span>
      +€&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </label>
  </div>
`;

const createOffersTemplate = (offers, selectedOffers) => {
  if (offers.length === 0) {
    return '';
  }
  return `
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
              ${offers.map((offer) => createOfferTemplate(offer, selectedOffers.some((selectedOffer) => selectedOffer.id === offer.id))).join('')}
            </div>
          </section>
`;
};

const createPhotoTapeTemplate = (pictures) => {
  if (pictures.length === 0) {
    return '';
  }

  return `
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('')}
      </div>
    </div>
  `;
};

const createDestinationTemplate = (destination) => {
  if (!destination) {
    return '';
  }

  return `
  <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${destination.description}</p>
    ${createPhotoTapeTemplate(destination.pictures)}
  </section>
  `;
};

const createPointFormTemplate = ({
  point,
  selectedOffers,
  offers,
  currentDestination,
  destinations
}) => {

  const {
    basePrice,
    dateFrom,
    dateTo,
    id,
    type,
  } = point;

  const offersOfCurrentType = offers.find((offer) => offer.type === type).offers;
  const isNewPoint = id === null;
  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          ${createTypeWrapperTemplate(type, id)}
          ${createDestinationInputTemplate({ id, type, currentDestination, destinations })}
          ${createDateInterfaceTemplate(dateFrom, dateTo, id)}
          ${createPriceTemplate(basePrice, id)}
          ${createButtonTemplate(false)}
          ${createButtonTemplate(true, isNewPoint)}
          ${!isNewPoint && createRollupButtonTemplate()}
        </header>
        <section class="event__details">
          ${createOffersTemplate(offersOfCurrentType, selectedOffers)}
          ${createDestinationTemplate(currentDestination)}
        </section>
      </form>
    </li>
  `;
};

export default class PointFormView extends AbstractView {
  #point = null;
  #selectedOffers = null;
  #offers = null;
  #currentDestination = null;
  #destinations = null;
  #handleFormSubmit = null;
  #handleFormReset = null;
  #handleRollupClick = null;

  constructor({ point, selectedOffers, offers, currentDestination, destinations, onFormSubmit, onFormReset, onRollupClick }) {
    super();
    // console.log('selectedOffers', selectedOffers);
    // console.log('offers', offers);
    this.#point = point;
    this.#selectedOffers = selectedOffers;
    this.#offers = offers;
    this.#currentDestination = currentDestination;
    this.#destinations = destinations;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormReset = onFormReset;
    this.#handleRollupClick = onRollupClick;

    this.element.querySelector('.event.event--edit').addEventListener('submit', this.#handleFormSubmit);
    this.element.querySelector('.event.event--edit').addEventListener('reset', this.#handleFormReset);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#handleRollupClick);
  }

  get template() {
    return createPointFormTemplate({
      point: this.#point,
      selectedOffers: this.#selectedOffers,
      offers: this.#offers,
      currentDestination: this.#currentDestination,
      destinations: this.#destinations,
    });
  }
}
