import AbstractView from '../framework/view/abstract-view';

export const createFilmsContainer = () =>
  `<section class="films">
  </section>`;


export default class SiteFilmsContainerView extends AbstractView {
  get template () {
    return createFilmsContainer();
  }
}
