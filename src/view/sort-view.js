import AbstractView from '../framework/view/abstract-view';
import { SortItem } from '../utils/const';

const createSortItemTemplate = (sortItem, isChecked) => {
  const { name, id, isDisabled } = sortItem;
  return (
    `
      <div class="trip-sort__item  trip-sort__item--${name}">
        <input id="${id}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${id}" ${isChecked ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
        <label class="trip-sort__btn" for="${id}">${name.toUpperCase()}</label>
      </div>
    `
  );
};

const createSortTemplate = (currentSortType) => {
  const sortItemsTemplate = Object.values(SortItem).map((sortItem) => createSortItemTemplate(sortItem, sortItem.name === currentSortType)).join('\n');

  return (
    `
      <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
        ${sortItemsTemplate}
      </form>
    `
  );
};

export default class SortView extends AbstractView {
  #currentSortType = SortItem.DEFAULT.name;
  constructor(currentSortType) {
    super();
    this.#currentSortType = currentSortType;
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }
}
