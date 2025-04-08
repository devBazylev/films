import AbstractView from '../framework/view/abstract-view';

const createFilmsListContainer = () => '<div class="films-list__container"></div>';

export default class BoxView extends AbstractView {
  constructor() {
    super();
  }

  get template () {
    return createFilmsListContainer();
  }
}
