import AbstractView from '../framework/view/abstract-view';
import { FilterType } from '../consts';

const createFiltersItem = (filterType, currentFilter, filmsCount) =>
  `<a
    href="#${filterType}"
    class="main-navigation__item ${filterType === currentFilter ? 'main-navigation__item--active' : ''}"
    id="${filterType}"
  >
    ${filterType}
    ${filterType !== FilterType.ALL ? `<span class="main-navigation__item-count">${filmsCount}</span>` : ''}
  </a>`;

export const createFiltersTemplate = (currentFilter, filteredFilmsCount) => {
  let filters = '';

  for (const [key, value] of Object.entries(FilterType)) {
    filters = filters + createFiltersItem(value, currentFilter, filteredFilmsCount[key]);
  }

  return `<nav class="main-navigation">
            ${filters}
          </nav>`;
};

export default class SiteFiltersView extends AbstractView {
  #filter = null;
  #filteredFilmsCount = null;

  constructor (currentFilter, filteredFilmsCount) {
    super();
    this.#filter = currentFilter;
    this.#filteredFilmsCount = filteredFilmsCount;
  }

  get template () {
    return createFiltersTemplate(this.#filter, this.#filteredFilmsCount);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('click', this.#filterTypeChangeHandler);
  };

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target);
  };
}
