import AbstractView from '../framework/view/abstract-view';

export const createStatisticsTemplate = (filmsNumber) =>
  `<p>${filmsNumber} movies inside</p>`;

export default class SiteStatisticsView extends AbstractView {
  #filmsNumber = null;

  constructor (filmsNumber) {
    super();
    this.#filmsNumber = filmsNumber;
  }

  get template () {
    return createStatisticsTemplate(this.#filmsNumber);
  }
}
