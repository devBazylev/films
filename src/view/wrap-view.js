import AbstractView from '../framework/view/abstract-view';

const createFilmsContainer = () =>
  `<section class="films">
  </section>`;


export default class WrapView extends AbstractView {
  get template () {
    return createFilmsContainer();
  }
}
