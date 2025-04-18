import AbstractView from '../framework/view/abstract-view';
import { WatchedFilmsRank } from '../consts';

const getRankTemplate = (filmsNumber) => {
  if (filmsNumber === 0) {
    return '';
  }
  let rank = WatchedFilmsRank.MOVIE_BUFF.rank;
  if (filmsNumber < WatchedFilmsRank.NOVICE.maxCount) {
    rank = WatchedFilmsRank.NOVICE.rank;
  } else if (filmsNumber < WatchedFilmsRank.FAN.maxCount) {
    rank = WatchedFilmsRank.FAN.rank;
  }

  return `<p class="profile__rating">${ rank }</p>`;
};

const createUserProfileTemplate = (watchedFilmsCount) =>
  `<section class="header__profile profile">
    ${ getRankTemplate(watchedFilmsCount) }
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;

export default class UserView extends AbstractView {
  #watchedFilmsCount = null;

  constructor (watchedFilmsCount) {
    super();
    this.#watchedFilmsCount = watchedFilmsCount;
  }

  get template() {
    return createUserProfileTemplate(this.#watchedFilmsCount);
  }
}
