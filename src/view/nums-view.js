import AbstractView from '../framework/view/abstract-view';

const createStatisticsTemplate = (filmsNumber) =>
  `<p>${filmsNumber} movies inside</p>`;

export default class NumsView extends AbstractView {
  #filmsNumber = null;

  constructor (filmsNumber) {
    super();
    this.#filmsNumber = filmsNumber;
  }

  get template () {
    return createStatisticsTemplate(this.#filmsNumber);
  }
}
