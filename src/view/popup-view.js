import he from 'he';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { CommentReactions, ENTER_CODE, TimeOutDelay, ViewActions, ViewType } from '../consts';
import { RelativeTime } from '../consts';

const getReadbleDate = (date) => {
  dayjs.extend(relativeTime);
  dayjs.extend(updateLocale);

  dayjs.updateLocale('en', {
    relativeTime: RelativeTime,
  });

  return dayjs(date).fromNow();
};

const createFilmPopup = (film, comments, state) => {
  const createCommentsList = () => {
    const commentsList = comments.map(
      (commentData) => {
        const { id, author, comment, emotion, date } = commentData;

        return `<li class="film-details__comment" id=${ id }>
                  <span class="film-details__comment-emoji">
                  <img src="./images/emoji/${ emotion }.png" width="55" height="55" alt="emoji-${ emotion }">
                </span>
                <div>
                  <p class="film-details__comment-text">${ comment }</p>
                  <p class="film-details__comment-info">
                    <span class="film-details__comment-author">${ author }</span>
                    <span class="film-details__comment-day">${ getReadbleDate(date) }</span>
                    <button class="film-details__comment-delete" id="${id}">${ state.isDeleting === id ? 'Deleting' : 'Delete' }</button>
                  </p>
                </div>
              </li>`;
      }
    ).join('');

    return `<h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${ comments.length }</span></h3>
            <ul class="film-details__comments-list">
              ${ commentsList }
            </ul>`;
  };

  const { title, totalRating, poster, ageRating, director, writers, actors, release, duration: filmDuration, genre, description } = film.filmInfo;
  const releaseDate = dayjs(release.date).format('DD MMMM YYYY');
  const userDetails = film.userDetails;
  const genreList = genre.map((el) => `<span class="film-details__genre">${el}</span>`).join('');

  dayjs.extend(duration);

  return `<section class="film-details" id=${film.id}>
            <div class="film-details__inner">
              <div class="film-details__top-container">
                <div class="film-details__close">
                  <button class="film-details__close-btn" type="button">close</button>
                </div>
                <div class="film-details__info-wrap">
                  <div class="film-details__poster">
                    <img class="film-details__poster-img" src="${ poster }" alt="">

                    <p class="film-details__age">${ ageRating }+</p>
                  </div>

                  <div class="film-details__info">
                    <div class="film-details__info-head">
                      <div class="film-details__title-wrap">
                        <h3 class="film-details__title">${ title }</h3>
                        <p class="film-details__title-original">${ title }</p>
                      </div>

                      <div class="film-details__rating">
                        <p class="film-details__total-rating">${ totalRating }</p>
                      </div>
                    </div>

                    <table class="film-details__table">
                      <tr class="film-details__row">
                        <td class="film-details__term">Director</td>
                        <td class="film-details__cell">${ director }</td>
                      </tr>
                      <tr class="film-details__row">
                        <td class="film-details__term">Writers</td>
                        <td class="film-details__cell">${ writers.join(', ') }</td>
                      </tr>
                      <tr class="film-details__row">
                        <td class="film-details__term">Actors</td>
                        <td class="film-details__cell">${ actors.join(', ') }</td>
                      </tr>
                      <tr class="film-details__row">
                        <td class="film-details__term">Release Date</td>
                        <td class="film-details__cell">${ releaseDate }</td>
                      </tr>
                      <tr class="film-details__row">
                        <td class="film-details__term">Duration</td>
                        <td class="film-details__cell">${ dayjs.duration(filmDuration, 'minutes').format('H[h] mm[m]') }</td>
                      </tr>
                      <tr class="film-details__row">
                        <td class="film-details__term">Country</td>
                        <td class="film-details__cell">${ release.releaseCountry }</td>
                      </tr>
                      <tr class="film-details__row">
                        <td class="film-details__term">
                          ${ genre.length > 1 ? 'Genres' : 'Genre'}
                        </td>
                        <td class="film-details__cell">
                          ${ genreList }
                      </tr>
                    </table>

                    <p class="film-details__film-description">
                      ${ description }
                    </p>
                  </div>
                </div>

                <section class="film-details__controls">
                  <button
                    type="button"
                    class="
                      film-details__control-button
                      film-details__control-button--watchlist
                      ${ userDetails.watchlist ? 'film-details__control-button--active' : '' }"
                    id="watchlist"
                    name="watchlist"
                  >
                    Add to watchlist
                  </button>
                  <button
                    type="button"
                    class="
                      film-details__control-button
                      film-details__control-button--watched
                      ${ userDetails.alreadyWatched ? 'film-details__control-button--active' : '' }
                    "
                    id="watched"
                    name="watched"
                  >
                    Already watched
                  </button>
                  <button
                    type="button"
                    class="
                      film-details__control-button
                      film-details__control-button--favorite
                      ${ userDetails.favorite ? 'film-details__control-button--active' : '' }
                    "
                    id="favorite"
                    name="favorite"
                  >
                    Add to favorites
                  </button>
                </section>
              </div>

              <div class="film-details__bottom-container">
                <section class="film-details__comments-wrap">

                  ${ createCommentsList() }

                  <form class="film-details__new-comment" action="" method="get">
                    <div class="film-details__add-emoji-label"></div>

                    <label class="film-details__comment-label">
                      <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
                    </label>

                    <div class="film-details__emoji-list">
                      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                      <label class="film-details__emoji-label" for="emoji-smile">
                        <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                      </label>

                      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                      <label class="film-details__emoji-label" for="emoji-sleeping">
                        <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                      </label>

                      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                      <label class="film-details__emoji-label" for="emoji-puke">
                        <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                      </label>

                      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                      <label class="film-details__emoji-label" for="emoji-angry">
                        <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                      </label>
                    </div>
                  </form>
                </section>
              </div>
            </div>
          </section>`;
};

export default class PopupView extends AbstractStatefulView {
  #film = {};
  #comments = [];
  #emojiImageElement = null;

  constructor (film, comments, onDeleteClick) {
    super();
    this.#film = film;
    this.#comments = comments;
    this._setState(PopupView.parseCommentToState());

    this._callback.deleteCommentClick = onDeleteClick;

    this._restoreHandlers();
  }

  get template () {
    return createFilmPopup(this.#film, this.#comments, this._state);
  }

  static parseCommentToState() {
    return {
      comment: null,
      emotion: null,
      isDisabled: false,
      isDeleting: null,
    };
  }

  _restoreHandlers = () => {
    this.element.querySelector('.film-details__comment-input').addEventListener('input', this.#changeCommentText);
    this.element.querySelector('.film-details__emoji-list').addEventListener('click', this.#clickEmojiLabel);
    this.element.addEventListener('scroll', this.#scrollPositionHandler);
    this.element
      .querySelectorAll('.film-details__comment-delete')
      .forEach((deleteButton) =>
        deleteButton.addEventListener('click', this.#deleteCommentHandler)
      );
  };

  getScrollPosition() {
    return this._state.scrollPosition;
  }

  setScrollPosition(scrollPosition) {
    this.element.scrollTo(0, scrollPosition);
  }

  #scrollPositionHandler = () => {
    this._setState({scrollPosition: this.element.scrollTop});
  };

  #closePopupHandler = (evt) => {
    evt.preventDefault();
    document.removeEventListener('keydown', this.#commentSaveHandler);
    this._callback.closeClick();
  };

  setClosePopupHandler = (callback) => {
    this._callback.closeClick = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closePopupHandler);
  };

  #propertyClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.propertyChangeClick(evt.target, true);
  };

  setPropertyClickHandler = (callback) => {
    this._callback.propertyChangeClick = callback;

    this.element.querySelector('#watchlist').addEventListener('click', this.#propertyClickHandler);
    this.element.querySelector('#watched').addEventListener('click', this.#propertyClickHandler);
    this.element.querySelector('#favorite').addEventListener('click', this.#propertyClickHandler);
  };

  #deleteCommentHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteCommentClick(
      ViewActions.DELETE_COMMENT,
      {
        movie: {
          id: this.#film.id,
        },
        commentId: evt.target.id,
      },
      ViewType.POPUP,
    );
    this.updateElement({
      isDeleting: evt.target.id,
    });
    this.element.scrollTo(0, this._state.scrollPosition);
  };

  #commentSaveHandler = (evt) => {
    if (evt.keyCode === ENTER_CODE && evt.ctrlKey) {
      evt.preventDefault();

      if (this._state.comment && this._state.emotion) {
        this._callback.saveCommentClick(
          ViewActions.UPDATE_COMMENT,
          {
            movie: {
              id: this.#film.id,
            },
            newComment: {
              emotion: this._state.emotion,
              comment: he.encode(this._state.comment),
            }
          },
          ViewType.POPUP
        );
      } else {
        this.shakeNewComment();
      }
    }
  };

  setSaveCommentHandler = (callback) => {
    this._callback.saveCommentClick = callback;
    document.addEventListener('keydown', this.#commentSaveHandler);
  };

  shakeNewComment = () => {
    this.shake.call({element: document.querySelector('.film-details__new-comment')});
  };

  shakeComment = (commentId) => {
    this.shake.call({element: document.querySelector(`#${ commentId }`)});
  };

  setShaking = (updateType, commentId) => {
    switch (updateType) {
      case ViewActions.FILM:
        setTimeout(() => this.shake.call({element: document.querySelector('.film-details__controls')}), TimeOutDelay);
        break;
      case ViewActions.UPDATE_COMMENT:
        setTimeout(() => this.shakeNewComment(), TimeOutDelay);
        break;
      case ViewActions.DELETE_COMMENT:
        setTimeout(() => this.shake.call({ element: document.getElementById(commentId) }), TimeOutDelay);
        this.updateElement({ isDeleting: null, });
        this.element.scrollTo(0, this._state.scrollPosition);
        break;
    }
  };

  deleteSaveCommentHandler = () => {
    document.removeEventListener('keydown', this.#commentSaveHandler);
  };

  #changeCommentText = (evt) => {
    evt.preventDefault();

    this._setState({
      comment: evt.target.value
    });
  };

  #clickEmojiLabel = (evt) => {
    evt.preventDefault();

    const addEmojiContainer = this.element.querySelector('.film-details__add-emoji-label');

    if (!this.#emojiImageElement) {
      this.#emojiImageElement = document.createElement('img');

      this.#emojiImageElement.style.width = '55px';
      this.#emojiImageElement.style.height = '55px';
      this.#emojiImageElement.setAttribute('id', 'emoji-image');
      addEmojiContainer.appendChild(this.#emojiImageElement);
    }

    this.#emojiImageElement.setAttribute('src', evt.target.src);

    this._setState({
      emotion: Object
        .keys(CommentReactions)
        .find((key) =>
          CommentReactions[key] === evt.target.getAttribute('src')
        )
        .toLowerCase(),
    });
  };
}
