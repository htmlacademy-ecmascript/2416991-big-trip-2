import { render } from '../framework/render';
import FilterView from '../view/filter-view';

export default class FilterPresenter {
  #filterContainer = null;
  #pointsModel = null;
  #filterModel = null;

  constructor({ filterContainer, pointsModel, filterModel }) {
    this.#filterContainer = filterContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
  }

  init() {
    const currentFilter = this.#filterModel.filter;
    render(new FilterView({
      points: this.#pointsModel.points,
      currentFilter,
      onFilterChange: () => { }
    }), this.#filterContainer);
  }
}
