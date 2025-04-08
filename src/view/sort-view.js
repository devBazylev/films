import AbstractView from '../framework/view/abstract-view';
import { SortType } from '../consts';

const createSortItemTemplate = (sortType, currentSort) =>
  `<li>
    <a
      href="#"
      class="sort__button ${sortType === currentSort ? 'sort__button--active' : ''}"
      data-sort-type="${sortType}"
    >
      Sort by ${sortType}
    </a>
  </li>`;

export const createSortTemplate = (currentSort) => {
  let sortList = '';

  Object.keys(SortType).forEach(
    (key) => {
      sortList += createSortItemTemplate(SortType[key], currentSort);
    }
  );

  return `<ul class="sort">
            ${sortList}
          </ul>`;
};

export default class SortView extends AbstractView {
  #currentSort = null;

  constructor (currentSort) {
    super();
    this.#currentSort = currentSort;
  }

  get template() {
    return createSortTemplate(this.#currentSort);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };
}
