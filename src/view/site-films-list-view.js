import AbstractView from '../framework/view/abstract-view';

const createFilmsListTemplate = (titleName, isEmptyList, isExtra) =>
  `<section class="films-list ${ isExtra ? 'films-list--extra' : ''}">
    <h2 class="films-list__title ${ !(isEmptyList || isExtra) ? 'visually-hidden' : ''}">${ titleName }</h2>
  </section>`;

export default class SiteFilmsListView extends AbstractView {
  constructor () {
    super();
  }

  init ({
    titleName,
    isEmptyList = false,
    isExtra = false,
  } = {}) {
    this.titleName = titleName;
    this.isEmptyList = isEmptyList;
    this.isExtra = isExtra;
  }

  get template () {
    return createFilmsListTemplate(this.titleName, this.isEmptyList, this.isExtra);
  }
}
