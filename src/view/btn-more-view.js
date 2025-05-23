
import AbstractView from '../framework/view/abstract-view';

const createShowMoreButtonTemplate = () =>
  '<button class="films-list__show-more">Show more</button>';

export default class BtnShowView extends AbstractView {
  #handleClick = null;

  constructor ({onClick}) {
    super();
    this.#handleClick = onClick;
    this.element.addEventListener('click', this.#clickHandler);
  }

  get template() {
    return createShowMoreButtonTemplate();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
