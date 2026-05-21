import Observable from '../framework/observable.js';
import { FilterType, UpdateType } from '../utils/const.js';


export default class FilterModel extends Observable {
  #filter = FilterType.EVERYTHING;

  get filter() {
    return this.#filter;
  }

  set filter(filter) {
    this.#filter = filter;
    this._notify(UpdateType.MAJOR, filter);
  }
}


