import AbstractView from '../framework/view/abstract-view';
import { FilterType } from '../utils/const';

const NoPointsMessage = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.PRESENT]: 'There are no present events now'
};

const createNoPointsTemplate = (currentFilter) => `<p class="trip-events__msg">${NoPointsMessage[currentFilter]}</p>`;

export default class NoPointsView extends AbstractView {

  #currentFilter = null;

  constructor({ currentFilter }) {
    super();
    this.#currentFilter = currentFilter;
  }

  get template() {
    return createNoPointsTemplate(this.#currentFilter);
  }
}
